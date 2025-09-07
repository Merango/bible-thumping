import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';

/**
 * Advanced JSON Schema Validator
 * Provides robust validation with detailed error reporting
 */
export class JSONSchemaValidator {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ 
      allErrors: true, 
      strict: true 
    });
    addFormats(this.ajv);
  }

  /**
   * Validate data against a JSON schema
   * @param schema - JSON schema definition
   * @param data - Data to validate
   * @returns Validation result with detailed errors
   */
  validate<T>(schema: JSONSchemaType<T>, data: unknown): ValidatorResult<T> {
    const validate = this.ajv.compile(schema);
    const isValid = validate(data);

    return {
      isValid,
      errors: isValid ? [] : validate.errors?.map(this.formatError) || [],
      data: isValid ? data as T : undefined
    };
  }

  /**
   * Format validation error for human-readable output
   */
  private formatError(error: Ajv.ErrorObject) {
    return {
      path: error.instancePath,
      message: error.message || 'Validation failed',
      code: error.keyword,
      params: error.params
    };
  }

  /**
   * Predefined schemas for common types
   */
  static schemas = {
    /**
     * Personality Profile Schema
     */
    personalityProfile: {
      type: 'object',
      properties: {
        id: { type: 'string', minLength: 1, maxLength: 100 },
        name: { type: 'string', minLength: 2, maxLength: 100 },
        tone: { 
          type: 'string', 
          enum: ['Philosophical', 'Humorous', 'Serious', 'Empathetic'] 
        },
        samplePrompts: {
          type: 'array',
          items: { type: 'string', maxLength: 200 },
          minItems: 1,
          maxItems: 10
        },
        metadata: { type: 'object', nullable: true }
      },
      required: ['name', 'tone', 'samplePrompts'],
      additionalProperties: false
    }
  };
}

/**
 * Validation Result Type
 * Provides type-safe validation with comprehensive error reporting
 */
export interface ValidatorResult<T> {
  isValid: boolean;
  errors: ValidationError[];
  data?: T;
}

/**
 * Detailed Validation Error Structure
 */
export interface ValidationError {
  path: string;
  message: string;
  code: string;
  params?: Record<string, unknown>;
}
