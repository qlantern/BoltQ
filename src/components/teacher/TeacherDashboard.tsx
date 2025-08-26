import React, { useState } from 'react';
import { 
  Bell} from 'lucide-react';

type DashboardTab = 'overview' | 'profile' | 'messages' | 'schedule' | 'listings' | 'settings';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [notifications] = useState(3);

  // Example tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div>Overview Content</div>;
      case 'profile':
        return <div>Profile Content</div>;
      case 'messages':
        return <div>Messages Content</div>;
      case 'schedule':
        return <div>Schedule Content</div>;
      case 'listings':
        return <div>Listings Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-coral-500">TeachBnB</h1>
              <span className="ml-4 text-gray-600 hidden md:block">Teacher Dashboard</span>
            </div>

            {/* Tabs */}
            <nav className="ml-8 flex space-x-4">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'overview' ? 'bg-coral-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'profile' ? 'bg-coral-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'messages' ? 'bg-coral-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                Messages
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'schedule' ? 'bg-coral-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('schedule')}
              >
                Schedule
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'listings' ? 'bg-coral-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('listings')}
              >
                Listings
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'settings' ? 'bg-coral-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </nav>

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
      {/* Tab Content */}
              <main className="p-4">
                {renderTabContent()}
              </main>
            </div>
        );
      };
      
      export default TeacherDashboard;