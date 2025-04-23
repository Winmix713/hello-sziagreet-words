
// Add missing conversion result type

import { NextJsRoute } from "../services/routeConverter";

export interface ConversionOptions {
  syntax: 'typescript' | 'javascript';
  useReactRouter: boolean;
  updateDependencies: boolean;
  transformDataFetching: boolean;
  convertApiRoutes: boolean;
  replaceComponents: boolean;
  handleMiddleware: boolean;
  preserveComments: boolean;
  target: 'react-vite' | 'react-cra';
}

export interface CICDTemplate {
  platform: string;
  config: string;
  filename: string;
  description: string;
}

export interface ConversionResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
  routes: any[];
  dependencies: any[];
  transformedFiles: string[];
  stats: {
    totalFiles: number;
    modifiedFiles: number;
    transformationRate: number;
    dependencyChanges: number;
    routeChanges: number;
  };
}

export interface RouteConversionResult {
  nextRoutes: NextJsRoute[];
  reactRouterRoutes: any[];
  warnings: string[];
}
