// This file holds code to handle the FHIRPath Collection functions.

import { deepEqual } from './deep-equal';
import util from './utilities';

/**
 * Collection operations engine interface
 */
export interface CollectionsEngine {
  contains: (a: any[], b: any[]) => boolean | any[];
  in: (a: any[], b: any[]) => boolean | any[];
}

const engine: CollectionsEngine = {} as CollectionsEngine;

/**
 * Implementation helper for contains/in operations
 * Tests whether b[0] is in collection a using deep equality
 * @param a - collection to search in
 * @param b - collection containing single element to find
 * @returns true if b[0] found in a, false otherwise
 */
function containsImpl(a: any[], b: any[]): boolean {
  for (let i = 0; i < a.length; i++) {
    if (deepEqual(a[i], b[0])) {
      return true;
    }
  }
  return false;
}

/**
 * Implements the FHIRPath 'contains' operator
 * Tests whether the left collection contains the right singleton value
 * @param a - left collection to search in
 * @param b - right collection (must be singleton)
 * @returns boolean result or empty array for empty right operand
 * @throws Error if right operand is not singleton
 */
engine.contains = function (a: any[], b: any[]): boolean | any[] {
  if (b.length === 0) {
    return [];
  }
  if (a.length === 0) {
    return false;
  }
  if (b.length > 1) {
    throw new Error("Expected singleton on right side of contains, got " + util.toJSON(b));
  }
  return containsImpl(a, b);
};

/**
 * Implements the FHIRPath 'in' operator
 * Tests whether the left singleton value is in the right collection
 * @param a - left collection (must be singleton)
 * @param b - right collection to search in
 * @returns boolean result or empty array for empty left operand
 * @throws Error if left operand is not singleton
 */
engine.in = function (a: any[], b: any[]): boolean | any[] {
  if (a.length === 0) {
    return [];
  }
  if (b.length === 0) {
    return false;
  }
  if (a.length > 1) {
    throw new Error("Expected singleton on right side of in, got " + util.toJSON(a));
  }
  return containsImpl(b, a);
};

export default engine;
