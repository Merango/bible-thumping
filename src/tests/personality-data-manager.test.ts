import { PersonalityDataManagerInterface, PersonalityProfile } from '../interfaces/personality-data-manager.interface';

/**
 * Mock implementation of PersonalityDataManager for testing
 */
class MockPersonalityDataManager implements PersonalityDataManagerInterface {
  private profiles: Record<string, PersonalityProfile> = {};

  async loadProfile(id: string): Promise<PersonalityProfile | null> {
    return this.profiles[id] || null;
  }

  validateProfile(profile: PersonalityProfile): boolean {
    // Basic validation rules
    return !!(profile.name && profile.tone && profile.samplePrompts.length > 0);
  }

  async saveProfile(profile: PersonalityProfile): Promise<string> {
    const id = profile.id || Date.now().toString();
    this.profiles[id] = { ...profile, id };
    return id;
  }
}

describe('PersonalityDataManager', () => {
  let dataManager: MockPersonalityDataManager;
  
  beforeEach(() => {
    dataManager = new MockPersonalityDataManager();
  });

  test('save and load profile', async () => {
    const profile: PersonalityProfile = {
      name: 'Test Disciple',
      tone: 'Philosophical',
      samplePrompts: ['Tell me about wisdom']
    };

    const savedId = await dataManager.saveProfile(profile);
    const loadedProfile = await dataManager.loadProfile(savedId);

    expect(loadedProfile).toEqual(expect.objectContaining(profile));
  });

  test('profile validation', () => {
    const validProfile: PersonalityProfile = {
      name: 'Valid Profile',
      tone: 'Friendly',
      samplePrompts: ['Hello']
    };

    const invalidProfile: PersonalityProfile = {
      name: '',
      tone: '',
      samplePrompts: []
    };

    expect(dataManager.validateProfile(validProfile)).toBeTruthy();
    expect(dataManager.validateProfile(invalidProfile)).toBeFalsy();
  });
});