import { Message, Conversation, TypingIndicator, MessageAttachment } from '../types/messaging';

class MessagingService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private typingIndicators: Map<string, TypingIndicator[]> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  // Event system for real-time updates
  on(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Initialize with mock data
  async initialize() {
    // Mock conversations
    const mockConversations: Conversation[] = [
      {
        id: 'conv-1',
        participants: [
          {
            userId: 'user-1',
            name: 'Sarah Johnson',
            avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'teacher',
            isOnline: true
          },
          {
            userId: 'user-2',
            name: 'Ahmed Hassan',
            avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'student',
            isOnline: false,
            lastSeen: new Date(Date.now() - 300000) // 5 minutes ago
          }
        ],
        lastActivity: new Date(),
        unreadCount: 2,
        isActive: true,
        conversationType: 'student_teacher'
      },
      {
        id: 'conv-2',
        participants: [
          {
            userId: 'user-3',
            name: 'Michael Chen',
            avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'teacher',
            isOnline: true
          },
          {
            userId: 'user-2',
            name: 'Ahmed Hassan',
            avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
            role: 'student',
            isOnline: false,
            lastSeen: new Date(Date.now() - 300000)
          }
        ],
        lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
        unreadCount: 0,
        isActive: true,
        conversationType: 'student_teacher'
      }
    ];

    // Mock messages
    const mockMessages: { [key: string]: Message[] } = {
      'conv-1': [
        {
          id: 'msg-1',
          conversationId: 'conv-1',
          senderId: 'user-1',
          receiverId: 'user-2',
          content: 'Hi Ahmed! Thank you for booking a lesson with me. I\'m excited to help you improve your English skills.',
          timestamp: new Date(Date.now() - 7200000), // 2 hours ago
          isRead: true,
          messageType: 'text'
        },
        {
          id: 'msg-2',
          conversationId: 'conv-1',
          senderId: 'user-2',
          receiverId: 'user-1',
          content: 'Hello Sarah! I\'m really looking forward to our lesson. I want to focus on business English and presentation skills.',
          timestamp: new Date(Date.now() - 7000000),
          isRead: true,
          messageType: 'text'
        },
        {
          id: 'msg-3',
          conversationId: 'conv-1',
          senderId: 'user-1',
          receiverId: 'user-2',
          content: 'Perfect! I have some great materials for business English. Should we schedule our first lesson for tomorrow at 3 PM?',
          timestamp: new Date(Date.now() - 6800000),
          isRead: true,
          messageType: 'text'
        },
        {
          id: 'msg-4',
          conversationId: 'conv-1',
          senderId: 'user-2',
          receiverId: 'user-1',
          content: 'That works perfectly for me! See you tomorrow.',
          timestamp: new Date(Date.now() - 300000), // 5 minutes ago
          isRead: false,
          messageType: 'text'
        },
        {
          id: 'msg-5',
          conversationId: 'conv-1',
          senderId: 'user-1',
          receiverId: 'user-2',
          content: 'Great! I\'ll send you the Zoom link shortly. Have a wonderful day!',
          timestamp: new Date(Date.now() - 60000), // 1 minute ago
          isRead: false,
          messageType: 'text'
        }
      ],
      'conv-2': [
        {
          id: 'msg-6',
          conversationId: 'conv-2',
          senderId: 'user-3',
          receiverId: 'user-2',
          content: 'Hi Ahmed! I saw your interest in TOEFL preparation. I\'d be happy to help you achieve your target score.',
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          isRead: true,
          messageType: 'text'
        }
      ]
    };

    // Store in memory
    mockConversations.forEach(conv => {
      this.conversations.set(conv.id, conv);
      if (mockMessages[conv.id]) {
        this.messages.set(conv.id, mockMessages[conv.id]);
        // Set last message
        const messages = mockMessages[conv.id];
        if (messages.length > 0) {
          conv.lastMessage = messages[messages.length - 1];
        }
      }
    });
  }

  // Get all conversations for current user
  async getConversations(userId: string): Promise<Conversation[]> {
    const userConversations = Array.from(this.conversations.values())
      .filter(conv => conv.participants.some(p => p.userId === userId))
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
    
    return userConversations;
  }

  // Get messages for a conversation
  async getMessages(conversationId: string, limit: number = 50, offset: number = 0): Promise<Message[]> {
    const messages = this.messages.get(conversationId) || [];
    return messages
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .slice(offset, offset + limit);
  }

  // Send a new message
  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    messageType: 'text' | 'image' | 'file' = 'text',
    attachments?: MessageAttachment[]
  ): Promise<Message> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const receiverId = conversation.participants.find(p => p.userId !== senderId)?.userId;
    if (!receiverId) {
      throw new Error('Receiver not found');
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
      isRead: false,
      messageType,
      attachments
    };

    // Add to messages
    const messages = this.messages.get(conversationId) || [];
    messages.push(newMessage);
    this.messages.set(conversationId, messages);

    // Update conversation
    conversation.lastMessage = newMessage;
    conversation.lastActivity = new Date();
    
    // Update unread count for receiver
    if (senderId !== receiverId) {
      conversation.unreadCount += 1;
    }

    // Emit events
    this.emit('message:new', newMessage);
    this.emit('conversation:updated', conversation);

    return newMessage;
  }

  // Mark messages as read
  async markAsRead(conversationId: string, userId: string): Promise<void> {
    const messages = this.messages.get(conversationId) || [];
    let hasUpdates = false;

    messages.forEach(message => {
      if (message.receiverId === userId && !message.isRead) {
        message.isRead = true;
        hasUpdates = true;
      }
    });

    if (hasUpdates) {
      const conversation = this.conversations.get(conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
        this.emit('conversation:updated', conversation);
      }
    }
  }

  // Start a new conversation
  async startConversation(currentUserId: string, targetUserId: string, targetUserName: string, targetUserAvatar: string, targetUserRole: 'teacher' | 'student'): Promise<Conversation> {
    // Check if conversation already exists
    const existingConv = Array.from(this.conversations.values()).find(conv =>
      conv.participants.some(p => p.userId === currentUserId) &&
      conv.participants.some(p => p.userId === targetUserId)
    );

    if (existingConv) {
      return existingConv;
    }

    // Create new conversation
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      participants: [
        {
          userId: currentUserId,
          name: 'You', // This would be replaced with actual user data
          avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          role: targetUserRole === 'teacher' ? 'student' : 'teacher',
          isOnline: true
        },
        {
          userId: targetUserId,
          name: targetUserName,
          avatar: targetUserAvatar,
          role: targetUserRole,
          isOnline: Math.random() > 0.5 // Random online status
        }
      ],
      lastActivity: new Date(),
      unreadCount: 0,
      isActive: true,
      conversationType: 'student_teacher'
    };

    this.conversations.set(newConversation.id, newConversation);
    this.messages.set(newConversation.id, []);

    this.emit('conversation:new', newConversation);
    return newConversation;
  }

  // Typing indicators
  setTyping(conversationId: string, userId: string, userName: string, isTyping: boolean) {
    const indicators = this.typingIndicators.get(conversationId) || [];
    const existingIndex = indicators.findIndex(i => i.userId === userId);

    if (isTyping) {
      const indicator: TypingIndicator = { conversationId, userId, userName, isTyping };
      if (existingIndex >= 0) {
        indicators[existingIndex] = indicator;
      } else {
        indicators.push(indicator);
      }
    } else {
      if (existingIndex >= 0) {
        indicators.splice(existingIndex, 1);
      }
    }

    this.typingIndicators.set(conversationId, indicators);
    this.emit('typing:updated', { conversationId, indicators });
  }

  getTypingIndicators(conversationId: string): TypingIndicator[] {
    return this.typingIndicators.get(conversationId) || [];
  }

  // Get unread message count
  getUnreadCount(userId: string): number {
    return Array.from(this.conversations.values())
      .filter(conv => conv.participants.some(p => p.userId === userId))
      .reduce((total, conv) => total + conv.unreadCount, 0);
  }
}

export const messagingService = new MessagingService();