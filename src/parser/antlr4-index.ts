// This is a modified version of antlr4's index.js, in which
// the "require" statements of two unused classes are commented out
// to avoid introducing a dependency on Node.js' "fs" package.

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

import {
  ATN,
  CommonTokenStream,
  DFA,
  ErrorListener,
  FailedPredicateException,
  InputMismatchException,
  InputStream,
  Interval,
  IntervalSet,
  Lexer,
  NoViableAltException,
  ParseTreeListener,
  ParseTreeVisitor,
  // Tree module exports
  ParseTreeWalker,
  Parser,
  ParserRuleContext,
  PredictionContextCache,
  // Error module exports
  RecognitionException,
  RuleNode,
  TerminalNode,
  Token,
  // Utility exports
  arrayToString
} from 'antlr4';

// Import LL1Analyzer separately as it may not have proper TypeScript definitions
// import * as antlr4Module from 'antlr4';
// const LL1Analyzer = (antlr4Module as any).LL1Analyzer;

// Re-export the modules in the same structure as the original JS file
const atn = { ATN };
const dfa = { DFA };
const tree = {
  ParseTreeWalker,
  ParseTreeVisitor,
  ParseTreeListener,
  TerminalNode,
  RuleNode
};
const error = {
  RecognitionException,
  FailedPredicateException,
  NoViableAltException,
  InputMismatchException,
  ErrorListener
};
const CommonToken = Token; // CommonToken is typically an alias for Token
const Utils = { arrayToString };

// Polyfills are no longer needed - using native String.prototype.codePointAt and String.fromCodePoint
const codepointat = String.prototype.codePointAt;
const fromcodepoint = String.fromCodePoint;

export {
  CommonToken, CommonTokenStream, InputStream, Interval,
  IntervalSet, Lexer, Parser, ParserRuleContext, PredictionContextCache, Token, Utils, atn,
  codepointat, dfa, error, fromcodepoint, tree
};

