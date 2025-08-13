/**
 * String functions for FHIRPath.js
 * This file holds code to handle the FHIRPath String functions.
 */

import misc from './misc';
import util from './utilities';

/**
 * String functions engine interface
 */
export interface StringEngine {
  indexOf: (coll: any[], substr: string) => number | any[];
  substring: (coll: any[], start: number, length?: number) => string | any[];
  startsWith: (coll: any[], prefix: string) => boolean | any[];
  endsWith: (coll: any[], postfix: string) => boolean | any[];
  containsFn: (coll: any[], substr: string) => boolean | any[];
  upper: (coll: any[]) => string | any[];
  lower: (coll: any[]) => string | any[];
  joinFn: (coll: any[], separator?: string) => string | any[];
  splitFn: (coll: any[], separator: string) => string[] | any[];
  trimFn: (coll: any[]) => string | any[];
  encodeFn: (coll: any[], format: string) => string | any[];
  decodeFn: (coll: any[], format: string) => string | any[];
  matches: (coll: any[], regex: string) => boolean | any[];
  replace: (coll: any[], pattern: string, repl: string) => string | any[];
  replaceMatches: (coll: any[], regex: string, repl: string) => string | any[];
  length: (coll: any[]) => number | any[];
  toChars: (coll: any[]) => string[] | any[];
}

const engine: StringEngine = {} as StringEngine;

// Cache for rewritten RegExp patterns
const cachedRegExp: Record<string, string> = {};

/**
 * Rewrites RegExp pattern to support single-line mode (dotAll) in IE11:
 * To do that we replace "." with "[^]" in source RegExp pattern,
 * except where "." is escaped or is inside unescaped [].
 * Another way to do the same is using package regexpu-core
 * or packages regjsparser/regjsgen.
 * @param pattern - source RegExp pattern
 * @returns rewritten pattern
 */
function rewritePatternForDotAll(pattern: string): string {
  if (!cachedRegExp[pattern]) {
    cachedRegExp[pattern] = pattern.replace(/\./g, (_, offset: number, entirePattern: string) => {
      // The preceding part of the string
      const precedingPart = entirePattern.substr(0, offset);
      // The preceding part of the string without escaped characters: '\', '[' or ']'
      const cleanPrecedingPart = precedingPart
        .replace(/\\\\/g, '')
        .replace(/\\[\][]/g, '');
      // Check if '.' is escaped
      const escaped = cleanPrecedingPart[cleanPrecedingPart.length - 1] === '\\';
      // The last index of unescaped '['
      const lastIndexOfOpenBracket = cleanPrecedingPart.lastIndexOf('[');
      // The last index of unescaped ']'
      const lastIndexOfCloseBracket = cleanPrecedingPart.lastIndexOf(']');
      return escaped ||
        (lastIndexOfOpenBracket > lastIndexOfCloseBracket)
        ? '.'
        : '[^]';
    });
  }

  return cachedRegExp[pattern];
}

engine.indexOf = function (coll: any[], substr: string): number | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(substr) || util.isEmpty(str) ? [] : str.indexOf(substr);
};

engine.substring = function (coll: any[], start: number, length?: number): string | any[] {
  const str = misc.singleton(coll, 'String');
  if (util.isEmpty(str) || util.isEmpty(start) || start < 0 || start >= str.length) {
    return [];
  }
  if (length === undefined || util.isEmpty(length)) {
    return str.substring(start);
  }
  return str.substring(start, start + length);
};

engine.startsWith = function (coll: any[], prefix: string): boolean | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(prefix) || util.isEmpty(str) ? [] : str.startsWith(prefix);
};

engine.endsWith = function (coll: any[], postfix: string): boolean | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(postfix) || util.isEmpty(str) ? [] : str.endsWith(postfix);
};

engine.containsFn = function (coll: any[], substr: string): boolean | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(substr) || util.isEmpty(str) ? [] : str.includes(substr);
};

engine.upper = function (coll: any[]): string | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.toUpperCase();
};

engine.lower = function (coll: any[]): string | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.toLowerCase();
};

// See https://build.fhir.org/ig/HL7/FHIRPath/#joinseparator-string-string
engine.joinFn = function (coll: any[], separator?: string): string | any[] {
  const stringValues: string[] = [];
  coll.forEach((n) => {
    const d = util.valData(n);
    if (typeof d === "string") {
      stringValues.push(d);
    } else if (d != null) {
      throw new Error('Join requires a collection of strings.');
    }
  });
  if (util.isEmpty(stringValues)) {
    return [];
  }
  if (separator === undefined) {
    separator = "";
  }
  return stringValues.join(separator);
};

engine.splitFn = function (coll: any[], separator: string): string[] | any[] {
  const strToSplit = misc.singleton(coll, 'String');
  return util.isEmpty(strToSplit) ? [] : strToSplit.split(separator);
};

engine.trimFn = function (coll: any[]): string | any[] {
  const strToTrim = misc.singleton(coll, 'String');
  return util.isEmpty(strToTrim) ? [] : strToTrim.trim();
};

// encoding/decoding
engine.encodeFn = function (coll: any[], format: string): string | any[] {
  const strToEncode = misc.singleton(coll, 'String');
  if (util.isEmpty(strToEncode)) {
    return [];
  }
  if (format === 'urlbase64' || format === 'base64url') {
    return btoa(strToEncode).replace(/\+/g, '-').replace(/\//g, '_');
  }
  if (format === 'base64') {
    return btoa(strToEncode);
  }
  if (format === 'hex') {
    return Array.from(strToEncode as string).map((c: string) =>
      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
        encodeURIComponent(c).replace(/%/g, '')
    ).join('');
  }
  return [];
};

engine.decodeFn = function (coll: any[], format: string): string | any[] {
  const strDecode = misc.singleton(coll, 'String');
  if (util.isEmpty(strDecode)) {
    return [];
  }
  if (format === 'urlbase64' || format === 'base64url') {
    return atob(strDecode.replace(/-/g, '+').replace(/_/g, '/'));
  }
  if (format === 'base64') {
    return atob(strDecode);
  }
  if (format === 'hex') {
    if (strDecode.length % 2 !== 0) {
      throw new Error('Decode \'hex\' requires an even number of characters.');
    }
    return decodeURIComponent('%' + strDecode.match(/.{2}/g)!.join('%'));
  }
  return [];
};

// Check if dotAll is supported.
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll for details.
const dotAllIsSupported = (new RegExp('')).dotAll === false;

if (dotAllIsSupported) {
  engine.matches = function (coll: any[], regex: string): boolean | any[] {
    const str = misc.singleton(coll, 'String');
    if (util.isEmpty(regex) || util.isEmpty(str)) {
      return [];
    }
    const reg = new RegExp(regex, 'su');
    return reg.test(str);
  };
} else {
  engine.matches = function (coll: any[], regex: string): boolean | any[] {
    const str = misc.singleton(coll, 'String');
    if (util.isEmpty(regex) || util.isEmpty(str)) {
      return [];
    }
    const reg = new RegExp(rewritePatternForDotAll(regex), 'u');
    return reg.test(str);
  };
}

engine.replace = function (coll: any[], pattern: string, repl: string): string | any[] {
  const str = misc.singleton(coll, 'String');
  if (util.isEmpty(pattern) || util.isEmpty(repl) || util.isEmpty(str)) {
    return [];
  }
  const reg = new RegExp(util.escapeStringForRegExp(pattern), 'g');
  return str.replace(reg, repl);
};

engine.replaceMatches = function (coll: any[], regex: string, repl: string): string | any[] {
  const str = misc.singleton(coll, 'String');
  if (util.isEmpty(regex) || util.isEmpty(repl) || util.isEmpty(str)) {
    return [];
  }
  const reg = new RegExp(regex, 'gu');
  return str.replace(reg, repl);
};

engine.length = function (coll: any[]): number | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.length;
};

engine.toChars = function (coll: any[]): string[] | any[] {
  const str = misc.singleton(coll, 'String');
  return util.isEmpty(str) ? [] : str.split('');
};

export default engine;
