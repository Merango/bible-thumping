// Chatbot Engine Adapter Interface

export enum LLMBackend {
  OPENAI = 'openai',
  LOCAL = 'local',
  ANTHROPIC = 'anthropic'
}

export interface ChatResponse {
  text: string;
  tokens: number;
  backend: LLMBackend;
  timestamp: number;
}

export interface ChatbotEngineInterface {
  /**
   * Generate a response based on personality and conversation history
   * @param profileId Personality profile identifier
   * @param conversationHistory Previous messages in the conversation
   * @param userMessage Current user input
   * @returns Structured chat response
   */
  generateResponse(
    profileId: string, 
    conversationHistory: string[], 
    userMessage: string
  ): Promise<ChatResponse>;

  /**
   * Switch the underlying LLM backend
   * @param backend Target backend to use
   */
  switchBackend(backend: LLMBackend): void;

  /**
   * Get current backend configuration
   * @returns Current LLM backend in use
   */
  getCurrentBackend(): LLMBackend;
}