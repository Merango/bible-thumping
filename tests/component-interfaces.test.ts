import { PersonalityProfile, PersonalityDataManager } from '../src/interfaces/personality-data-manager';
import { ChatbotEngineAdapter, ChatHistory } from '../src/interfaces/chatbot-engine-adapter';
import { ConversationOrchestrator, OrchestratorAgentReply } from '../src/interfaces/conversation-orchestrator';

describe('Component Interfaces', () => {
  describe('Personality Data Manager', () => {
    const mockPersonalityDataManager: PersonalityDataManager = {
      loadProfile: (id: string) => {
        if (id === 'valid_profile') {
          return {
            id: 'valid_profile',
            name: 'Test Profile',
            description: 'A mock profile',
            tone: 'philosophical',
            samplePrompts: ['What is truth?'],
            version: 1
          };
        }
        return null;
      },
      validateProfile: (profile: PersonalityProfile) => {
        return profile.name.length > 0 && profile.samplePrompts.length > 0;
      },
      saveProfile: (profile: PersonalityProfile) => {
        return profile.version + 1;
      }
    };

    it('should load a valid profile', () => {
      const profile = mockPersonalityDataManager.loadProfile('valid_profile');
      expect(profile).toBeTruthy();
      expect(profile?.name).toBe('Test Profile');
    });

    it('should validate profile correctly', () => {
      const validProfile: PersonalityProfile = {
        id: 'test',
        name: 'Valid Profile',
        description: 'Test Description',
        tone: 'neutral',
        samplePrompts: ['Hello'],
        version: 1
      };
      expect(mockPersonalityDataManager.validateProfile(validProfile)).toBeTruthy();
    });
  });

  describe('Chatbot Engine Adapter', () => {
    const mockChatbotEngineAdapter: ChatbotEngineAdapter = {
      generateResponse: async (profile, history) => {
        return `Mocked response for ${profile.name}`;
      },
      checkBackendHealth: async () => true
    };

    it('should generate a response', async () => {
      const mockProfile: PersonalityProfile = {
        id: 'test_profile',
        name: 'Test Agent',
        description: 'A test agent',
        tone: 'formal',
        samplePrompts: ['Greetings'],
        version: 1
      };
      const mockHistory: ChatHistory = { messages: [] };
      
      const response = await mockChatbotEngineAdapter.generateResponse(mockProfile, mockHistory);
      expect(response).toContain('Mocked response');
    });

    it('should check backend health', async () => {
      const health = await mockChatbotEngineAdapter.checkBackendHealth();
      expect(health).toBeTruthy();
    });
  });

  describe('Conversation Orchestrator', () => {
    const mockConversationOrchestrator: ConversationOrchestrator = {
      handleMessage: async (sessionId, userMessage) => {
        const mockReply: OrchestratorAgentReply[] = [{
          agentId: 'agent1',
          profile: {
            id: 'agent1',
            name: 'Test Agent',
            description: 'A mock agent',
            tone: 'philosophical',
            samplePrompts: ['What is meaning?'],
            version: 1
          },
          reply: 'A philosophical response'
        }];
        return mockReply;
      },
      initializeSession: (selectedAgentIds) => {
        return 'mock_session_' + selectedAgentIds.join('_');
      }
    };

    it('should handle messages and return agent replies', async () => {
      const replies = await mockConversationOrchestrator.handleMessage('session1', 'Hello');
      expect(replies.length).toBeGreaterThan(0);
      expect(replies[0].reply).toBe('A philosophical response');
    });

    it('should initialize a session with selected agents', () => {
      const sessionId = mockConversationOrchestrator.initializeSession(['agent1', 'agent2']);
      expect(sessionId).toContain('mock_session_agent1_agent2');
    });
  });
});