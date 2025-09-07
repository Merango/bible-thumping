import { isValidPersonalityProfile, PersonalityProfile } from '../interfaces/personality.interface';

describe('Personality Profile Validation', () => {
  const validProfile: PersonalityProfile = {
    id: 'test-profile-1',
    name: 'Test Agent',
    description: 'A test personality profile',
    tone: 'scholarly',
    samplePrompts: ['Hello', 'How are you?'],
    version: '1.0.0',
    createdAt: new Date(),
    lastUpdated: new Date()
  };

  const invalidProfiles = [
    {}, // Empty object
    { id: 123 }, // Invalid type for id
    { ...validProfile, tone: 'undefined-tone' }, // Invalid tone
    { ...validProfile, samplePrompts: [123] } // Invalid prompt type
  ];

  test('valid profile should pass validation', () => {
    expect(isValidPersonalityProfile(validProfile)).toBeTruthy();
  });

  test.each(invalidProfiles)('invalid profile should fail validation', (profile) => {
    expect(isValidPersonalityProfile(profile)).toBeFalsy();
  });
});