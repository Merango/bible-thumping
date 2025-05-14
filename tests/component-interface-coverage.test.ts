import { 
  PersonalityProfile, 
  ChatResponse, 
  ConversationSession,
  ChatMessage,
  ChatRequest,
  ChatAPIResponse,
  SystemError
} from '../src/testing-strategy/component-interfaces';

// Utility function to create valid mock data
function createMockPersonalityProfile(overrides: Partial<PersonalityProfile> = {}): PersonalityProfile {
  return {
    id: 'test_profile_001',
    name: 'Test Disciple',
    description: 'A test profile for comprehensive validation',
    tone: 'neutral',
    language: 'English',
    responseStyle: 'standard',
    version: '1.0.0',
    ...overrides
  };
}

describe('Component Interface Comprehensive Testing', () => {
  // Personality Profile Exhaustive Tests
  describe('PersonalityProfile Validation', () => {
    const validProfile = createMockPersonalityProfile();

    test('should create a valid profile with all required fields', () => {
      expect(validProfile).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        tone: expect.any(String),
        language: expect.any(String),
        responseStyle: expect.any(String),
        version: expect.any(String)
      }));
    });

    test('should reject invalid tone', () => {
      expect(() => 
        createMockPersonalityProfile({ tone: 'invalid' as any })
      ).toThrow();
    });
  });

  // Chat Response Comprehensive Testing
  describe('ChatResponse Interface', () => {
    const mockResponse: ChatResponse = {
      text: 'Test response message',
      confidence: 0.85,
      tokens: 20,
      timestamp: Date.now()
    };

    test('should have valid response structure', () => {
      expect(mockResponse).toEqual({
        text: expect.any(String),
        confidence: expect.any(Number),
        tokens: expect.any(Number),
        timestamp: expect.any(Number)
      });
    });

    test('confidence should be between 0 and 1', () => {
      expect(mockResponse.confidence).toBeGreaterThanOrEqual(0);
      expect(mockResponse.confidence).toBeLessThanOrEqual(1);
    });
  });

  // Conversation Session Detailed Testing
  describe('ConversationSession Management', () => {
    let session: ConversationSession;

    beforeEach(() => {
      session = {
        sessionId: 'test_session_001',
        participants: ['peter', 'john'],
        messages: [],
        startTime: Date.now(),
        lastActivityTime: Date.now()
      };
    });

    test('should initialize session correctly', () => {
      expect(session.participants).toHaveLength(2);
      expect(session.messages).toHaveLength(0);
    });

    test('should allow adding messages', () => {
      const message: ChatMessage = {
        id: 'msg_001',
        sender: 'peter',
        content: 'Hello, John!',
        timestamp: Date.now()
      };
      session.messages.push(message);
      expect(session.messages).toHaveLength(1);
    });
  });

  // API Request/Response Testing
  describe('API Interaction Interfaces', () => {
    test('should create valid chat request', () => {
      const request: ChatRequest = {
        message: 'Test message',
        sessionId: 'session_001',
        personalities: ['peter', 'john']
      };
      
      expect(request).toEqual({
        message: expect.any(String),
        sessionId: expect.any(String),
        personalities: expect.any(Array)
      });
    });

    test('should create valid API response', () => {
      const apiResponse: ChatAPIResponse = {
        replies: [{
          text: 'Test reply',
          confidence: 0.9,
          tokens: 15,
          timestamp: Date.now()
        }],
        sessionId: 'session_002',
        timestamp: Date.now()
      };

      expect(apiResponse).toEqual({
        replies: expect.any(Array),
        sessionId: expect.any(String),
        timestamp: expect.any(Number)
      });
    });
  });

  // Error Handling Interface Testing
  describe('System Error Handling', () => {
    test('should create valid system error', () => {
      const error: SystemError = {
        code: 'ERR_TEST_001',
        message: 'Test error message',
        severity: 'error',
        timestamp: Date.now()
      };

      expect(error).toEqual({
        code: expect.any(String),
        message: expect.any(String),
        severity: expect.any(String),
        timestamp: expect.any(Number)
      });
    });

    test('should handle different error severities', () => {
      const severities: SystemError['severity'][] = ['warning', 'error', 'critical'];
      severities.forEach(severity => {
        const error: SystemError = {
          code: `ERR_${severity.toUpperCase()}_001`,
          message: `${severity} test message`,
          severity,
          timestamp: Date.now()
        };
        expect(error.severity).toBe(severity);
      });
    });
  });
});

// Validation function for tone
function validateTone(tone: string): boolean {
  const validTones = ['serious', 'playful', 'neutral'];
  if (!validTones.includes(tone)) {
    throw new Error('Invalid tone');
  }
  return true;
}