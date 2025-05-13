/**
 * Defines core interfaces for multi-agent chat platform components
 * @module ComponentInterfaces
 */

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
  content: string;
  confidence: number;
  timestamp: number;
}

// Conversation Session Interface
export interface ConversationSession {
  sessionId: string;
  participants: string[];
  startTime: number;
  messages: ChatbotResponse[];
}

// API Request/Response Interfaces
export interface ChatRequest {
  sessionId?: string;
  userMessage: string;
  selectedAgents?: string[];
}

export interface ChatResponse {
  replies: ChatbotResponse[];
  sessionId: string;
}

// Error Handling Interface
export interface ServiceError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Validation Utility
export function validatePersonalityProfile(profile: PersonalityProfile): boolean {
  if (!profile.id || !profile.name) {
    return false;
  }
  
  if (profile.samplePrompts.length === 0) {
    return false;
  }

  return true;
}

// Abstract Base Classes for Consistent Component Design
export abstract class BaseComponent {
  abstract initialize(): Promise<void>;
  abstract validate(): boolean;
}