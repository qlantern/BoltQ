import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import arTranslations from './locales/ar.json';

// Define resources object
const resources = {
  en: {
    translation: enTranslations,
  },
  fr: {
    translation: frTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'ar'],
    resources,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    react: {
      useSuspense: false, // Avoid suspense issues
    },
  })
  .then(() => {
    console.log('i18n initialized successfully');
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
