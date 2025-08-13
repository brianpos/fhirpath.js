// This is a modified version of antlr4's index.js, updated for ANTLR4 v4.13.2
// which exports all classes directly from the main package

/* Copyright (c) 2012-2017 The ANTLR Project. All rights reserved.
 * Use of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */

const antlr4 = require('antlr4');

// Export the classes we need from the main antlr4 package
exports.atn = {
  ATN: antlr4.ATN,
  ATNDeserializer: antlr4.ATNDeserializer,
  ParserATNSimulator: antlr4.ParserATNSimulator,
  LexerATNSimulator: antlr4.LexerATNSimulator,
  PredictionContextCache: antlr4.PredictionContextCache,
  PredictionMode: antlr4.PredictionMode
};

exports.dfa = {
  DFA: antlr4.DFA
};

exports.tree = {
  TerminalNode: antlr4.TerminalNode,
  RuleNode: antlr4.RuleNode,
  ParseTreeListener: antlr4.ParseTreeListener,
  ParseTreeVisitor: antlr4.ParseTreeVisitor,
  ParseTreeWalker: antlr4.ParseTreeWalker
};

exports.error = {
  RecognitionException: antlr4.RecognitionException,
  NoViableAltException: antlr4.NoViableAltException,
  InputMismatchException: antlr4.InputMismatchException,
  FailedPredicateException: antlr4.FailedPredicateException,
  BailErrorStrategy: antlr4.BailErrorStrategy,
  DefaultErrorStrategy: antlr4.DefaultErrorStrategy,
  ErrorListener: antlr4.ErrorListener
};

exports.Token = antlr4.Token;
exports.CommonToken = antlr4.CommonToken;
exports.InputStream = antlr4.InputStream;
exports.CommonTokenStream = antlr4.CommonTokenStream;
exports.Lexer = antlr4.Lexer;
exports.Parser = antlr4.Parser;
exports.ParserRuleContext = antlr4.ParserRuleContext;
exports.PredictionContextCache = antlr4.PredictionContextCache;
exports.Interval = antlr4.Interval;
exports.IntervalSet = antlr4.IntervalSet;
exports.LL1Analyzer = antlr4.LL1Analyzer;

// Polyfills and utilities - these may not be needed in the new version
// but keeping for backwards compatibility if they exist
exports.codepointat = antlr4.codepointat || null;
exports.fromcodepoint = antlr4.fromcodepoint || null;
exports.Utils = antlr4.arrayToString ? { toConsoleString: antlr4.arrayToString } : null;
