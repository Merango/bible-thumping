// Enhanced Test Configuration and Utilities

import { config } from 'dotenv';

// Load environment variables
config();

// Centralized test configuration with enhanced flexibility
export const TEST_CONFIG = {
  maxTestTimeout: 10000, // 10 seconds
  testEnvironment: process.env.NODE_ENV || 'test',
  
  // Advanced mock data generators with more realistic scenarios
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
    createdAt: new Date(),
    ...overrides
  }),

  generateMockChatHistory: (length = 3, customMessages?: string[]) => 
    customMessages || 
    Array.from({ length }, (_, i) => `Contextual message ${i + 1}`),

  // Error simulation utilities
  simulateNetworkError: () => {
    throw new Error('Simulated network connectivity issue');
  },

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

// Optional: Add global test timeout
jest.setTimeout(TEST_CONFIG.maxTestTimeout);