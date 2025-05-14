/**
 * Defines the structure for a personality profile in the multi-agent chat platform
 */
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

/**
 * Validation result for a personality profile
 */
export interface ProfileValidationResult {
  isValid: boolean;
  errors?: string[];
}

/**
 * Interface for managing personality profiles
 */
export interface PersonalityDataManager {
  /**
   * Load a personality profile by its unique identifier
   * @param id - The unique identifier of the profile
   * @returns The personality profile or null if not found
   */
  loadProfile(id: string): PersonalityProfile | null;

  /**
   * Validate a personality profile
   * @param profile - The profile to validate
   * @returns Validation result
   */
  validateProfile(profile: PersonalityProfile): ProfileValidationResult;

  /**
   * Save a new or updated personality profile
   * @param profile - The profile to save
   * @returns The saved profile's ID
   */
  saveProfile(profile: PersonalityProfile): string;

  /**
   * List all available personality profiles
   * @returns Array of profile metadata
   */
  listProfiles(): Omit<PersonalityProfile, 'samplePrompts'>[];
}