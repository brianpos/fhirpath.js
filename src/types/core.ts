/**
 * Core type definitions for FHIRPath.js TypeScript migration
 * These types provide the foundation for type-safe FHIRPath evaluation
 */

import { FP_Date, FP_DateTime, FP_Time, Model } from "../types";

export interface FHIRPathContext {
    model?: Model | null;
    vars: Record<string, any>;
    processedVars: Record<string, any>;
    processedUserVarNames?: Record<string, any>;
    definedVars?: Record<string, any>;
    terminologyUrl?: string;
    signal?: AbortSignal;
    options?: any;
    $this?: any;
    $index?: number;
    $total?: any;
    dataRoot?: any;
    userInvocationTable?: Record<string, InvocationEntry>;
    async?: boolean;
    customTraceFn?: (value: any, label: string) => void;
}

export interface InvocationEntry {
    fn: Function;
    arity: Record<number, string[]>;
    nullable?: boolean;
    internalStructures?: boolean;
}

/**
 * Type-safe function engine interface
 */
export interface FunctionEngine {
    [functionName: string]: InvocationEntry;
}

/**
 * Enhanced invocation entry with stronger typing
 */
export interface TypedInvocationEntry<TArgs extends any[] = any[], TReturn = any> {
    fn: (...args: TArgs) => TReturn;
    arity: Record<number, ParameterType[]>;
    nullable?: boolean;
    internalStructures?: boolean;
}

/**
 * Parameter types for FHIRPath function definitions
 */
export type ParameterType =
    | 'Expr'
    | 'AnyAtRoot'
    | 'Identifier'
    | 'TypeSpecifier'
    | 'Any'
    | 'Integer'
    | 'Boolean'
    | 'Number'
    | 'String'
    | 'StringOrNumber';

/**
 * Options for deep equality comparison
 */
export interface DeepEqualOptions {
    fuzzy?: boolean;
}

/**
 * Constants interface for FHIRPath evaluation
 */
export interface FHIRPathConstants {
    nowDate: Date;
    today: FP_Date | null;
    now: FP_DateTime | null;
    timeOfDay: FP_Time | null;
    localTimezoneOffset: number | null;
    reset(): void;
}
