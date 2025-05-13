/**
 * Interface for Personality Data Manager
 * Defines contract for loading, saving, and validating personality profiles
 */
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
   * @returns Loaded PersonalityProfile or throws error
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Validate a personality profile
   * @param profile Profile to validate
   * @returns Boolean indicating validity or throws detailed error
   */
  validateProfile(profile: PersonalityProfile): boolean;

  /**
   * Save a new or updated personality profile
   * @param profile Profile to save
   * @returns Version identifier of saved profile
   */
  saveProfile(profile: PersonalityProfile): Promise<string>;
}