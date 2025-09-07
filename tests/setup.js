// Global test setup and mocking configurations

// Configure global test environment
global.TEST_ENV = 'unit';

// Mock external dependencies
jest.mock('@/services/config', () => ({
    getConfig: jest.fn(() => ({
        apiBaseUrl: 'http://mock-api.test',
        logLevel: 'debug'
    }))
}));

// Global error handling for tests
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
    process.exit(1);
});

// Timeout configuration
jest.setTimeout(10000); // 10 seconds global test timeout