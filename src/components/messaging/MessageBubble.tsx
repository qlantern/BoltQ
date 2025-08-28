import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types/messaging';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
  senderAvatar: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  showAvatar,
  senderAvatar
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        {showAvatar && !isOwn && (
          <img
            src={senderAvatar}
            alt="Sender"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        {!showAvatar && !isOwn && <div className="w-8" />}

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-coral-500 text-white rounded-br-md'
              : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
          }`}
        >
          {/* Message Content */}
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          
          {/* Time and Status */}
          <div className={`flex items-center justify-end mt-1 space-x-1 ${
            isOwn ? 'text-white/70' : 'text-gray-500'
          }`}>
            <span className="text-xs">{formatTime(message.timestamp)}</span>
            {isOwn && (
              <div className="flex items-center">
                {message.isRead ? (
                  <CheckCheck className="h-3 w-3" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Own avatar space */}
        {isOwn && <div className="w-8" />}
      </div>
    </div>
  );
};

export default MessageBubble;