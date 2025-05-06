// src/context/languageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

// Import language resources
import en from '../translations/en.json';
// Uncomment these imports once you have the translation files
// import es from '../translations/es.json';
// import fr from '../translations/fr.json';
// import de from '../translations/de.json';
// import zh from '../translations/zh.json';
// import ja from '../translations/ja.json';
// import ar from '../translations/ar.json';
// import hi from '../translations/hi.json';
// import pt from '../translations/pt.json';
// import ru from '../translations/ru.json';

// Available languages
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
];

// Initialize i18n with only available translations
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      // Only add these when the translation files are available
      // es: { translation: es },
      // fr: { translation: fr },
      // de: { translation: de },
      // zh: { translation: zh },
      // ja: { translation: ja },
      // ar: { translation: ar },
      // hi: { translation: hi },
      // pt: { translation: pt },
      // ru: { translation: ru },
    },
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Create the context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  // Initialize language on app start
  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Check if user has previously selected a language
        const storedLanguage = await AsyncStorage.getItem('user-language');
        
        if (storedLanguage) {
          changeLanguage(storedLanguage);
          setIsLanguageSelected(true);
        } else {
          // Use English as default without relying on RNLocalize
          changeLanguage('en');
        }
      } catch (error) {
        console.error('Error initializing language:', error);
        changeLanguage('en');
      }
    };

    initializeLanguage();
  }, []);

  // Handle RTL languages
  useEffect(() => {
    const isRTL = currentLanguage === 'ar';
    if (isRTL !== I18nManager.isRTL) {
      I18nManager.forceRTL(isRTL);
      // Note: In a real app, you might want to restart the app here
      // for RTL changes to fully take effect
    }
  }, [currentLanguage]);

  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      await AsyncStorage.setItem('user-language', languageCode);
      setIsLanguageSelected(true);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        changeLanguage, 
        isLanguageSelected,
        languages: LANGUAGES 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContext;