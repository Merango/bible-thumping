// Chatbot Engine Adapter Interface
import { PersonalityProfile } from './personality-data-manager';

export interface ChatHistory {
  messages: Array<{
    role: 'user' | 'agent';
    content: string;
  }>;
}

export interface ChatbotEngineAdapter {
  /**
   * Generate a response from an AI agent
   * @param profile Personality profile for response context
   * @param history Conversation history
   * @returns Generated AI response
   */
  generateResponse(
    profile: PersonalityProfile, 
    history: ChatHistory
  ): Promise<string>;

  /**
   * Check the health and availability of the underlying LLM backend
   * @returns Boolean indicating backend readiness
   */
  checkBackendHealth(): Promise<boolean>;
}