import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { LanguageUtils, SUPPORTED_LANGUAGES, type LanguageCode } from '../utils/languageUtils';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'icon';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'dropdown' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = LanguageUtils.getCurrentLanguage();

  const handleLanguageChange = async (langCode: LanguageCode) => {
    try {
      await LanguageUtils.changeLanguage(langCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button 
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-coral-500 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Globe className="h-4 w-4 mr-1" />
          {currentLanguage.code.toUpperCase()}
        </button>
        
        {isOpen && (
          <div className="absolute top-full right-0 mt-1 py-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 py-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
