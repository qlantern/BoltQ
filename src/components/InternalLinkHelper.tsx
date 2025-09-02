import React from 'react';
import { ExternalLink, ArrowRight, Users, BookOpen, Award } from 'lucide-react';

interface InternalLinkHelperProps {
  currentView: string;
  userRole?: 'student' | 'teacher' | 'admin' | null;
  onNavigate: (view: string) => void;
  className?: string;
}

const InternalLinkHelper: React.FC<InternalLinkHelperProps> = ({
  currentView,
  userRole,
  onNavigate,
  className = ''
}) => {
  // Define contextual links based on current view and user role
  const getContextualLinks = () => {
    const links: Array<{
      label: string;
      view: string;
      description: string;
      icon: React.ReactNode;
      priority: 'high' | 'medium' | 'low';
    }> = [];

    switch (currentView) {
      case 'home':
        if (!userRole) {
          links.push(
            {
              label: 'Find English Teachers',
              view: 'search',
              description: 'Browse qualified teachers in Algeria',
              icon: <Users className="h-4 w-4" />,
              priority: 'high'
            },
            {
              label: 'Become a Teacher',
              view: 'become-teacher',
              description: 'Join our teaching community',
              icon: <Award className="h-4 w-4" />,
              priority: 'high'
            }
          );
        } else if (userRole === 'student') {
          links.push(
            {
              label: 'Find Teachers',
              view: 'search',
              description: 'Discover new teachers in Algeria',
              icon: <Users className="h-4 w-4" />,
              priority: 'high'
            },
            {
              label: 'My Dashboard',
              view: 'student-dashboard',
              description: 'View your learning progress',
              icon: <BookOpen className="h-4 w-4" />,
              priority: 'medium'
            }
          );
        } else if (userRole === 'teacher') {
          links.push(
            {
              label: 'Teacher Dashboard',
              view: 'teacher-dashboard',
              description: 'Manage your classes and students',
              icon: <BookOpen className="h-4 w-4" />,
              priority: 'high'
            }
          );
        }
        break;

      case 'search':
        if (userRole === 'student') {
          links.push(
            {
              label: 'My Dashboard',
              view: 'student-dashboard',
              description: 'View your booked lessons',
              icon: <BookOpen className="h-4 w-4" />,
              priority: 'medium'
            }
          );
        }
        if (!userRole) {
          links.push(
            {
              label: 'Sign Up as Student',
              view: 'signup',
              description: 'Create account to book lessons',
              icon: <Users className="h-4 w-4" />,
              priority: 'high'
            }
          );
        }
        break;

      case 'profile':
        links.push(
          {
            label: 'Find More Teachers',
            view: 'search',
            description: 'Explore other qualified teachers',
            icon: <Users className="h-4 w-4" />,
            priority: 'medium'
          }
        );
        if (!userRole) {
          links.push(
            {
              label: 'Sign Up to Book',
              view: 'signup',
              description: 'Create account to book lessons',
              icon: <BookOpen className="h-4 w-4" />,
              priority: 'high'
            }
          );
        }
        break;

      case 'become-teacher':
        if (!userRole) {
          links.push(
            {
              label: 'Browse Teachers',
              view: 'search',
              description: 'See what makes a great teacher profile',
              icon: <Users className="h-4 w-4" />,
              priority: 'medium'
            }
          );
        }
        break;
    }

    return links.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const contextualLinks = getContextualLinks();

  if (contextualLinks.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        You might also be interested in:
      </h4>
      <div className="space-y-2">
        {contextualLinks.slice(0, 3).map((link) => (
          <button
            key={link.view}
            onClick={() => onNavigate(link.view)}
            className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 group"
            aria-label={`${link.label} - ${link.description}`}
          >
            <div className="flex-shrink-0 text-coral-500 dark:text-coral-400">
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-coral-600 dark:group-hover:text-coral-400">
                {link.label}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {link.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-coral-500 dark:group-hover:text-coral-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default InternalLinkHelper;