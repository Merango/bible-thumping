import { describe, it, expect } from 'vitest';

interface ProfileData {
  id: string;
  name: string;
  tone: string;
  description: string;
  samplePrompts: string[];
  version: number;
}

function validateProfile(profile: ProfileData): boolean {
  const errors: string[] = [];

  if (!profile.id || profile.id.trim() === '') {
    errors.push('Profile must have a valid ID');
  }

  if (!profile.name || profile.name.trim() === '') {
    errors.push('Profile must have a name');
  }

  if (profile.samplePrompts.length === 0) {
    errors.push('Profile must have at least one sample prompt');
  }

  if (profile.version < 1) {
    errors.push('Profile version must be 1 or higher');
  }

  return errors.length === 0;
}

describe('Profile Interface Validation', () => {
  it('should validate a complete profile', () => {
    const validProfile: ProfileData = {
      id: 'jesus-profile',
      name: 'Jesus Christ',
      tone: 'Compassionate',
      description: 'Son of God, compassionate teacher',
      samplePrompts: ['Discuss love and forgiveness'],
      version: 1
    };

    expect(validateProfile(validProfile)).toBe(true);
  });

  it('should reject profile with missing ID', () => {
    const invalidProfile = {
      id: '',
      name: 'Invalid Profile',
      tone: 'Neutral',
      description: 'Missing ID',
      samplePrompts: ['Test prompt'],
      version: 1
    };

    expect(validateProfile(invalidProfile)).toBe(false);
  });

  it('should reject profile without sample prompts', () => {
    const invalidProfile = {
      id: 'test-profile',
      name: 'Test Profile',
      tone: 'Neutral',
      description: 'No prompts',
      samplePrompts: [],
      version: 1
    };

    expect(validateProfile(invalidProfile)).toBe(false);
  });
});

describe('Conversation Orchestrator Interface Mock', () => {
  it('should handle message routing', () => {
    const mockOrchestrator = {
      handleMessage: (sessionId: string, message: string) => {
        // Simulated routing logic
        return sessionId && message ? 'processed' : 'error';
      }
    };

    expect(mockOrchestrator.handleMessage('session1', 'Hello')).toBe('processed');
    expect(mockOrchestrator.handleMessage('', '')).toBe('error');
  });
});