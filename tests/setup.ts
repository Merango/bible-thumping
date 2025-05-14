// Global test configuration and utilities

import { config } from 'dotenv';

// Load environment variables
config();

// Centralized test configuration
export const TEST_CONFIG = {
  maxTestTimeout: 10000, // 10 seconds
  testEnvironment: process.env.NODE_ENV || 'test',
  
  // Mock data generators
  generateMockPersonality: () => ({
    id: `test-profile-${Math.random().toString(36).substr(2, 9)}`,
    name: 'Test Disciple',
    description: 'A mock personality for testing',
    tone: 'scholarly',
    samplePrompts: [
      'Explain the concept of divine grace',
      'What is the nature of spiritual love?'
    ],
    version: 1
  }),

  generateMockChatHistory: (length = 3) => 
    Array.from({ length }, (_, i) => `Mock message ${i + 1}`)
};

// Global error handler for tests
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  throw reason;
});