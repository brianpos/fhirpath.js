/**
 * Logic functions for FHIRPath.js
 * This file holds code to handle the FHIRPath Logic functions.
 */

/**
 * Logic functions engine interface
 */
export interface LogicEngine {
    orOp: (a: any, b: any) => boolean | any[];
    andOp: (a: any, b: any) => boolean | any[];
    xorOp: (a: any, b: any) => boolean | any[];
    impliesOp: (a: any, b: any) => boolean | any[];
}

const engine: LogicEngine = {} as LogicEngine;

/**
 * Implements the FHIRPath 'or' operator
 * @param a - first operand
 * @param b - second operand
 * @returns boolean result or empty array
 */
engine.orOp = function (a: any, b: any): boolean | any[] {
  if (Array.isArray(b)) {
    if (a === true) {
      return true;
    } else if (a === false) {
      return [];
    } else if (Array.isArray(a)) {
      return [];
    }
  }
  if (Array.isArray(a)) {
    if (b === true) {
      return true;
    } else {
      return [];
    }
  }
  return a || b;
};

/**
 * Implements the FHIRPath 'and' operator
 * @param a - first operand
 * @param b - second operand
 * @returns boolean result or empty array
 */
engine.andOp = function (a: any, b: any): boolean | any[] {
  if (Array.isArray(b)) {
    if (a === true) {
      return [];
    } else if (a === false) {
      return false;
    } else if (Array.isArray(a)) {
      return [];
    }
  }
  if (Array.isArray(a)) {
    if (b === true) {
      return [];
    } else {
      return false;
    }
  }
  return a && b;
};

/**
 * Implements the FHIRPath 'xor' operator
 * @param a - first operand
 * @param b - second operand
 * @returns boolean result or empty array
 */
engine.xorOp = function (a: any, b: any): boolean | any[] {
  // If a or b are arrays, they must be the empty set.
  // In that case, the result is always the empty set.
  if (Array.isArray(a) || Array.isArray(b))
    return [];
  return (a && !b) || (!a && b);
};

/**
 * Implements the FHIRPath 'implies' operator
 * @param a - first operand
 * @param b - second operand
 * @returns boolean result or empty array
 */
engine.impliesOp = function (a: any, b: any): boolean | any[] {
  if (Array.isArray(b)) {
    if (a === true) {
      return [];
    } else if (a === false) {
      return true;
    } else if (Array.isArray(a)) {
      return [];
    }
  }
  if (Array.isArray(a)) {
    if (b === true) {
      return true;
    } else {
      return [];
    }
  }
  if (a === false) {
    return true;
  }
  return (a && b);
};

export default engine;
