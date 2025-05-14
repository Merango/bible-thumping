/**
 * Generic interface for all components in the multi-agent chat platform
 * Ensures consistent testing and interaction patterns
 */
export interface ComponentTestInterface {
  /**
   * Validates the component's core functionality
   * @returns boolean indicating if component passes basic validation
   */
  validateComponentIntegrity(): boolean;

  /**
   * Runs comprehensive tests for the component
   * @param testConfig Optional configuration for specific test scenarios
   * @returns TestResult object with detailed test outcomes
   */
  runFullTestSuite(testConfig?: Record<string, unknown>): TestResult;

  /**
   * Provides error handling and recovery mechanism
   * @param error The error to be handled
   * @returns boolean indicating successful error recovery
   */
  handleErrorRecovery(error: Error): boolean;
}

/**
 * Standardized test result structure
 */
export interface TestResult {
  passed: boolean;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  errorDetails?: string[];
}

/**
 * Enum for test severity levels
 */
export enum TestSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}