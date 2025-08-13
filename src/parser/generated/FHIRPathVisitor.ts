// Generated from FHIRPath.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { EntireExpressionContext } from "./FHIRPathParser.js";
import { IndexerExpressionContext } from "./FHIRPathParser.js";
import { PolarityExpressionContext } from "./FHIRPathParser.js";
import { AdditiveExpressionContext } from "./FHIRPathParser.js";
import { MultiplicativeExpressionContext } from "./FHIRPathParser.js";
import { UnionExpressionContext } from "./FHIRPathParser.js";
import { OrExpressionContext } from "./FHIRPathParser.js";
import { AndExpressionContext } from "./FHIRPathParser.js";
import { MembershipExpressionContext } from "./FHIRPathParser.js";
import { InequalityExpressionContext } from "./FHIRPathParser.js";
import { InvocationExpressionContext } from "./FHIRPathParser.js";
import { EqualityExpressionContext } from "./FHIRPathParser.js";
import { ImpliesExpressionContext } from "./FHIRPathParser.js";
import { TermExpressionContext } from "./FHIRPathParser.js";
import { TypeExpressionContext } from "./FHIRPathParser.js";
import { InvocationTermContext } from "./FHIRPathParser.js";
import { LiteralTermContext } from "./FHIRPathParser.js";
import { ExternalConstantTermContext } from "./FHIRPathParser.js";
import { ParenthesizedTermContext } from "./FHIRPathParser.js";
import { NullLiteralContext } from "./FHIRPathParser.js";
import { BooleanLiteralContext } from "./FHIRPathParser.js";
import { StringLiteralContext } from "./FHIRPathParser.js";
import { NumberLiteralContext } from "./FHIRPathParser.js";
import { LongNumberLiteralContext } from "./FHIRPathParser.js";
import { DateLiteralContext } from "./FHIRPathParser.js";
import { DateTimeLiteralContext } from "./FHIRPathParser.js";
import { TimeLiteralContext } from "./FHIRPathParser.js";
import { QuantityLiteralContext } from "./FHIRPathParser.js";
import { ExternalConstantContext } from "./FHIRPathParser.js";
import { MemberInvocationContext } from "./FHIRPathParser.js";
import { FunctionInvocationContext } from "./FHIRPathParser.js";
import { ThisInvocationContext } from "./FHIRPathParser.js";
import { IndexInvocationContext } from "./FHIRPathParser.js";
import { TotalInvocationContext } from "./FHIRPathParser.js";
import { FunctnContext } from "./FHIRPathParser.js";
import { ParamListContext } from "./FHIRPathParser.js";
import { QuantityContext } from "./FHIRPathParser.js";
import { UnitContext } from "./FHIRPathParser.js";
import { DateTimePrecisionContext } from "./FHIRPathParser.js";
import { PluralDateTimePrecisionContext } from "./FHIRPathParser.js";
import { TypeSpecifierContext } from "./FHIRPathParser.js";
import { QualifiedIdentifierContext } from "./FHIRPathParser.js";
import { IdentifierContext } from "./FHIRPathParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FHIRPathParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class FHIRPathVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
	 * Visit a parse tree produced by `FHIRPathParser.entireExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitEntireExpression?: (ctx: EntireExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitIndexerExpression?: (ctx: IndexerExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitPolarityExpression?: (ctx: PolarityExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `unionExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitUnionExpression?: (ctx: UnionExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `orExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitOrExpression?: (ctx: OrExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `andExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitAndExpression?: (ctx: AndExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitMembershipExpression?: (ctx: MembershipExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitInequalityExpression?: (ctx: InequalityExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitInvocationExpression?: (ctx: InvocationExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitImpliesExpression?: (ctx: ImpliesExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `termExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitTermExpression?: (ctx: TermExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `typeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitTypeExpression?: (ctx: TypeExpressionContext) => Result;
  /**
	 * Visit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitInvocationTerm?: (ctx: InvocationTermContext) => Result;
  /**
	 * Visit a parse tree produced by the `literalTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitLiteralTerm?: (ctx: LiteralTermContext) => Result;
  /**
	 * Visit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => Result;
  /**
	 * Visit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => Result;
  /**
	 * Visit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitNullLiteral?: (ctx: NullLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitStringLiteral?: (ctx: StringLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitDateLiteral?: (ctx: DateLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitTimeLiteral?: (ctx: TimeLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitQuantityLiteral?: (ctx: QuantityLiteralContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.externalConstant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitExternalConstant?: (ctx: ExternalConstantContext) => Result;
  /**
	 * Visit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitMemberInvocation?: (ctx: MemberInvocationContext) => Result;
  /**
	 * Visit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitFunctionInvocation?: (ctx: FunctionInvocationContext) => Result;
  /**
	 * Visit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitThisInvocation?: (ctx: ThisInvocationContext) => Result;
  /**
	 * Visit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitIndexInvocation?: (ctx: IndexInvocationContext) => Result;
  /**
	 * Visit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitTotalInvocation?: (ctx: TotalInvocationContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.functn`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitFunctn?: (ctx: FunctnContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.paramList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitParamList?: (ctx: ParamListContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.quantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitQuantity?: (ctx: QuantityContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitUnit?: (ctx: UnitContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitDateTimePrecision?: (ctx: DateTimePrecisionContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.typeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => Result;
  /**
	 * Visit a parse tree produced by `FHIRPathParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
  visitIdentifier?: (ctx: IdentifierContext) => Result;
}

