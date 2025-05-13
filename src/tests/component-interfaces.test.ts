import {
  PersonalityProfile,
  ChatbotResponse,
  ConversationSession,
  ChatRequest,
  SystemError,
  ErrorTypes,
  PersonalityProfileService
} from '../interfaces/component-interfaces';

// Mock implementation for testing
class MockPersonalityProfileService implements PersonalityProfileService {
  private profiles: Map<string, PersonalityProfile> = new Map();

  async loadProfile(id: string): Promise<PersonalityProfile> {
    const profile = this.profiles.get(id);
    if (!profile) {
      throw {
        code: ErrorTypes.RESOURCE_NOT_FOUND,
        message: `Profile with ID ${id} not found`
      };
    }
    return profile;
  }

  validateProfile(profile: PersonalityProfile): SystemError[] {
    const errors: SystemError[] = [];

    if (!profile.id || profile.id.length < 1) {
      errors.push({
        code: ErrorTypes.VALIDATION_ERROR,
        message: 'Profile ID is required'
      });
    }

    if (!profile.name || profile.name.length < 2) {
      errors.push({
        code: ErrorTypes.VALIDATION_ERROR,
        message: 'Profile name must be at least 2 characters'
      });
    }

    return errors;
  }

  async createProfile(profile: PersonalityProfile): Promise<PersonalityProfile | SystemError[]> {
    const validationErrors = this.validateProfile(profile);
    if (validationErrors.length > 0) {
      return validationErrors;
    }

    this.profiles.set(profile.id, profile);
    return profile;
  }
}

describe('Component Interfaces Validation', () => {
  let profileService: MockPersonalityProfileService;

  beforeEach(() => {
    profileService = new MockPersonalityProfileService();
  });

  describe('PersonalityProfile Service', () => {
    const validProfile: PersonalityProfile = {
      id: 'jesus-001',
      name: 'Jesus Christ',
      description: 'Founder of Christianity',
      tone: 'compassionate',
      samplePrompts: ['Love thy neighbor', 'Forgiveness is divine'],
      version: 1
    };

    it('should create a valid profile', async () => {
      const result = await profileService.createProfile(validProfile);
      expect(result).toEqual(validProfile);
    });

    it('should reject profile with invalid ID', async () => {
      const invalidProfile = { ...validProfile, id: '' };
      const errors = await profileService.createProfile(invalidProfile);
      
      expect(Array.isArray(errors)).toBeTruthy();
      expect(errors[0].code).toBe(ErrorTypes.VALIDATION_ERROR);
    });

    it('should load an existing profile', async () => {
      await profileService.createProfile(validProfile);
      const loadedProfile = await profileService.loadProfile('jesus-001');
      
      expect(loadedProfile).toEqual(validProfile);
    });

    it('should throw error for non-existent profile', async () => {
      await expect(profileService.loadProfile('non-existent'))
        .rejects.toMatchObject({
          code: ErrorTypes.RESOURCE_NOT_FOUND
        });
    });
  });

  describe('Chatbot Response Scenarios', () => {
    const createChatbotResponse = (overrides: Partial<ChatbotResponse> = {}): ChatbotResponse => ({
      agentId: 'peter-001',
      message: 'I will follow you, Lord.',
      confidence: 0.95,
      timestamp: Date.now(),
      ...overrides
    });

    it('should handle standard response generation', () => {
      const response = createChatbotResponse();
      
      expect(response.confidence).toBeLessThanOrEqual(1);
      expect(response.confidence).toBeGreaterThanOrEqual(0);
      expect(response.message.length).toBeGreaterThan(0);
    });

    it('should handle low confidence responses', () => {
      const lowConfidenceResponse = createChatbotResponse({ confidence: 0.1 });
      
      expect(lowConfidenceResponse.confidence).toBe(0.1);
    });

    it('should handle responses with errors', () => {
      const errorResponse = createChatbotResponse({
        error: {
          code: ErrorTypes.SYSTEM_ERROR,
          message: 'Failed to generate response'
        }
      });
      
      expect(errorResponse.error).toBeDefined();
      expect(errorResponse.error?.code).toBe(ErrorTypes.SYSTEM_ERROR);
    });
  });

  describe('Conversation Session Complex Scenarios', () => {
    const createConversationSession = (overrides: Partial<ConversationSession> = {}): ConversationSession => ({
      sessionId: 'last-supper-001',
      participants: ['jesus', 'peter', 'john'],
      startTime: Date.now(),
      lastActivityTime: Date.now(),
      messages: [],
      ...overrides
    });

    it('should manage conversation session lifecycle', () => {
      const session = createConversationSession();
      
      expect(session.participants.length).toBeGreaterThan(0);
      expect(session.startTime).toBeLessThanOrEqual(Date.now());
    });

    it('should handle session with multiple messages', () => {
      const sessionWithMessages = createConversationSession({
        messages: [
          {
            agentId: 'jesus',
            message: 'One of you will betray me',
            confidence: 0.99,
            timestamp: Date.now()
          }
        ]
      });
      
      expect(sessionWithMessages.messages.length).toBe(1);
    });
  });
});