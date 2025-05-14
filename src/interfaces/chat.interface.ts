import { PersonalityProfile } from './personality.interface';

/**
 * Represents a single message in a conversation
 */
export interface ChatMessage {
  id: string;
  sender: {
    profileId: string;
    name: string;
  };
  content: string;
  timestamp: number;
}

/**
 * Interface for managing conversations and routing messages
 */
export interface ConversationOrchestrator {
  /**
   * Start a new conversation session
   * @returns Unique session identifier
   */
  startSession(agents: PersonalityProfile[]): string;

  /**
   * Handle an incoming user message
   * @param sessionId - Active conversation session
   * @param message - User's message
   * @returns Array of agent responses
   */
  handleMessage(
    sessionId: string, 
    message: string
  ): Promise<{
    agentId: string;
    response: string;
  }[]>;

  /**
   * Get conversation history for a session
   * @param sessionId - Conversation session ID
   * @returns Array of messages in chronological order
   */
  getSessionHistory(sessionId: string): ChatMessage[];
}