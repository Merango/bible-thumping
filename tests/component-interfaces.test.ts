import { 
  validatePersonalityProfile, 
  PersonalityProfile,
  ChatbotResponse,
  ConversationSession
} from '../src/component-interfaces';

describe('Component Interfaces', () => {
  describe('Personality Profile Validation', () => {
    const validProfile: PersonalityProfile = {
      id: 'peter_disciple',
      name: 'Peter',
      description: 'Passionate follower of Jesus',
      tone: 'Zealous',
      samplePrompts: ['Tell me about your faith'],
      version: 1
    };

    const invalidProfile: PersonalityProfile = {
      id: '',
      name: '',
      description: '',
      tone: '',
      samplePrompts: [],
      version: 0
    };

    test('validates a complete personality profile', () => {
      expect(validatePersonalityProfile(validProfile)).toBe(true);
    });

    test('rejects an incomplete personality profile', () => {
      expect(validatePersonalityProfile(invalidProfile)).toBe(false);
    });
  });

  describe('Response and Session Types', () => {
    test('creates a valid chatbot response', () => {
      const response: ChatbotResponse = {
        agentId: 'peter_disciple',
        content: 'I believe in Jesus Christ!',
        confidence: 0.95,
        timestamp: Date.now()
      };

      expect(response.agentId).toBe('peter_disciple');
      expect(response.confidence).toBeGreaterThan(0);
    });

    test('creates a conversation session', () => {
      const session: ConversationSession = {
        sessionId: 'last_supper_session',
        participants: ['peter', 'john', 'jesus'],
        startTime: Date.now(),
        messages: []
      };

      expect(session.participants.length).toBe(3);
      expect(session.messages).toHaveLength(0);
    });
  });
});