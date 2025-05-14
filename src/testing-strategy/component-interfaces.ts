// Comprehensive interfaces for multi-agent chat platform components

/**
 * Personality Profile Interface
 * Represents a character's core attributes and interaction properties
 */
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: 'serious' | 'playful' | 'neutral';
  language: string;
  responseStyle: string;
  version: string;
}

/**
 * Chatbot Engine Response Interface
 * Standardizes response generation from language models
 */
export interface ChatResponse {
  text: string;
  confidence: number;
  tokens: number;
  timestamp: number;
}

/**
 * Conversation Session Interface
 * Tracks the state and context of a multi-agent conversation
 */
export interface ConversationSession {
  sessionId: string;
  participants: string[];
  messages: ChatMessage[];
  startTime: number;
  lastActivityTime: number;
}

/**
 * Chat Message Interface
 * Represents a single message in a conversation
 */
export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * API Request/Response Interfaces
 * Standardizes communication across the system
 */
export interface ChatRequest {
  sessionId?: string;
  message: string;
  personalities?: string[];
}

export interface ChatAPIResponse {
  replies: ChatResponse[];
  sessionId: string;
  timestamp: number;
}

/**
 * Error Handling Interface
 * Provides a consistent error reporting mechanism
 */
export interface SystemError {
  code: string;
  message: string;
  severity: 'warning' | 'error' | 'critical';
  timestamp: number;
}