// Core component interfaces for multi-agent chat platform

export interface AgentProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
}

export interface ChatMessage {
  agentId: string;
  timestamp: number;
  content: string;
}

export interface ChatSession {
  sessionId: string;
  participants: string[];
  messages: ChatMessage[];
}

export interface PersonalityDataManagerInterface {
  loadProfile(id: string): Promise<AgentProfile>;
  validateProfile(profile: AgentProfile): boolean;
  listProfiles(): Promise<AgentProfile[]>;
}

export interface ChatbotEngineInterface {
  generateResponse(
    profile: AgentProfile, 
    conversationHistory: ChatMessage[]
  ): Promise<string>;
}

export interface ConversationOrchestratorInterface {
  handleMessage(
    sessionId: string, 
    userMessage: string
  ): Promise<ChatMessage[]>;
}

export interface APILayerInterface {
  createChatSession(): Promise<string>;
  sendMessage(
    sessionId: string, 
    message: string
  ): Promise<ChatMessage[]>;
}

// Validation helper types
export type ValidationResult = {
  isValid: boolean;
  errors?: string[];
}

// Common error types
export class ComponentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ComponentError';
  }
}