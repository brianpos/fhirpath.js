/**
 * Existence functions for FHIRPath.js
 * This file holds code to handle the FHIRPath Existence functions (5.1 in the specification).
 */

import { deepEqual, maxCollSizeForDeepEqual } from './deep-equal';
import filteringEngine from './filtering';
import hashObject from './hash-object';
import misc from './misc';
import { TypeInfo } from './types';
import util from './utilities';

/**
 * Existence functions engine interface
 */
export interface ExistenceEngine {
  emptyFn: (x: any[]) => boolean;
  notFn: (coll: any[]) => boolean | any[];
  existsMacro: (coll: any[], expr?: Function) => boolean | Promise<boolean>;
  allMacro: (coll: any[], expr: Function) => boolean[] | Promise<boolean[]>;
  allTrueFn: (x: any[]) => boolean[];
  anyTrueFn: (x: any[]) => boolean[];
  allFalseFn: (x: any[]) => boolean[];
  anyFalseFn: (x: any[]) => boolean[];
  subsetOfFn: (coll1: any[], coll2: any[]) => boolean[];
  supersetOfFn: (coll1: any[], coll2: any[]) => boolean[];
  isDistinctFn: (x: any[]) => boolean[];
}

const engine: ExistenceEngine = {} as ExistenceEngine;

engine.emptyFn = util.isEmpty;

/**
 * Implements the FHIRPath 'not' function
 * @param coll - collection to evaluate
 * @returns negated boolean value or empty array
 */
engine.notFn = function (coll: any[]): boolean | any[] {
  const d = misc.singleton(coll, 'Boolean');
  return (typeof (d) === 'boolean') ? !d : [];
};

/**
 * Implements the FHIRPath 'exists' macro
 * @param coll - collection to evaluate
 * @param expr - optional expression to evaluate
 * @returns boolean result or Promise
 */
engine.existsMacro = function (coll: any[], expr?: Function): boolean | Promise<boolean> {
  if (expr) {
    const exprRes = filteringEngine.whereMacro.call(this, coll, expr);
    if (exprRes instanceof Promise) {
      return exprRes.then(r => engine.existsMacro(r));
    }
    return engine.existsMacro(exprRes);
  }
  return !util.isEmpty(coll);
};

/**
 * Implements the FHIRPath 'all' macro
 * @param coll - collection to evaluate
 * @param expr - expression to evaluate for each item
 * @returns boolean array result or Promise
 */
engine.allMacro = function (coll: any[], expr: Function): boolean[] | Promise<boolean[]> {
  const promises: Promise<any>[] = [];
  for (let i = 0, len = coll.length; i < len; ++i) {
    (this as any).$index = i;
    const exprRes = expr(coll[i]);
    if (exprRes instanceof Promise) {
      promises.push(exprRes);
    } else if (!util.isTrue(exprRes)) {
      return [false];
    }
  }
  if (promises.length) {
    return Promise.all(promises).then(r => r.some(i => !util.isTrue(i)) ? [false] : [true]);
  }
  return [true];
};

/**
 * Implements the FHIRPath 'allTrue' function
 * @param x - collection of boolean values
 * @returns boolean array result
 */
engine.allTrueFn = function (x: any[]): boolean[] {
  let rtn = true;
  for (let i = 0, len = x.length; i < len && rtn; ++i) {
    const xi = util.assertType(x[i], ["boolean"], "allTrue");
    rtn = xi === true;
  }
  return [rtn];
};

/**
 * Implements the FHIRPath 'anyTrue' function
 * @param x - collection of boolean values
 * @returns boolean array result
 */
engine.anyTrueFn = function (x: any[]): boolean[] {
  let rtn = false;
  for (let i = 0, len = x.length; i < len && !rtn; ++i) {
    const xi = util.assertType(x[i], ["boolean"], "anyTrue");
    rtn = xi === true;
  }
  return [rtn];
};

/**
 * Implements the FHIRPath 'allFalse' function
 * @param x - collection of boolean values
 * @returns boolean array result
 */
engine.allFalseFn = function (x: any[]): boolean[] {
  let rtn = true;
  for (let i = 0, len = x.length; i < len && rtn; ++i) {
    const xi = util.assertType(x[i], ["boolean"], "allFalse");
    rtn = xi === false;
  }
  return [rtn];
};

/**
 * Implements the FHIRPath 'anyFalse' function
 * @param x - collection of boolean values
 * @returns boolean array result
 */
engine.anyFalseFn = function (x: any[]): boolean[] {
  let rtn = false;
  for (let i = 0, len = x.length; i < len && !rtn; ++i) {
    const xi = util.assertType(x[i], ["boolean"], "anyFalse");
    rtn = xi === false;
  }
  return [rtn];
};

/**
 * Returns true if coll1 is a subset of coll2.
 * @param coll1 - first collection
 * @param coll2 - second collection
 * @returns true if coll1 is subset of coll2
 */
function subsetOf(coll1: any[], coll2: any[]): boolean {
  const coll1Length = coll1.length;
  const coll2Length = coll2.length;
  let rtn = coll1Length <= coll2Length;
  if (rtn) {
    const hasPrimitive = coll1.some(i => TypeInfo.isPrimitiveValue(i)) ||
      coll2.some(i => TypeInfo.isPrimitiveValue(i));
    if (!hasPrimitive && coll1Length + coll2Length > maxCollSizeForDeepEqual) {
      // When we have more than maxCollSizeForDeepEqual items in input collections,
      // we use a hash table (on JSON strings) for efficiency.
      const c2Hash = coll2.reduce((hash: Record<string, boolean>, item) => {
        hash[hashObject(item)] = true;
        return hash;
      }, {});
      rtn = !coll1.some(item => !c2Hash[hashObject(item)]);
    } else {
      // Otherwise, it is more efficient to perform a deep comparison.
      for (let p = 0, pLen = coll1.length; p < pLen && rtn; ++p) {
        const obj1 = util.valData(coll1[p]);
        rtn = coll2.some(obj2 => deepEqual(obj1, util.valData(obj2)));
      }
    }
  }
  return rtn;
}

engine.subsetOfFn = function (coll1: any[], coll2: any[]): boolean[] {
  return [subsetOf(coll1, coll2)];
};

engine.supersetOfFn = function (coll1: any[], coll2: any[]): boolean[] {
  return [subsetOf(coll2, coll1)];
};

engine.isDistinctFn = function (x: any[]): boolean[] {
  return [x.length === filteringEngine.distinctFn(x).length];
};

export default engine;
