/**
 * Utilities module for FHIRPath.js
 * This file holds utility functions used in implementing the public functions.
 */

// Using require for compatibility with existing JS modules during migration
import { ResourceNode, toJSON } from './types';

export interface UtilInterface {
  toJSON: (obj: any, space?: string | number) => string;
  raiseError: (message: string, fnName?: string) => never;
  assertOnlyOne: (collection: any[], errorMsgPrefix?: string) => void;
  assertType: (data: any, types: string[], errorMsgPrefix?: string) => any;
  isEmpty: (x: any) => boolean;
  isSome: (x: any) => boolean;
  isTrue: (x: any) => boolean;
  isCapitalized: (x: string) => boolean;
  capitalize: (x: string) => string;
  flatten: (x: any[]) => any[] | Promise<any[]>;
  arraify: (x: any) => any[];
  resolveAndArraify: (x: any | Promise<any>) => any[] | Promise<any[]>;
  valData: (val: any) => any;
  valDataConverted: (val: any) => any;
  escapeStringForRegExp: (str: string) => string;
  pushFn: (destArray: any[], sourceArray: any[]) => number;
  makeChildResNodes: (parentResNode: any, childProperty: string, model?: any) => any[];
  fetchWithCache: (url: string, options?: RequestInit) => Promise<any>;
  checkAllowAsync: (ctx: any, fnName: string) => void;
  hasOwnProperty: (obj: any, prop: string) => boolean;
}

const util: UtilInterface = {} as UtilInterface;

/**
 * Converts a value to a JSON string, handling BigInt values.
 * This function is useful for serializing objects that may contain BigInt values,
 * which are not natively supported by JSON.stringify.
 *
 * @param obj - The object to be converted to a JSON string.
 * @returns The JSON string representation of the object.
 */
util.toJSON = toJSON;

/**
 *  Reports and error to the calling environment and stops processing.
 * @param message the error message
 * @param fnName the name of the function raising the error (optional)
 */
util.raiseError = function (message: string, fnName?: string): never {
  fnName = fnName ? fnName + ": " : "";
  throw fnName + message;
};

/**
 *  Throws an exception if the collection contains not one value.
 * @param collection the collection to be checked.
 * @param errorMsgPrefix An optional prefix for the error message to assist in
 *  debugging.
 */
util.assertOnlyOne = function (collection: any[], errorMsgPrefix?: string): void {
  if (collection.length !== 1) {
    util.raiseError("Was expecting only one element but got " +
      util.toJSON(collection), errorMsgPrefix);
  }
};

/**
 *  Throws an exception if the data is not one of the expected types.
 * @param data the value to be checked.  This may be a ResourceNode.
 * @param types an array of the permitted types
 * @param errorMsgPrefix An optional prefix for the error message to assist in
 *  debugging.
 * @return the value that was checked.  If "data" was a ResourceNode, this will
 *  be the ResourceNode's data.
 */
util.assertType = function (data: any, types: string[], errorMsgPrefix?: string): any {
  const val = this.valData(data);
  if (types.indexOf(typeof val) < 0) {
    const typeList = types.length > 1 ? "one of " + types.join(", ") : types[0];
    util.raiseError("Found type '" + (typeof data) + "' but was expecting " +
      typeList, errorMsgPrefix);
  }
  return val;
};

util.isEmpty = function (x: any): boolean {
  return Array.isArray(x) && x.length === 0;
};

util.isSome = function (x: any): boolean {
  return x !== null && x !== undefined && !util.isEmpty(x);
};

util.isTrue = function (x: any): boolean {
  // We use util.valData because we can use a boolean node as a criterion
  return x !== null && x !== undefined && (x === true || (x.length === 1 && util.valData(x[0]) === true));
};

util.isCapitalized = function (x: string): boolean {
  return !!(x && (x[0] === x[0].toUpperCase()));
};

util.capitalize = function (x: string): string {
  return x[0].toUpperCase() + x.substring(1);
};

util.flatten = function (x: any[]): any[] | Promise<any[]> {
  if (x.some(i => i instanceof Promise)) {
    return Promise.all(x).then(arr => flattenSync(arr));
  }
  return flattenSync(x);
};

/**
 * Creates a shallow copy of the source array and replaces those elements of the
 * source array that are arrays with their contents.
 * For example:
 * [1, [2, 3]] -> [1, 2, 3]
 * @param x - source array
 * @return flattened array
 */
function flattenSync(x: any[]): any[] {
  return [].concat(...x);
}

util.arraify = function (x: any): any[] {
  if (Array.isArray(x)) { return x; }
  if (util.isSome(x)) { return [x]; }
  return [];
};

/**
 * If the input parameter is a promise, arraify the result of that promise,
 * otherwise arraify the input parameter.
 * @param x - input parameter
 * @return arraified result or promise of arraified result
 */
util.resolveAndArraify = function (x: any | Promise<any>): any[] | Promise<any[]> {
  return x instanceof Promise
    ? x.then(r => util.arraify(r))
    : util.arraify(x);
};

/**
 *  Returns the data value of the given parameter, which might be a ResourceNode.
 *  Otherwise, it returns the value that was passed in.
 */
util.valData = function (val: ResourceNode | any): any {
  return (val instanceof ResourceNode) ? val.data : val;
};

/**
 *  Returns the data value of the given parameter, which might be a ResourceNode.
 *  Otherwise, it returns the value that was passed in.  In the case of a
 *  ResourceNode that is a Quantity, the returned value will have been converted
 *  to an FP_Quantity.
 */
util.valDataConverted = function (val: ResourceNode | any): any {
  if (val instanceof ResourceNode) {
    val = val.convertData();
  }
  return val;
};

/**
 * Prepares a string for insertion into a regular expression
 * @param str
 * @return escaped string
 */
util.escapeStringForRegExp = function (str: string): string {
  return str.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&');
};

/**
 * Binding to the Array.prototype.push.apply function to define a function to
 * push the contents of the source array to the destination array.
 * @param destArray - destination array
 * @param sourceArray - source array
 * @returns the new length property of destArray
 */
util.pushFn = Function.prototype.apply.bind(Array.prototype.push);

/**
 * Creates child resource nodes for the specified resource node property.
 * @param parentResNode - resource node
 * @param childProperty - name of property
 * @param model - "model" data object
 * @return array of child resource nodes
 */
util.makeChildResNodes = function (parentResNode: any, childProperty: string, model?: any): any[] {
  let childPath = parentResNode.path + '.' + childProperty;

  if (model) {
    const defPath = model.pathsDefinedElsewhere[childPath];
    if (defPath)
      childPath = defPath;
  }
  let toAdd: any, _toAdd: any;
  const actualTypes = model && model.choiceTypePaths[childPath];
  if (actualTypes) {
    // Use actualTypes to find the field's value
    for (const t of actualTypes) {
      const field = childProperty + t;
      toAdd = parentResNode.data?.[field];
      _toAdd = parentResNode.data?.['_' + field];
      if (toAdd !== undefined || _toAdd !== undefined) {
        childPath += t;
        break;
      }
    }
  }
  else {
    toAdd = parentResNode.data?.[childProperty];
    _toAdd = parentResNode.data?.['_' + childProperty];
    if (toAdd === undefined && _toAdd === undefined) {
      toAdd = parentResNode._data[childProperty];
    }
    if (childProperty === 'extension') {
      childPath = 'Extension';
    }
  }

  let fhirNodeDataType = null;
  if (model) {
    fhirNodeDataType = model.path2Type[childPath];
    childPath = model.path2TypeWithoutElements[childPath] || childPath;
  }

  let result: any[];
  if (util.isSome(toAdd) || util.isSome(_toAdd)) {
    if (Array.isArray(toAdd)) {
      result = toAdd.map((x: any, i: number) =>
        ResourceNode.makeResNode(x, parentResNode, childPath,
          _toAdd && _toAdd[i], fhirNodeDataType, model, childProperty, i));
      // Add items to the end of the ResourceNode list that have no value
      // but have associated data, such as extensions or ids.
      const _toAddLength = _toAdd?.length || 0;
      for (let i = toAdd.length; i < _toAddLength; ++i) {
        result.push(ResourceNode.makeResNode(null, parentResNode, childPath,
          _toAdd[i], fhirNodeDataType, model, childProperty, i));
      }
    } else if (toAdd == null && Array.isArray(_toAdd)) {
      // Add items to the end of the ResourceNode list when there are no
      // values at all, but there is a list of associated data, such as
      // extensions or ids.
      result = _toAdd.map((x: any) => ResourceNode.makeResNode(null, parentResNode,
        childPath, x, fhirNodeDataType, model, childProperty));
    } else {
      result = [ResourceNode.makeResNode(toAdd, parentResNode, childPath,
        _toAdd, fhirNodeDataType, model, childProperty)];
    }
  } else {
    result = [];
  }
  return result;
};

// Object for storing fetch promises.
const requestCache: Record<string, { timestamp: number; promise: Promise<any> }> = {};
// Duration of data storage in cache.
const requestCacheStorageTime = 3600000; // 1 hour = 60 * 60 * 1000

const defaultPostHeaders = new Headers({
  'Accept': 'application/fhir+json; charset=utf-8',
  'Content-Type': 'application/fhir+json; charset=utf-8'
});
const defaultGetHeaders = new Headers({
  'Accept': 'application/fhir+json; charset=utf-8'
});

/**
 * fetch() wrapper for caching server responses.
 * @param url - a URL of the resource you want to fetch.
 * @param options - optional object containing any custom settings
 *  that you want to apply to the request.
 * @return Promise resolving to the fetched data
 */
util.fetchWithCache = function (url: string, options?: RequestInit): Promise<any> {
  const requestKey = [
    url, options ? util.toJSON(options) : ''
  ].join('|');

  // If the options object does not have headers, set default headers based on
  // the request method.
  if (!options?.headers) {
    const headers = options?.method === 'POST' ?
      defaultPostHeaders : defaultGetHeaders;
    options = {
      ...options,
      headers
    };
  }

  const timestamp = Date.now();
  for (const key in requestCache) {
    if (timestamp - requestCache[key].timestamp > requestCacheStorageTime) {
      // Remove responses older than an hour
      delete requestCache[key];
    }
  }

  if (!requestCache[requestKey]) {
    requestCache[requestKey] = {
      timestamp,
      // In Jest unit tests, a promise returned by 'fetch' is not an instance of
      // Promise that we have in our application context, so we use Promise.resolve
      // to do the conversion.
      promise: Promise.resolve(fetch(url, options))
        .then(r => {
          const contentType = r.headers.get('Content-Type') || '';
          const isJson = contentType.includes('application/json') ||
            contentType.includes('application/fhir+json');
          try {
            if (isJson) {
              return r.json().then((json: any) => r.ok ? json : Promise.reject(json));
            } else {
              return r.text().then((text: string) => Promise.reject(text));
            }
          } catch (e) {
            return Promise.reject(new Error(String(e)));
          }
        })
    };
  }

  return requestCache[requestKey].promise;
};

/**
 * Checks if the given context allows asynchronous functions.
 * Throws an error if asynchronous functions are not allowed.
 *
 * @param ctx - An object describing the context of expression
 *  evaluation (see the "applyParsedPath" function).
 * @param fnName - The name of the function being checked, used in
 *  the error message.
 * @throws Error - Throws an error if the context does not allow asynchronous
 *  functions.
 */
util.checkAllowAsync = function (ctx: any, fnName: string): void {
  if (!ctx.async) {
    throw new Error(`The asynchronous function "${fnName}" is not allowed. ` +
      'To enable asynchronous functions, use the async=true or async="always"' +
      ' option.');
  }
};

/**
 * Reference to the native Object.prototype.hasOwnProperty method, bound to
 * Function.prototype.call. This can be used to safely check if an object has
 * a property as its own (not inherited), avoiding issues if the object has
 * a custom hasOwnProperty property.
 *
 * Example usage:
 * // Cannot use util.hasOwnProperty directly because it triggers the error:
 * // "Do not access Object.prototype method 'hasOwnProperty' from target object"
 * const { hasOwnProperty } = require ("./utilities");
 * ...
 * hasOwnProperty(obj, 'propertyName')
 */
util.hasOwnProperty = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

export default util;
export { util };

module.exports = util;