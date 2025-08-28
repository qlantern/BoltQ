import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { MessageNotification } from '../../types/messaging';

interface MessageNotificationsProps {
  notifications: MessageNotification[];
  onNotificationClick: (conversationId: string) => void;
  onNotificationDismiss: (notificationId: string) => void;
}

const MessageNotifications: React.FC<MessageNotificationsProps> = ({
  notifications,
  onNotificationClick,
  onNotificationDismiss
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<MessageNotification[]>([]);

  useEffect(() => {
    // Show only the latest 3 notifications
    setVisibleNotifications(notifications.slice(0, 3));
  }, [notifications]);

  const handleNotificationClick = (notification: MessageNotification) => {
    onNotificationClick(notification.conversationId);
    onNotificationDismiss(notification.id);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(diff / 3600000);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {visibleNotifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm cursor-pointer hover:shadow-xl transition-shadow duration-200"
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-coral-500" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.senderName}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNotificationDismiss(notification.id);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 truncate mt-1">
                {notification.preview}
              </p>
              
              <p className="text-xs text-gray-500 mt-1">
                {formatTime(notification.timestamp)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageNotifications;