/**
 * Custom error classes for more specific error handling
 */
export class ProfileNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProfileNotFoundException';
  }
}

export class InvalidProfileException extends Error {
  public validationErrors: ValidationError[];

  constructor(message: string, errors: ValidationError[]) {
    super(message);
    this.name = 'InvalidProfileException';
    this.validationErrors = errors;
  }
}

/**
 * Comprehensive interface for Personality Data Manager
 */
export interface PersonalityDataManagerInterface {
  /**
   * Load a personality profile by its unique identifier
   * @param id - Unique identifier for the personality profile
   * @throws {ProfileNotFoundException} If profile with given ID does not exist
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * List all available personality profiles
   * @returns Array of profile metadata
   */
  listProfiles(): Promise<PersonalityProfileMetadata[]>;

  /**
   * Validate a personality profile's schema
   * @param profile - Personality profile to validate
   * @throws {InvalidProfileException} If profile fails validation
   */
  validateProfile(profile: PersonalityProfile): void;

  /**
   * Save a new or update an existing personality profile
   * @param profile - Personality profile to save
   * @returns Unique identifier of the saved profile
   * @throws {InvalidProfileException} If profile is invalid
   */
  saveProfile(profile: PersonalityProfile): Promise<string>;

  /**
   * Delete a personality profile
   * @param id - Unique identifier of profile to delete
   * @throws {ProfileNotFoundException} If profile does not exist
   */
  deleteProfile(id: string): Promise<void>;
}

/**
 * Comprehensive Personality Profile definition
 */
export interface PersonalityProfile {
  id?: string;
  name: string;
  tone: string;
  samplePrompts: string[];
  description?: string;
  traits?: Record<string, string>;
  metadata?: Record<string, unknown>;
}

/**
 * Metadata for profile listing and management
 */
export interface PersonalityProfileMetadata {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Detailed validation error structure
 */
export interface ValidationError {
  field: string;
  code: string;
  message: string;
}

/**
 * Validation rules and constraints
 */
export const PersonalityProfileValidationRules = {
  name: {
    minLength: 2,
    maxLength: 100
  },
  tone: {
    allowedValues: ['Philosophical', 'Humorous', 'Serious', 'Empathetic']
  },
  samplePrompts: {
    minPrompts: 1,
    maxPrompts: 10,
    maxPromptLength: 200
  }
};