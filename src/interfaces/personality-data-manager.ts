// Personality Data Manager Interface
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

export interface PersonalityDataManager {
  /**
   * Load a personality profile by its unique identifier
   * @param id Profile identifier
   * @returns Loaded personality profile or null if not found
   */
  loadProfile(id: string): PersonalityProfile | null;

  /**
   * Validate a personality profile's schema
   * @param profile Profile to validate
   * @returns Boolean indicating validation result or throws detailed error
   */
  validateProfile(profile: PersonalityProfile): boolean;

  /**
   * Save or update a personality profile
   * @param profile Profile to save
   * @returns Version number of saved profile
   */
  saveProfile(profile: PersonalityProfile): number;
}