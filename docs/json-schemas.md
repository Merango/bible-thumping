# JSON Schema Definitions for Multi-Agent Chat Platform

## 1. Personality Profile Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "description", "tone"],
  "properties": {
    "id": {
      "type": "string",
      "minLength": 3,
      "maxLength": 50,
      "pattern": "^[a-z0-9-]+$"
    },
    "name": {
      "type": "string",
      "minLength": 2,
      "maxLength": 100
    },
    "description": {
      "type": "string",
      "maxLength": 500
    },
    "tone": {
      "type": "string",
      "enum": ["formal", "casual", "academic", "philosophical", "humorous"]
    },
    "samplePrompts": {
      "type": "array",
      "items": {"type": "string"},
      "maxItems": 10
    },
    "version": {
      "type": "number",
      "minimum": 1
    }
  }
}
```

## 2. Chatbot Response Generation Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["profileId", "conversationHistory"],
  "properties": {
    "profileId": {
      "type": "string"
    },
    "conversationHistory": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["speaker", "message"],
        "properties": {
          "speaker": {"type": "string"},
          "message": {"type": "string"},
          "timestamp": {"type": "number"}
        }
      },
      "maxItems": 20
    },
    "maxResponseLength": {
      "type": "number",
      "minimum": 10,
      "maximum": 500
    }
  }
}
```

## 3. Conversation Orchestration Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["sessionId", "userMessage"],
  "properties": {
    "sessionId": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9-]+$"
    },
    "userMessage": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1000
    },
    "selectedAgents": {
      "type": "array",
      "items": {"type": "string"},
      "maxItems": 5
    }
  }
}
```

## 4. API Response Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["success", "error"]
    },
    "data": {
      "type": ["object", "array", "null"]
    },
    "error": {
      "type": "object",
      "properties": {
        "code": {"type": "string"},
        "message": {"type": "string"}
      }
    },
    "metadata": {
      "type": "object",
      "properties": {
        "timestamp": {"type": "number"},
        "requestId": {"type": "string"}
      }
    }
  },
  "required": ["status"]
}
```
