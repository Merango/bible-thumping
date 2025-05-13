import { 
  AgentProfile, 
  ChatMessage, 
  PersonalityDataManagerInterface 
} from '../interfaces/component-interfaces';

describe('Component Interface Validation', () => {
  describe('AgentProfile Validation', () => {
    const validProfile: AgentProfile = {
      id: 'jesus_disciple',
      name: 'Peter',
      description: 'Fisherman and apostle',
      tone: 'passionate',
      samplePrompts: ['What did Jesus teach?', 'Tell me about your journey']
    };

    const invalidProfile: Partial<AgentProfile> = {
      name: '',  // Invalid: empty name
    };

    it('should validate a complete agent profile', () => {
      const isValid = validateAgentProfile(validProfile);
      expect(isValid).toBe(true);
    });

    it('should reject an incomplete profile', () => {
      const isValid = validateAgentProfile(invalidProfile as AgentProfile);
      expect(isValid).toBe(false);
    });
  });

  describe('Chat Message Validation', () => {
    const validMessage: ChatMessage = {
      agentId: 'peter',
      timestamp: Date.now(),
      content: 'Hello, fellow disciples!'
    };

    it('should validate a complete chat message', () => {
      const isValid = validateChatMessage(validMessage);
      expect(isValid).toBe(true);
    });
  });
});

// Validation functions
function validateAgentProfile(profile: AgentProfile): boolean {
  return !!(
    profile.id && 
    profile.name && 
    profile.name.length > 0 && 
    profile.description
  );
}

function validateChatMessage(message: ChatMessage): boolean {
  return !!(
    message.agentId && 
    message.timestamp && 
    message.content
  );
}