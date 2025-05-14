import { Result, BaseComponent } from './base';

// Agent Personality Profile
export interface AgentProfile extends BaseComponent {
  name: string;
  description: string;
  tone: string;
  dialoguePrompts: string[];
  version: string;
}

// Conversation Session
export interface ConversationSession {
  id: string;
  participants: string[];
  startTime: number;
  messages: ChatMessage[];
  state: 'active' | 'completed' | 'paused';
}

// Chat Message Structure
export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// Chatbot Engine Interface
export interface ChatbotEngine extends BaseComponent {
  generateResponse(
    profile: AgentProfile, 
    conversationHistory: ChatMessage[]
  ): Promise<Result<ChatMessage>>;
}

// Conversation Orchestrator Interface
export interface ConversationOrchestrator extends BaseComponent {
  handleMessage(
    sessionId: string, 
    userMessage: ChatMessage
  ): Promise<Result<ChatMessage[]>>;

  createSession(
    participants: string[]
  ): Promise<Result<ConversationSession>>;

  endSession(
    sessionId: string
  ): Promise<Result<boolean>>;
}

// API Layer Interface
export interface APIService extends BaseComponent {
  chat(
    sessionId: string, 
    message: string
  ): Promise<Result<ChatMessage[]>>;

  getProfiles(): Promise<Result<AgentProfile[]>>;
}