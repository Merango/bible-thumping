/**
 * Comprehensive system-wide interfaces for multi-agent chat platform
 * Defines core interfaces and type contracts for each component
 */

// Personality Profile Interface
export interface PersonalityProfile {
  id: string;
  name: string;
  description: string;
  tone: string;
  samplePrompts: string[];
  version: string;
}

// Chat Message Interface
export interface ChatMessage {
  id: string;
  sessionId: string;
  agentId: string;
  content: string;
  timestamp: number;
  type: 'user' | 'agent';
}

// Conversation Session Interface
export interface ConversationSession {
  id: string;
  participants: string[];
  messages: ChatMessage[];
  startTime: number;
  lastActivityTime: number;
  status: 'active' | 'completed' | 'terminated';
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Engine Adapter Response Interface
export interface LLMResponse {
  text: string;
  confidence: number;
  tokens: number;
}

// Agent Deployment Status Interface
export interface AgentDeploymentStatus {
  agentId: string;
  containerStatus: 'running' | 'stopped' | 'error';
  healthCheck: {
    cpu: number;
    memory: number;
    uptime: number;
  };
}

// Validation Utility
export class InterfaceValidator {
  static validatePersonalityProfile(profile: PersonalityProfile): boolean {
    const requiredFields = ['id', 'name', 'description', 'tone'];
    
    // Check required fields exist
    for (const field of requiredFields) {
      if (!profile[field]) {
        console.error(`Missing required field: ${field}`);
        return false;
      }
    }

    // Additional validation rules
    if (profile.name.length < 2 || profile.name.length > 50) {
      console.error('Invalid name length');
      return false;
    }

    if (profile.samplePrompts && profile.samplePrompts.length > 10) {
      console.error('Too many sample prompts');
      return false;
    }

    return true;
  }
}