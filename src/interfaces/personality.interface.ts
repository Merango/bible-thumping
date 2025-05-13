// Interface for Personality Profile
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  
  // Metadata for versioning
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

// Validation function for Personality Profile
export function validatePersonalityProfile(profile: PersonalityProfile): boolean {
  // Basic validation checks
  if (!profile.id || profile.id.trim() === '') {
    return false;
  }
  
  if (!profile.name || profile.name.trim() === '') {
    return false;
  }
  
  if (profile.samplePrompts.length === 0) {
    return false;
  }
  
  return true;
}