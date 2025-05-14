import { ComponentTestInterface, TestResult, TestSeverity } from '../interfaces/component-interface';

/**
 * Comprehensive testing strategy for multi-agent chat platform
 * Implements a flexible, extensible testing approach
 */
export class ComprehensiveTestStrategy {
  /**
   * Run tests across all components
   * @param components Array of components to test
   * @param severity Minimum test severity to run
   * @returns Aggregated test results
   */
  public static runSystemWideTests(
    components: ComponentTestInterface[], 
    severity: TestSeverity = TestSeverity.MEDIUM
  ): TestResult[] {
    return components.map(component => 
      this.runComponentTests(component, severity)
    );
  }

  /**
   * Execute tests for a single component
   * @param component Component to test
   * @param minSeverity Minimum test severity
   * @returns Test result for the component
   */
  private static runComponentTests(
    component: ComponentTestInterface, 
    minSeverity: TestSeverity
  ): TestResult {
    // Validate component integrity first
    if (!component.validateComponentIntegrity()) {
      return {
        passed: false,
        totalTests: 1,
        passedTests: 0,
        failedTests: 1,
        errorDetails: ['Component integrity check failed']
      };
    }

    // Run full test suite
    const testResult = component.runFullTestSuite({
      severityThreshold: minSeverity
    });

    // Additional error recovery test
    try {
      const mockError = new Error('Simulated test error');
      component.handleErrorRecovery(mockError);
    } catch (error) {
      testResult.passed = false;
      testResult.errorDetails?.push('Error recovery mechanism failed');
    }

    return testResult;
  }

  /**
   * Generate comprehensive test report
   * @param testResults Array of test results
   * @returns Detailed test report
   */
  public static generateTestReport(testResults: TestResult[]): string {
    const totalComponents = testResults.length;
    const passedComponents = testResults.filter(result => result.passed).length;
    
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      totalComponents,
      passedComponents,
      passPercentage: (passedComponents / totalComponents) * 100,
      componentResults: testResults
    }, null, 2);
  }
}