
import { ConversionOptions, ConversionResult } from "@/types/conversion";
import { DependencyAnalyzer } from "./DependencyAnalyzer";
import { RouteAnalyzer } from "./route/routeAnalyzer";
import { FileTransformer } from "./FileTransformer";
import { FileAnalyzer } from "./FileAnalyzer";
import { ApiRouteConverter } from "./ApiRouteConverter";
import { MiddlewareHandler } from "./MiddlewareHandler";
import { CICDGenerator } from "./CICDGenerator";
import { ErrorCollector } from "../errors/ErrorCollector";

export class ConversionExecutor {
  private files: File[];
  private projectJson: any;
  private options: ConversionOptions;
  private errorCollector: ErrorCollector;
  private progress: number = 0;
  private progressCallback?: (progress: number, message: string) => void;
  
  constructor(files: File[], packageJson: any, options: ConversionOptions) {
    this.files = files;
    this.projectJson = packageJson;
    this.options = options;
    this.errorCollector = new ErrorCollector();
  }

  setProgressCallback(callback: (progress: number, message: string) => void): ConversionExecutor {
    this.progressCallback = callback;
    return this;
  }
  
  private updateProgress(increment: number, message: string): void {
    this.progress += increment;
    if (this.progressCallback) {
      this.progressCallback(Math.min(this.progress, 100), message);
    }
  }

  async execute(): Promise<ConversionResult> {
    const result: ConversionResult = {
      success: false,
      errors: [],
      warnings: [],
      info: [],
      routes: [],
      dependencies: [],
      transformedFiles: [],
      stats: {
        totalFiles: this.files.length,
        modifiedFiles: 0,
        transformationRate: 0,
        dependencyChanges: 0,
        routeChanges: 0
      }
    };

    try {
      this.updateProgress(5, "Analyzing project structure...");
      
      // Analyze files
      const fileAnalyzer = new FileAnalyzer(this.files, this.errorCollector);
      const fileAnalysis = await fileAnalyzer.analyzeFiles();
      
      // Dependencies
      if (this.options.updateDependencies) {
        const depAnalyzer = new DependencyAnalyzer(this.projectJson, this.errorCollector);
        const depResults = await depAnalyzer.analyze();
        result.dependencies = depResults.dependencies;
        result.stats.dependencyChanges = depResults.changes;
      }
      
      // Routes
      if (this.options.useReactRouter) {
        const routeAnalyzer = new RouteAnalyzer(this.files, this.errorCollector);
        const routeResults = await routeAnalyzer.analyzeRoutes();
        result.routes = routeResults.routes;
        result.stats.routeChanges = routeResults.routes.length;
      }
      
      // Code transformation
      const transformer = new FileTransformer(this.files, this.errorCollector);
      const transformResults = await transformer.transform(this.options);
      result.transformedFiles = transformResults.transformedFiles;
      result.stats.modifiedFiles = transformResults.stats.modifiedFiles;
      result.stats.transformationRate = transformResults.stats.transformationRate;
      
      // API routes
      if (this.options.convertApiRoutes) {
        const apiConverter = new ApiRouteConverter(this.files, this.errorCollector);
        await apiConverter.convert();
      }
      
      // Middleware
      if (this.options.handleMiddleware) {
        const middlewareHandler = new MiddlewareHandler(this.files, this.errorCollector);
        await middlewareHandler.handle();
      }
      
      // CI/CD
      const cicdGenerator = new CICDGenerator(this.errorCollector);
      await cicdGenerator.generate();
      
      // Collect results
      const allErrors = this.errorCollector.getAllErrors();
      result.errors = allErrors.filter(e => e.severity === 'critical').map(e => e.message);
      result.warnings = allErrors.filter(e => e.severity === 'warning').map(e => e.message);
      result.info = allErrors.filter(e => e.severity === 'info').map(e => e.message);
      
      this.updateProgress(100, "Conversion completed!");
      result.success = result.errors.length === 0;
      
    } catch (error) {
      result.success = false;
      result.errors.push(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    return result;
  }
}
