/**
 * Interface for Conversation Orchestrator
 * Manages multi-agent conversation flow and state
 */
export interface AgentReply {
  agentId: string;
  message: string;
  timestamp: number;
}

export interface ConversationSession {
  sessionId: string;
  agents: string[];
  history: AgentReply[];
}

export interface ConversationOrchestrator {
  /**
   * Initialize a new conversation session
   * @param agents List of agent profile IDs to participate
   * @returns Unique session identifier
   */
  createSession(agents: string[]): Promise<string>;

  /**
   * Handle an incoming user message
   * @param sessionId Active conversation session
   * @param userMessage User's input message
   * @returns List of agent replies
   */
  handleMessage(
    sessionId: string, 
    userMessage: string
  ): Promise<AgentReply[]>;

  /**
   * Retrieve current conversation session state
   * @param sessionId Session to retrieve
   * @returns Complete conversation session details
   */
  getSessionState(sessionId: string): Promise<ConversationSession>;
}