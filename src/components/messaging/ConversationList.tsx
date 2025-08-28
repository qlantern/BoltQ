import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { Conversation } from '../../types/messaging';

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  selectedConversationId?: string;
  onConversationSelect: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentUserId,
  selectedConversationId,
  onConversationSelect
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.userId !== currentUserId);
  };

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        <div className="text-center">
          <p>No conversations yet</p>
          <p className="text-sm mt-1">Start messaging teachers to see conversations here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {conversations.map((conversation) => {
        const otherParticipant = getOtherParticipant(conversation);
        const isSelected = conversation.id === selectedConversationId;
        
        if (!otherParticipant) return null;

        return (
          <button
            key={conversation.id}
            onClick={() => onConversationSelect(conversation)}
            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
              isSelected ? 'bg-coral-50 border-r-2 border-coral-500' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={otherParticipant.avatar}
                  alt={otherParticipant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {otherParticipant.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-medium truncate ${
                    conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {otherParticipant.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    )}
                    {conversation.unreadCount > 0 && (
                      <div className="bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>

                {/* Role badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    otherParticipant.role === 'teacher' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {otherParticipant.role === 'teacher' ? 'Teacher' : 'Student'}
                  </span>
                  
                  {!otherParticipant.isOnline && otherParticipant.lastSeen && (
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTime(otherParticipant.lastSeen)}
                    </div>
                  )}
                </div>

                {/* Last message preview */}
                {conversation.lastMessage && (
                  <div className="mt-2">
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}>
                      {conversation.lastMessage.senderId === currentUserId && (
                        <span className="text-gray-400 mr-1">You: </span>
                      )}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ConversationList;