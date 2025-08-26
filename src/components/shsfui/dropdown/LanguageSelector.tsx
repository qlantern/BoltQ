import React, { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';

// Define supported languages with their metadata
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'English (UK)', region: 'GB', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'French', region: 'FR', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', label: 'Arabic', region: 'SA', dir: 'rtl' },
] as const;

// Type definitions
type LanguageCode = typeof languages[number]['code'];
type Direction = 'ltr' | 'rtl';

interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
  label: string;
  region: string;
  dir: Direction;
}

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

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const isRTL = currentLanguage.dir === 'rtl';

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
          setFocusedIndex(prev => (prev < languages.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : languages.length - 1));
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(languages.length - 1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0) {
            handleLanguageChange(languages[focusedIndex].code);
          }
          break;
        default:
          // Handle first-letter navigation
          const key = event.key.toLowerCase();
          const index = languages.findIndex(lang => 
            lang.name.toLowerCase().startsWith(key)
          );
          if (index !== -1) {
            setFocusedIndex(index);
          }
          break;
      }
    }
  }, [isOpen, focusedIndex]);

  const handleLanguageChange = useCallback((langCode: LanguageCode) => {
    const newLang = languages.find(lang => lang.code === langCode);
    if (newLang) {
      i18n.changeLanguage(langCode);
      document.documentElement.dir = newLang.dir;
      document.documentElement.lang = langCode;
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    }
  }, [i18n]);

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
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 rounded-md',
      className
    ].join(' ');

    const dropdownClasses = [
      'absolute top-full right-0 mt-1 w-48 rounded-lg shadow-lg border z-50 overflow-hidden',
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    ].join(' ');

    return (
      <div className="relative inline-block" role="navigation">
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
                direction: isRTL ? 'rtl' : 'ltr',
                right: isRTL ? 'auto' : 0,
                left: isRTL ? 0 : 'auto'
              }}
            >
              {languages.map((lang, index) => {
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
    'flex items-center space-x-2 px-4 py-2.5 text-sm font-medium',
    'rounded-lg transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-coral-500 focus:ring-offset-2',
    darkMode
      ? 'text-gray-300 bg-gray-800 border-gray-700 hover:bg-gray-700'
      : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
  ].join(' ');

  const fullDropdownClasses = [
    'absolute top-full mt-1 w-56 rounded-lg shadow-lg border z-50 overflow-hidden',
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  ].join(' ');

  return (
    <div className={`relative inline-block ${className}`} role="navigation">
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
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
              direction: isRTL ? 'rtl' : 'ltr',
              left: isRTL ? 'auto' : 0,
              right: isRTL ? 0 : 'auto'
            }}
          >
            {languages.map((lang, index) => {
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
