import { 
  LLMBackend, 
  ChatResponse, 
  ChatbotEngineError,
  ChatbotEngineInterface 
} from '../src/interfaces/chatbot-engine';
import { TEST_CONFIG } from './setup';

// Mock implementation for testing
class MockChatbotEngine implements ChatbotEngineInterface {
  private currentBackend: LLMBackend = LLMBackend.OPENAI;
  private compatibleProfiles = ['test-profile-001'];

  async generateResponse(
    profileId: string, 
    conversationHistory: string[], 
    userMessage: string
  ): Promise<ChatResponse> {
    if (!this.compatibleProfiles.includes(profileId)) {
      throw new ChatbotEngineError(
        'PROFILE_INCOMPATIBLE', 
        `Profile ${profileId} not compatible with current backend`
      );
    }

    if (conversationHistory.length > 10) {
      throw new ChatbotEngineError(
        'TOKEN_LIMIT_EXCEEDED', 
        'Conversation history exceeds maximum allowed length'
      );
    }

    return {
      text: `Simulated response to: ${userMessage}`,
      tokens: userMessage.split(' ').length,
      backend: this.currentBackend,
      timestamp: Date.now(),
      confidence: 0.85,
      modelVersion: '1.0.0'
    };
  }

  switchBackend(backend: LLMBackend): void {
    if (backend === this.currentBackend) {
      throw new ChatbotEngineError(
        'BACKEND_UNAVAILABLE', 
        'Selected backend is already in use'
      );
    }
    this.currentBackend = backend;
  }

  getCurrentBackend(): LLMBackend {
    return this.currentBackend;
  }

  async validateProfileCompatibility(profileId: string): Promise<boolean> {
    return this.compatibleProfiles.includes(profileId);
  }
}

describe('Chatbot Engine Interface', () => {
  let chatbotEngine: MockChatbotEngine;
  const mockProfileId = 'test-profile-001';
  const mockConversationHistory = ['Hello', 'How are you?'];

  beforeEach(() => {
    chatbotEngine = new MockChatbotEngine();
  });

  describe('Response Generation', () => {
    test('Successful response generation', async () => {
      const response = await chatbotEngine.generateResponse(
        mockProfileId, 
        mockConversationHistory, 
        'Tell me about grace'
      );

      expect(response).toMatchObject({
        text: expect.any(String),
        tokens: expect.any(Number),
        backend: expect.any(String),
        timestamp: expect.any(Number),
        confidence: expect.any(Number),
        modelVersion: expect.any(String)
      });
    });

    test('Response generation with incompatible profile fails', async () => {
      await expect(chatbotEngine.generateResponse(
        'incompatible-profile', 
        mockConversationHistory, 
        'Test message'
      )).rejects.toThrow(ChatbotEngineError);
    });

    test('Excessive conversation history triggers error', async () => {
      const longHistory = Array(15).fill('Previous message');
      await expect(chatbotEngine.generateResponse(
        mockProfileId, 
        longHistory, 
        'Test message'
      )).rejects.toThrow(ChatbotEngineError);
    });
  });

  describe('Backend Management', () => {
    test('Backend switching works correctly', () => {
      const initialBackend = chatbotEngine.getCurrentBackend();
      chatbotEngine.switchBackend(LLMBackend.LOCAL);
      
      expect(chatbotEngine.getCurrentBackend()).toBe(LLMBackend.LOCAL);
    });

    test('Switching to same backend throws error', () => {
      expect(() => {
        chatbotEngine.switchBackend(chatbotEngine.getCurrentBackend());
      }).toThrow(ChatbotEngineError);
    });
  });

  describe('Profile Compatibility', () => {
    test('Profile compatibility check', async () => {
      const isCompatible = await chatbotEngine.validateProfileCompatibility(mockProfileId);
      expect(isCompatible).toBe(true);

      const isIncompatible = await chatbotEngine.validateProfileCompatibility('unknown-profile');
      expect(isIncompatible).toBe(false);
    });
  });
});