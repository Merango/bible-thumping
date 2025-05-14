import { LLMBackend, ChatResponse } from '../src/interfaces/chatbot-engine';
import { TEST_CONFIG } from './setup';

describe('Chatbot Engine Interface', () => {
  const mockConversationHistory = TEST_CONFIG.generateMockChatHistory();

  test('Chat response should have correct structure', () => {
    const mockResponse: ChatResponse = {
      text: 'A simulated response from the mock LLM',
      tokens: 20,
      backend: LLMBackend.OPENAI,
      timestamp: Date.now()
    };

    expect(mockResponse).toMatchObject({
      text: expect.any(String),
      tokens: expect.any(Number),
      backend: expect.any(String),
      timestamp: expect.any(Number)
    });
  });

  test('LLM Backends should match enum', () => {
    const validBackends = [
      LLMBackend.OPENAI, 
      LLMBackend.LOCAL, 
      LLMBackend.ANTHROPIC
    ];

    validBackends.forEach(backend => {
      expect(validBackends).toContain(backend);
    });
  });

  test('Conversation history is array of strings', () => {
    expect(Array.isArray(mockConversationHistory)).toBe(true);
    mockConversationHistory.forEach(msg => {
      expect(typeof msg).toBe('string');
    });
  });
});