import { 
  PersonalityDataManagerInterface, 
  PersonalityProfile, 
  ProfileNotFoundException, 
  InvalidProfileException,
  PersonalityProfileValidationRules
} from '../interfaces/personality-data-manager.interface';

class MockPersonalityDataManager implements PersonalityDataManagerInterface {
  private profiles: Map<string, PersonalityProfile> = new Map();

  async loadProfile(id: string): Promise<PersonalityProfile> {
    const profile = this.profiles.get(id);
    if (!profile) {
      throw new ProfileNotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async listProfiles(): Promise<{ id: string; name: string; createdAt: Date; updatedAt: Date }[]> {
    return Array.from(this.profiles.entries()).map(([id, profile]) => ({
      id,
      name: profile.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  validateProfile(profile: PersonalityProfile): void {
    const errors = [];

    // Name validation
    if (profile.name.length < PersonalityProfileValidationRules.name.minLength || 
        profile.name.length > PersonalityProfileValidationRules.name.maxLength) {
      errors.push({
        field: 'name', 
        code: 'LENGTH_INVALID', 
        message: 'Name must be between 2 and 100 characters'
      });
    }

    // Tone validation
    if (!PersonalityProfileValidationRules.tone.allowedValues.includes(profile.tone)) {
      errors.push({
        field: 'tone', 
        code: 'INVALID_TONE', 
        message: 'Tone must be one of: Philosophical, Humorous, Serious, Empathetic'
      });
    }

    // Sample prompts validation
    if (profile.samplePrompts.length < PersonalityProfileValidationRules.samplePrompts.minPrompts || 
        profile.samplePrompts.length > PersonalityProfileValidationRules.samplePrompts.maxPrompts) {
      errors.push({
        field: 'samplePrompts', 
        code: 'PROMPT_COUNT_INVALID', 
        message: 'Must have between 1 and 10 sample prompts'
      });
    }

    const invalidPrompts = profile.samplePrompts.filter(
      prompt => prompt.length > PersonalityProfileValidationRules.samplePrompts.maxPromptLength
    );
    if (invalidPrompts.length > 0) {
      errors.push({
        field: 'samplePrompts', 
        code: 'PROMPT_LENGTH_EXCEEDED', 
        message: 'Some prompts exceed 200 characters'
      });
    }

    if (errors.length > 0) {
      throw new InvalidProfileException('Profile validation failed', errors);
    }
  }

  async saveProfile(profile: PersonalityProfile): Promise<string> {
    this.validateProfile(profile);
    const id = profile.id || Date.now().toString();
    this.profiles.set(id, { ...profile, id });
    return id;
  }

  async deleteProfile(id: string): Promise<void> {
    if (!this.profiles.has(id)) {
      throw new ProfileNotFoundException(`Profile with ID ${id} not found`);
    }
    this.profiles.delete(id);
  }
}

describe('PersonalityDataManager', () => {
  let dataManager: MockPersonalityDataManager;
  
  beforeEach(() => {
    dataManager = new MockPersonalityDataManager();
  });

  // Positive Test Scenarios
  describe('Profile Creation and Loading', () => {
    it('should successfully create and load a valid profile', async () => {
      const profile: PersonalityProfile = {
        name: 'Test Disciple',
        tone: 'Philosophical',
        samplePrompts: ['What is wisdom?']
      };

      const savedId = await dataManager.saveProfile(profile);
      const loadedProfile = await dataManager.loadProfile(savedId);

      expect(loadedProfile).toEqual(expect.objectContaining(profile));
    });
  });

  // Validation Test Scenarios
  describe('Profile Validation', () => {
    it('should reject profile with invalid name length', async () => {
      const invalidProfile: PersonalityProfile = {
        name: 'A', // Too short
        tone: 'Philosophical',
        samplePrompts: ['Prompt']
      };

      await expect(dataManager.saveProfile(invalidProfile)).rejects.toThrow(InvalidProfileException);
    });

    it('should reject profile with invalid tone', async () => {
      const invalidProfile: PersonalityProfile = {
        name: 'Valid Name',
        tone: 'InvalidTone', // Not in allowed values
        samplePrompts: ['Prompt']
      };

      await expect(dataManager.saveProfile(invalidProfile)).rejects.toThrow(InvalidProfileException);
    });
  });

  // Error Handling Test Scenarios
  describe('Error Handling', () => {
    it('should throw ProfileNotFoundException when loading non-existent profile', async () => {
      await expect(dataManager.loadProfile('non-existent-id')).rejects.toThrow(ProfileNotFoundException);
    });

    it('should throw ProfileNotFoundException when deleting non-existent profile', async () => {
      await expect(dataManager.deleteProfile('non-existent-id')).rejects.toThrow(ProfileNotFoundException);
    });
  });
});