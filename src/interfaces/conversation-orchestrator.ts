// Conversation Orchestrator Interface
import { PersonalityProfile } from './personality-data-manager';
import { ChatbotEngineAdapter } from './chatbot-engine-adapter';

export interface OrchestratorAgentReply {
  agentId: string;
  profile: PersonalityProfile;
  reply: string;
}

export interface ConversationOrchestrator {
  /**
   * Handle an incoming user message in a conversation session
   * @param sessionId Unique session identifier
   * @param userMessage Incoming user message
   * @returns Array of agent replies
   */
  handleMessage(
    sessionId: string, 
    userMessage: string
  ): Promise<OrchestratorAgentReply[]>;

  /**
   * Initialize a new conversation session
   * @param selectedAgentIds Agents to be included in the session
   * @returns Unique session identifier
   */
  initializeSession(selectedAgentIds: string[]): string;
}