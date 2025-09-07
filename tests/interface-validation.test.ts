import { 
  PersonalityProfile, 
  PersonalityDataManager,
  ChatbotEngineAdapter,
  ConversationOrchestrator 
} from '../src/interfaces';

describe('Component Interface Validation', () => {
  describe('PersonalityDataManager', () => {
    const mockManager: PersonalityDataManager = {
      async loadProfile(id: string) {
        if (!id) throw new Error('Invalid profile ID');
        return {
          id,
          name: 'Test Profile',
          description: 'A test personality',
          tone: 'neutral',
          samplePrompts: ['Hello', 'How are you?'],
          version: 1
        };
      },
      async saveProfile(profile) {
        if (!profile.name) throw new Error('Invalid profile');
      },
      validateProfile(profile) {
        return !!(profile.name && profile.id);
      },
      async listProfiles() {
        return [];
      }
    };

    it('should load a valid profile', async () => {
      const profile = await mockManager.loadProfile('test-id');
      expect(profile).toBeDefined();
      expect(profile.id).toBe('test-id');
    });

    it('should validate profile schema', () => {
      const validProfile: PersonalityProfile = {
        id: 'valid-profile',
        name: 'Valid Profile',
        description: 'A valid test profile',
        tone: 'friendly',
        samplePrompts: ['Test prompt'],
        version: 1
      };

      expect(mockManager.validateProfile(validProfile)).toBeTruthy();
    });
  });

  describe('ChatbotEngineAdapter', () => {
    const mockAdapter: ChatbotEngineAdapter = {
      async generateResponse(profile, history) {
        if (!profile || !history) throw new Error('Invalid input');
        return 'Mocked response';
      },
      validatePrompt(prompt) {
        return prompt.length > 0 && prompt.length <= 500;
      },
      getSupportedBackends() {
        return ['openai', 'local-llm'];
      }
    };

    it('should generate a response', async () => {
      const response = await mockAdapter.generateResponse(
        { id: 'test', name: 'Test', description: '', tone: '', samplePrompts: [], version: 1 },
        ['Hello']
      );
      expect(response).toBe('Mocked response');
    });

    it('should validate prompt length', () => {
      expect(mockAdapter.validatePrompt('Short prompt')).toBeTruthy();
      expect(mockAdapter.validatePrompt(''.padStart(600, 'x'))).toBeFalsy();
    });
  });

  describe('ConversationOrchestrator', () => {
    const mockOrchestrator: ConversationOrchestrator = {
      async handleMessage(sessionId, userMessage) {
        if (!sessionId || !userMessage) throw new Error('Invalid input');
        return [{
          agentId: 'test-agent',
          message: 'Mocked agent response',
          timestamp: Date.now()
        }];
      },
      async initializeSession(agents) {
        if (!agents || agents.length === 0) throw new Error('No agents specified');
        return 'session-123';
      },
      async getSessionHistory(sessionId) {
        if (!sessionId) throw new Error('Invalid session ID');
        return [];
      }
    };

    it('should handle a message', async () => {
      const responses = await mockOrchestrator.handleMessage('session-1', 'Test message');
      expect(responses).toHaveLength(1);
      expect(responses[0].agentId).toBe('test-agent');
    });

    it('should initialize a session', async () => {
      const sessionId = await mockOrchestrator.initializeSession(['agent1', 'agent2']);
      expect(sessionId).toBe('session-123');
    });
  });
});