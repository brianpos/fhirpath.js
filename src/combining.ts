/**
 * Combining functions for FHIRPath.js
 * This file holds code to handle the FHIRPath Combining functions.
 */

import { deepEqual, maxCollSizeForDeepEqual } from './deep-equal';
import filteringEngine from './filtering';
import hashObject from './hash-object';
import { TypeInfo } from './types';

/**
 * Combining functions engine interface
 */
export interface CombiningEngine {
  union: (coll1: any[], coll2: any[]) => any[];
  combineFn: (coll1: any[], coll2: any[]) => any[];
  intersect: (coll1: any[], coll2: any[]) => any[];
  exclude: (coll1: any[], coll2: any[]) => any[];
}

const combineFns: CombiningEngine = {} as CombiningEngine;

/**
 * Implements the FHIRPath 'union' operator (|)
 * Returns the union of two collections (distinct elements from both)
 * @param coll1 - first collection
 * @param coll2 - second collection
 * @returns combined collection with distinct elements
 */
combineFns.union = function (coll1: any[], coll2: any[]): any[] {
  return filteringEngine.distinctFn(coll1.concat(coll2));
};

/**
 * Implements the FHIRPath 'combine' function
 * Returns the concatenation of two collections (may contain duplicates)
 * @param coll1 - first collection
 * @param coll2 - second collection
 * @returns concatenated collection
 */
combineFns.combineFn = function (coll1: any[], coll2: any[]): any[] {
  return coll1.concat(coll2);
};

/**
 * Implements the FHIRPath 'intersect' function
 * Returns elements that appear in both collections
 * @param coll1 - first collection
 * @param coll2 - second collection
 * @returns intersection of the two collections
 */
combineFns.intersect = function (coll1: any[], coll2: any[]): any[] {
  let result: any[] = [];
  const coll1Length = coll1.length;
  let uncheckedLength = coll2.length;

  if (coll1Length && uncheckedLength) {
    const hasPrimitive = coll1.some((i: any) => TypeInfo.isPrimitiveValue(i)) ||
      coll2.some((i: any) => TypeInfo.isPrimitiveValue(i));
    if (!hasPrimitive && coll1Length + uncheckedLength > maxCollSizeForDeepEqual) {
      // When we have more than maxCollSizeForDeepEqual items in input collections,
      // we use a hash table (on JSON strings) for efficiency.
      let coll2hash: Record<string, boolean> = {};
      coll2.forEach((item: any) => {
        const hash = hashObject(item);
        if (coll2hash[hash]) {
          uncheckedLength--;
        } else {
          coll2hash[hash] = true;
        }
      });

      for (let i = 0; i < coll1Length && uncheckedLength > 0; ++i) {
        let item = coll1[i];
        let hash = hashObject(item);
        if (coll2hash[hash]) {
          result.push(item);
          coll2hash[hash] = false;
          uncheckedLength--;
        }
      }
    } else {
      // Otherwise, it is more efficient to perform a deep comparison.
      result = filteringEngine.distinctFn(coll1, hasPrimitive).filter(
        (obj1: any) => coll2.some((obj2: any) => deepEqual(obj1, obj2))
      );
    }
  }

  return result;
};

/**
 * Implements the FHIRPath 'exclude' function
 * Returns elements from the first collection that are not in the second
 * @param coll1 - collection to filter
 * @param coll2 - collection of elements to exclude
 * @returns filtered collection
 */
combineFns.exclude = function (coll1: any[], coll2: any[]): any[] {
  let result: any[] = [];

  const coll1Length = coll1.length;
  const coll2Length = coll2.length;

  if (!coll2Length) {
    return coll1;
  }
  if (coll1Length) {
    const hasPrimitive = coll1.some((i: any) => TypeInfo.isPrimitiveValue(i)) ||
      coll2.some((i: any) => TypeInfo.isPrimitiveValue(i));

    if (!hasPrimitive && coll1Length + coll2Length > maxCollSizeForDeepEqual) {
      // When we have more than maxCollSizeForDeepEqual items in input collections,
      // we use a hash table (on JSON strings) for efficiency.
      let coll2hash: Record<string, boolean> = {};
      coll2.forEach((item: any) => {
        const hash = hashObject(item);
        coll2hash[hash] = true;
      });

      result = coll1.filter((item: any) => !coll2hash[hashObject(item)]);
    } else {
      // Otherwise, it is more efficient to perform a deep comparison.
      result = coll1.filter((item: any) => {
        return !coll2.some((item2: any) => deepEqual(item, item2));
      });
    }
  }

  return result;
};

export default combineFns;
