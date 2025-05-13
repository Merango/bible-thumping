import { 
  validatePersonalityProfile, 
  createPersonalityProfile,
  ValidationError,
  PersonalityProfile,
  ChatbotResponse,
  ConversationSession
} from '../src/component-interfaces';

describe('Component Interfaces', () => {
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
      expect(() => validatePersonalityProfile(validProfileData)).not.toThrow();
    });

    test('throws error for empty profile ID', () => {
      expect(() => validatePersonalityProfile({
        ...validProfileData,
        id: ''
      })).toThrow(ValidationError);
    });

    test('throws error for empty name', () => {
      expect(() => validatePersonalityProfile({
        ...validProfileData,
        name: ''
      })).toThrow(ValidationError);
    });

    test('throws error for empty sample prompts', () => {
      expect(() => validatePersonalityProfile({
        ...validProfileData,
        samplePrompts: []
      })).toThrow(ValidationError);
    });

    test('throws error for invalid version', () => {
      expect(() => validatePersonalityProfile({
        ...validProfileData,
        version: 0
      })).toThrow(ValidationError);
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

  describe('Profile Creation Factory', () => {
    test('creates profile with partial data', () => {
      const partialData = {
        id: 'john_disciple',
        name: 'John',
        samplePrompts: ['What do you believe?']
      };

      const profile = createPersonalityProfile(partialData);
      
      expect(profile.id).toBe('john_disciple');
      expect(profile.name).toBe('John');
      expect(profile.version).toBe(1);
      expect(profile.description).toBe('');
    });

    test('throws error for completely invalid profile', () => {
      expect(() => createPersonalityProfile({})).toThrow(ValidationError);
    });
  });
});