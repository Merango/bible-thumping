import { ComprehensiveTestStrategy } from './comprehensive-test-strategy';
import { ComponentTestInterface, TestResult, TestSeverity } from '../interfaces/component-interface';

class MockComponent implements ComponentTestInterface {
  validateComponentIntegrity(): boolean {
    return true;
  }

  runFullTestSuite(): TestResult {
    return {
      passed: true,
      totalTests: 5,
      passedTests: 5,
      failedTests: 0
    };
  }

  handleErrorRecovery(): boolean {
    return true;
  }
}

describe('ComprehensiveTestStrategy', () => {
  const mockComponents: ComponentTestInterface[] = [
    new MockComponent(),
    new MockComponent()
  ];

  it('should run system-wide tests successfully', () => {
    const results = ComprehensiveTestStrategy.runSystemWideTests(mockComponents);
    
    expect(results.length).toBe(2);
    results.forEach(result => {
      expect(result.passed).toBe(true);
      expect(result.totalTests).toBe(5);
    });
  });

  it('should generate a test report', () => {
    const results = ComprehensiveTestStrategy.runSystemWideTests(mockComponents);
    const report = ComprehensiveTestStrategy.generateTestReport(results);
    
    const parsedReport = JSON.parse(report);
    expect(parsedReport.totalComponents).toBe(2);
    expect(parsedReport.passedComponents).toBe(2);
  });
});