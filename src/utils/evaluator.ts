import { ASTNode, UserData } from '../types/ast';

export class RuleEvaluator {
  evaluate(node: ASTNode, data: UserData): boolean {
    if (node.type === 'operator' && node.operator) {
      const left = node.left ? this.evaluate(node.left, data) : false;
      const right = node.right ? this.evaluate(node.right, data) : false;

      switch (node.operator) {
        case 'AND':
          return left && right;
        case 'OR':
          return left || right;
        default:
          return false;
      }
    }

    if (node.type === 'operand' && node.field && node.operator) {
      const fieldValue = data[node.field as keyof UserData];
      const compareValue = node.value;

      switch (node.operator) {
        case '>':
          return fieldValue > compareValue;
        case '<':
          return fieldValue < compareValue;
        case '=':
          return fieldValue === compareValue;
        case '>=':
          return fieldValue >= compareValue;
        case '<=':
          return fieldValue <= compareValue;
        default:
          return false;
      }
    }

    return false;
  }
}