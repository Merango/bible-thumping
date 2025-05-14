// Enhanced Personality Manager Interface with Comprehensive Error Handling

export class PersonalityProfileError extends Error {
  constructor(
    public code: 
      | 'PROFILE_NOT_FOUND' 
      | 'VALIDATION_ERROR' 
      | 'SAVE_ERROR' 
      | 'VERSION_ERROR',
    message: string
  ) {
    super(message);
    this.name = 'PersonalityProfileError';
  }
}

export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PersonalityValidationResult {
  isValid: boolean;
  errors?: string[];
}

export interface PersonalityManagerInterface {
  /**
   * Load a personality profile by its unique ID
   * @param id Unique identifier for the personality
   * @returns Fully resolved personality profile
   * @throws {PersonalityProfileError} If profile cannot be located or loaded
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Comprehensive profile validation with detailed error reporting
   * @param profile Profile to validate
   * @returns Validation result with potential error details
   */
  validateProfile(profile: PersonalityProfile): PersonalityValidationResult;

  /**
   * Create or update a personality profile with version management
   * @param profile Profile to save
   * @returns Version number of saved profile
   * @throws {PersonalityProfileError} If save operation fails
   */
  saveProfile(profile: PersonalityProfile): Promise<number>;

  /**
   * Retrieve version history for a profile
   * @param id Profile identifier
   * @returns List of previous profile versions
   * @throws {PersonalityProfileError} If version history retrieval fails
   */
  getProfileVersionHistory(id: string): Promise<PersonalityProfile[]>;
}