import { 
  ChatbotEngineAdapter, 
  ChatContext, 
  ChatbotEngineError 
} from '../interfaces/chatbot-engine.interface';
import { schemaValidator } from '../utils/schema-validator';

// Mock implementation for testing
class MockChatbotEngineAdapter implements ChatbotEngineAdapter {
  async generateResponse(profileId: string, context: ChatContext) {
    const validation = schemaValidator.validate('ChatContext', context);
    if (!validation.isValid) {
      throw new ChatbotEngineError('Invalid context', 'INVALID_CONTEXT');
    }

    return {
      response: `Response for ${profileId}: ${context.conversationHistory.join(' ')}`,
      tokenCount: context.conversationHistory.join(' ').length,
      generationTime: 100
    };
  }

  async healthCheck() {
    return {
      isHealthy: true,
      backendVersion: '1.0.0',
      responseTime: 50,
      supportedProfiles: ['jesus', 'peter', 'john']
    };
  }

  estimateTokenUsage(context: ChatContext) {
    return {
      inputTokens: context.conversationHistory.join(' ').length,
      estimatedResponseTokens: 100
    };
  }
}

describe('ChatbotEngineAdapter', () => {
  let engine: ChatbotEngineAdapter;

  beforeEach(() => {
    engine = new MockChatbotEngineAdapter();
  });

  test('should generate response with valid context', async () => {
    const context: ChatContext = {
      conversationHistory: ['Hello', 'How are you?'],
      maxTokens: 100
    };

    const result = await engine.generateResponse('jesus', context);
    expect(result.response).toContain('Response for jesus');
    expect(result.tokenCount).toBeGreaterThan(0);
  });

  test('should perform health check', async () => {
    const health = await engine.healthCheck();
    expect(health.isHealthy).toBe(true);
    expect(health.backendVersion).toBe('1.0.0');
  });

  test('should estimate token usage', () => {
    const context: ChatContext = {
      conversationHistory: ['Test message'],
      maxTokens: 50
    };

    const tokenUsage = engine.estimateTokenUsage(context);
    expect(tokenUsage.inputTokens).toBeGreaterThan(0);
    expect(tokenUsage.estimatedResponseTokens).toBe(100);
  });

  test('should throw error for invalid context', async () => {
    const invalidContext = {
      conversationHistory: null  // Invalid input
    };

    await expect(
      engine.generateResponse('jesus', invalidContext as ChatContext)
    ).rejects.toThrow(ChatbotEngineError);
  });
});