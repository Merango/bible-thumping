import { PersonalityProfile, PersonalityDataManager } from '../interfaces/personality.interface';
import { MultiAgentError, ErrorCodes } from '../interfaces/errors';

describe('Personality Profile Management', () => {
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

  const mockDataManager: PersonalityDataManager = {
    async loadProfile(id: string) {
      if (id === 'disciple_peter') return validProfile;
      throw new MultiAgentError(
        ErrorCodes.PROFILE_NOT_FOUND, 
        'Profile not found'
      );
    },

    validateProfile(profile: PersonalityProfile) {
      const errors: MultiAgentError[] = [];
      
      if (!profile.name) {
        errors.push(new MultiAgentError(
          ErrorCodes.INVALID_PROFILE_SCHEMA, 
          'Name is required'
        ));
      }

      return {
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined
      };
    },

    async saveProfile(profile: PersonalityProfile) {
      if (profile.id === 'existing_profile') {
        throw new MultiAgentError(
          ErrorCodes.DUPLICATE_PROFILE_ID, 
          'Profile already exists'
        );
      }
      return profile.id;
    },

    async listProfiles() {
      return [
        { 
          id: validProfile.id, 
          name: validProfile.name, 
          description: validProfile.description,
          tone: validProfile.tone,
          version: validProfile.version 
        }
      ];
    }
  };

  it('should successfully load an existing profile', async () => {
    const profile = await mockDataManager.loadProfile('disciple_peter');
    expect(profile).toEqual(validProfile);
  });

  it('should throw error for non-existent profile', async () => {
    await expect(mockDataManager.loadProfile('non_existent'))
      .rejects
      .toThrow(MultiAgentError);
  });

  it('should validate a complete profile', () => {
    const result = mockDataManager.validateProfile(validProfile);
    expect(result.isValid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should detect invalid profile', () => {
    const invalidProfile = { ...validProfile, name: '' };
    const result = mockDataManager.validateProfile(invalidProfile);
    
    expect(result.isValid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors?.[0].code).toBe(ErrorCodes.INVALID_PROFILE_SCHEMA);
  });

  it('should prevent duplicate profile creation', async () => {
    const duplicateProfile = { ...validProfile, id: 'existing_profile' };
    
    await expect(mockDataManager.saveProfile(duplicateProfile))
      .rejects
      .toThrow(MultiAgentError);
  });

  it('should list personality profiles', async () => {
    const profiles = await mockDataManager.listProfiles();
    expect(profiles.length).toBeGreaterThan(0);
    expect(profiles[0].id).toBe('disciple_peter');
  });
});