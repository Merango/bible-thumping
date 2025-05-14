import { PersonalityProfile } from '../src/interfaces/personality-manager';
import { TEST_CONFIG } from './setup';

describe('Personality Manager Interface', () => {
  let mockProfile: PersonalityProfile;

  beforeEach(() => {
    mockProfile = TEST_CONFIG.generateMockPersonality();
  });

  test('Profile should have valid schema', () => {
    expect(mockProfile).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      tone: expect.any(String),
      samplePrompts: expect.any(Array),
      version: expect.any(Number)
    });
  });

  test('Profile ID should be unique', () => {
    const anotherProfile = TEST_CONFIG.generateMockPersonality();
    expect(mockProfile.id).not.toEqual(anotherProfile.id);
  });

  test('Sample prompts should not be empty', () => {
    expect(mockProfile.samplePrompts.length).toBeGreaterThan(0);
  });

  test('Version should start at 1', () => {
    expect(mockProfile.version).toBe(1);
  });
});