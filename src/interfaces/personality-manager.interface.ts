/**
 * Custom error types for Personality Manager
 */
export class PersonalityProfileError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'PersonalityProfileError';
  }
}

export interface PersonalityProfile {
  id: string;
  name: string;
  tone: string;
  samplePrompts: string[];
  version: string;
}

export interface PersonalityDataManager {
  /**
   * Load a personality profile by its unique identifier
   * @param id Profile identifier
   * @returns Loaded PersonalityProfile
   * @throws {PersonalityProfileError} If profile cannot be loaded
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Validate a personality profile thoroughly
   * @param profile Profile to validate
   * @returns Validation result with optional error details
   */
  validateProfile(profile: PersonalityProfile): {
    isValid: boolean;
    errors?: string[];
  };

  /**
   * Save a new or updated personality profile
   * @param profile Profile to save
   * @returns Version identifier of saved profile
   * @throws {PersonalityProfileError} If save fails
   */
  saveProfile(profile: PersonalityProfile): Promise<string>;

  /**
   * List all available personality profiles
   * @returns Array of profile metadata
   */
  listProfiles(): Promise<PersonalityProfile[]>;
}