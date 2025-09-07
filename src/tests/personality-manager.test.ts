import { PersonalityProfile, PersonalityDataManager, PersonalityProfileError } from '../interfaces/personality-manager.interface';
import { schemaValidator } from '../utils/schema-validator';

// Mock implementation for testing
class MockPersonalityDataManager implements PersonalityDataManager {
  private profiles: Record<string, PersonalityProfile> = {
    'test-profile-1': {
      id: 'test-profile-1',
      name: 'Jesus',
      tone: 'Compassionate',
      samplePrompts: ['Love thy neighbor', 'Forgiveness is key'],
      version: '1.0.0'
    }
  };

  async loadProfile(id: string): Promise<PersonalityProfile> {
    const profile = this.profiles[id];
    if (!profile) {
      throw new PersonalityProfileError(`Profile ${id} not found`, 'NOT_FOUND');
    }
    return profile;
  }

  validateProfile(profile: PersonalityProfile) {
    const validation = schemaValidator.validate('PersonalityProfile', profile);
    return {
      isValid: validation.isValid,
      errors: validation.errors
    };
  }

  async saveProfile(profile: PersonalityProfile): Promise<string> {
    this.profiles[profile.id] = profile;
    return profile.version;
  }

  async listProfiles(): Promise<PersonalityProfile[]> {
    return Object.values(this.profiles);
  }
}

describe('PersonalityDataManager', () => {
  let manager: PersonalityDataManager;

  beforeEach(() => {
    manager = new MockPersonalityDataManager();
  });

  test('should load existing profile', async () => {
    const profile = await manager.loadProfile('test-profile-1');
    expect(profile).toBeDefined();
    expect(profile.name).toBe('Jesus');
  });

  test('should throw error for non-existent profile', async () => {
    await expect(manager.loadProfile('non-existent')).rejects.toThrow(PersonalityProfileError);
  });

  test('should validate correct profile', () => {
    const profile: PersonalityProfile = {
      id: 'test-profile-2',
      name: 'Peter',
      tone: 'Zealous',
      samplePrompts: ['Follow me'],
      version: '1.0.0'
    };

    const validation = manager.validateProfile(profile);
    expect(validation.isValid).toBe(true);
  });

  test('should detect invalid profile', () => {
    const invalidProfile = {
      id: 'invalid-profile',
      // Missing required fields
    };

    const validation = manager.validateProfile(invalidProfile as PersonalityProfile);
    expect(validation.isValid).toBe(false);
    expect(validation.errors).toBeDefined();
  });

  test('should save and retrieve profile', async () => {
    const newProfile: PersonalityProfile = {
      id: 'new-profile',
      name: 'John',
      tone: 'Contemplative',
      samplePrompts: ['Beloved disciple'],
      version: '1.0.0'
    };

    const version = await manager.saveProfile(newProfile);
    expect(version).toBe('1.0.0');

    const retrievedProfile = await manager.loadProfile('new-profile');
    expect(retrievedProfile).toEqual(newProfile);
  });
});