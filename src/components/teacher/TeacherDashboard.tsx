import React, { useState } from 'react';
import { 
  User, 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Settings, 
  Bell, 
  BarChart3
} from 'lucide-react';
import ProfileManagement from './ProfileManagement';
import MessagesSection from './MessagesSection';
import SchedulingSystem from './SchedulingSystem';
import ListingManagement from './ListingManagement';
import DashboardOverview from './DashboardOverview';
import SettingsSection from './SettingsSection';

type DashboardTab = 'overview' | 'profile' | 'messages' | 'schedule' | 'listings' | 'settings';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [notifications] = useState(3);

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
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-coral-500">TeachBnB</h1>
              <span className="ml-4 text-gray-600 hidden md:block">Teacher Dashboard</span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
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
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="Teacher"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">Sarah Johnson</span>
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

export default TeacherDashboard;
this is for the update 