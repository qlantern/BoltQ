import React from 'react';
import { X } from 'lucide-react';
import useBreakpoint from '../hooks/useBreakpoint';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  showCloseButton = true
}) => {
  const { isMobile } = useBreakpoint();
  
  if (!isOpen) return null;
  
  return (
    <div className=\"fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-0\">
      <div className={`bg-white dark:bg-gray-900 transform transition-all duration-300 ${
        isMobile 
          ? 'w-full h-full overflow-y-auto' 
          : 'w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl m-4'
      } ${className}`}>
        {title && (
          <div className={`flex items-center justify-between border-b border-gray-200 dark:border-gray-700 ${
            isMobile ? 'p-4 sticky top-0 bg-white dark:bg-gray-900 z-10' : 'p-6'
          }`}>
            <h2 className={`font-semibold text-gray-900 dark:text-white ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
                  isMobile ? 'p-3 min-h-touch min-w-touch' : 'p-2'
                } flex items-center justify-center`}
              >
                <X className=\"h-6 w-6\" />
              </button>
            )}
          </div>
        )}
        
        <div className={isMobile ? 'p-4' : 'p-6'}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveModal;