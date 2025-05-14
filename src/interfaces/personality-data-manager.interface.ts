/**
 * Interface for Personality Data Manager
 * Responsible for loading, saving, and validating personality profiles
 */
export interface PersonalityDataManagerInterface {
  /**
   * Load a personality profile by its unique identifier
   * @param id - Unique identifier for the personality profile
   * @returns Personality profile object or null if not found
   */
  loadProfile(id: string): Promise<PersonalityProfile | null>;

  /**
   * Validate a personality profile's schema
   * @param profile - Personality profile to validate
   * @returns Boolean indicating validation status or specific validation errors
   */
  validateProfile(profile: PersonalityProfile): boolean | ValidationError[];

  /**
   * Save a new or updated personality profile
   * @param profile - Personality profile to save
   * @returns Unique identifier of the saved profile
   */
  saveProfile(profile: PersonalityProfile): Promise<string>;
}

/**
 * Structure of a Personality Profile
 */
export interface PersonalityProfile {
  id?: string;
  name: string;
  tone: string;
  samplePrompts: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string;
  message: string;
}