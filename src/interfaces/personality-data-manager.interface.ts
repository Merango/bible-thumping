// Enhanced Personality Data Manager Interface with Comprehensive Error Handling
import { z } from 'zod';

export const PersonalityProfileSchema = z.object({
  id: z.string().min(1, "ID cannot be empty").max(50, "ID too long"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  tone: z.enum(["compassionate", "authoritative", "playful", "serious", "neutral"], {
    errorMap: () => ({ message: "Invalid tone selected" })
  }),
  samplePrompts: z.array(z.string().min(1).max(200)).min(1, "At least one sample prompt required").max(10, "Too many sample prompts"),
  version: z.number().int().min(1, "Version must be a positive integer")
});

export type PersonalityProfile = z.infer<typeof PersonalityProfileSchema>;

export class ProfileValidationError extends Error {
  constructor(public validationErrors: string[]) {
    super(`Profile validation failed: ${validationErrors.join(', ')}`);
    this.name = 'ProfileValidationError';
  }
}

export class ProfileNotFoundError extends Error {
  constructor(profileId: string) {
    super(`Profile with ID ${profileId} not found`);
    this.name = 'ProfileNotFoundError';
  }
}

export interface PersonalityDataManager {
  /**
   * Load a personality profile by its unique identifier
   * @param id Profile identifier
   * @returns Complete personality profile
   * @throws {ProfileNotFoundError} If profile doesn't exist
   */
  loadProfile(id: string): Promise<PersonalityProfile>;

  /**
   * Validate a personality profile
   * @param profile Profile to validate
   * @throws {ProfileValidationError} If profile fails validation
   */
  validateProfile(profile: PersonalityProfile): void;

  /**
   * Create or update a personality profile
   * @param profile Profile to save
   * @returns Version number of saved profile
   * @throws {ProfileValidationError} If profile is invalid
   */
  saveProfile(profile: PersonalityProfile): Promise<number>;

  /**
   * List all available personality profiles
   * @returns Array of profile metadata
   */
  listProfiles(): Promise<Array<Pick<PersonalityProfile, 'id' | 'name' | 'version'>>>;
}