import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  view: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  currentView: string;
  selectedTeacher?: { name: string } | null;
  onNavigate: (view: string) => void;
  className?: string;
}

// Define the logical hierarchy of your views
const viewHierarchy: { [key: string]: { label: string; parent?: string; icon?: React.ReactNode } } = {
  'home': { label: 'Home', icon: <Home className="h-4 w-4" /> },
  'search': { label: 'Find Teachers', parent: 'home' },
  'profile': { label: 'Teacher Profile', parent: 'search' },
  'signup': { label: 'Sign Up', parent: 'home' },
  'signin': { label: 'Sign In', parent: 'home' },
  'become-teacher': { label: 'Become a Teacher', parent: 'home' },
  'admin-login': { label: 'Admin Login', parent: 'home' },
  'admin-dashboard': { label: 'Admin Dashboard', parent: 'admin-login' },
  'teacher-dashboard': { label: 'Teacher Dashboard', parent: 'home' },
  'student-dashboard': { label: 'Student Dashboard', parent: 'home' },
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  currentView, 
  selectedTeacher, 
  onNavigate, 
  className = '' 
}) => {
  const path: BreadcrumbItem[] = [];
  let current: string | undefined = currentView;

  // Build the path by traversing up the hierarchy
  while (current && viewHierarchy[current]) {
    const viewInfo = viewHierarchy[current];
    path.unshift({
      label: current === 'profile' && selectedTeacher 
        ? selectedTeacher.name 
        : viewInfo.label,
      view: current,
      icon: viewInfo.icon,
    });
    current = viewInfo.parent;
  }

  // Don't show breadcrumbs for home page or if path is too short
  if (path.length <= 1 || currentView === 'home') {
    return null;
  }

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300 ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2">
        {path.map((item, index) => (
          <li key={item.view} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="h-4 w-4 text-gray-400 dark:text-gray-500 mx-2" 
                aria-hidden="true" 
              />
            )}
            {index < path.length - 1 ? (
              <button
                onClick={() => onNavigate(item.view)}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-coral-500 dark:hover:text-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-500 rounded px-1 py-0.5 transition-colors duration-200"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <span 
                className="flex items-center space-x-1 text-gray-900 dark:text-white font-semibold"
                aria-current="page"
              >
                {item.icon}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;