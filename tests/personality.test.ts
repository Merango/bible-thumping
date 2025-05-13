import { PersonalityProfile, validatePersonalityProfile } from '../src/interfaces/personality.interface';

describe('Personality Profile Validation', () => {
  const validProfile: PersonalityProfile = {
    id: 'peter-apostle',
    name: 'Peter the Apostle',
    description: 'Fisherman turned disciple',
    tone: 'passionate',
    samplePrompts: ['Tell me about walking on water', 'What was it like following Jesus?'],
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  test('should validate a correct personality profile', () => {
    expect(validatePersonalityProfile(validProfile)).toBe(true);
  });

  test('should reject profile with empty id', () => {
    const invalidProfile = { ...validProfile, id: '' };
    expect(validatePersonalityProfile(invalidProfile)).toBe(false);
  });

  test('should reject profile with empty name', () => {
    const invalidProfile = { ...validProfile, name: '' };
    expect(validatePersonalityProfile(invalidProfile)).toBe(false);
  });

  test('should reject profile with no sample prompts', () => {
    const invalidProfile = { ...validProfile, samplePrompts: [] };
    expect(validatePersonalityProfile(invalidProfile)).toBe(false);
  });
});