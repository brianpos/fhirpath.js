// Contains the FHIRPath Aggregate functions.
// (Section 7 of the FHIRPath 2.0.0 (N1) specification).

import equalityEngine from './equality';
import mathEngine from './math';
import util from './utilities';

/**
 * Aggregate operations engine interface
 */
export interface AggregateEngine {
  aggregateMacro: (data: any[], expr: Function, initialValue: any) => any | Promise<any>;
  countFn: (x: any[]) => number;
  sumFn: (data: any[]) => any;
  minFn: (data: any[]) => any[];
  maxFn: (data: any[]) => any[];
  avgFn: (data: any[]) => any[];
}

const engine: AggregateEngine = {} as AggregateEngine;

/**
 * Implements the FHIRPath 'aggregate' macro
 * Reduces a collection using the provided expression and initial value
 * @param data - collection to aggregate
 * @param expr - aggregation expression
 * @param initialValue - initial accumulator value
 * @returns aggregated result or Promise for async expressions
 */
engine.aggregateMacro = function (data: any[], expr: Function, initialValue: any): any | Promise<any> {
  return data.reduce((total: any, x: any, i: number) => {
    if (total instanceof Promise) {
      return total.then((t: any) => {
        (this as any).$index = i;
        (this as any).$total = t;
        return (this as any).$total = expr(x);
      });
    } else {
      (this as any).$index = i;
      return (this as any).$total = expr(x);
    }
  }, (this as any).$total = initialValue);
};

/**
 * Implements the FHIRPath 'count' function
 * Returns the number of items in the collection
 * @param x - collection to count
 * @returns number of items
 */
engine.countFn = function (x: any[]): number {
  if (x && x.length) {
    return x.length;
  } else {
    return 0;
  }
};

/**
 * Implements the FHIRPath 'sum' function
 * Shortcut for "value.tail().aggregate($this+$total, value.first())"
 * @param data - collection to sum
 * @returns sum of all items
 */
engine.sumFn = function (data: any[]): any {
  return engine.aggregateMacro.apply(this, [data.slice(1), ($this: any) => {
    let x = util.arraify($this).filter((i: any) => util.valData(i) != null);
    let y = util.arraify((this as any).$total).filter((i: any) => util.valData(i) != null);
    if (x.length === 0 || y.length === 0) {
      return [];
    }
    return mathEngine.plus(x, y);
  }, data[0]]);
};

/**
 * Shortcut template for min and max functions
 * Template for "[source collection].aggregate(iif($total.empty(), $this, iif($this [operator] $total, $this, $total)))"
 * @param data - source collection
 * @param fn - comparison function
 * @returns minimum or maximum value
 */
function minMaxShortcutTemplate(data: any[], fn: (a: any[], b: any[]) => boolean | any[]): any[] {
  let $total: any[];
  if (data.length === 0 || util.valData(data[0]) == null) {
    $total = [];
  } else {
    $total = [data[0]];
    for (let i = 1; i < data.length; i++) {
      if (util.valData(data[i]) == null) {
        $total = [];
        break;
      }
      const $this = [data[i]];
      const comparison = fn($this, $total);
      $total = util.isTrue(comparison) ? $this : $total;
    }
  }
  return $total;
}

/**
 * Implements the FHIRPath 'min' function
 * Shortcut for "value.aggregate(iif($total.empty(), $this, iif($this < $total, $this, $total)))"
 * @param data - collection to find minimum from
 * @returns minimum value
 */
engine.minFn = function (data: any[]): any[] {
  return minMaxShortcutTemplate(data, equalityEngine.lt);
};

/**
 * Implements the FHIRPath 'max' function
 * Shortcut for "value.aggregate(iif($total.empty(), $this, iif($this > $total, $this, $total)))"
 * @param data - collection to find maximum from
 * @returns maximum value
 */
engine.maxFn = function (data: any[]): any[] {
  return minMaxShortcutTemplate(data, equalityEngine.gt);
};

/**
 * Implements the FHIRPath 'avg' function
 * Shortcut for "value.sum()/value.count()"
 * @param data - collection to average
 * @returns average value
 */
engine.avgFn = function (data: any[]): any[] {
  const x = util.arraify(engine.sumFn(data));
  const y = util.arraify(engine.countFn(data));
  if (x.length === 0 || y.length === 0) {
    return [];
  }
  return mathEngine.div(x, y);
};

export default engine;
