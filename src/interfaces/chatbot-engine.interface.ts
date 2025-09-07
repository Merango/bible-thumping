/**
 * Custom error types for Chatbot Engine
 */
export class ChatbotEngineError extends Error {
  constructor(
    message: string, 
    public code?: string, 
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'ChatbotEngineError';
  }
}

export interface ChatContext {
  conversationHistory: string[];
  maxTokens?: number;
  agentProfile?: string;
}

export interface ChatbotEngineAdapter {
  /**
   * Generate a response based on a given profile and conversation context
   * @param profileId Identifier of the agent's personality
   * @param context Current conversation context
   * @returns Generated response string
   * @throws {ChatbotEngineError} For generation failures
   */
  generateResponse(
    profileId: string, 
    context: ChatContext
  ): Promise<{
    response: string;
    tokenCount: number;
    generationTime: number;
  }>;

  /**
   * Check current backend availability and connection status
   * @returns Detailed health check result
   */
  healthCheck(): Promise<{
    isHealthy: boolean;
    backendVersion: string;
    responseTime: number;
    supportedProfiles: string[];
  }>;

  /**
   * Estimate token usage for a given context
   * @param context Conversation context
   * @returns Token estimation details
   */
  estimateTokenUsage(context: ChatContext): {
    inputTokens: number;
    estimatedResponseTokens: number;
  };
}