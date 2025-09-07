import { MultiAgentError, ErrorCodes } from './errors';

export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: 'Zealous' | 'Contemplative' | 'Compassionate' | 'Analytical';
  samplePrompts: string[];
  version: number;
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors?: MultiAgentError[];
}

export interface PersonalityDataManager {
  /**
   * Load a personality profile by its unique identifier
   * @throws {MultiAgentError} PROFILE_NOT_FOUND if profile doesn't exist
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Validate a personality profile
   * @throws {MultiAgentError} INVALID_PROFILE_SCHEMA for structural issues
   */
  validateProfile(profile: PersonalityProfile): ProfileValidationResult;

  /**
   * Save a new or updated personality profile
   * @throws {MultiAgentError} DUPLICATE_PROFILE_ID if profile already exists
   */
  saveProfile(profile: PersonalityProfile): Promise<string>;

  /**
   * List all available personality profiles with optional filtering
   */
  listProfiles(options?: {
    limit?: number;
    offset?: number;
    searchTerm?: string;
  }): Promise<Omit<PersonalityProfile, 'samplePrompts'>[]>;
}