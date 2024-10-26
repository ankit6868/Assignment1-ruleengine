import { ASTNode, Operator } from '../types/ast';

export class ASTParser {
  private pos = 0;
  private input = '';

  parse(ruleString: string): ASTNode {
    this.pos = 0;
    this.input = ruleString.trim();
    return this.parseExpression();
  }

  private parseExpression(): ASTNode {
    let node = this.parseTerm();

    while (this.pos < this.input.length) {
      const operator = this.parseOperator();
      if (!operator) break;

      const right = this.parseTerm();
      node = {
        type: 'operator',
        operator: operator as Operator,
        left: node,
        right,
      };
    }

    return node;
  }

  private parseTerm(): ASTNode {
    this.skipWhitespace();

    if (this.input[this.pos] === '(') {
      this.pos++; // Skip '('
      const node = this.parseExpression();
      this.pos++; // Skip ')'
      return node;
    }

    // Parse field
    let field = '';
    while (this.pos < this.input.length && /[a-zA-Z_]/.test(this.input[this.pos])) {
      field += this.input[this.pos++];
    }

    this.skipWhitespace();

    // Parse operator
    const operator = this.parseOperator();
    if (!operator) throw new Error('Invalid operator');

    this.skipWhitespace();

    // Parse value
    let value = '';
    if (this.input[this.pos] === "'") {
      this.pos++; // Skip first quote
      while (this.pos < this.input.length && this.input[this.pos] !== "'") {
        value += this.input[this.pos++];
      }
      this.pos++; // Skip closing quote
    } else {
      while (this.pos < this.input.length && /[0-9]/.test(this.input[this.pos])) {
        value += this.input[this.pos++];
      }
    }

    return {
      type: 'operand',
      operator: operator as Operator,
      field,
      value: /^[0-9]+$/.test(value) ? parseInt(value) : value,
    };
  }

  private parseOperator(): string | null {
    this.skipWhitespace();
    const operators = ['AND', 'OR', '>=', '<=', '>', '<', '='];
    
    for (const op of operators) {
      if (this.input.substring(this.pos, this.pos + op.length) === op) {
        this.pos += op.length;
        return op;
      }
    }
    
    return null;
  }

  private skipWhitespace(): void {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
}