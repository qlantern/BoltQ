import React, { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LanguageUtils, SUPPORTED_LANGUAGES, type LanguageCode } from '../../../utils/languageUtils';


interface LanguageSelectorProps {
  variant?: 'dropdown' | 'icon';
  className?: string;
  darkMode?: boolean;
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  className = '',
  darkMode = false,
}): JSX.Element => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const currentLanguage = LanguageUtils.getCurrentLanguage();
  const isRTL = LanguageUtils.isRTL();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen && event.key === 'Enter') {
      setIsOpen(true);
      setFocusedIndex(0);
      return;
    }

    if (isOpen) {
      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => (prev < SUPPORTED_LANGUAGES.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : SUPPORTED_LANGUAGES.length - 1));
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(SUPPORTED_LANGUAGES.length - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleLanguageChange(SUPPORTED_LANGUAGES[focusedIndex].code);
          }
          break;
        default:
          // Handle first-letter navigation
          const key = event.key.toLowerCase();
          const index = SUPPORTED_LANGUAGES.findIndex(lang => 
            lang.name.toLowerCase().startsWith(key)
          );
          if (index !== -1) {
            setFocusedIndex(index);
          }
          break;
      }
    }
  }, [isOpen, focusedIndex]);

  const handleLanguageChange = useCallback(async (langCode: LanguageCode) => {
    try {
      await LanguageUtils.changeLanguage(langCode);
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, []);

  // Focus management for keyboard navigation
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      menuItemsRef.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isOpen]);

  // Reset focused index when closing
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  if (variant === 'icon') {
    const iconButtonClasses = [
      'flex items-center px-3 py-2 text-sm font-medium',
      darkMode ? 'text-gray-300 hover:text-coral-400' : 'text-gray-700 hover:text-coral-500',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-t-md',
      isOpen ? (darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200') : '',
      isOpen ? 'border-b-0' : 'rounded-b-md',
      className
    ].join(' ');

    const dropdownClasses = [
      'absolute w-full rounded-b-lg shadow-lg border border-t-0 z-50 overflow-hidden',
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    ].join(' ');

    return (
      <div className="relative inline-block min-w-[120px]" role="navigation">
        <button
          ref={buttonRef}
          className={iconButtonClasses}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="language-listbox"
        >
          <Globe className="h-4 w-4 mr-1.5" aria-hidden="true" />
          <span>{currentLanguage.code.toUpperCase()}</span>
          <ChevronDown 
            className={`h-4 w-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            aria-hidden="true" 
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropdownRef}
              id="language-listbox"
              role="listbox"
              aria-label="Select language"
              className={dropdownClasses}
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleKeyDown}
              style={{ 
                direction: isRTL ? 'rtl' : 'ltr'
              }}
            >
              {SUPPORTED_LANGUAGES.map((lang, index) => {
                const isSelected = lang.code === currentLanguage.code;
                const isFocused = index === focusedIndex;
                const itemClasses = [
                  'flex items-center w-full px-4 py-2.5 text-sm',
                  darkMode
                    ? isSelected
                      ? 'bg-coral-900/20 text-coral-300 font-medium'
                      : 'text-gray-300 hover:bg-gray-700'
                    : isSelected
                      ? 'bg-coral-50 text-coral-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50',
                  isFocused ? 'ring-2 ring-inset ring-coral-500' : ''
                ].join(' ');

                return (
                  <button
                    key={lang.code}
                    ref={el => menuItemsRef.current[index] = el}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={itemClasses}
                  >
                    <span className="mr-2 text-base" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <span className="flex-1 text-left">{lang.label}</span>
                    {isSelected && (
                      <Check 
                        className={`h-4 w-4 ml-2 ${darkMode ? 'text-coral-400' : 'text-coral-600'}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full dropdown variant
  const dropdownButtonClasses = [
    'flex items-center space-x-2 px-4 py-2.5 text-sm font-medium w-full',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2',
    'rounded-t-lg border',
    isOpen ? 'border-b-0' : 'rounded-b-lg',
    darkMode
      ? 'text-gray-300 bg-gray-800 border-gray-700 hover:bg-gray-700'
      : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
  ].join(' ');

  const fullDropdownClasses = [
    'absolute w-full shadow-lg border border-t-0 z-50 overflow-hidden rounded-b-lg',
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  ].join(' ');

  return (
    <div className={`relative inline-block min-w-[200px] ${className}`} role="navigation">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={dropdownButtonClasses}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="language-listbox-full"
      >
        <span className="text-base" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        <span>{currentLanguage.name}</span>
        <ChevronDown 
          className={`h-4 w-4 ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            id="language-listbox-full"
            role="listbox"
            aria-label="Select language"
            className={fullDropdownClasses}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onKeyDown={handleKeyDown}
            style={{ 
              direction: isRTL ? 'rtl' : 'ltr'
            }}
          >
            {SUPPORTED_LANGUAGES.map((lang, index) => {
              const isSelected = lang.code === currentLanguage.code;
              const isFocused = index === focusedIndex;
              const itemClasses = [
                'flex items-center w-full px-4 py-3 text-sm',
                darkMode
                  ? isSelected
                    ? 'bg-coral-900/20 text-coral-300 font-medium'
                    : 'text-gray-300 hover:bg-gray-700'
                  : isSelected
                    ? 'bg-coral-50 text-coral-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50',
                isFocused ? 'ring-2 ring-inset ring-coral-500' : ''
              ].join(' ');

              return (
                <button
                  key={lang.code}
                  ref={el => menuItemsRef.current[index] = el}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={itemClasses}
                >
                  <span className="text-base mr-3" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{lang.name}</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang.label}
                    </span>
                  </div>
                  {isSelected && (
                    <Check 
                      className={`h-4 w-4 ml-auto ${darkMode ? 'text-coral-400' : 'text-coral-600'}`}
                      aria-hidden="true" 
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
