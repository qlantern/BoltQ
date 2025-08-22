export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file' | 'booking_request' | 'system';
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
}

export interface Conversation {
  id: string;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  lastActivity: Date;
  unreadCount: number;
  isActive: boolean;
  conversationType: 'student_teacher' | 'support';
}

export interface ConversationParticipant {
  userId: string;
  name: string;
  avatar: string;
  role: 'student' | 'teacher' | 'support';
  isOnline: boolean;
  lastSeen?: Date;
}

export interface MessageThread {
  conversation: Conversation;
  messages: Message[];
  isLoading: boolean;
  hasMoreMessages: boolean;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface MessageNotification {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  preview: string;
  timestamp: Date;
  isRead: boolean;
}