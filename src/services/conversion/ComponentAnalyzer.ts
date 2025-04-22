
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import { safeASTCast, safeExpressionHandler, safePatternHandler, handleBabelVersionConflict } from '../astTransformerFix';

export interface AnalyzedComponent {
  name: string;
  type: 'functional' | 'class' | 'unknown';
  imports: string[];
  nextJsImports: string[];
  props: string[];
}

/**
 * Analyzes React components to determine their structure and dependencies
 */
export class ComponentAnalyzer {
  /**
   * Analyze a component file
   */
  analyzeComponent(code: string): AnalyzedComponent | null {
    try {
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });
      
      const result: AnalyzedComponent = {
        name: '',
        type: 'unknown',
        imports: [],
        nextJsImports: [],
        props: []
      };
      
      // Find imports first
      traverse(ast, {
        ImportDeclaration(path) {
          const source = path.node.source.value as string;
          result.imports.push(source);
          
          if (source.startsWith('next/')) {
            result.nextJsImports.push(source);
          }
        }
      });
      
      // Find component name and type
      traverse(ast, {
        // Find function declarations
        FunctionDeclaration(path) {
          if (path.node.id && path.node.id.name) {
            const name = path.node.id.name;
            
            // Check if it's likely a component (starts with capital letter)
            if (name[0] === name[0].toUpperCase()) {
              result.name = name;
              result.type = 'functional';
              
              // Extract props from parameters
              if (path.node.params.length > 0) {
                const firstParam = handleBabelVersionConflict(path.node.params[0]);
                
                if (t.isIdentifier(firstParam)) {
                  // Simple props like function Component(props)
                  result.props.push(firstParam.name);
                } else if (t.isObjectPattern(safePatternHandler(firstParam))) {
                  // Destructured props like function Component({ prop1, prop2 })
                  const objPattern = safePatternHandler(firstParam);
                  if (Array.isArray(objPattern.properties)) {
                    objPattern.properties.forEach(prop => {
                      const safeProp = handleBabelVersionConflict(prop);
                      if (t.isObjectProperty(safeProp) && t.isIdentifier(safeExpressionHandler(safeProp.key))) {
                        result.props.push(safeExpressionHandler(safeProp.key).name);
                      }
                    });
                  }
                }
              }
            }
          }
        },
        
        // Find variable declarations that could be components
        VariableDeclarator(path) {
          if (t.isIdentifier(path.node.id)) {
            const name = path.node.id.name;
            
            // Check if it's likely a component (starts with capital letter)
            if (name[0] === name[0].toUpperCase()) {
              result.name = name;
              
              // Check if it's an arrow function or function expression
              if (t.isArrowFunctionExpression(safeExpressionHandler(path.node.init)) || 
                  t.isFunctionExpression(safeExpressionHandler(path.node.init))) {
                result.type = 'functional';
                
                // Extract props from parameters
                const init = safeExpressionHandler(path.node.init);
                if (init.params && init.params.length > 0) {
                  const firstParam = handleBabelVersionConflict(init.params[0]);
                  
                  if (t.isIdentifier(firstParam)) {
                    // Simple props like const Component = (props) => 
                    result.props.push(firstParam.name);
                  } else if (t.isObjectPattern(safePatternHandler(firstParam))) {
                    // Destructured props like const Component = ({ prop1, prop2 }) =>
                    const objPattern = safePatternHandler(firstParam);
                    if (Array.isArray(objPattern.properties)) {
                      objPattern.properties.forEach(prop => {
                        const safeProp = handleBabelVersionConflict(prop);
                        // Safe type checking before accessing 'key'
                        if (t.isObjectProperty(safeProp) && t.isIdentifier(safeExpressionHandler(safeProp.key))) {
                          result.props.push(safeExpressionHandler(safeProp.key).name);
                        }
                      });
                    }
                  }
                }
              }
            }
          }
        },
        
        // Find class components
        ClassDeclaration(path) {
          if (path.node.id) {
            const name = path.node.id.name;
            
            // Check if it extends React.Component
            const superClass = safeExpressionHandler(path.node.superClass);
            if (superClass && 
                ((t.isIdentifier(superClass) && superClass.name === 'Component') ||
                 (t.isMemberExpression(superClass) && 
                  t.isIdentifier(safeExpressionHandler(superClass.object)) && safeExpressionHandler(superClass.object).name === 'React' &&
                  t.isIdentifier(safeExpressionHandler(superClass.property)) && safeExpressionHandler(superClass.property).name === 'Component'))) {
              result.name = name;
              result.type = 'class';
            }
          }
        }
      });
      
      return result.name ? result : null;
    } catch (error) {
      console.error('Error analyzing component:', error);
      return null;
    }
  }
}
