// Chatbot Engine Adapter Interface
import { PersonalityProfile } from './personality-data-manager.interface';

export interface ChatHistory {
  messages: {
    role: 'user' | 'agent';
    content: string;
  }[];
}

export interface ChatbotEngineAdapter {
  /**
   * Generate a response based on agent profile and conversation history
   * @param profile Agent's personality profile
   * @param history Conversation history
   * @returns Generated response string
   */
  generateResponse(
    profile: PersonalityProfile, 
    history: ChatHistory
  ): Promise<string>;

  /**
   * Get supported backend types
   * @returns Array of supported LLM backend types
   */
  getSupportedBackends(): string[];
}