import i18n from '../i18n';

// Language configuration
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'English (UK)', region: 'GB', dir: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'French', region: 'FR', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', label: 'Arabic', region: 'SA', dir: 'rtl' },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];
export type Direction = 'ltr' | 'rtl';

// Language utility functions
export class LanguageUtils {
  /**
   * Change language with proper RTL/LTR handling
   */
  static async changeLanguage(langCode: LanguageCode): Promise<void> {
    try {
      const language = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode);
      if (!language) {
        console.warn(`Language ${langCode} is not supported`);
        return;
      }

      // Change i18n language
      await i18n.changeLanguage(langCode);

      // Update document attributes
      document.documentElement.dir = language.dir;
      document.documentElement.lang = langCode;

      // Store in localStorage for persistence
      localStorage.setItem('i18nextLng', langCode);

      // Dispatch custom event for components that might need to react to language changes
      window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language: langCode, direction: language.dir }
      }));

      console.log(`Language changed to: ${language.name} (${langCode})`);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }

  /**
   * Get current language info
   */
  static getCurrentLanguage() {
    const currentLang = i18n.language || 'en';
    return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLang) || SUPPORTED_LANGUAGES[0];
  }

  /**
   * Check if current language is RTL
   */
  static isRTL(): boolean {
    const currentLang = this.getCurrentLanguage();
    return currentLang.dir === 'rtl';
  }

  /**
   * Initialize language on app startup
   */
  static initializeLanguage(): void {
    try {
      const savedLang = localStorage.getItem('i18nextLng');
      const currentLang = this.getCurrentLanguage();

      console.log('Initializing language:', { savedLang, currentLang: currentLang.code });

      // Apply the correct direction and lang attribute
      document.documentElement.dir = currentLang.dir;
      document.documentElement.lang = currentLang.code;

      // If we have a saved language that's different from the current one, switch to it
      if (savedLang && savedLang !== currentLang.code && this.isValidLanguage(savedLang)) {
        console.log(`Switching to saved language: ${savedLang}`);
        this.changeLanguage(savedLang as LanguageCode);
      }
    } catch (error) {
      console.error('Failed to initialize language:', error);
      // Fallback to English if initialization fails
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }

  /**
   * Get browser preferred language from supported languages
   */
  static getBrowserPreferredLanguage(): LanguageCode {
    const browserLang = navigator.language.split('-')[0];
    const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === browserLang);
    return supportedLang ? supportedLang.code : 'en';
  }

  /**
   * Validate if language code is supported
   */
  static isValidLanguage(langCode: string): langCode is LanguageCode {
    return SUPPORTED_LANGUAGES.some(lang => lang.code === langCode);
  }
}

// Initialize language on module load
if (typeof window !== 'undefined') {
  LanguageUtils.initializeLanguage();
}