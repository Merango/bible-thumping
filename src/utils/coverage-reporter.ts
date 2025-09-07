import fs from 'fs';
import path from 'path';

interface CoverageReport {
  total: {
    lines: number;
    statements: number;
    functions: number;
    branches: number;
  };
  files: Record<string, {
    lines: number;
    statements: number;
    functions: number;
    branches: number;
  }>;
}

export class CoverageReporter {
  /**
   * Generate a comprehensive coverage report
   * @param coverageData Raw coverage data from Jest
   * @returns Detailed coverage report
   */
  static generateReport(coverageData: any): CoverageReport {
    const report: CoverageReport = {
      total: {
        lines: 0,
        statements: 0,
        functions: 0,
        branches: 0
      },
      files: {}
    };

    Object.entries(coverageData.coverageMap._files).forEach(([filePath, fileData]: [string, any]) => {
      const summary = fileData.toSummary();
      
      report.files[path.basename(filePath)] = {
        lines: summary.lines.pct,
        statements: summary.statements.pct,
        functions: summary.functions.pct,
        branches: summary.branches.pct
      };

      report.total.lines += summary.lines.pct;
      report.total.statements += summary.statements.pct;
      report.total.functions += summary.functions.pct;
      report.total.branches += summary.branches.pct;
    });

    // Average the totals
    const fileCount = Object.keys(report.files).length;
    report.total.lines /= fileCount;
    report.total.statements /= fileCount;
    report.total.functions /= fileCount;
    report.total.branches /= fileCount;

    return report;
  }

  /**
   * Save coverage report to file
   * @param report Coverage report to save
   */
  static saveReport(report: CoverageReport) {
    const reportPath = path.resolve('coverage-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Coverage report saved to ${reportPath}`);
  }
}