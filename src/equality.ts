/**
 * Equality functions for FHIRPath.js
 * This file holds code to handle the FHIRPath equality and comparison functions.
 */

import { deepEqual } from './deep-equal';
import { FP_DateTime, FP_Type } from './types';
import util from './utilities';

/**
 * Equality functions engine interface
 */
export interface EqualityEngine {
  equal: (a: any[], b: any[]) => boolean | any[];
  unequal: (a: any[], b: any[]) => boolean | any[] | undefined;
  equival: (a: any[], b: any[]) => boolean | any[];
  unequival: (a: any[], b: any[]) => boolean | any[];
  lt: (a: any[], b: any[]) => boolean | any[];
  gt: (a: any[], b: any[]) => boolean | any[];
  lte: (a: any[], b: any[]) => boolean | any[];
  gte: (a: any[], b: any[]) => boolean | any[];
}

const engine: EqualityEngine = {} as EqualityEngine;

/**
 * Performs equality comparison
 * @param x - first operand
 * @param y - second operand
 * @returns boolean result or empty array
 */
function equality(x: any[], y: any[]): boolean | any[] {
  if (util.isEmpty(x) || util.isEmpty(y)) {
    return [];
  }
  return deepEqual(x, y);
}

/**
 * Performs equivalence comparison
 * @param x - first operand
 * @param y - second operand
 * @returns boolean result or empty array
 */
function equivalence(x: any[], y: any[]): boolean | any[] {
  if (util.isEmpty(x) && util.isEmpty(y)) {
    return [true];
  }
  if (util.isEmpty(x) || util.isEmpty(y)) {
    return [];
  }
  return deepEqual(x, y, { fuzzy: true });
}

engine.equal = function (a: any[], b: any[]): boolean | any[] {
  return equality(a, b);
};

engine.unequal = function (a: any[], b: any[]): boolean | any[] | undefined {
  const eq = equality(a, b);
  return eq === undefined ? undefined : !eq;
};

// Backward compatibility aliases (for compatibility with original JS version)
engine.equival = function (a: any[], b: any[]): boolean | any[] {
  return equivalence(a, b);
};

engine.unequival = function (a, b) {
  return !equivalence(a, b);
};

/**
 * Checks that the types of a and b are suitable for comparison in an
 * inequality expression.
 * @param a - the left side of the inequality expression (which should be an array of one value)
 * @param b - the right side of the inequality expression (which should be an array of one value)
 * @returns the singleton values of the arrays a, and b. If one was an FP_Type
 *  and the other was convertible, the converted value will be returned.
 */
function typecheck(a: any[], b: any[]): [any, any] {
  util.assertOnlyOne(a, "Singleton was expected");
  util.assertOnlyOne(b, "Singleton was expected");
  let a0 = util.valDataConverted(a[0]);
  let b0 = util.valDataConverted(b[0]);
  if (a0 != null && b0 != null) {
    // FP_Date, FP_Instant are extended from FP_DateTime and can be compared
    // in some cases. BigInt can be compared to Number.
    const lClass = getClassForComparison(a0);
    const rClass = getClassForComparison(b0);
    if (lClass !== rClass) {
      util.raiseError('Type of "' + a0 + '" (' + lClass.name + ') did not match type of "' +
        b0 + '" (' + rClass.name + ')', 'InequalityExpression');
    }
  }
  return [a0, b0];
}

/**
 * Determines the class of an object for comparison purposes. Should return
 * the same value for objects that can be compared.
 * @param obj - The object to evaluate
 * @returns The constructor or class of the object:
 *   - Returns `FP_DateTime` if the object is an instance of `FP_DateTime`.
 *   - Returns `Number` if the object is of type `bigint`.
 *   - Otherwise, returns the object's constructor.
 */
function getClassForComparison(obj: any): Function {
  return obj instanceof FP_DateTime ? FP_DateTime
    : typeof obj === 'bigint' ? Number : obj.constructor;
}

engine.lt = function (a: any[], b: any[]): boolean | any[] {
  const [a0, b0] = typecheck(a, b);
  if (a0 == null || b0 == null) {
    return [];
  }
  if (a0 instanceof FP_Type) {
    const compare = a0.compare(b0);
    return compare === null ? [] : compare < 0;
  }
  return a0 < b0;
};

engine.gt = function (a: any[], b: any[]): boolean | any[] {
  const [a0, b0] = typecheck(a, b);
  if (a0 == null || b0 == null) {
    return [];
  }
  if (a0 instanceof FP_Type) {
    const compare = a0.compare(b0);
    return compare === null ? [] : compare > 0;
  }
  return a0 > b0;
};

engine.lte = function (a: any[], b: any[]): boolean | any[] {
  const [a0, b0] = typecheck(a, b);
  if (a0 == null || b0 == null) {
    return [];
  }
  if (a0 instanceof FP_Type) {
    const compare = a0.compare(b0);
    return compare === null ? [] : compare <= 0;
  }
  return a0 <= b0;
};

engine.gte = function (a: any[], b: any[]): boolean | any[] {
  const [a0, b0] = typecheck(a, b);
  if (a0 == null || b0 == null) {
    return [];
  }
  if (a0 instanceof FP_Type) {
    const compare = a0.compare(b0);
    return compare === null ? [] : compare >= 0;
  }
  return a0 >= b0;
};

export default engine;
