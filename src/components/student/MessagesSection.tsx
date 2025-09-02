import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Send, 
  Paperclip, 
  Smile,
  MoreVertical,
  Star,
  Clock,
  CheckCheck,
  Plus,
  Calendar,
  Video
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  teacherRating: number;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
  subject?: string;
}

const MessagesSection: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      teacherName: 'Sarah Johnson',
      teacherAvatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      teacherRating: 4.9,
      lastMessage: 'Great progress in today\'s lesson! Here are some materials for practice.',
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 1,
      isOnline: true,
      subject: 'Business English',
      messages: [
        {
          id: '1',
          senderId: 'student',
          content: 'Hi Sarah! I have a question about the homework you assigned.',
          timestamp: new Date(Date.now() - 3600000),
          isRead: true
        },
        {
          id: '2',
          senderId: 'teacher',
          content: 'Hello Ahmed! Of course, what specific questions do you have about the exercises?',
          timestamp: new Date(Date.now() - 3300000),
          isRead: true
        },
        {
          id: '3',
          senderId: 'student',
          content: 'I\'m having trouble with the conditional sentences in exercise 3.',
          timestamp: new Date(Date.now() - 3000000),
          isRead: true
        },
        {
          id: '4',
          senderId: 'teacher',
          content: 'I understand! Let me send you some additional materials that will help clarify conditional sentences.',
          timestamp: new Date(Date.now() - 2700000),
          isRead: true
        },
        {
          id: '5',
          senderId: 'teacher',
          content: 'Great progress in today\'s lesson! Here are some materials for practice.',
          timestamp: new Date(Date.now() - 300000),
          isRead: false
        }
      ]
    },
    {
      id: '2',
      teacherName: 'Michael Chen',
      teacherAvatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      teacherRating: 4.8,
      lastMessage: 'Your IELTS practice test results look promising!',
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 0,
      isOnline: false,
      subject: 'IELTS Preparation',
      messages: [
        {
          id: '1',
          senderId: 'teacher',
          content: 'Your IELTS practice test results look promising!',
          timestamp: new Date(Date.now() - 1800000),
          isRead: true
        }
      ]
    },
    {
      id: '3',
      teacherName: 'Emma Williams',
      teacherAvatar: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      teacherRating: 5.0,
      lastMessage: 'Thank you for the great lesson today!',
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 0,
      isOnline: false,
      subject: 'Conversation Practice',
      messages: [
        {
          id: '1',
          senderId: 'student',
          content: 'Thank you for the great lesson today!',
          timestamp: new Date(Date.now() - 7200000),
          isRead: true
        }
      ]
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

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

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // Add message logic here
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.subject && conv.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button className="flex items-center px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600">
          <Plus className="h-4 w-4 mr-2" />
          Find Teachers
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-1 text-sm bg-coral-500 text-white rounded-lg">
                All
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                Unread
              </button>
              <button className="flex items-center px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                <Filter className="h-3 w-3 mr-1" />
                Filter
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-coral-50 border-r-2 border-coral-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.teacherAvatar}
                      alt={conversation.teacherName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-medium truncate ${
                        conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {conversation.teacherName}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-xs text-gray-500">{conversation.teacherRating}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <div className="bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    {conversation.subject && (
                      <p className="text-xs text-blue-600 mb-1">{conversation.subject}</p>
                    )}
                    <p className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConv.teacherAvatar}
                        alt={selectedConv.teacherName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConv.teacherName}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          <span className="text-xs text-gray-600">{selectedConv.teacherRating}</span>
                        </div>
                        {selectedConv.subject && (
                          <span className="text-xs text-blue-600">• {selectedConv.subject}</span>
                        )}
                        <span className="text-xs text-gray-600">
                          {selectedConv.isOnline ? 'Online' : `Last seen ${formatTime(selectedConv.lastMessageTime)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                      <Calendar className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.senderId === 'student'
                          ? 'bg-coral-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.senderId === 'student' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{formatTime(message.timestamp)}</span>
                        {message.senderId === 'student' && (
                          <CheckCheck className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end space-x-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-1">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder={`Message ${selectedConv.teacherName}...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 resize-none"
                      rows={1}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>

                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                    <Smile className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-2 rounded-full transition-colors ${
                      messageInput.trim()
                        ? 'bg-coral-500 text-white hover:bg-coral-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a teacher from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;