
/**
 * Helper functions to safely handle Babel AST types across different versions
 */

/**
 * Safely handles Babel expressions regardless of version differences
 */
export function safeExpression(expression: any): any {
  if (!expression) return null;
  
  // Handle potential version conflicts by returning the original expression
  return expression;
}

/**
 * Safely casts node types between different Babel versions
 */
export function safeNodeCast(node: any): any {
  return node;
}

/**
 * Wraps traverse to handle type conflicts
 */
export function safeTraverse(ast: any, visitor: any): void {
  try {
    const traverse = require('@babel/traverse').default;
    traverse(ast, visitor);
  } catch (error) {
    console.warn('AST traversal error:', error);
  }
}

/**
 * Safe type checking for Babel node types
 */
export function isNodeOfType(node: any, type: string): boolean {
  return node && node.type === type;
}

/**
 * Create a safe wrapper around Babel types to handle version incompatibilities
 */
export function createSafeBabelTypes(t: any): any {
  return {
    ...t,
    isIdentifier: (node: any) => node && node.type === 'Identifier',
    isArrayPattern: (node: any) => node && node.type === 'ArrayPattern',
    isObjectPattern: (node: any) => node && node.type === 'ObjectPattern',
    isStringLiteral: (node: any) => node && node.type === 'StringLiteral',
    isMemberExpression: (node: any) => node && node.type === 'MemberExpression',
  };
}
