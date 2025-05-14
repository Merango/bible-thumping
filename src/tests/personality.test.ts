import { PersonalityProfile, ProfileValidationResult } from '../interfaces/personality.interface';

describe('Personality Profile Validation', () => {
  const validProfile: PersonalityProfile = {
    id: 'disciple_peter',
    name: 'Peter',
    description: 'Passionate disciple of Jesus',
    tone: 'Zealous',
    samplePrompts: [
      'Tell me about your experience walking on water',
      'What did you learn from Jesus?'
    ],
    version: 1
  };

  const invalidProfile: PersonalityProfile = {
    ...validProfile,
    name: '', // Invalid: empty name
  };

  it('should validate a complete profile', () => {
    const mockValidator = {
      validateProfile(profile: PersonalityProfile): ProfileValidationResult {
        const errors: string[] = [];
        
        if (!profile.name) errors.push('Name is required');
        if (!profile.description) errors.push('Description is required');
        if (profile.samplePrompts.length === 0) errors.push('At least one sample prompt is required');

        return {
          isValid: errors.length === 0,
          errors: errors.length > 0 ? errors : undefined
        };
      }
    };

    const result = mockValidator.validateProfile(validProfile);
    expect(result.isValid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should detect invalid profile', () => {
    const mockValidator = {
      validateProfile(profile: PersonalityProfile): ProfileValidationResult {
        const errors: string[] = [];
        
        if (!profile.name) errors.push('Name is required');
        if (!profile.description) errors.push('Description is required');
        if (profile.samplePrompts.length === 0) errors.push('At least one sample prompt is required');

        return {
          isValid: errors.length === 0,
          errors: errors.length > 0 ? errors : undefined
        };
      }
    };

    const result = mockValidator.validateProfile(invalidProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors).toContain('Name is required');
  });
});