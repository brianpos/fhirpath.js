/**
 * Polyfill module for FHIRPath.js
 * Provides compatibility polyfills for older JavaScript environments
 */

// Binding the function Array.prototype.slice.call for convert Array-like objects/collections to a new Array.
const slice = Function.prototype.call.bind(Array.prototype.slice);

// isInteger (not in IE)
// From Mozilla docs
if (!Number.isInteger) {
  Number.isInteger = function (value: any): value is number {
    return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
  };
}

if (!String.prototype.startsWith) {
  // From Mozilla docs with little changes
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function (this: string, searchString: string, position?: number): boolean {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}

if (!String.prototype.endsWith) {
  // From Mozilla docs with little changes
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function (this: string, searchString: string, position?: number): boolean {
      const subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      const lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}

if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, 'includes', {
    value: function (this: string, searchString: string, position?: number): boolean {
      return this.indexOf(searchString, position || 0) !== -1;
    }
  });
}

if (!Object.assign) {
  // From Mozilla docs with little changes
  Object.defineProperty(Object, 'assign', {
    value: function (target: any, ...sources: any[]): any {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      return sources.reduce(function (to: any, nextSource: any) {
        if (nextSource !== null && nextSource !== undefined) {
          Object.keys(Object(nextSource)).forEach(function (nextKey: string) {
            to[nextKey] = nextSource[nextKey];
          });
        }
        return to;
      }, Object(target));
    }
  });
}

// Define btoa for NodeJS
if (typeof btoa === 'undefined') {
  (global as any).btoa = function (str: string): string {
    return Buffer.from(str, 'binary').toString('base64');
  };
}

// Define atob for NodeJS
if (typeof atob === 'undefined') {
  (global as any).atob = function (b64Encoded: string): string {
    return Buffer.from(b64Encoded, 'base64').toString('binary');
  };
}

// Export slice utility function
export { slice };

// This module primarily works through side effects (polyfills)
// but we provide a default export for consistency
export default {
  slice
};
