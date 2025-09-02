import { useState } from 'react';
import { Menu, MessageCircle, Heart, Bell, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useMessaging } from '../hooks/useMessaging';
import UserMenu from './UserMenu';
import { useFavorites } from '../hooks/useFavorites';
import MessageCenter from './messaging/MessageCenter';
import MessageNotifications from './messaging/MessageNotifications';
import LanguageSelector from './LanguageSelector';
import DayNightSwitch from './shsfui/switch/day-night-switch';
import useBreakpoint from '../hooks/useBreakpoint';

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  // Mock current user ID - in real app this would come from auth context
  const currentUserId = user?.id || 'user-2';
  
  const { 
    unreadCount, 
    notifications, 
    dismissNotification 
  } = useMessaging(currentUserId);
  const { favorites } = useFavorites(currentUserId);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 xs:px-6">
          {/* Logo - Responsive width */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => onNavigate('home')}
              className="text-xl xs:text-2xl font-bold text-coral-500 dark:text-coral-400 hover:text-coral-600 dark:hover:text-coral-300 transition-colors"
            >
              TeachBnB
            </button>
          </div>

          {/* Desktop Navigation */}
          {isDesktop && (
            <div className="flex items-center space-x-4">
              <DayNightSwitch
                defaultChecked={true}
                onToggle={(checked) => {
                  document.documentElement.classList.toggle('dark', !checked);
                }}
              />
              <LanguageSelector variant="icon" />

              {isAuthenticated && (
                <>
                  <button 
                    onClick={() => setIsMessageCenterOpen(true)}
                    className="relative p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
                    title={t('common.messages')}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  <button 
                    className="p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
                    title={t('common.notifications')}
                  >
                    <Bell className="h-5 w-5" />
                  </button>

                  {user?.role === 'student' && (
                    <button
                      onClick={() => {
                        alert(`You have ${favorites.length} favorite teachers`);
                      }}
                      className="relative p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
                      title={t('common.favorites')}
                    >
                      <Heart className="h-5 w-5" />
                      {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {favorites.length > 9 ? '9+' : favorites.length}
                        </span>
                      )}
                    </button>
                  )}
                </>
              )}

              <UserMenu onNavigate={onNavigate} />
            </div>
          )}

          {/* Tablet Navigation */}
          {isTablet && (
            <div className="flex items-center space-x-2">
              <LanguageSelector variant="icon" />
              <DayNightSwitch
                defaultChecked={true}
                onToggle={(checked) => {
                  document.documentElement.classList.toggle('dark', !checked);
                }}
              />
              
              {isAuthenticated && (
                <button 
                  onClick={() => setIsMessageCenterOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
                  title={t('common.messages')}
                >
                  <MessageCircle className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              )}

              <UserMenu onNavigate={onNavigate} />
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <LanguageSelector variant="icon" />
              
              {isAuthenticated && (
                <button 
                  onClick={() => setIsMessageCenterOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
                  title={t('common.messages')}
                >
                  <MessageCircle className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400 min-h-touch min-w-touch flex items-center justify-center"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (isMobile || isTablet) && (
        <div className="border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => {
                onNavigate('search');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
            >
              {t('common.findTeachers')}
            </button>
            
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => {
                    onNavigate('signup');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
                >
                  {t('common.signUp')}
                </button>
                <button 
                  onClick={() => {
                    onNavigate('signin');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
                >
                  {t('common.logIn')}
                </button>
              </>
            ) : (
              <>
                {user?.role === 'teacher' && (
                  <button 
                    onClick={() => {
                      onNavigate('teacher-dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
                  >
                    Teacher Dashboard
                  </button>
                )}
                
                {/* Mobile-specific actions */}
                {isMobile && (
                  <>
                    <button 
                      className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
                      title={t('common.notifications')}
                    >
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-3" />
                        {t('common.notifications')}
                      </div>
                    </button>
                    
                    {user?.role === 'student' && (
                      <button
                        onClick={() => {
                          alert(`You have ${favorites.length} favorite teachers`);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Heart className="h-5 w-5 mr-3" />
                            {t('common.favorites')}
                          </div>
                          {favorites.length > 0 && (
                            <span className="bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {favorites.length > 9 ? '9+' : favorites.length}
                            </span>
                          )}
                        </div>
                      </button>
                    )}
                    
                    <div className="px-3 py-3">
                      <DayNightSwitch
                        defaultChecked={true}
                        onToggle={(checked) => {
                          document.documentElement.classList.toggle('dark', !checked);
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
            
            <button 
              onClick={() => {
                onNavigate('become-teacher');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch"
            >
              {t('common.becomeTeacher')}
            </button>
            
            <button className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-coral-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg dark:text-gray-300 dark:hover:text-coral-400 min-h-touch">
              {t('common.help')}
            </button>
            
            {(isTablet || isMobile) && (
              <div className="px-3 py-2">
                <LanguageSelector variant="dropdown" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Center */}
      <MessageCenter
        isOpen={isMessageCenterOpen}
        onClose={() => setIsMessageCenterOpen(false)}
        currentUserId={currentUserId}
      />

      {/* Message Notifications */}
      <MessageNotifications
        notifications={notifications}
        onNotificationClick={() => {
          setIsMessageCenterOpen(true);
        }}
        onNotificationDismiss={dismissNotification}
      />
    </header>
  );
};

export default Header;