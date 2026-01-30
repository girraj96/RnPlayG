import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
// import hi from './hi.json';

const resources = {
  en: {
    translation: en,
  },
  // hi: {
  //   translation: hi,
  // },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export { i18n, initReactI18next };

//To change Language
//()=> i18n.changeLanguage(i18n.language === 'hi' ? 'en' : 'hi')
