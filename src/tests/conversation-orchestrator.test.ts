import { 
  ConversationOrchestrator, 
  ConversationOrchestrationError,
  AgentReply
} from '../interfaces/conversation-orchestrator.interface';
import { schemaValidator } from '../utils/schema-validator';

// Mock implementation for testing
class MockConversationOrchestrator implements ConversationOrchestrator {
  private sessions: Record<string, any> = {};

  async createSession(agents: string[], initialContext?: Record<string, any>) {
    const sessionId = `session-${Date.now()}`;
    
    const session = {
      sessionId,
      agents,
      history: [],
      createdAt: Date.now(),
      lastActivityAt: Date.now()
    };

    this.sessions[sessionId] = session;

    return {
      sessionId,
      initialState: session
    };
  }

  async handleMessage(sessionId: string, userMessage: string) {
    const session = this.sessions[sessionId];
    if (!session) {
      throw new ConversationOrchestrationError('Session not found', 'SESSION_NOT_FOUND');
    }

    const replies: AgentReply[] = session.agents.map((agentId: string) => ({
      agentId,
      message: `Response to: ${userMessage}`,
      timestamp: Date.now(),
      confidence: 0.9
    }));

    session.history.push(...replies);
    session.lastActivityAt = Date.now();

    return {
      replies,
      sessionState: session
    };
  }

  async getSessionState(sessionId: string) {
    const session = this.sessions[sessionId];
    if (!session) {
      throw new ConversationOrchestrationError('Session not found', 'SESSION_NOT_FOUND');
    }
    return session;
  }

  async closeSession(sessionId: string) {
    const session = this.sessions[sessionId];
    if (!session) {
      throw new ConversationOrchestrationError('Session not found', 'SESSION_NOT_FOUND');
    }

    const duration = Date.now() - session.createdAt;
    delete this.sessions[sessionId];

    return {
      sessionId,
      duration,
      messageCount: session.history.length
    };
  }
}

describe('ConversationOrchestrator', () => {
  let orchestrator: ConversationOrchestrator;

  beforeEach(() => {
    orchestrator = new MockConversationOrchestrator();
  });

  test('should create a new session', async () => {
    const agents = ['jesus', 'peter'];
    const { sessionId, initialState } = await orchestrator.createSession(agents);

    expect(sessionId).toBeDefined();
    expect(initialState.agents).toEqual(agents);
    expect(initialState.history).toHaveLength(0);
  });

  test('should handle message in existing session', async () => {
    const { sessionId } = await orchestrator.createSession(['jesus', 'peter']);
    const result = await orchestrator.handleMessage(sessionId, 'Hello, disciples');

    expect(result.replies).toHaveLength(2);
    expect(result.sessionState.history).toHaveLength(2);
  });

  test('should retrieve session state', async () => {
    const { sessionId } = await orchestrator.createSession(['jesus']);
    await orchestrator.handleMessage(sessionId, 'First message');

    const state = await orchestrator.getSessionState(sessionId);
    expect(state.history).toHaveLength(1);
  });

  test('should close session', async () => {
    const { sessionId } = await orchestrator.createSession(['jesus']);
    await orchestrator.handleMessage(sessionId, 'Closing message');

    const closeResult = await orchestrator.closeSession(sessionId);
    expect(closeResult.sessionId).toBe(sessionId);
    expect(closeResult.messageCount).toBeGreaterThan(0);
  });

  test('should validate agent reply schema', async () => {
    const { sessionId } = await orchestrator.createSession(['jesus']);
    const result = await orchestrator.handleMessage(sessionId, 'Validate schema');

    const validation = schemaValidator.validate('AgentReply', result.replies[0]);
    expect(validation.isValid).toBe(true);
  });
});