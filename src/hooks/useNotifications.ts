import { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';

interface Notification {
  id: string;
  type: 'booking' | 'message' | 'review' | 'payment' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  userId: string;
  actionUrl?: string;
}

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadNotifications();
      
      // Set up event listeners
      notificationService.on('notification:new', handleNewNotification);
      notificationService.on('notification:read', handleNotificationRead);
      notificationService.on('notifications:allRead', handleAllRead);

      return () => {
        notificationService.off('notification:new', handleNewNotification);
        notificationService.off('notification:read', handleNotificationRead);
        notificationService.off('notifications:allRead', handleAllRead);
      };
    }
  }, [userId]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const [userNotifications, count] = await Promise.all([
        notificationService.getNotifications(userId),
        notificationService.getUnreadCount(userId)
      ]);
      setNotifications(userNotifications);
      setUnreadCount(count);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewNotification = (notification: Notification) => {
    if (notification.userId === userId) {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    }
  };

  const handleNotificationRead = ({ notificationId }: { notificationId: string }) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleAllRead = ({ userId: readUserId }: { userId: string }) => {
    if (readUserId === userId) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId, userId);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead(userId);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    refresh: loadNotifications
  };
};