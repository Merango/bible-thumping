import { 
  PersonalityProfile, 
  InterfaceValidator, 
  ChatMessage, 
  ConversationSession 
} from '../src/interfaces/system-interfaces';

describe('System Interface Validation', () => {
  describe('PersonalityProfile Validation', () => {
    const validProfile: PersonalityProfile = {
      id: 'peter_disciple',
      name: 'Peter',
      description: 'Passionate apostle',
      tone: 'zealous',
      samplePrompts: ['Tell me about faith'],
      version: '1.0.0'
    };

    const invalidProfiles = [
      { ...validProfile, name: 'P' }, // Too short name
      { ...validProfile, name: '' }, // Empty name
      { 
        ...validProfile, 
        samplePrompts: new Array(15).fill('test prompt') // Too many prompts
      }
    ];

    test('Valid profile passes validation', () => {
      expect(InterfaceValidator.validatePersonalityProfile(validProfile)).toBe(true);
    });

    test.each(invalidProfiles)('Invalid profile is rejected', (profile) => {
      expect(InterfaceValidator.validatePersonalityProfile(profile)).toBe(false);
    });
  });

  describe('ChatMessage Creation', () => {
    const validMessage: ChatMessage = {
      id: 'msg_123',
      sessionId: 'session_456',
      agentId: 'peter_disciple',
      content: 'Hello, I am Peter!',
      timestamp: Date.now(),
      type: 'agent'
    };

    test('Chat message can be created with valid data', () => {
      expect(validMessage).toBeDefined();
      expect(validMessage.type).toBe('agent');
    });
  });

  describe('Conversation Session Management', () => {
    const validSession: ConversationSession = {
      id: 'last_supper_session',
      participants: ['peter_disciple', 'john_disciple'],
      messages: [],
      startTime: Date.now(),
      lastActivityTime: Date.now(),
      status: 'active'
    };

    test('Conversation session initializes correctly', () => {
      expect(validSession.status).toBe('active');
      expect(validSession.participants).toHaveLength(2);
    });
  });
});