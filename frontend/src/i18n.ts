import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEN from './locales/en.json';
import commonRU from './locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: commonEN },
    ru: { common: commonRU },
  },
  lng: 'ru',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  debug: false,
  saveMissing: true,
  missingKeyHandler: (lng, ns, key) => {
    console.log(`Missing translation for key: ${key}`);
  },
});

export default i18n;
