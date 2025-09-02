import React from 'react';
import { 
  BookOpen, 
  MessageCircle, 
  User, 
  Heart, 
  Settings, 
  BarChart3,
  Target
} from 'lucide-react';

type DashboardTab = 'overview' | 'lessons' | 'progress' | 'messages' | 'favorites' | 'profile' | 'settings';

interface BottomNavigationProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  notificationCount?: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  notificationCount = 0 
}) => {
  const primaryTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: notificationCount },
    { id: 'profile', label: 'Profile', icon: User }
  ] as const;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        {primaryTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as DashboardTab)}
              className={`flex flex-col items-center justify-center h-full px-3 py-2 transition-colors duration-200 min-w-0 flex-1 ${
                isActive 
                  ? 'text-coral-500 dark:text-coral-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-coral-500 dark:hover:text-coral-400'
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-1" />
                {'badge' in tab && tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-coral-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium truncate w-full text-center">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;