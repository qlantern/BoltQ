import { useState, useEffect, useCallback } from 'react';
import { Conversation, Message, MessageNotification } from '../types/messaging';
import { messagingService } from '../services/messagingService';

export const useMessaging = (currentUserId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<MessageNotification[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeMessaging();
    
    return () => {
      // Cleanup event listeners
      messagingService.off('message:new', handleNewMessage);
      messagingService.off('conversation:updated', handleConversationUpdate);
      messagingService.off('conversation:new', handleNewConversation);
    };
  }, [currentUserId]);

  const initializeMessaging = async () => {
    try {
      await messagingService.initialize();
      const userConversations = await messagingService.getConversations(currentUserId);
      setConversations(userConversations);
      
      const totalUnread = messagingService.getUnreadCount(currentUserId);
      setUnreadCount(totalUnread);

      // Set up event listeners
      messagingService.on('message:new', handleNewMessage);
      messagingService.on('conversation:updated', handleConversationUpdate);
      messagingService.on('conversation:new', handleNewConversation);

      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize messaging:', error);
    }
  };

  const handleNewMessage = useCallback((message: Message) => {
    // Update conversations
    setConversations(prev => 
      prev.map(conv => 
        conv.id === message.conversationId 
          ? { ...conv, lastMessage: message, lastActivity: message.timestamp }
          : conv
      ).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
    );

    // Update unread count
    const newUnreadCount = messagingService.getUnreadCount(currentUserId);
    setUnreadCount(newUnreadCount);

    // Create notification if message is not from current user
    if (message.senderId !== currentUserId) {
      const conversation = conversations.find(c => c.id === message.conversationId);
      const sender = conversation?.participants.find(p => p.userId === message.senderId);
      
      if (sender) {
        const notification: MessageNotification = {
          id: `notif-${Date.now()}`,
          conversationId: message.conversationId,
          senderId: message.senderId,
          senderName: sender.name,
          preview: message.content.length > 50 ? `${message.content.substring(0, 50)}...` : message.content,
          timestamp: message.timestamp,
          isRead: false
        };

        setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep only 5 notifications
      }
    }
  }, [currentUserId, conversations]);

  const handleConversationUpdate = useCallback((updatedConversation: Conversation) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      ).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
    );

    const newUnreadCount = messagingService.getUnreadCount(currentUserId);
    setUnreadCount(newUnreadCount);
  }, [currentUserId]);

  const handleNewConversation = useCallback((newConversation: Conversation) => {
    setConversations(prev => [newConversation, ...prev]);
  }, []);

  const startConversation = async (targetUserId: string, targetUserName: string, targetUserAvatar: string, targetUserRole: 'teacher' | 'student') => {
    try {
      const conversation = await messagingService.startConversation(
        currentUserId,
        targetUserId,
        targetUserName,
        targetUserAvatar,
        targetUserRole
      );
      return conversation;
    } catch (error) {
      console.error('Failed to start conversation:', error);
      throw error;
    }
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return {
    conversations,
    unreadCount,
    notifications,
    isInitialized,
    startConversation,
    dismissNotification
  };
};