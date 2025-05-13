// Comprehensive Interfaces for Multi-Agent Chat Platform

// Personality Profile Interface
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

// Chatbot Response Interface
export interface ChatbotResponse {
  agentId: string;
  message: string;
  confidence: number;
  timestamp: number;
}

// Conversation Session Interface
export interface ConversationSession {
  sessionId: string;
  participants: string[];
  startTime: number;
  lastActivityTime: number;
  messages: ChatbotResponse[];
}

// API Request/Response Interfaces
export interface ChatRequest {
  sessionId?: string;
  userMessage: string;
  selectedAgents?: string[];
}

export interface ChatResponse {
  sessionId: string;
  replies: ChatbotResponse[];
  error?: string;
}

// Error Handling
export interface SystemError {
  code: string;
  message: string;
  details?: any;
}

// Deployment Metadata
export interface AgentDeploymentMetadata {
  agentId: string;
  containerStatus: 'RUNNING' | 'STOPPED' | 'ERROR';
  resourceUtilization: {
    cpu: number;
    memory: number;
  };
}