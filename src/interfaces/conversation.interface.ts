import { PersonalityProfile } from './personality.interface';

/**
 * Represents a message in a conversation
 */
export interface ChatMessage {
  id: string;
  agentId: string;
  content: string;
  timestamp: Date;
}

/**
 * Defines the interface for managing conversation state
 */
export interface ConversationState {
  sessionId: string;
  participants: PersonalityProfile[];
  messages: ChatMessage[];
  
  /**
   * Add a new message to the conversation
   * @param message Message to be added
   */
  addMessage(message: ChatMessage): void;
  
  /**
   * Get the conversation history
   * @returns Array of messages in chronological order
   */
  getMessageHistory(): ChatMessage[];
}

/**
 * Conversation Orchestrator interface
 */
export interface ConversationOrchestrator {
  /**
   * Handle an incoming user message
   * @param sessionId Unique session identifier
   * @param userMessage User's input message
   * @returns Responses from participating agents
   */
  handleMessage(sessionId: string, userMessage: string): Promise<{
    agentId: string;
    response: string;
  }[]>;
}