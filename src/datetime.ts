/**
 * DateTime functions for FHIRPath.js
 * This file holds code to handle the FHIRPath DateTime functions.
 */

import constants from './constants';
import { FP_Date, FP_DateTime, FP_Time } from './types';

/**
 * DateTime functions engine interface
 */
export interface DateTimeEngine {
  now: () => any;
  today: () => any;
  timeOfDay: () => any;
}

const engine: DateTimeEngine = {} as DateTimeEngine;

/**
 * Implements FHIRPath now().
 * @returns current date and time as FP_DateTime
 */
engine.now = function (): any {
  if (!constants.now) {
    // return new FP_DateTime((new Date()).toISOString());
    // The above would construct an FP_DateTime with a timezone of "Z", which
    // would not make a difference for computation, but if the end result of an
    // expression is "now()", then it would look different when output to a user.
    // Construct it ourselves to preserve timezone
    const now = constants.nowDate; // a JS Date
    const isoStr = FP_DateTime.isoDateTime(now);
    constants.now = new FP_DateTime(isoStr);
  }
  return constants.now;
};

/**
 * Implements FHIRPath today().  See comments in now(). This does not
 * include a timezone offset.
 * @returns current date as FP_Date
 */
engine.today = function (): any {
  if (!constants.today) {
    // Construct the string ourselves to preserve timezone
    const now = constants.nowDate; // a JS Date
    const isoStr = FP_Date.isoDate(now);
    constants.today = new FP_Date(isoStr);
  }
  return constants.today;
};

/**
 * Implements FHIRPath timeOfDay().  See comments in now(). This does not
 * include a timezone offset.
 * @returns current time as FP_Time
 */
engine.timeOfDay = function (): any {
  if (!constants.timeOfDay) {
    // Construct the string ourselves to preserve timezone
    const now = constants.nowDate; // a JS Date
    const isoStr = FP_DateTime.isoTime(now);
    constants.timeOfDay = new FP_Time(isoStr);
  }
  return constants.timeOfDay;
};

export default engine;
