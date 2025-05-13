import { ChatMessage, ChatSession, ChatResponse } from '../src/interfaces/chat.interface';

describe('Chat Interfaces', () => {
  const sampleMessage: ChatMessage = {
    id: 'msg-001',
    sessionId: 'session-001',
    sender: 'peter',
    content: 'I will never deny you',
    timestamp: new Date()
  };

  const sampleSession: ChatSession = {
    id: 'session-001',
    participants: ['peter', 'jesus'],
    messages: [sampleMessage],
    createdAt: new Date(),
    lastActiveAt: new Date()
  };

  const sampleResponse: ChatResponse = {
    sessionId: 'session-001',
    replies: [
      { agentId: 'peter', message: 'Master, I am ready to follow you' },
      { agentId: 'jesus', message: 'Before the rooster crows, you will deny me three times' }
    ]
  };

  test('chat message interface should be valid', () => {
    expect(sampleMessage.sender).toBe('peter');
    expect(sampleMessage.content).toBe('I will never deny you');
  });

  test('chat session should track messages and participants', () => {
    expect(sampleSession.participants).toHaveLength(2);
    expect(sampleSession.messages).toHaveLength(1);
  });

  test('chat response should include multiple agent replies', () => {
    expect(sampleResponse.replies).toHaveLength(2);
    expect(sampleResponse.replies[0].agentId).toBe('peter');
  });
});