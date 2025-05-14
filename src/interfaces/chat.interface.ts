import { PersonalityProfile } from './personality.interface';
import { MultiAgentError, ErrorCodes } from './errors';

export interface ChatMessage {
  id: string;
  sender: {
    profileId: string;
    name: string;
  };
  content: string;
  timestamp: number;
}

export interface ConversationOrchestrator {
  /**
   * Start a new conversation session
   * @throws {MultiAgentError} SESSION_INITIALIZATION_FAILED if session creation fails
   * @throws {MultiAgentError} MAX_SESSIONS_EXCEEDED if session limit reached
   */
  startSession(agents: PersonalityProfile[]): Promise<string>;

  /**
   * Handle an incoming user message
   * @throws {MultiAgentError} INVALID_SESSION_ID for non-existent sessions
   * @throws {MultiAgentError} AGENT_UNAVAILABLE if routing fails
   */
  handleMessage(
    sessionId: string, 
    message: string
  ): Promise<{
    agentId: string;
    response: string;
    confidence: number;
  }[]>;

  /**
   * Get conversation history for a session
   * @throws {MultiAgentError} INVALID_SESSION_ID for non-existent sessions
   */
  getSessionHistory(
    sessionId: string, 
    options?: {
      limit?: number;
      offset?: number;
    }
  ): Promise<ChatMessage[]>;
}