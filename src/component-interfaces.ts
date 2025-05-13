/**
 * Comprehensive interfaces for multi-agent chat platform components
 * @module ComponentInterfaces
 */

// Enhanced Validation Utilities
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Personality Profile Interface with Enhanced Validation
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

// Advanced Validation Function
export function validatePersonalityProfile(profile: PersonalityProfile): boolean {
  if (!profile.id || profile.id.trim() === '') {
    throw new ValidationError('Profile ID is required');
  }

  if (!profile.name || profile.name.trim() === '') {
    throw new ValidationError('Profile name is required');
  }

  if (profile.samplePrompts.length === 0) {
    throw new ValidationError('At least one sample prompt is required');
  }

  if (profile.version < 1) {
    throw new ValidationError('Version must be a positive number');
  }

  return true;
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

// Abstract Base Classes for Consistent Component Design
export abstract class BaseComponent {
  abstract initialize(): Promise<void>;
  abstract validate(): boolean;
}

// Factory for creating validated components
export function createPersonalityProfile(data: Partial<PersonalityProfile>): PersonalityProfile {
  const defaultProfile: PersonalityProfile = {
    id: '',
    name: '',
    description: '',
    tone: '',
    samplePrompts: [],
    version: 1
  };

  const profile: PersonalityProfile = { ...defaultProfile, ...data };
  
  try {
    validatePersonalityProfile(profile);
    return profile;
  } catch (error) {
    throw error;
  }
}