// Chat message interface
export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: string;
  content: string;
  timestamp: Date;
}

// Chat session interface
export interface ChatSession {
  id: string;
  participants: string[];
  messages: ChatMessage[];
  createdAt: Date;
  lastActiveAt: Date;
}

// Chat response interface
export interface ChatResponse {
  sessionId: string;
  replies: {
    agentId: string;
    message: string;
  }[];
}