/**
 * Filtering functions for FHIRPath.js
 * Contains the FHIRPath Filtering and Projection functions (Section 5.2 of the FHIRPath 1.0.0 specification).
 */

import { deepEqual, maxCollSizeForDeepEqual } from './deep-equal';
import hashObject from './hash-object';
import { ResourceNode, TypeInfo } from './types';
import util from './utilities';

/**
 * State object for repeat macro operations
 */
interface RepeatState {
  res: any[];
  unique: Record<string, boolean>;
  hasPrimitive: boolean;
}

/**
 * Filtering functions engine interface
 */
export interface FilteringEngine {
  whereMacro: (parentData: any, expr: Function) => any[] | Promise<any[]>;
  extension: (parentData: any, url: string) => any[] | Promise<any[]>;
  selectMacro: (data: any, expr: Function) => any[] | Promise<any[]>;
  repeatMacro: (parentData: any, expr: Function, state?: RepeatState) => any[] | Promise<any[]>;
  singleFn: (x: any[]) => any[];
  firstFn: (x: any[]) => any;
  lastFn: (x: any[]) => any;
  tailFn: (x: any[]) => any[];
  takeFn: (x: any[], n: number) => any[];
  skipFn: (x: any[], num: number) => any[];
  ofTypeFn: (coll: any[], typeInfo: any) => any[];
  distinctFn: (x: any[], hasPrimitive?: boolean) => any[];
}

const engine: FilteringEngine = {} as FilteringEngine;

/**
 * Implements the FHIRPath 'where' macro
 * @param parentData - collection to filter
 * @param expr - filter expression
 * @returns filtered collection or Promise
 */
engine.whereMacro = function (parentData: any, expr: Function): any[] | Promise<any[]> {
  if (parentData !== false && !parentData) {
    return [];
  }

  // Handle boolean parentData case  
  if (typeof parentData === 'boolean') {
    return parentData ? [true] : [];
  }

  // Ensure parentData is array-like for map operation
  const dataArray = Array.isArray(parentData) ? parentData : [parentData];

  return util.flatten(dataArray.map((x: any, i: number) => {
    (this as any).$index = i;
    const condition = expr(x);
    if (condition instanceof Promise) {
      return condition.then((c: any[]) => c[0] ? x : []);
    }
    return condition[0] ? x : [];
  }));
};

/**
 * Implements the FHIRPath 'extension' function
 * @param parentData - collection to search for extensions
 * @param url - extension URL to match
 * @returns matching extensions
 */
engine.extension = function (parentData: any, url: string): any[] | Promise<any[]> {
  const ctx = this;
  if (parentData !== false && !parentData || !url) {
    return [];
  }

  // Ensure parentData is array-like for map operation
  const dataArray = Array.isArray(parentData) ? parentData : [parentData];

  return util.flatten(dataArray.map((x: any, i: number) => {
    (this as any).$index = i;
    const extensions = (x && (x.data && x.data.extension || x._data && x._data.extension));
    if (extensions) {
      return extensions.reduce((list: any[], extension: any, index: number) => {
        if (extension.url === url) {
          list.push(ResourceNode.makeResNode(extension, x, 'Extension', null,
            'Extension', (ctx as any).model, 'extension', index));
        }
        return list;
      }, []);
    }
    return [];
  }));
};

/**
 * Implements the FHIRPath 'select' macro
 * @param data - collection to project
 * @param expr - projection expression
 * @returns projected collection
 */
engine.selectMacro = function (data: any, expr: Function): any[] | Promise<any[]> {
  if (data !== false && !data) {
    return [];
  }

  // Ensure data is array-like for map operation
  const dataArray = Array.isArray(data) ? data : [data];

  return util.flatten(dataArray.map((x: any, i: number) => {
    (this as any).$index = i;
    return expr(x);
  }));
};

/**
 * Implements the FHIRPath 'repeat' macro
 * @param parentData - collection to iterate over
 * @param expr - expression to repeat
 * @param state - current state object
 * @returns repeated collection or Promise
 */
engine.repeatMacro = function (
  parentData: any,
  expr: Function,
  state: RepeatState = { res: [], unique: {}, hasPrimitive: false }
): any[] | Promise<any[]> {
  if (parentData !== false && !parentData) {
    return [];
  }

  // Ensure parentData is array-like for map operation
  const dataArray = Array.isArray(parentData) ? parentData : [parentData];

  let newItems = [].concat(...dataArray.map((i: any) => expr(i)));
  if (newItems.some((i: any) => i instanceof Promise)) {
    return Promise.all(newItems).then((items: any[]) => {
      items = [].concat(...items);
      if (items.length) {
        return engine.repeatMacro(getNewItems(items, state), expr, state);
      }
      return state.res;
    });
  } else if (newItems.length) {
    return engine.repeatMacro(getNewItems(newItems, state), expr, state);
  } else {
    return state.res;
  }
};

/**
 * Returns new items from the input array that are not in the hash of existing
 * unique items and adds them to the result array.
 * @param items - input array
 * @param state - current state object
 * @returns new unique items
 */
function getNewItems(items: any[], state: RepeatState): any[] {
  let newItems: any[];
  state.hasPrimitive = state.hasPrimitive || items.some((i: any) => TypeInfo.isPrimitiveValue(i));
  if (!state.hasPrimitive && items.length + state.res.length > maxCollSizeForDeepEqual) {
    newItems = items.filter((item: any) => {
      const key = hashObject(item);
      const isUnique = !state.unique[key];
      if (isUnique) {
        state.unique[key] = true;
      }
      return isUnique;
    });
    state.res.push.apply(state.res, newItems);
  } else {
    newItems = items.filter((item: any) => {
      const isUnique = !state.res.some((i: any) => deepEqual(i, item));
      if (isUnique) {
        state.res.push(item);
      }
      return isUnique;
    });
  }
  return newItems;
}

/**
 * Implements the FHIRPath 'single' function
 * @param x - collection to check
 * @returns single item or throws error
 */
engine.singleFn = function (x: any[]): any[] {
  if (x.length === 1) {
    return x;
  } else if (x.length === 0) {
    return [];
  } else {
    throw new Error("Expected single");
  }
};

/**
 * Implements the FHIRPath 'first' function
 * @param x - collection
 * @returns first item
 */
engine.firstFn = function (x: any[]): any {
  return x[0];
};

/**
 * Implements the FHIRPath 'last' function
 * @param x - collection
 * @returns last item
 */
engine.lastFn = function (x: any[]): any {
  return x[x.length - 1];
};

/**
 * Implements the FHIRPath 'tail' function
 * @param x - collection
 * @returns all items except first
 */
engine.tailFn = function (x: any[]): any[] {
  return x.slice(1, x.length);
};

/**
 * Implements the FHIRPath 'take' function
 * @param x - collection
 * @param n - number of items to take
 * @returns first n items
 */
engine.takeFn = function (x: any[], n: number): any[] {
  return x.slice(0, n);
};

/**
 * Implements the FHIRPath 'skip' function
 * @param x - collection
 * @param num - number of items to skip
 * @returns remaining items after skipping
 */
engine.skipFn = function (x: any[], num: number): any[] {
  return x.slice(num, x.length);
};

/**
 * Implements the FHIRPath 'ofType' function
 * @param coll - collection to filter
 * @param typeInfo - type to filter by
 * @returns items of the specified type
 */
engine.ofTypeFn = function (coll: any[], typeInfo: any): any[] {
  const ctx = this;
  return coll.filter((value: any) => {
    return TypeInfo.fromValue(value).isConvertibleTo(typeInfo, (ctx as any).model);
  });
};

/**
 * Implements the FHIRPath 'distinct' function
 * @param x - collection to make distinct
 * @param hasPrimitive - optional flag indicating if collection has primitives
 * @returns collection with unique items
 */
engine.distinctFn = function (x: any[], hasPrimitive?: boolean): any[] {
  let unique: any[] = [];
  if (x.length > 0) {
    hasPrimitive = hasPrimitive ?? x.some((i: any) => TypeInfo.isPrimitiveValue(i));
    if (!hasPrimitive && x.length > maxCollSizeForDeepEqual) {
      // When we have more than maxCollSizeForDeepEqual items in input collection,
      // we use a hash table (on JSON strings) for efficiency.
      let uniqueHash: Record<string, boolean> = {};
      for (let i = 0, len = x.length; i < len; ++i) {
        let xObj = x[i];
        let xStr = hashObject(xObj);
        if (!uniqueHash[xStr]) {
          unique.push(xObj);
          uniqueHash[xStr] = true;
        }
      }
    } else {
      // Otherwise, it is more efficient to perform a deep comparison.
      // Use reverse() + pop() instead of shift() to improve performance and
      // maintain order.
      let xCopy = x.concat().reverse();
      do {
        let xObj = xCopy.pop();
        unique.push(xObj);
        xCopy = xCopy.filter((o: any) => !deepEqual(xObj, o));
      } while (xCopy.length);
    }
  }
  return unique;
};

export default engine;
