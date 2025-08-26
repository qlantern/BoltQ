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
// ... existing code ...
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
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