// Personality Data Manager Interface

export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
}

export interface PersonalityManagerInterface {
  /**
   * Load a personality profile by its unique ID
   * @param id Unique identifier for the personality
   * @returns Fully resolved personality profile
   * @throws {ProfileNotFoundError} If profile cannot be located
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Validate a personality profile's schema
   * @param profile Profile to validate
   * @returns Boolean indicating validity or throws detailed error
   */
  validateProfile(profile: PersonalityProfile): boolean;

  /**
   * Create or update a personality profile
   * @param profile Profile to save
   * @returns Version number of saved profile
   */
  saveProfile(profile: PersonalityProfile): Promise<number>;

  /**
   * Retrieve version history for a profile
   * @param id Profile identifier
   * @returns List of previous profile versions
   */
  getProfileVersionHistory(id: string): Promise<PersonalityProfile[]>;
}