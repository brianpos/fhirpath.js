import * as antlr4 from "./antlr4-index";
import { ParserRuleContext } from "./antlr4-index";
import FHIRPathLexer from "./generated/FHIRPathLexer";
import FHIRPathListener from "./generated/FHIRPathListener";
import FHIRPathParser from "./generated/FHIRPathParser";

// Define interfaces for better type safety
export interface ASTNode {
  type: string;
  text: string;
  children?: ASTNode[];
  terminalNodeText: string[];
}

interface ParseError {
  errors: any[];
}

class ErrorListener extends antlr4.error.ErrorListener<any> {
  errors: any[];

  constructor(errors: any[]) {
    super();
    this.errors = errors;
  }

  syntaxError(rec: any, sym: any, line: number, col: number, msg: string, e: any): void {
    this.errors.push([rec, sym, line, col, msg, e]);
  }
}

const parse = function (path: string): ASTNode {
  const chars = new antlr4.InputStream(path) as any; // Type assertion for compatibility
  const lexer = new FHIRPathLexer(chars);

  const tokens = new antlr4.CommonTokenStream(lexer);

  const parser = new FHIRPathParser(tokens);
  (parser as any).buildParseTrees = true;
  const errors: any[] = [];
  const listener = new ErrorListener(errors);

  (lexer as any).removeErrorListeners();
  (lexer as any).addErrorListener(listener);
  (parser as any).removeErrorListeners();
  (parser as any).addErrorListener(listener);

  const tree = (parser as any).entireExpression();

  class PathListener extends FHIRPathListener {
    constructor() {
      super();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    enterEveryRule(ctx: ParserRuleContext): void {
      // const ruleIndex = (ctx as any).ruleIndex; // .d.ts missing the value (known github issue)
      // const parser = ctx.parser as FHIRPathParser;
      // let ruleName = parser.ruleNames[ruleIndex];
      // remove the trailing "Context"
      // ruleName = ruleName.substring(0, ruleName.length - 7);
      let ruleName = ctx.constructor.name;
      // remove the trailing "Context"
      ruleName = ruleName.substring(0, ruleName.length - 7);

      // console.log(`Entering rule:${ruleName}`);

      const parentNode = parentStack[parentStack.length - 1];
      const nodeType = ruleName;
      node = { type: nodeType, text: "", terminalNodeText: [] };
      node.text = ctx.getText();
      if (!parentNode.children)
        parentNode.children = [];
      parentNode.children.push(node);
      parentStack.push(node);
      // Also collect this node's terminal nodes, if any.  Terminal nodes are
      // not walked with the rest of the tree, but include things like "+" and
      // "-", which we need.
      node.terminalNodeText = [];
      for (const c of ctx.children!) {
        // Test for node type "TerminalNodeImpl".  Minimized code no longer
        // has the original function names, so we can't rely on
        // c.constructor.name.  It appears the TerminalNodeImpl is the only
        // node with a "symbol" property, so test for that.
        if ((c as any).symbol) // not in the typescript code
          node.terminalNodeText.push(c.getText());
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    exitEveryRule(ctx: ParserRuleContext): void {
      // let ruleName = ctx.constructor.name;
      // remove the trailing "Context"
      // ruleName = ruleName.substring(0, ruleName.length - 7);
      // console.log(`Exiting rule: ${ruleName}`);

      parentStack.pop();
    }
  }

  const ast: ASTNode = { type: "", text: "", terminalNodeText: [] };
  let node: ASTNode;
  const parentStack: ASTNode[] = [ast];

  const printer = new PathListener();
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);

  if (errors.length > 0) {
    const errMsgs: string[] = [];
    for (let i = 0, len = errors.length; i < len; ++i) {
      const err = errors[i];
      const msg = "line: " + err[2] + "; column: " + err[3] + "; message: " + err[4];
      errMsgs.push(msg);
    }
    const e = new Error(errMsgs.join("\n")) as Error & ParseError;
    e.errors = errors;
    throw e;
  }
  return ast;
};

export {
  parse
};

