import { AuthProvider } from './contexts/AuthContext.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';
import './styles/rtl.css';
import { LanguageUtils } from './utils/languageUtils';

// Initialize language settings
LanguageUtils.initializeLanguage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
