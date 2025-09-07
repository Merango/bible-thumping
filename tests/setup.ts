// Global test setup
import 'jest';

// Configure global test environment
jest.setTimeout(10000); // 10-second timeout for async tests

// Optional: Global mock configurations or setup functions
export const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};

// Global error handler for tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  throw reason;
});