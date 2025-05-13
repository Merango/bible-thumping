/**
 * Comprehensive Interfaces for Multi-Agent Chat Platform
 * 
 * @description Defines core interfaces for system components
 * @version 1.0.0
 */

/**
 * Represents a potential system error
 * @interface
 */
export interface SystemError {
  /** Unique error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Personality Profile representing an agent's characteristics
 * @interface
 */
export interface PersonalityProfile {
  /** Unique identifier for the profile */
  id: string;
  /** Display name of the personality */
  name: string;
  /** Detailed description of the personality */
  description: string;
  /** Communication tone of the agent */
  tone: 'compassionate' | 'authoritative' | 'analytical' | 'empathetic' | 'neutral';
  /** Sample prompts to demonstrate the agent's communication style */
  samplePrompts: string[];
  /** Version of the personality profile */
  version: number;
}

/**
 * Service for managing personality profiles
 * @interface
 */
export interface PersonalityProfileService {
  /**
   * Loads a personality profile by its unique identifier
   * @param id - Profile identifier
   * @returns Promise resolving to PersonalityProfile or throwing SystemError
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Validates a personality profile
   * @param profile - Profile to validate
   * @returns Validation result with potential errors
   */
  validateProfile(profile: PersonalityProfile): SystemError[];

  /**
   * Creates a new personality profile
   * @param profile - Profile to create
   * @returns Created profile or validation errors
   */
  createProfile(profile: PersonalityProfile): Promise<PersonalityProfile | SystemError[]>;
}

/**
 * Represents a chatbot response in a conversation
 * @interface
 */
export interface ChatbotResponse {
  /** Unique identifier of the responding agent */
  agentId: string;
  /** Generated response message */
  message: string;
  /** Confidence level of the response */
  confidence: number;
  /** Timestamp of response generation */
  timestamp: number;
  /** Optional error information */
  error?: SystemError;
}

/**
 * Represents a conversation session between agents
 * @interface
 */
export interface ConversationSession {
  /** Unique session identifier */
  sessionId: string;
  /** Participating agent IDs */
  participants: string[];
  /** Session start timestamp */
  startTime: number;
  /** Timestamp of last activity */
  lastActivityTime: number;
  /** Conversation messages */
  messages: ChatbotResponse[];
}

/**
 * API request for initiating a chat
 * @interface
 */
export interface ChatRequest {
  /** Optional existing session ID */
  sessionId?: string;
  /** User's input message */
  userMessage: string;
  /** Optional specific agents to involve */
  selectedAgents?: string[];
}

/**
 * API response for a chat interaction
 * @interface
 */
export interface ChatResponse {
  /** Session identifier */
  sessionId: string;
  /** Agent replies */
  replies: ChatbotResponse[];
  /** Optional error information */
  error?: SystemError;
}

/**
 * Comprehensive error types for system-wide error handling
 * @enum
 */
export enum ErrorTypes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  SYSTEM_ERROR = 'SYSTEM_ERROR'
}