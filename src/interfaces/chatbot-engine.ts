// Enhanced Chatbot Engine Interface with Comprehensive Error Handling

export class ChatbotEngineError extends Error {
  constructor(
    public code: 
      | 'GENERATION_ERROR' 
      | 'BACKEND_UNAVAILABLE' 
      | 'TOKEN_LIMIT_EXCEEDED' 
      | 'PROFILE_INCOMPATIBLE',
    message: string
  ) {
    super(message);
    this.name = 'ChatbotEngineError';
  }
}

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
  confidence?: number;
  modelVersion?: string;
}

export interface ChatbotEngineInterface {
  /**
   * Generate a response based on personality and conversation history
   * @param profileId Personality profile identifier
   * @param conversationHistory Previous messages in the conversation
   * @param userMessage Current user input
   * @returns Structured chat response
   * @throws {ChatbotEngineError} If response generation fails
   */
  generateResponse(
    profileId: string, 
    conversationHistory: string[], 
    userMessage: string
  ): Promise<ChatResponse>;

  /**
   * Switch the underlying LLM backend
   * @param backend Target backend to use
   * @throws {ChatbotEngineError} If backend switch fails
   */
  switchBackend(backend: LLMBackend): void;

  /**
   * Get current backend configuration
   * @returns Current LLM backend in use
   */
  getCurrentBackend(): LLMBackend;

  /**
   * Validate compatibility between profile and current backend
   * @param profileId Profile to validate
   * @returns Boolean indicating compatibility
   */
  validateProfileCompatibility(profileId: string): Promise<boolean>;
}