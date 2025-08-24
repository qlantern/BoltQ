import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { Conversation, Message, MessageThread } from '../../types/messaging';
import { messagingService } from '../../services/messagingService';
import { useAuth } from '../../contexts/AuthContext';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

interface MessageCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  initialConversationId?: string;
}

const MessageCenter: React.FC<MessageCenterProps> = ({
  isOpen,
  onClose,
  currentUserId,
  initialConversationId
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      initializeMessaging();
    }
  }, [isOpen, currentUserId]);

  useEffect(() => {
    if (initialConversationId && conversations.length > 0) {
      const conversation = conversations.find(c => c.id === initialConversationId);
      if (conversation) {
        handleConversationSelect(conversation);
      }
    }
  }, [initialConversationId, conversations]);

  const initializeMessaging = async () => {
    try {
      setIsLoading(true);
      await messagingService.initialize();
      
      const userConversations = await messagingService.getConversations(currentUserId);
      setConversations(userConversations);

      // Set up event listeners
      messagingService.on('message:new', handleNewMessage);
      messagingService.on('conversation:updated', handleConversationUpdate);
      messagingService.on('conversation:new', handleNewConversation);

    } catch (error) {
      console.error('Failed to initialize messaging:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewMessage = (message: Message) => {
    if (selectedConversation && message.conversationId === selectedConversation.id) {
      setMessages(prev => [...prev, message]);
    }
    
    // Update conversations list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === message.conversationId 
          ? { ...conv, lastMessage: message, lastActivity: message.timestamp }
          : conv
      ).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
    );
  };

  const handleConversationUpdate = (updatedConversation: Conversation) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      ).sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
    );
  };

  const handleNewConversation = (newConversation: Conversation) => {
    setConversations(prev => [newConversation, ...prev]);
  };

  const handleConversationSelect = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    
    try {
      const conversationMessages = await messagingService.getMessages(conversation.id);
      setMessages(conversationMessages);
      
      // Mark as read
      await messagingService.markAsRead(conversation.id, currentUserId);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation) return;

    try {
      const newMessage = await messagingService.sendMessage(
        selectedConversation.id,
        currentUserId,
        content
      );
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setMessages([]);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p.userId !== currentUserId && 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex overflow-hidden">
        {/* Sidebar - Conversations List */}
        <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-coral-500" />
                Messages
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
              </div>
            ) : (
              <ConversationList
                conversations={filteredConversations}
                currentUserId={currentUserId}
                selectedConversationId={selectedConversation?.id}
                onConversationSelect={handleConversationSelect}
              />
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              messages={messages}
              currentUserId={currentUserId}
              onSendMessage={handleSendMessage}
              onBack={handleBackToList}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;