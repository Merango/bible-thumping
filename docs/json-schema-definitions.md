# JSON Schema Definitions for Multi-Agent Chat Platform

## 1. Personality Profile Schema

### Full Schema Documentation

#### Top-Level Structure
- **$schema**: JSON Schema draft-07 specification reference
- **title**: "Personality Profile"
- **type**: Object
- **required Fields**: 
  - `id`
  - `name`
  - `tone`
  - `samplePrompts`
  - `version`

#### Field Specifications

1. **id**
   - Type: String
   - Constraints:
     - Minimum Length: 1 character
     - Maximum Length: 50 characters
   - Purpose: Unique identifier for personality profile

2. **name**
   - Type: String
   - Constraints:
     - Minimum Length: 1 character
     - Maximum Length: 100 characters
   - Purpose: Name of the personality/character

3. **tone**
   - Type: String (Enumeration)
   - Allowed Values:
     - "compassionate"
     - "authoritative"
     - "playful"
     - "serious"
     - "neutral"
   - Purpose: Characterize communication style

4. **samplePrompts**
   - Type: Array of Strings
   - Constraints:
     - Minimum Items: 1
     - Maximum Items: 10
     - Each Prompt:
       - Minimum Length: 1 character
       - Maximum Length: 200 characters
   - Purpose: Example communication patterns

5. **version**
   - Type: Integer
   - Constraints:
     - Minimum Value: 1
   - Purpose: Track profile versioning

### Example Valid Personality Profile
```json
{
  "id": "jesus-disciple-profile",
  "name": "Jesus Christ",
  "tone": "compassionate",
  "samplePrompts": [
    "Love thy neighbor",
    "Forgiveness is the path to redemption"
  ],
  "version": 1
}
```

### Validation Rules
- All fields are mandatory
- Strict type checking
- Enumeration enforcement
- Length and content restrictions

## 2. Chatbot Engine Adapter Schema (Placeholder)

*Detailed schema to be developed in future iterations*

## Testing and Validation
- Use JSON Schema validators
- Implement runtime type checking
- Automated validation in interfaces
