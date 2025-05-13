import { 
  createPersonalityProfile,
  validateProfile,
  validateResponse,
  validateSession,
  ValidationError,
  SchemaValidationError,
  getValidationErrorDetails,
  PersonalityProfile,
  ChatbotResponse,
  ConversationSession
} from '../src/component-interfaces';

describe('Comprehensive Component Interface Validation', () => {
  describe('Personality Profile Validation', () => {
    const validProfileData: PersonalityProfile = {
      id: 'peter_disciple',
      name: 'Peter',
      description: 'Passionate follower of Jesus',
      tone: 'Zealous',
      samplePrompts: ['Tell me about your faith'],
      version: 1
    };

    test('creates a valid personality profile', () => {
      const profile = createPersonalityProfile(validProfileData);
      expect(profile).toEqual(validProfileData);
    });

    test('validates a complete personality profile', () => {
      expect(() => validateProfile(validProfileData)).not.toThrow();
    });

    test('throws SchemaValidationError for invalid profile', () => {
      const invalidProfiles = [
        { ...validProfileData, id: '' },
        { ...validProfileData, name: '' },
        { ...validProfileData, samplePrompts: [] },
        { ...validProfileData, version: 0 }
      ];

      invalidProfiles.forEach(profile => {
        expect(() => validateProfile(profile)).toThrow(SchemaValidationError);
      });
    });

    test('provides detailed validation error messages', () => {
      try {
        validateProfile({ 
          ...validProfileData, 
          id: '',
          name: '' 
        });
        fail('Should have thrown validation error');
      } catch (error) {
        if (error instanceof SchemaValidationError) {
          const errorDetails = getValidationErrorDetails(error);
          expect(errorDetails.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('Chatbot Response Validation', () => {
    const validResponse: ChatbotResponse = {
      agentId: 'peter_disciple',
      content: 'I believe in Jesus Christ!',
      confidence: 0.95,
      timestamp: Date.now()
    };

    test('validates a valid chatbot response', () => {
      expect(() => validateResponse(validResponse)).not.toThrow();
    });

    test('throws error for invalid response', () => {
      const invalidResponses = [
        { ...validResponse, agentId: '' },
        { ...validResponse, content: '' },
        { ...validResponse, confidence: 1.5 },
        { ...validResponse, confidence: -0.1 }
      ];

      invalidResponses.forEach(response => {
        expect(() => validateResponse(response)).toThrow(SchemaValidationError);
      });
    });
  });

  describe('Conversation Session Validation', () => {
    const validSession: ConversationSession = {
      sessionId: 'last_supper_session',
      participants: ['peter', 'john', 'jesus'],
      startTime: Date.now(),
      messages: [{
        agentId: 'peter_disciple',
        content: 'I will never deny you!',
        confidence: 0.9,
        timestamp: Date.now()
      }]
    };

    test('validates a valid conversation session', () => {
      expect(() => validateSession(validSession)).not.toThrow();
    });

    test('throws error for invalid session', () => {
      const invalidSessions = [
        { ...validSession, sessionId: '' },
        { ...validSession, participants: [] },
        { 
          ...validSession, 
          messages: [{
            agentId: '',
            content: '',
            confidence: 2,
            timestamp: Date.now()
          }]
        }
      ];

      invalidSessions.forEach(session => {
        expect(() => validateSession(session)).toThrow(SchemaValidationError);
      });
    });
  });
});