/**
 * Deep equality comparison module for FHIRPath.js
 * Originally copied from node-deep-equal
 * (https://github.com/substack/node-deep-equal), with modifications.
 * For the license for node-deep-equal, see the bottom of this file.
 */

import numbers from './numbers';
import { FP_Quantity, FP_Type, ResourceNode } from './types';
import { DeepEqualOptions } from './types/core';

const pSlice = Array.prototype.slice;
const objectKeys = Object.keys;

const isArguments = function (object: any): boolean {
  return Object.prototype.toString.call(object) === '[object Arguments]';
};

function isString(myVar: any): boolean {
  return (typeof myVar === 'string' || myVar instanceof String);
}

function isNumber(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function normalizeStr(x: string): string {
  return x.toUpperCase().replace(/\s+/, ' ');
}

/**
 * Performs a deep comparison between two values to determine if they are equal.
 * When you need to compare many objects, you can use hashObject instead for
 * optimization (if changes are needed here, they are likely also needed there).
 * @param v1 - one of the comparing objects
 * @param v2 - one of the comparing objects
 * @param opts - comparison options
 * @param opts.fuzzy - false (by default), if comparing objects for
 *   equality (see https://hl7.org/fhirpath/#equals).
 *   true, if comparing objects for equivalence
 *   (see https://hl7.org/fhirpath/#equivalent).
 * @return boolean indicating equality
 */
function deepEqual(v1: any, v2: any, opts?: DeepEqualOptions): boolean {
  const v1IsResourceNode = v1 instanceof ResourceNode;
  const v2IsResourceNode = v2 instanceof ResourceNode;
  let actual = v1IsResourceNode ? v1.convertData() : v1;
  let expected = v2IsResourceNode ? v2.convertData() : v2;
  if (!opts) opts = {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return opts.fuzzy || !v1IsResourceNode || !v2IsResourceNode ||
      deepEqual(v1._data, v2._data);
  }

  if (opts.fuzzy) {
    if (isString(actual) && isString(expected)) {
      return normalizeStr(actual) === normalizeStr(expected);
    }
    if (isNumber(actual) && isNumber(expected)) {
      return numbers.isEquivalent(actual, expected);
    }
  }
  else { // !opts.fuzzy
    // If these are numbers, they need to be rounded to the maximum supported
    // precision to remove floating point arithmetic errors (e.g. 0.1+0.1+0.1 should
    // equal 0.3) before comparing.
    const typeOfActual = typeof actual;
    if (typeOfActual === 'number') {
      const typeOfExpected = typeof expected;
      if (typeOfExpected === 'bigint') {
        return actual == expected;
      } else if (typeOfExpected === 'number') {
        if (numbers.isEqual(actual, expected)) {
          return v1IsResourceNode && v2IsResourceNode ?
            deepEqual(v1._data, v2._data, opts) : true;
        } else {
          return false;
        }
      }
    } else if (typeOfActual === 'bigint' && typeof expected === 'number') {
      return actual == expected;
    }
  }

  if (actual instanceof Date && expected instanceof Date) {
    return (actual.getTime() === expected.getTime()) && (
      opts.fuzzy || !v1IsResourceNode || !v2IsResourceNode ||
      deepEqual(v1._data, v2._data)
    );
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return (actual === expected) && (
      opts.fuzzy || !v1IsResourceNode || !v2IsResourceNode ||
      deepEqual(v1._data, v2._data)
    );
  }
  else {
    const actualIsFPT = actual instanceof FP_Type;
    const expectedIsFPT = expected instanceof FP_Type;
    if (actualIsFPT && expectedIsFPT) { // if both are FP_Type
      if (opts.fuzzy) {
        return actual.equivalentTo(expected);
      } else {
        const result = actual.equals(expected); // May return undefined
        if (result) {
          return !v1IsResourceNode || !v2IsResourceNode ||
            deepEqual(v1._data, v2._data) &&
            deepEqual(v1.data?.id, v2.data?.id) &&
            deepEqual(v1.data?.extension, v2.data?.extension);
        } else {
          return result;
        }
      }
    }
    else if (actualIsFPT || expectedIsFPT) { // if only one is an FP_Type
      let anotherIsNumber = false;
      if (typeof actual == 'number') {
        actual = new FP_Quantity(actual, "'1'");
        anotherIsNumber = true;
      }
      if (typeof expected == 'number') {
        expected = new FP_Quantity(expected, "'1'");
        anotherIsNumber = true;
      }
      if (anotherIsNumber) {
        return opts.fuzzy ? actual.equivalentTo(expected) :
          actual.equals(expected);
      }
      return false;
    }
    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value: any): boolean {
  return value === null || value === undefined;
}

function objEquiv(a: any, b: any, opts?: DeepEqualOptions): boolean {
  let i: number, key: string;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a) || isArguments(b)) {
    a = isArguments(a) ? pSlice.call(a) : a;
    b = isArguments(b) ? pSlice.call(b) : b;
    return deepEqual(a, b, opts);
  }
  try {
    const ka = objectKeys(a), kb = objectKeys(b);
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length != kb.length)
      return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i])
        return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    // If the length of the array is one, return the value of deepEqual (which can
    // be "undefined".
    if (ka.length === 1) {
      key = ka[0];
      return deepEqual(a[key], b[key], opts);
    }
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!deepEqual(a[key], b[key], opts)) return false;
    }
    return typeof a === typeof b;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
}

export { deepEqual };

// Maximum collection length to use deepEqual(). When comparing a large number
// of collection items, it is more efficient to convert the items to strings
// using the hashObject() function and compare them.
export const maxCollSizeForDeepEqual = 6;

export default {
  deepEqual,
  maxCollSizeForDeepEqual
};

// The license for node-deep-equal, on which the above code is based, is as
// follows:
//
// This software is released under the MIT license:
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
