import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SEOLinkStructureProps {
  onNavigate: (view: string) => void;
  className?: string;
}

// Component for implementing SEO-friendly internal linking structure
const SEOLinkStructure: React.FC<SEOLinkStructureProps> = ({ onNavigate, className = '' }) => {
  const linkCategories = [
    {
      title: 'For Students',
      links: [
        {
          text: 'Find English teachers in Algeria',
          view: 'search',
          description: 'Browse qualified English teachers across Algeria'
        },
        {
          text: 'IELTS preparation teachers',
          view: 'search',
          description: 'Specialized IELTS tutors in Algiers, Oran, Constantine'
        },
        {
          text: 'Business English instructors',
          view: 'search', 
          description: 'Professional English teachers for career advancement'
        },
        {
          text: 'Conversational English tutors',
          view: 'search',
          description: 'Improve speaking skills with native speakers'
        }
      ]
    },
    {
      title: 'For Teachers',
      links: [
        {
          text: 'Become an English teacher',
          view: 'become-teacher',
          description: 'Join TeachBnB and teach students across Algeria'
        },
        {
          text: 'Teacher application process',
          view: 'become-teacher',
          description: 'Learn about our teacher verification process'
        },
        {
          text: 'Teaching opportunities in Algeria',
          view: 'become-teacher',
          description: 'Discover teaching opportunities in Algerian cities'
        }
      ]
    },
    {
      title: 'Learning Resources',
      links: [
        {
          text: 'English learning guide for Algerians',
          view: 'home',
          description: 'Tips and strategies for learning English in Algeria'
        },
        {
          text: 'Online vs offline English lessons',
          view: 'search',
          description: 'Compare learning formats available in Algeria'
        },
        {
          text: 'English proficiency levels explained',
          view: 'home',
          description: 'Understanding CEFR levels and your learning journey'
        }
      ]
    }
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Explore TeachBnB Algeria
      </h3>
      
      <div className="space-y-6">
        {linkCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {category.title}
            </h4>
            <div className="space-y-2">
              {category.links.map((link, linkIndex) => (
                <button
                  key={linkIndex}
                  onClick={() => onNavigate(link.view)}
                  className="block w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 group"
                  title={link.description}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-coral-600 dark:text-coral-400 group-hover:text-coral-700 dark:group-hover:text-coral-300">
                      {link.text}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-400 dark:text-gray-500 group-hover:text-coral-500 dark:group-hover:text-coral-400" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {link.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats for Algeria */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
          TeachBnB in Algeria
        </h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-coral-50 dark:bg-coral-900/20 rounded-lg p-3">
            <div className="text-lg font-bold text-coral-600 dark:text-coral-400">500+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Teachers</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">15+</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Cities</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOLinkStructure;