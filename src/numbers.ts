/**
 * Number utility functions for FHIRPath.js
 * Provides mathematical operations and number comparison functions
 */

export interface NumberFunctions {
    roundToMaxPrecision: (x: number) => number;
    isEquivalent: (actual: number, expected: number) => boolean;
    isEqual: (actual: number, expected: number) => boolean;
}

const numberFns: NumberFunctions = {} as NumberFunctions;

/**
 * Returns the number of digits in the number after the decimal point, ignoring
 * trailing zeros.
 * @param x - The number to analyze
 * @returns The number of decimal places
 */
function decimalPlaces(x: number): number {
  // Based on https://stackoverflow.com/a/9539746/360782
  // Make sure it is a number and use the builtin number -> string.
  const s = "" + (+x);
  const match = /(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(s);
  // NaN or Infinity or integer.
  // We arbitrarily decide that Infinity is integral.
  if (!match) {
    return 0;
  }
  // Count the number of digits in the fraction and subtract the
  // exponent to simulate moving the decimal point left by exponent places.
  // 1.234e+2 has 1 fraction digit and '234'.length -  2 == 1
  // 1.234e-2 has 5 fraction digit and '234'.length - -2 == 5
  const fraction = match[2];
  const exponent = match[3];
  return Math.max(
    0,  // lower limit.
    (fraction === '0' ? 0 : (fraction || '').length)  // fraction length
        - (parseInt(exponent || '0', 10))  // exponent
  );
}

/**
 * Rounds a number to the specified number of decimal places.
 * @param x - The decimal number to be rounded
 * @param n - The (maximum) number of decimal places to preserve.  (The result
 *  could contain fewer if the decimal digits in x contain zeros).
 * @returns The rounded number
 */
function roundToDecimalPlaces(x: number, n: number): number {
  const scale = Math.pow(10, n);
  return Math.round(x * scale) / scale;
}

/**
 * The smallest representable number in FHIRPath.
 */
const PRECISION_STEP = 1e-8;

/**
 * Rounds a number to the nearest multiple of PRECISION_STEP.
 * @param x - The number to round
 * @returns The rounded number
 */
const roundToMaxPrecision = numberFns.roundToMaxPrecision = function (x: number): number {
  return Math.round(x / PRECISION_STEP) * PRECISION_STEP;
};

/**
 * Determines numbers equivalence
 * @param actual - The actual number
 * @param expected - The expected number  
 * @returns True if numbers are equivalent within precision
 */
numberFns.isEquivalent = function (actual: number, expected: number): boolean {
  if (Number.isInteger(actual) && Number.isInteger(expected)) {
    return actual === expected;
  }

  const prec = Math.min(decimalPlaces(actual), decimalPlaces(expected));

  if (prec === 0) {
    return Math.round(actual) === Math.round(expected);
  } else {
    // Note: parseFloat(0.00000011).toPrecision(7) ===  "1.100000e-7"
    // It does # of significant digits, not decimal places.
    return roundToDecimalPlaces(actual, prec) ===
            roundToDecimalPlaces(expected, prec);
  }
};

/**
 * Determines numbers equality
 * @param actual - The actual number
 * @param expected - The expected number
 * @returns True if numbers are equal within max precision
 */
numberFns.isEqual = function (actual: number, expected: number): boolean {
  return roundToMaxPrecision(actual) === roundToMaxPrecision(expected);
};

export default numberFns;
export { PRECISION_STEP, decimalPlaces, roundToDecimalPlaces, roundToMaxPrecision };

