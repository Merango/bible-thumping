/**
 * Custom error types for Conversation Orchestrator
 */
export class ConversationOrchestrationError extends Error {
  constructor(
    message: string, 
    public code?: string, 
    public retryContext?: any
  ) {
    super(message);
    this.name = 'ConversationOrchestrationError';
  }
}

export interface AgentReply {
  agentId: string;
  message: string;
  timestamp: number;
  confidence?: number;
}

export interface ConversationSession {
  sessionId: string;
  agents: string[];
  history: AgentReply[];
  createdAt: number;
  lastActivityAt: number;
}

export interface ConversationOrchestrator {
  /**
   * Initialize a new conversation session
   * @param agents List of agent profile IDs to participate
   * @param initialContext Optional starting context
   * @returns Unique session identifier
   * @throws {ConversationOrchestrationError} If session creation fails
   */
  createSession(
    agents: string[], 
    initialContext?: Record<string, any>
  ): Promise<{
    sessionId: string;
    initialState: ConversationSession;
  }>;

  /**
   * Handle an incoming user message
   * @param sessionId Active conversation session
   * @param userMessage User's input message
   * @returns Detailed agent replies
   * @throws {ConversationOrchestrationError} For routing or generation failures
   */
  handleMessage(
    sessionId: string, 
    userMessage: string
  ): Promise<{
    replies: AgentReply[];
    sessionState: ConversationSession;
  }>;

  /**
   * Retrieve current conversation session state
   * @param sessionId Session to retrieve
   * @returns Complete conversation session details
   */
  getSessionState(sessionId: string): Promise<ConversationSession>;

  /**
   * Close an active conversation session
   * @param sessionId Session to close
   * @returns Closure summary
   */
  closeSession(sessionId: string): Promise<{
    sessionId: string;
    duration: number;
    messageCount: number;
  }>;
}