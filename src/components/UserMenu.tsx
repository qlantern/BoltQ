import React, { useState } from 'react';
import { User, LogOut, Settings, BookOpen, Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  onNavigate: (view: string) => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onNavigate }) => {
  const { user, signOut, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      onNavigate('home');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onNavigate('signin')}
          className="text-gray-700 hover:text-coral-500 transition-colors duration-200"
        >
          Sign In
        </button>
        <button 
          onClick={() => onNavigate('signup')}
          className="bg-coral-500 text-white px-4 py-2 rounded-lg hover:bg-coral-600 transition-colors duration-200"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow duration-200"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user.firstName}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    user.role === 'teacher' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role === 'teacher' ? 'Teacher' : 'Student'}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('profile');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4 mr-3" />
                Profile Settings
              </button>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  if (user.role === 'teacher') {
                    onNavigate('teacher-dashboard');
                  } else {
                    onNavigate('bookings');
                  }
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <BookOpen className="h-4 w-4 mr-3" />
                {user.role === 'teacher' ? 'Dashboard' : 'My Bookings'}
              </button>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('favorites');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Heart className="h-4 w-4 mr-3" />
                Favorites
              </button>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('messages');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <MessageCircle className="h-4 w-4 mr-3" />
                Messages
              </button>

              {user.role === 'student' && (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('become-teacher');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Become a Teacher
                </button>
              )}

              <hr className="my-2" />

              <button 
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;