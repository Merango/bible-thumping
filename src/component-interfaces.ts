import Ajv from 'ajv';
import componentSchemas from './schemas/component-schemas.json';

/**
 * Comprehensive interfaces and validation for multi-agent chat platform components
 * @module ComponentInterfaces
 */

// Advanced Error Classes
export class ValidationError extends Error {
  public details: unknown[];

  constructor(message: string, details: unknown[] = []) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class SchemaValidationError extends ValidationError {
  constructor(details: unknown[]) {
    super('Schema validation failed', details);
    this.name = 'SchemaValidationError';
  }
}

// JSON Schema Validator
const ajv = new Ajv({ allErrors: true });

// Compile schemas
const validatePersonalityProfile = ajv.compile(
  componentSchemas.definitions.PersonalityProfile
);
const validateChatbotResponse = ajv.compile(
  componentSchemas.definitions.ChatbotResponse
);
const validateConversationSession = ajv.compile(
  componentSchemas.definitions.ConversationSession
);

// Interfaces
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

export interface ChatbotResponse {
  agentId: string;
  content: string;
  confidence: number;
  timestamp: number;
}

export interface ConversationSession {
  sessionId: string;
  participants: string[];
  startTime: number;
  messages: ChatbotResponse[];
}

// Comprehensive Validation Functions
export function validateProfile(profile: PersonalityProfile): boolean {
  const isValid = validatePersonalityProfile(profile);
  
  if (!isValid) {
    throw new SchemaValidationError(
      validatePersonalityProfile.errors || []
    );
  }
  
  return true;
}

export function validateResponse(response: ChatbotResponse): boolean {
  const isValid = validateChatbotResponse(response);
  
  if (!isValid) {
    throw new SchemaValidationError(
      validateChatbotResponse.errors || []
    );
  }
  
  return true;
}

export function validateSession(session: ConversationSession): boolean {
  const isValid = validateConversationSession(session);
  
  if (!isValid) {
    throw new SchemaValidationError(
      validateConversationSession.errors || []
    );
  }
  
  return true;
}

// Factory Functions with Validation
export function createPersonalityProfile(
  data: Partial<PersonalityProfile>
): PersonalityProfile {
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
    validateProfile(profile);
    return profile;
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      throw new ValidationError(
        'Invalid Personality Profile',
        error.details
      );
    }
    throw error;
  }
}

// Error Reporting Utility
export function getValidationErrorDetails(
  error: SchemaValidationError
): string[] {
  return error.details.map(
    (err: { message?: string }) => err.message || 'Unknown validation error'
  );
}

// Abstract Base Classes
export abstract class BaseComponent {
  abstract initialize(): Promise<void>;
  abstract validate(): boolean;
}