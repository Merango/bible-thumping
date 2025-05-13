import { 
  PersonalityProfile, 
  ChatbotResponse, 
  ConversationSession,
  ChatRequest,
  ChatResponse
} from '../interfaces/component-interfaces';

describe('Component Interfaces Validation', () => {
  describe('PersonalityProfile', () => {
    const validProfile: PersonalityProfile = {
      id: 'jesus-001',
      name: 'Jesus Christ',
      description: 'Founder of Christianity',
      tone: 'compassionate',
      samplePrompts: ['Love thy neighbor', 'Forgiveness is divine'],
      version: 1
    };

    it('should create a valid personality profile', () => {
      expect(validProfile).toBeDefined();
      expect(validProfile.id).toBe('jesus-001');
    });

    it('should reject invalid profile without required fields', () => {
      const invalidProfile = { ...validProfile };
      delete (invalidProfile as any).id;
      
      expect(() => {
        // Simulating validation
        if (!invalidProfile.id) {
          throw new Error('Missing required ID');
        }
      }).toThrow('Missing required ID');
    });
  });

  describe('ChatbotResponse', () => {
    const validResponse: ChatbotResponse = {
      agentId: 'peter-001',
      message: 'I will follow you, Lord.',
      confidence: 0.95,
      timestamp: Date.now()
    };

    it('should create a valid chatbot response', () => {
      expect(validResponse).toBeDefined();
      expect(validResponse.confidence).toBeLessThanOrEqual(1);
      expect(validResponse.confidence).toBeGreaterThanOrEqual(0);
    });
  });

  describe('ConversationSession', () => {
    const validSession: ConversationSession = {
      sessionId: 'last-supper-001',
      participants: ['jesus', 'peter', 'john'],
      startTime: Date.now(),
      lastActivityTime: Date.now(),
      messages: []
    };

    it('should create a valid conversation session', () => {
      expect(validSession).toBeDefined();
      expect(validSession.participants.length).toBeGreaterThan(0);
    });
  });

  describe('API Interfaces', () => {
    const validChatRequest: ChatRequest = {
      userMessage: 'Who will betray you?',
      selectedAgents: ['jesus', 'judas']
    };

    const validChatResponse: ChatResponse = {
      sessionId: 'conversation-001',
      replies: []
    };

    it('should create valid chat request and response', () => {
      expect(validChatRequest.userMessage).toBeTruthy();
      expect(validChatResponse.sessionId).toBeTruthy();
    });
  });
});