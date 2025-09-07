// Enhanced Test Setup and Utilities

import 'jest-extended';
import { config } from 'dotenv';

// Load environment variables
config();

// Extend Jest with additional matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => 
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      };
    } else {
      return {
        message: () => 
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      };
    }
  }
});

// Comprehensive test configuration
export const TEST_CONFIG = {
  // Global test settings
  maxTestTimeout: 10000, // 10 seconds
  testEnvironment: process.env.NODE_ENV || 'test',
  
  // Advanced mock data generators
  generateMockPersonality: (overrides = {}) => ({
    id: `test-profile-${Math.random().toString(36).substr(2, 9)}`,
    name: 'Test Disciple Profile',
    description: 'A comprehensive mock personality for advanced testing',
    tone: ['scholarly', 'compassionate', 'philosophical'][Math.floor(Math.random() * 3)],
    samplePrompts: [
      'Explain the concept of divine grace',
      'What is the nature of spiritual transformation?',
      'Discuss the role of empathy in human relationships'
    ],
    version: 1,
    createdAt: new Date().toISOString(),
    ...overrides
  }),

  generateMockChatResponse: (overrides = {}) => ({
    text: 'A simulated response from the mock LLM',
    tokens: Math.floor(Math.random() * 100),
    backend: 'openai',
    timestamp: Date.now(),
    confidence: Math.random(),
    modelVersion: '1.0.0',
    ...overrides
  }),

  // Utility methods for test scenarios
  createTestScenario: (name: string, description: string) => ({
    name,
    description,
    timestamp: new Date().toISOString()
  }),

  // Performance and load testing configuration
  performanceThresholds: {
    maxResponseTime: 2000, // 2 seconds
    minThroughput: 50, // requests per second
    maxMemoryUsage: 100 // MB
  }
};

// Global error handler for tests with enhanced logging
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  throw reason;
});

// Increase Jest timeout
jest.setTimeout(TEST_CONFIG.maxTestTimeout);