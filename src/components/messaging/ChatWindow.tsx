import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Conversation, Message } from '../../types/messaging';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
  onSendAttachment?: (file: File) => void;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  onSendAttachment,
  onBack
}) => {
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendAttachment = () => {
    if (selectedFile && onSendAttachment) {
      onSendAttachment(selectedFile);
      setSelectedFile(null);
    }
  };

  const otherParticipant = conversation.participants.find(p => p.userId !== currentUserId);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus input when conversation changes
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [conversation.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput.trim());
      setMessageInput('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    
    // Simple typing indicator logic
    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true);
    } else if (isTyping && e.target.value.length === 0) {
      setIsTyping(false);
    }
  };

  if (!otherParticipant) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Unable to load conversation</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <img
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {otherParticipant.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">{otherParticipant.name}</h3>
              <p className="text-sm text-gray-500">
                {otherParticipant.isOnline ? (
                  <span className="text-green-600">Online</span>
                ) : (
                  `Last seen ${otherParticipant.lastSeen ? new Date(otherParticipant.lastSeen).toLocaleTimeString() : 'recently'}`
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Start the conversation</h3>
              <p className="text-gray-500">Send a message to {otherParticipant.name}</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUserId}
                showAvatar={
                  index === 0 || 
                  messages[index - 1].senderId !== message.senderId ||
                  (message.timestamp.getTime() - messages[index - 1].timestamp.getTime()) > 300000 // 5 minutes
                }
                senderAvatar={
                  message.senderId === currentUserId 
                    ? 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
                    : otherParticipant.avatar
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-3">
          {/* File Upload Button */}
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            onClick={handleFileButtonClick}
            type="button"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${otherParticipant.name}...`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500 resize-none max-h-32"
              rows={1}
              style={{
                minHeight: '40px',
                height: 'auto'
              }}
            />
            {/* File Preview */}
            {selectedFile && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-700">{selectedFile.name}</span>
                <button
                  className="text-xs text-red-500 hover:underline"
                  onClick={() => setSelectedFile(null)}
                  type="button"
                >
                  Remove
                </button>
                <button
                  className="text-xs text-coral-500 hover:underline"
                  onClick={handleSendAttachment}
                  type="button"
                >
                  Send File
                </button>
              </div>
            )}
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
    </div>
  );
};

export default ChatWindow;