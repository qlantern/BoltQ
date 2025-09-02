import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  User, 
  Heart, 
  Settings, 
  Bell, 
  BarChart3,
  LogOut,
  Clock,
  Star,
  Award,
  Target
} from 'lucide-react';
import LanguageSelector from '../LanguageSelector';
import StudentOverview from './StudentOverview';
import MyLessons from './MyLessons';
import MessagesSection from './MessagesSection';
import FavoritesSection from './FavoritesSection';
import ProgressTracking from './ProgressTracking';
import StudentProfile from './StudentProfile';
import StudentSettings from './StudentSettings';

type DashboardTab = 'overview' | 'lessons' | 'progress' | 'messages' | 'favorites' | 'profile' | 'settings';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [notifications] = useState(2);
  const { user, signOut } = useAuth();

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
    { id: 'lessons', label: 'My Lessons', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: notifications },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <StudentOverview />;
      case 'lessons':
        return <MyLessons />;
      case 'progress':
        return <ProgressTracking />;
      case 'messages':
        return <MessagesSection />;
      case 'favorites':
        return <FavoritesSection />;
      case 'profile':
        return <StudentProfile />;
      case 'settings':
        return <StudentSettings />;
      default:
        return <StudentOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Fixed Left */}
            <div className="flex items-center w-60">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-2xl font-bold text-coral-500 hover:text-coral-600 transition-colors"
              >
                TeachBnB
              </button>
            </div>

            {/* Center Title */}
            <div className="flex-1 text-center">
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
            </div>

            {/* Right Side Actions - Fixed Right */}
            <div className="flex items-center space-x-4 w-60 justify-end">
              <LanguageSelector variant="icon" />
              <button className="relative p-2 text-gray-600 hover:text-coral-500 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                  alt="Student"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user ? `${user.firstName} ${user.lastName}` : 'Student'}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-1 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded"
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
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
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
                        ? 'bg-coral-50 text-coral-600 border-r-2 border-coral-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;