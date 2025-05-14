/**
 * Interface for Personality Profile
 * Defines the structure and validation rules for agent personalities
 */
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: 'serious' | 'playful' | 'scholarly';
  samplePrompts: string[];
  
  // Validation metadata
  version: string;
  createdAt: Date;
  lastUpdated: Date;
}

/**
 * Type guard for validating PersonalityProfile
 * @param profile Potential personality profile to validate
 * @returns Boolean indicating if profile is valid
 */
export function isValidPersonalityProfile(profile: any): profile is PersonalityProfile {
  return (
    typeof profile === 'object' &&
    typeof profile.id === 'string' &&
    typeof profile.name === 'string' &&
    typeof profile.description === 'string' &&
    ['serious', 'playful', 'scholarly'].includes(profile.tone) &&
    Array.isArray(profile.samplePrompts) &&
    profile.samplePrompts.every((prompt: any) => typeof prompt === 'string') &&
    profile.createdAt instanceof Date &&
    profile.lastUpdated instanceof Date
  );
}