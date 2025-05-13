// Personality Data Manager Interface
export interface PersonalityProfile {
  id: string;
  name: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

export interface PersonalityDataManager {
  /**
   * Load a personality profile by its unique identifier
   * @param id Profile identifier
   * @returns Complete personality profile or null if not found
   */
  loadProfile(id: string): Promise<PersonalityProfile | null>;

  /**
   * Validate a personality profile
   * @param profile Profile to validate
   * @returns Boolean indicating validity, with optional error details
   */
  validateProfile(profile: PersonalityProfile): { 
    valid: boolean; 
    errors?: string[] 
  };

  /**
   * Create or update a personality profile
   * @param profile Profile to save
   * @returns Version number of saved profile
   */
  saveProfile(profile: PersonalityProfile): Promise<number>;
}