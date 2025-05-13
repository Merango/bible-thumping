import Ajv from 'ajv';
import schema from './component-schemas.json';

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

describe('Component JSON Schemas', () => {
  describe('PersonalityProfile Validation', () => {
    const validProfile = {
      id: 'jesus-001',
      name: 'Jesus Christ',
      description: 'Founder of Christianity',
      tone: 'compassionate',
      samplePrompts: ['Love thy neighbor'],
      version: 1
    };

    it('should validate a correct personality profile', () => {
      const isValid = validate({
        personalityProfile: validProfile
      });
      
      expect(isValid).toBeTruthy();
      expect(validate.errors).toBeNull();
    });

    it('should reject profile with invalid ID', () => {
      const invalidProfile = { ...validProfile, id: 'INVALID ID!' };
      
      const isValid = validate({
        personalityProfile: invalidProfile
      });
      
      expect(isValid).toBeFalsy();
      expect(validate.errors).not.toBeNull();
    });
  });

  describe('ChatbotResponse Validation', () => {
    const validResponse = {
      agentId: 'peter-001',
      message: 'I will follow you, Lord.',
      confidence: 0.95,
      timestamp: Date.now()
    };

    it('should validate a correct chatbot response', () => {
      const isValid = validate({
        chatbotResponse: validResponse
      });
      
      expect(isValid).toBeTruthy();
      expect(validate.errors).toBeNull();
    });

    it('should reject response with out-of-range confidence', () => {
      const invalidResponse = { ...validResponse, confidence: 1.5 };
      
      const isValid = validate({
        chatbotResponse: invalidResponse
      });
      
      expect(isValid).toBeFalsy();
      expect(validate.errors).not.toBeNull();
    });
  });
});