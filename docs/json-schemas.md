# Comprehensive JSON Schema Definitions

## 1. Personality Profile Schema

### Full Schema Definition
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Personality Profile",
  "required": ["id", "name", "description", "tone"],
  "properties": {
    "id": {
      "type": "string",
      "description": "Unique identifier for the personality",
      "pattern": "^[a-z0-9-]{3,50}$",
      "minLength": 3,
      "maxLength": 50
    },
    "name": {
      "type": "string",
      "description": "Display name of the personality",
      "minLength": 2,
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the personality",
      "maxLength": 500
    },
    "tone": {
      "type": "string",
      "description": "Communication style of the personality",
      "enum": [
        "formal", 
        "casual", 
        "academic", 
        "philosophical", 
        "humorous"
      ]
    },
    "traits": {
      "type": "array",
      "description": "Personality-defining characteristics",
      "items": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "intensity": {
            "type": "number", 
            "minimum": 0, 
            "maximum": 10
          }
        },
        "required": ["name", "intensity"]
      },
      "maxItems": 10
    }
  }
}
```

## 2. Conversation Message Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Conversation Message",
  "required": ["speaker", "content", "timestamp"],
  "properties": {
    "speaker": {
      "type": "string",
      "description": "Identifier of message sender",
      "minLength": 1,
      "maxLength": 100
    },
    "content": {
      "type": "string",
      "description": "Actual message content",
      "minLength": 1,
      "maxLength": 1000
    },
    "timestamp": {
      "type": "number",
      "description": "Unix timestamp of message",
      "minimum": 0
    },
    "metadata": {
      "type": "object",
      "description": "Additional message metadata",
      "properties": {
        "emotion": {
          "type": "string",
          "enum": [
            "neutral", 
            "happy", 
            "sad", 
            "angry", 
            "surprised"
          ]
        },
        "language": {
          "type": "string",
          "description": "Language of the message"
        }
      }
    }
  }
}
```

## 3. API Response Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "API Response",
  "required": ["status"],
  "properties": {
    "status": {
      "type": "string",
      "enum": ["success", "error"],
      "description": "Overall response status"
    },
    "data": {
      "description": "Response payload",
      "oneOf": [
        {"type": "object"},
        {"type": "array"},
        {"type": "null"}
      ]
    },
    "error": {
      "type": "object",
      "description": "Error details if status is 'error'",
      "properties": {
        "code": {
          "type": "string",
          "description": "Machine-readable error code"
        },
        "message": {
          "type": "string",
          "description": "Human-readable error description"
        }
      }
    },
    "metadata": {
      "type": "object",
      "description": "Additional response metadata",
      "properties": {
        "requestId": {"type": "string"},
        "timestamp": {"type": "number"}
      }
    }
  }
}
```

## 4. Agent Deployment Configuration Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "Agent Deployment Configuration",
  "required": ["agentId", "profile"],
  "properties": {
    "agentId": {
      "type": "string",
      "description": "Unique agent identifier",
      "pattern": "^agent-[a-z0-9-]{3,50}$"
    },
    "profile": {"$ref": "#/definitions/PersonalityProfile"},
    "deploymentConfig": {
      "type": "object",
      "properties": {
        "scalingPolicy": {
          "type": "string",
          "enum": ["fixed", "dynamic", "burst"]
        },
        "resourceConstraints": {
          "type": "object",
          "properties": {
            "cpu": {"type": "number", "minimum": 0.1},
            "memory": {"type": "number", "minimum": 128}
          }
        }
      }
    }
  }
}
```

## Schema Validation Strategies
1. Use JSON Schema validators
2. Implement runtime type checking
3. Validate at input/output boundaries
4. Log and reject invalid schemas

## Versioning and Evolution
- Include `$schema` field for version tracking
- Design for backward compatibility
- Use semantic versioning for schema changes
