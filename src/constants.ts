/**
 * Constants module for FHIRPath.js
 * These are values that should not change during an evaluation of a FHIRPath
 * expression (e.g. the return value of today(), per the spec.)  They are
 * constant during at least one evaluation.
 */

import { FHIRPathConstants } from './types/core';

const constants: FHIRPathConstants = {
  /**
     *  Resets the constants.  Should be called when before the engine starts its
     *  processing.
     */
  reset: function (): void {
    this.nowDate = new Date(); // a Date object representing "now"
    this.today = null;
    this.now = null;
    this.timeOfDay = null;
    this.localTimezoneOffset = null;
  },

  /**
     * A Date object representing "now"
     */
  nowDate: new Date(),

  /**
     *  The cached value of today().
     */
  today: null,

  /**
     *  The cached value of now().
     */
  now: null,

  /**
     *  The cached value of timeOfDay().
     */
  timeOfDay: null,

  /**
     * The cached value of the local timezone offset.
     */
  localTimezoneOffset: null
};

export default constants;
export { constants };

