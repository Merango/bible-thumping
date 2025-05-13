/**
 * Interface for Chatbot Engine Adapter
 * Provides abstraction for generating responses from different language models
 */
export interface ChatContext {
  conversationHistory: string[];
  maxTokens?: number;
}

export interface ChatbotEngineAdapter {
  /**
   * Generate a response based on a given profile and conversation context
   * @param profileId Identifier of the agent's personality
   * @param context Current conversation context
   * @returns Generated response string
   */
  generateResponse(
    profileId: string, 
    context: ChatContext
  ): Promise<string>;

  /**
   * Check current backend availability and connection status
   * @returns Boolean indicating system readiness
   */
  healthCheck(): Promise<boolean>;
}