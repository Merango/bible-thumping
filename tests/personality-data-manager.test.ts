import { PersonalityProfile, PersonalityDataManager } from '../src/interfaces/personality-data-manager.interface';

describe('PersonalityDataManager Interface', () => {
  const mockProfile: PersonalityProfile = {
    id: 'test-profile-1',
    name: 'Jesus',
    tone: 'compassionate',
    samplePrompts: ['Love thy neighbor', 'Forgiveness is key'],
    version: 1
  };

  let mockManager: PersonalityDataManager;

  beforeEach(() => {
    mockManager = {
      async loadProfile(id: string) {
        return id === mockProfile.id ? mockProfile : null;
      },
      validateProfile(profile) {
        const errors: string[] = [];
        if (!profile.name) errors.push('Name is required');
        if (!profile.tone) errors.push('Tone is required');
        return { 
          valid: errors.length === 0, 
          errors: errors.length > 0 ? errors : undefined 
        };
      },
      async saveProfile(profile) {
        return profile.version + 1;
      }
    };
  });

  it('should load an existing profile', async () => {
    const profile = await mockManager.loadProfile('test-profile-1');
    expect(profile).toEqual(mockProfile);
  });

  it('should return null for non-existent profile', async () => {
    const profile = await mockManager.loadProfile('unknown-profile');
    expect(profile).toBeNull();
  });

  it('should validate a profile successfully', () => {
    const result = mockManager.validateProfile(mockProfile);
    expect(result.valid).toBeTruthy();
    expect(result.errors).toBeUndefined();
  });

  it('should invalidate profile with missing fields', () => {
    const invalidProfile = { ...mockProfile, name: '' };
    const result = mockManager.validateProfile(invalidProfile);
    expect(result.valid).toBeFalsy();
    expect(result.errors).toContain('Name is required');
  });

  it('should increment version on save', async () => {
    const newVersion = await mockManager.saveProfile(mockProfile);
    expect(newVersion).toBe(2);
  });
});