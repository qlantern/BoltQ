import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Settings, 
  Bell, 
  BarChart3,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import ProfileManagement from './ProfileManagement';
import MessagesSection from './MessagesSection';
import { SchedulingSystem } from './SchedulingSystem';
import ListingManagement from './ListingManagement';
import DashboardOverview from './DashboardOverview';
import SettingsSection from './SettingsSection';
import TeacherBottomNavigation from './TeacherBottomNavigation';
import useBreakpoint from '../../hooks/useBreakpoint';

type DashboardTab = 'overview' | 'profile' | 'messages' | 'schedule' | 'listings' | 'settings';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [notifications] = useState(3);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isMobile } = useBreakpoint();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: notifications },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'listings', label: 'My Classes', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileManagement />;
      case 'messages':
        return <MessagesSection />;
      case 'schedule':
        return <SchedulingSystem />;
      case 'listings':
        return <ListingManagement />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo and Mobile Menu */}
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="mr-3 p-2 text-gray-600 dark:text-gray-400 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg min-h-touch min-w-touch flex items-center justify-center"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              <button 
                onClick={() => window.location.href = '/'}
                className={`font-bold text-coral-500 hover:text-coral-600 transition-colors ${
                  isMobile ? 'text-lg' : 'text-2xl'
                }`}
              >
                TeachBnB
              </button>
            </div>

            {/* Center Title - Hidden on mobile */}
            {!isMobile && (
              <div className="flex-1 text-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Teacher Dashboard</h1>
              </div>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {!isMobile && <LanguageSelector variant="icon" />}
              
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg min-h-touch min-w-touch flex items-center justify-center">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar || "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Teacher"
                  className="w-8 h-8 rounded-full object-cover"
                />
                {!isMobile && (
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user ? `${user.firstName} ${user.lastName}` : 'Teacher'}
                  </span>
                )}
                <button
                  onClick={handleSignOut}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded min-h-touch min-w-touch flex items-center justify-center"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <nav className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen border-r border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as DashboardTab)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-coral-50 dark:bg-coral-900/20 text-coral-600 dark:text-coral-400 border-r-2 border-coral-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="ml-auto bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Overlay */}
        {isMobile && isMobileSidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <nav className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-coral-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg min-h-touch min-w-touch flex items-center justify-center"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as DashboardTab);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center px-4 py-4 text-left rounded-lg transition-colors duration-200 min-h-touch ${
                          activeTab === item.id
                            ? 'bg-coral-50 dark:bg-coral-900/20 text-coral-600 dark:text-coral-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="font-medium flex-1">{item.label}</span>
                        {item.badge && item.badge > 0 && (
                          <span className="bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Mobile-specific additional options */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2">
                    <LanguageSelector variant="dropdown" />
                  </div>
                </div>
              </div>
            </nav>
          </>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto ${
          isMobile ? 'pb-16' : ''
        }`}>
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <TeacherBottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notificationCount={notifications}
      />
    </div>
  );
};

export default TeacherDashboard;