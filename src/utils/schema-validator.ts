import Ajv from 'ajv';
import schemas from '../interfaces/schemas.json';

export class SchemaValidator {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
  }

  /**
   * Validate data against a specific schema
   * @param schemaName Name of the schema to validate against
   * @param data Data to validate
   * @returns Validation result
   */
  validate(schemaName: string, data: any): {
    isValid: boolean;
    errors?: string[];
  } {
    // Find the specific schema definition
    const schemaDefinition = schemas.definitions[schemaName];
    
    if (!schemaDefinition) {
      throw new Error(`Schema ${schemaName} not found`);
    }

    const validate = this.ajv.compile(schemaDefinition);
    const valid = validate(data);

    return {
      isValid: valid,
      errors: valid ? undefined : 
        validate.errors?.map(err => `${err.instancePath} ${err.message}`)
    };
  }
}

export const schemaValidator = new SchemaValidator();