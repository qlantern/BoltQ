import React from 'react';
import { ArrowLeft, ArrowRight, Home, Search, User, Calendar } from 'lucide-react';

interface ContextualNavigationProps {
  currentView: string;
  userRole?: 'student' | 'teacher' | 'admin' | null;
  onNavigate: (view: string) => void;
  className?: string;
}

const ContextualNavigation: React.FC<ContextualNavigationProps> = ({
  currentView,
  userRole,
  onNavigate,
  className = ''
}) => {
  const getNavigationSuggestions = () => {
    const suggestions: Array<{
      label: string;
      view: string;
      icon: React.ReactNode;
      description: string;
      priority: 'primary' | 'secondary';
    }> = [];

    switch (currentView) {
      case 'search':
        suggestions.push(
          {
            label: 'Back to Home',
            view: 'home',
            icon: <Home className="h-4 w-4" />,
            description: 'Return to main page',
            priority: 'secondary'
          }
        );
        if (userRole === 'student') {
          suggestions.push(
            {
              label: 'My Dashboard',
              view: 'student-dashboard',
              icon: <User className="h-4 w-4" />,
              description: 'View your learning progress',
              priority: 'secondary'
            }
          );
        }
        break;

      case 'profile':
        suggestions.push(
          {
            label: 'Find More Teachers',
            view: 'search',
            icon: <Search className="h-4 w-4" />,
            description: 'Browse other qualified teachers',
            priority: 'primary'
          },
          {
            label: 'Home',
            view: 'home',
            icon: <Home className="h-4 w-4" />,
            description: 'Return to main page',
            priority: 'secondary'
          }
        );
        break;

      case 'become-teacher':
        suggestions.push(
          {
            label: 'Browse Teachers',
            view: 'search',
            icon: <Search className="h-4 w-4" />,
            description: 'See example teacher profiles',
            priority: 'secondary'
          },
          {
            label: 'Home',
            view: 'home',
            icon: <Home className="h-4 w-4" />,
            description: 'Return to main page',
            priority: 'secondary'
          }
        );
        break;

      case 'student-dashboard':
        suggestions.push(
          {
            label: 'Find Teachers',
            view: 'search',
            icon: <Search className="h-4 w-4" />,
            description: 'Book more lessons',
            priority: 'primary'
          }
        );
        break;

      case 'teacher-dashboard':
        suggestions.push(
          {
            label: 'View as Student',
            view: 'search',
            icon: <Search className="h-4 w-4" />,
            description: 'See how students find teachers',
            priority: 'secondary'
          }
        );
        break;
    }

    return suggestions;
  };

  const suggestions = getNavigationSuggestions();

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.view}
          onClick={() => onNavigate(suggestion.view)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            suggestion.priority === 'primary'
              ? 'bg-coral-500 text-white hover:bg-coral-600'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          title={suggestion.description}
          aria-label={`${suggestion.label} - ${suggestion.description}`}
        >
          {suggestion.icon}
          <span>{suggestion.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ContextualNavigation;