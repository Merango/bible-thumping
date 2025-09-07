export enum ErrorCodes {
  // Personality Data Manager Errors
  INVALID_PROFILE_SCHEMA = 'PDME001',
  DUPLICATE_PROFILE_ID = 'PDME002',
  PROFILE_NOT_FOUND = 'PDME003',
  
  // Conversation Orchestrator Errors
  SESSION_INITIALIZATION_FAILED = 'COE001',
  MAX_SESSIONS_EXCEEDED = 'COE002',
  INVALID_SESSION_ID = 'COE003',
  AGENT_UNAVAILABLE = 'COE004'
}

export class MultiAgentError extends Error {
  public code: ErrorCodes;
  public details?: any;

  constructor(code: ErrorCodes, message: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'MultiAgentError';
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: Date.now()
    };
  }
}