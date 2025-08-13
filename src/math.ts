/**
 * Math functions for FHIRPath.js
 * This file holds code to handle the FHIRPath Math functions.
 */

import { FP_Quantity, FP_Type } from './types';

import util from './utilities';

// Type definitions for function engine
export interface MathEngine {
  amp: (x: any, y: any) => string;
  plus: (xs: any[], ys: any[]) => any;
  minus: (xs: any[], ys: any[]) => any;
  mul: (xs: any[], ys: any[]) => any;
  div: (xs: any[], ys: any[]) => any;
  intdiv: (x: number | bigint, y: number | bigint) => number | bigint | any[];
  mod: (x: number | bigint, y: number | bigint) => number | bigint | any[];
  abs: (x: any[]) => any;
  ceiling: (x: any[]) => any;
  exp: (x: any[]) => any;
  floor: (x: any[]) => any;
  ln: (x: any[]) => any;
  log: (x: any[], base: number) => any;
  power: (x: any[], exponent: number) => any;
  round: (x: any[], precision?: number) => any;
  sqrt: (x: any[]) => any;
  truncate: (x: any[]) => any;
}

// Type-safe function signature for numeric singletons
export type NumericFunction = (num: number) => number | any[];


/**
 * Math functions engine
 */
const engine: MathEngine = {} as MathEngine;

/**
 * Checks if input collection is a number singleton and runs the passed function.
 * @param x - input collection
 * @param fn - math function
 * @throws Error
 * @returns number or empty array
 */
function callFnForNumericSingleton(x: any[], fn: NumericFunction): any {
  let res: any;
  if (isEmpty(x)) {
    res = [];
  } else if (x.length !== 1) {
    throw new Error("Unexpected collection" + util.toJSON(x) +
      "; expected singleton of type number");
  } else {
    const num = util.valData(x[0]);
    if (num == null) {
      res = [];
    } else if (typeof num === 'number') {
      res = fn(num);
    } else {
      throw new Error("Expected number, but got " + util.toJSON(num));
    }
  }
  return res;
}

function isEmpty(x: any): boolean {
  if (typeof (x) === 'number') {
    return false;
  }
  return x.length === 0;
}

engine.amp = function (x: any, y: any): string {
  return (x || "") + (y || "");
};

// HACK: for only polymorphic function
// Actually, "minus" is now also polymorphic
engine.plus = function (xs: any[], ys: any[]): any {
  let res: any;
  if (xs.length === 1 && ys.length === 1) {
    const x = util.valDataConverted(xs[0]);
    const y = util.valDataConverted(ys[0]);
    // In the future, this and other functions might need to return ResourceNode
    // to preserve the type information (integer vs decimal, and maybe decimal
    // vs string if decimals are represented as strings), in order to support
    // "as" and "is", but that support is deferred for now.
    if (x == null || y == null) {
      res = [];
    } else if (typeof x === "string" && typeof y === "string") {
      res = x + y;
    } else if (typeof x === "number") {
      if (typeof y === "number") {
        res = x + y;
      } else if (typeof y === "bigint") {
        if (Number.isInteger(x)) {
          return BigInt(x) + y;
        } else {
          return x + Number(y);
        }
      } else if (y instanceof FP_Quantity) {
        res = (new FP_Quantity(x, "'1'")).plus(y);
      }
    } else if (typeof x === "bigint") {
      if (typeof y === "bigint") {
        res = x + y;
      } else if (typeof y === "number") {
        if (Number.isInteger(y)) {
          res = x + BigInt(y);
        } else {
          res = Number(x) + y;
        }
      } else if (y instanceof FP_Quantity) {
        throw util.raiseError("Cannot add a Quantity to a BigInt");
      }
    } else if (x instanceof FP_Type) {
      if (y instanceof FP_Quantity) {
        res = x.plus(y);
      } else if (y instanceof FP_Type) {
        res = y.plus(x);
      } else if (typeof y === "number") {
        res = x.plus(new FP_Quantity(y, "'1'"));
      }
    }
  }
  if (res === undefined) {
    throw util.raiseError("Cannot " + util.toJSON(xs) + " + " + util.toJSON(ys));
  }
  return res;
};

engine.minus = function (xs: any[], ys: any[]): any {
  if (xs.length === 1 && ys.length === 1) {
    const x = util.valDataConverted(xs[0]);
    const y = util.valDataConverted(ys[0]);
    if (x == null || y == null) {
      return [];
    }
    if (typeof x === "number") {
      if (typeof y === "number") {
        return x - y;
      } else if (typeof y === "bigint") {
        if (Number.isInteger(x)) {
          return BigInt(x) - y;
        } else {
          return x - Number(y);
        }
      }
      if (y instanceof FP_Quantity) {
        return (new FP_Quantity(x, "'1'")).plus(new FP_Quantity(-y.value, y.unit));
      }
    } else if (typeof x === "bigint") {
      if (typeof y === "bigint") {
        return x - y;
      } else if (typeof y === "number") {
        if (Number.isInteger(y)) {
          return x - BigInt(y);
        } else {
          return Number(x) - y;
        }
      } else if (y instanceof FP_Quantity) {
        util.raiseError("Cannot subtract a Quantity from a BigInt");
      }
    } else if (x instanceof FP_Type) {
      if (y instanceof FP_Quantity) {
        return x.plus(new FP_Quantity(-y.value, y.unit));
      }
      if (typeof y === "number") {
        return x.plus(new FP_Quantity(-y, "'1'"));
      }
    }
  }
  throw new Error("Cannot " + util.toJSON(xs) + " - " + util.toJSON(ys));
};

engine.mul = function (xs: any[], ys: any[]): any {
  if (xs.length === 1 && ys.length === 1) {
    const x = util.valDataConverted(xs[0]);
    const y = util.valDataConverted(ys[0]);
    if (x == null || y == null) {
      return [];
    }
    if (typeof x === 'bigint') {
      if (typeof y === 'bigint') {
        return x * y;
      }
      if (typeof y === "number") {
        if (Number.isInteger(y)) {
          return x * BigInt(y);
        } else {
          return Number(x) * y;
        }
      }
      if (y instanceof FP_Quantity) {
        util.raiseError("Cannot multiply bigint by Quantity");
      }
    }
    if (typeof x === "number") {
      if (typeof y === "number") {
        return x * y;
      }
      if (typeof y === 'bigint') {
        if (Number.isInteger(x)) {
          return BigInt(x) * y;
        } else {
          return x * Number(y);
        }
      }
      if (y instanceof FP_Quantity) {
        return (new FP_Quantity(x, "'1'")).mul(y);
      }
    }

    if (x instanceof FP_Type) {
      if (y instanceof FP_Quantity) {
        return x.mul(y);
      }
      if (typeof y === 'number') {
        return x.mul(new FP_Quantity(y, "'1'"));
      }
    }
  }

  util.raiseError("Cannot " + util.toJSON(xs) + " * " + util.toJSON(ys));
};

engine.div = function (xs: any[], ys: any[]): any {
  if (xs.length === 1 && ys.length === 1) {
    const x = util.valDataConverted(xs[0]);
    const y = util.valDataConverted(ys[0]);
    if (x == null || y == null) {
      return [];
    }
    if (typeof x === 'bigint') {
      if (typeof y === 'bigint') {
        if (y === 0n) return [];
        return Number(x) / Number(y);
      }
      if (typeof y === "number") {
        if (y === 0) return [];
        return Number(x) / y;
      }
      if (y instanceof FP_Quantity) {
        util.raiseError("Cannot divide bigint by Quantity");
      }
    }
    if (typeof x === "number") {
      if (typeof y === "number") {
        if (y === 0) return [];
        return x / y;
      }
      if (typeof y === 'bigint') {
        if (y === 0n) return [];
        return x / Number(y);
      }
      if (y instanceof FP_Quantity) {
        return (new FP_Quantity(x, "'1'")).div(y);
      }
    }

    if (x instanceof FP_Type) {
      if (y instanceof FP_Quantity) {
        return x.div(y);
      }
      if (typeof y === "number") {
        return x.div(new FP_Quantity(y, "'1'"));
      }
    }
  }
  throw new Error("Cannot " + util.toJSON(xs) + " / " + util.toJSON(ys));
};

engine.intdiv = function (x: number | bigint, y: number | bigint): number | bigint | any[] {
  if (y === 0 || y === 0n) return [];
  if (typeof x === 'bigint') {
    if (typeof y === 'bigint') {
      return x / y;
    }
    if (typeof y === "number") {
      return Math.floor(Number(x) / y);
    }
  } else if (typeof x === "number") {
    if (typeof y === "number") {
      return Math.floor(x / y);
    }
    if (typeof y === 'bigint') {
      return Math.floor(x / Number(y));
    }
  }
  return [];
};

engine.mod = function (x: number | bigint, y: number | bigint): number | bigint | any[] {
  if (y === 0) return [];
  if (typeof x === 'bigint') {
    if (typeof y === 'bigint') {
      return x % y;
    }
    if (typeof y === "number") {
      return Number(x) % y;
    }
  } else if (typeof x === "number") {
    if (typeof y === "number") {
      return x % y;
    }
    if (typeof y === 'bigint') {
      return x % Number(y);
    }
  }
  return [];
};

engine.abs = function (x: any[]): any {
  let res: any;

  if (isEmpty(x)) {
    res = [];
  } else if (x.length !== 1) {
    throw new Error("Unexpected collection" + util.toJSON(x) +
      "; expected singleton of type number or Quantity");
  } else {
    const val = util.valData(x[0]);
    if (val == null) {
      res = [];
    } else if (typeof val === 'number') {
      res = Math.abs(val);
    } else if (val instanceof FP_Quantity) {
      res = new FP_Quantity(Math.abs(val.value), val.unit);
    } else {
      throw new Error("Expected number or Quantity, but got " + util.toJSON(val || x));
    }
  }

  return res;
};

engine.ceiling = function (x: any[]): any {
  return callFnForNumericSingleton(x, Math.ceil);
};

engine.exp = function (x: any[]): any {
  return callFnForNumericSingleton(x, Math.exp);
};

engine.floor = function (x: any[]): any {
  return callFnForNumericSingleton(x, Math.floor);
};

engine.ln = function (x: any[]): any {
  return callFnForNumericSingleton(x, Math.log);
};

engine.log = function (x: any[], base: number): any {
  return callFnForNumericSingleton(x, (num: number) => {
    return (Math.log(num) / Math.log(base));
  });
};

engine.power = function (x: any[], exponent: number): any {
  return callFnForNumericSingleton(x, (num: number) => {
    const res = Math.pow(num, exponent);
    return isNaN(res) ? [] : res;
  });
};

/**
 * Implements the "round" function documented at
 * https://hl7.org/fhirpath/#roundprecision-integer-decimal
 * @param x - input collection
 * @param precision - determines what decimal place to round to
 * @returns rounded number
 */
engine.round = function (x: any[], precision?: number): any {
  return callFnForNumericSingleton(x, (num: number) => {
    if (precision === undefined) {
      return (Math.round(num));
    } else {
      const degree = Math.pow(10, precision);
      return (Math.round(num * degree) / degree);
    }
  });
};

engine.sqrt = function (x: any[]): any {
  return callFnForNumericSingleton(x, (num: number) => {
    if (num < 0) {
      return [];
    } else {
      return Math.sqrt(num);
    }
  });
};

engine.truncate = function (x: any[]): any {
  return callFnForNumericSingleton(x, Math.trunc);
};

export default engine;

// Re-export types for compatibility
export { FP_Quantity, FP_Type };

