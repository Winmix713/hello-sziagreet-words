import { PerformanceEntry } from './types';

/**
 * Monitors performance metrics during the conversion process
 */
export class PerformanceMonitor {
  private startTime: number;
  private entries: PerformanceEntry[] = [];

  constructor() {
    this.startTime = performance.now();
  }

  /**
   * Start measuring a specific task
   */
  start(name: string): void {
    performance.mark(`${name}-start`);
  }

  /**
   * End measuring a specific task and record the performance entry
   */
  end(name: string): void {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const entry = performance.getEntriesByName(name)[0];
    if (entry) {
      this.entries.push({
        name: entry.name,
        startTime: entry.startTime,
        duration: entry.duration,
        entryType: entry.entryType,
        responseEnd: (entry as any).responseEnd,
      });
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(`${name}-end`);
      performance.clearMeasures(name);
    }
  }

  /**
   * Get all performance entries
   */
  getEntries(): PerformanceEntry[] {
    return this.entries;
  }

  /**
   * Generate a performance report
   */
  generateReport(): string {
    const endTime = performance.now();
    const totalDuration = endTime - this.startTime;

    let report = `
Performance Report:
Total Conversion Time: ${totalDuration.toFixed(2)} ms

Entries:
`;

    this.entries.forEach(entry => {
      report += `
- Name: ${entry.name}
  Start Time: ${entry.startTime.toFixed(2)} ms
  Duration: ${entry.duration.toFixed(2)} ms
  Entry Type: ${entry.entryType}
  Response End: ${entry.responseEnd ? entry.responseEnd.toFixed(2) : 'N/A'} ms
`;
    });

    return report;
  }
}
