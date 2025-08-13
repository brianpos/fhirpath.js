/**
 * Navigation functions for FHIRPath.js
 * This file contains functions for navigating through FHIR resource structures.
 */

import { ResourceNode } from './types';
import util from './utilities';
// Cannot use util.hasOwnProperty directly because it triggers the error:
// "Do not access Object.prototype method 'hasOwnProperty' from target object"
const { hasOwnProperty } = util;

/**
 * Navigation engine interface
 */
export interface NavigationEngine {
  children: (coll: any[]) => any[];
  descendants: (coll: any[]) => any[];
}

const engine: NavigationEngine = {} as NavigationEngine;

/**
 * Implements the FHIRPath 'children' function
 * Returns immediate child nodes of the given collection
 * @param coll - collection of ResourceNode objects to get children from
 * @returns array of child ResourceNode objects
 */
engine.children = function (coll: any[]): any[] {
  let model = (this as any).model; // "this" is the context object
  return coll.reduce(function (acc: any[], x: any) {
    if (!(x instanceof ResourceNode)) {
      return acc;
    }
    if (typeof x.data === 'object' && x.data != null) {
      for (let prop in x.data) {
        if (prop.startsWith('_')) {
          const propWithoutUnderscore = prop.slice(1);
          if (!hasOwnProperty(x.data, propWithoutUnderscore)) {
            // If there is only a property that starts with an underscore
            // (e.g. _name = {id: 'someId'} is present but "name" is missing).
            // We have to create a node using the property name without
            // the underscore (e.g. "name") because accessing values doesn't use
            // the underscore anyway (e.g. name.id = 'someId').
            // ResourceNode has properties "data" and "_data" to store
            // un-underscored and underscored values.
            util.pushFn(acc, util.makeChildResNodes(x,
              propWithoutUnderscore, model));
          }
        } else if (prop !== 'resourceType') {
          util.pushFn(acc, util.makeChildResNodes(x, prop, model));
        }
      }
    }
    else if (typeof x._data === 'object' && x._data != null) {
      for (let prop in x._data) {
        util.pushFn(acc, util.makeChildResNodes(x, prop, model));
      }
    }
    return acc;
  }, []);
};

/**
 * Implements the FHIRPath 'descendants' function
 * Returns all descendant nodes (children, grandchildren, etc.) of the given collection
 * @param coll - collection of ResourceNode objects to get descendants from
 * @returns array of all descendant ResourceNode objects
 */
engine.descendants = function (coll: any[]): any[] {
  let ch = engine.children.call(this, coll); // "this" is the context object
  let res: any[] = [];
  while (ch.length > 0) {
    util.pushFn(res, ch);
    ch = engine.children.call(this, ch);
  }
  return res;
};

export default engine;
