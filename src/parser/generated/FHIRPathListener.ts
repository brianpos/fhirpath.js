// Generated from FHIRPath.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `FHIRPathParser`.
 */
export default class FHIRPathListener extends ParseTreeListener {
  /**
	 * Enter a parse tree produced by `FHIRPathParser.entireExpression`.
	 * @param ctx the parse tree
	 */
  enterEntireExpression?: (ctx: EntireExpressionContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.entireExpression`.
	 * @param ctx the parse tree
	 */
  exitEntireExpression?: (ctx: EntireExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterIndexerExpression?: (ctx: IndexerExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitIndexerExpression?: (ctx: IndexerExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterPolarityExpression?: (ctx: PolarityExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitPolarityExpression?: (ctx: PolarityExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `unionExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterUnionExpression?: (ctx: UnionExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `unionExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitUnionExpression?: (ctx: UnionExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `orExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterOrExpression?: (ctx: OrExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `orExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitOrExpression?: (ctx: OrExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `andExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterAndExpression?: (ctx: AndExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `andExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitAndExpression?: (ctx: AndExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterMembershipExpression?: (ctx: MembershipExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitMembershipExpression?: (ctx: MembershipExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterInequalityExpression?: (ctx: InequalityExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitInequalityExpression?: (ctx: InequalityExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterInvocationExpression?: (ctx: InvocationExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitInvocationExpression?: (ctx: InvocationExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `termExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterTermExpression?: (ctx: TermExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `termExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitTermExpression?: (ctx: TermExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `typeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  enterTypeExpression?: (ctx: TypeExpressionContext) => void;
  /**
	 * Exit a parse tree produced by the `typeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
  exitTypeExpression?: (ctx: TypeExpressionContext) => void;
  /**
	 * Enter a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  enterInvocationTerm?: (ctx: InvocationTermContext) => void;
  /**
	 * Exit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  exitInvocationTerm?: (ctx: InvocationTermContext) => void;
  /**
	 * Enter a parse tree produced by the `literalTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  enterLiteralTerm?: (ctx: LiteralTermContext) => void;
  /**
	 * Exit a parse tree produced by the `literalTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  exitLiteralTerm?: (ctx: LiteralTermContext) => void;
  /**
	 * Enter a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  enterExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
  /**
	 * Exit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  exitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
  /**
	 * Enter a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  enterParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
  /**
	 * Exit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
  exitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
  /**
	 * Enter a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterNullLiteral?: (ctx: NullLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitNullLiteral?: (ctx: NullLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterStringLiteral?: (ctx: StringLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitStringLiteral?: (ctx: StringLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `dateLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterDateLiteral?: (ctx: DateLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitDateLiteral?: (ctx: DateLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
  /**
	 * Enter a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  enterQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
  /**
	 * Exit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
  exitQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.externalConstant`.
	 * @param ctx the parse tree
	 */
  enterExternalConstant?: (ctx: ExternalConstantContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.externalConstant`.
	 * @param ctx the parse tree
	 */
  exitExternalConstant?: (ctx: ExternalConstantContext) => void;
  /**
	 * Enter a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  enterMemberInvocation?: (ctx: MemberInvocationContext) => void;
  /**
	 * Exit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  exitMemberInvocation?: (ctx: MemberInvocationContext) => void;
  /**
	 * Enter a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
  /**
	 * Exit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
  /**
	 * Enter a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  enterThisInvocation?: (ctx: ThisInvocationContext) => void;
  /**
	 * Exit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  exitThisInvocation?: (ctx: ThisInvocationContext) => void;
  /**
	 * Enter a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  enterIndexInvocation?: (ctx: IndexInvocationContext) => void;
  /**
	 * Exit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  exitIndexInvocation?: (ctx: IndexInvocationContext) => void;
  /**
	 * Enter a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  enterTotalInvocation?: (ctx: TotalInvocationContext) => void;
  /**
	 * Exit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
  exitTotalInvocation?: (ctx: TotalInvocationContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.functn`.
	 * @param ctx the parse tree
	 */
  enterFunctn?: (ctx: FunctnContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.functn`.
	 * @param ctx the parse tree
	 */
  exitFunctn?: (ctx: FunctnContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.paramList`.
	 * @param ctx the parse tree
	 */
  enterParamList?: (ctx: ParamListContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.paramList`.
	 * @param ctx the parse tree
	 */
  exitParamList?: (ctx: ParamListContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.quantity`.
	 * @param ctx the parse tree
	 */
  enterQuantity?: (ctx: QuantityContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.quantity`.
	 * @param ctx the parse tree
	 */
  exitQuantity?: (ctx: QuantityContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.unit`.
	 * @param ctx the parse tree
	 */
  enterUnit?: (ctx: UnitContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.unit`.
	 * @param ctx the parse tree
	 */
  exitUnit?: (ctx: UnitContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
  enterDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
  exitDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
  enterPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
  exitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
  enterTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
  exitTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
  enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
  exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
  /**
	 * Enter a parse tree produced by `FHIRPathParser.identifier`.
	 * @param ctx the parse tree
	 */
  enterIdentifier?: (ctx: IdentifierContext) => void;
  /**
	 * Exit a parse tree produced by `FHIRPathParser.identifier`.
	 * @param ctx the parse tree
	 */
  exitIdentifier?: (ctx: IdentifierContext) => void;
}

