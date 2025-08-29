interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

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

class NotificationService {
  private notifications: Map<string, Notification[]> = new Map();
  private settings: Map<string, NotificationSettings> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock notifications for demo
    const mockNotifications: Notification[] = [
      {
        id: 'notif-1',
        type: 'booking',
        title: 'New Booking Request',
        message: 'Ahmed Hassan has requested a Business English lesson for tomorrow at 2:00 PM',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        isRead: false,
        userId: 'user-2'
      },
      {
        id: 'notif-2',
        type: 'message',
        title: 'New Message',
        message: 'Maria Garcia sent you a message about lesson materials',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false,
        userId: 'user-2'
      },
      {
        id: 'notif-3',
        type: 'review',
        title: 'New Review',
        message: 'Lisa Park left you a 5-star review',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true,
        userId: 'user-2'
      }
    ];

    this.notifications.set('user-2', mockNotifications);
    
    // Default notification settings
    this.settings.set('user-2', {
      email: true,
      push: true,
      sms: false
    });
  }

  // Event system
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

  async getNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.get(userId) || [];
  }

  async getUnreadCount(userId: string): Promise<number> {
    const userNotifications = this.notifications.get(userId) || [];
    return userNotifications.filter(n => !n.isRead).length;
  }

  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const userNotifications = this.notifications.get(userId) || [];
    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.emit('notification:read', { notificationId, userId });
    }
  }

  async markAllAsRead(userId: string): Promise<void> {
    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.forEach(n => n.isRead = true);
    this.emit('notifications:allRead', { userId });
  }

  async createNotification(userId: string, notification: Omit<Notification, 'id' | 'userId' | 'timestamp' | 'isRead'>): Promise<void> {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      userId,
      timestamp: new Date(),
      isRead: false
    };

    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.unshift(newNotification);
    this.notifications.set(userId, userNotifications);

    this.emit('notification:new', newNotification);
  }

  async updateSettings(userId: string, settings: NotificationSettings): Promise<void> {
    this.settings.set(userId, settings);
    this.emit('settings:updated', { userId, settings });
  }

  async getSettings(userId: string): Promise<NotificationSettings> {
    return this.settings.get(userId) || { email: true, push: true, sms: false };
  }
}

export const notificationService = new NotificationService();