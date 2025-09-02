import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageUtils, SUPPORTED_LANGUAGES } from '../utils/languageUtils';

/**
 * Language Test Component
 * This component tests the language change functionality
 */
const LanguageTest: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [testResults, setTestResults] = React.useState<Record<string, string>>({});

  const runLanguageTest = async (langCode: string) => {
    try {
      console.log(`Testing language change to: ${langCode}`);
      
      // Test language change
      await LanguageUtils.changeLanguage(langCode as any);
      
      // Verify the change
      const currentLang = LanguageUtils.getCurrentLanguage();
      const isRTL = LanguageUtils.isRTL();
      const savedLang = localStorage.getItem('i18nextLng');
      
      setTestResults({
        currentLanguage: `${currentLang.name} (${currentLang.code})`,
        direction: isRTL ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)',
        persistence: `Saved: ${savedLang}`,
        documentDir: document.documentElement.dir,
        documentLang: document.documentElement.lang,
        i18nLanguage: i18n.language
      });
      
      console.log('Language test results:', {
        currentLanguage: currentLang,
        isRTL,
        savedLang,
        documentDir: document.documentElement.dir,
        documentLang: document.documentElement.lang
      });
      
    } catch (error) {
      console.error('Language test failed:', error);
      setTestResults({ error: error.message });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Language Change Feature Test</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-4">Language Switcher Test</h2>
        <div className="space-x-2 mb-4">
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => runLanguageTest(lang.code)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
        
        {Object.keys(testResults).length > 0 && (
          <div className="bg-white p-4 rounded border">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            {testResults.error ? (
              <div className="text-red-600">Error: {testResults.error}</div>
            ) : (
              <div className="space-y-1 text-sm">
                <div><strong>Current Language:</strong> {testResults.currentLanguage}</div>
                <div><strong>Direction:</strong> {testResults.direction}</div>
                <div><strong>Persistence:</strong> {testResults.persistence}</div>
                <div><strong>Document Dir:</strong> {testResults.documentDir}</div>
                <div><strong>Document Lang:</strong> {testResults.documentLang}</div>
                <div><strong>i18n Language:</strong> {testResults.i18nLanguage}</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Translation Test</h2>
        <div className="space-y-2 text-sm">
          <div><strong>Find Teachers:</strong> {t('common.findTeachers', 'Find Teachers')}</div>
          <div><strong>Become Teacher:</strong> {t('common.becomeTeacher', 'Become a Teacher')}</div>
          <div><strong>Sign Up:</strong> {t('common.signUp', 'Sign up')}</div>
          <div><strong>Log In:</strong> {t('common.logIn', 'Log in')}</div>
          <div><strong>Language:</strong> {t('common.language', 'Language')}</div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTest;