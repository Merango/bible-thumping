import { 
  PersonalityProfile, 
  PersonalityProfileError,
  PersonalityManagerInterface 
} from '../src/interfaces/personality-manager';
import { TEST_CONFIG } from './setup';

// Mock implementation for testing
class MockPersonalityManager implements PersonalityManagerInterface {
  private profiles: Record<string, PersonalityProfile> = {};

  async loadProfile(id: string): Promise<PersonalityProfile> {
    const profile = this.profiles[id];
    if (!profile) {
      throw new PersonalityProfileError('PROFILE_NOT_FOUND', `Profile ${id} not found`);
    }
    return profile;
  }

  validateProfile(profile: PersonalityProfile) {
    const errors: string[] = [];
    
    if (!profile.id) errors.push('Missing profile ID');
    if (!profile.name) errors.push('Missing profile name');
    if (profile.samplePrompts.length === 0) errors.push('No sample prompts provided');

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  async saveProfile(profile: PersonalityProfile): Promise<number> {
    if (!this.validateProfile(profile).isValid) {
      throw new PersonalityProfileError('VALIDATION_ERROR', 'Invalid profile data');
    }
    
    profile.version = (this.profiles[profile.id]?.version || 0) + 1;
    profile.updatedAt = new Date();
    
    this.profiles[profile.id] = profile;
    return profile.version;
  }

  async getProfileVersionHistory(id: string): Promise<PersonalityProfile[]> {
    const currentProfile = await this.loadProfile(id);
    return [currentProfile];
  }
}

describe('Personality Manager Interface', () => {
  let personalityManager: MockPersonalityManager;
  let mockProfile: PersonalityProfile;

  beforeEach(() => {
    personalityManager = new MockPersonalityManager();
    mockProfile = {
      id: 'test-profile-001',
      name: 'Test Disciple',
      description: 'A mock personality for testing',
      tone: 'scholarly',
      samplePrompts: ['Explain divine grace', 'Discuss spiritual love'],
      version: 1
    };
  });

  // Comprehensive Test Scenarios
  describe('Profile Validation', () => {
    test('Valid profile passes validation', () => {
      const result = personalityManager.validateProfile(mockProfile);
      expect(result.isValid).toBe(true);
    });

    test('Profile without ID fails validation', () => {
      const invalidProfile = {...mockProfile, id: ''};
      const result = personalityManager.validateProfile(invalidProfile);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing profile ID');
    });
  });

  describe('Profile Management', () => {
    test('Save and load profile successfully', async () => {
      const savedVersion = await personalityManager.saveProfile(mockProfile);
      expect(savedVersion).toBe(1);

      const loadedProfile = await personalityManager.loadProfile(mockProfile.id);
      expect(loadedProfile).toEqual(expect.objectContaining(mockProfile));
    });

    test('Loading non-existent profile throws error', async () => {
      await expect(personalityManager.loadProfile('non-existent-id'))
        .rejects.toThrow(PersonalityProfileError);
    });
  });

  describe('Version Management', () => {
    test('Saving profile increments version', async () => {
      await personalityManager.saveProfile(mockProfile);
      const updatedProfile = {...mockProfile, description: 'Updated description'};
      const newVersion = await personalityManager.saveProfile(updatedProfile);
      
      expect(newVersion).toBe(2);
    });

    test('Version history retrieval', async () => {
      await personalityManager.saveProfile(mockProfile);
      const history = await personalityManager.getProfileVersionHistory(mockProfile.id);
      
      expect(history.length).toBeGreaterThan(0);
      expect(history[0].id).toBe(mockProfile.id);
    });
  });
});