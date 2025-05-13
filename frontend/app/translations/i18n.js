// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translations
import en from './en.json';
import fr from './fr.json';
import de from './de.json';
// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation not found
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
