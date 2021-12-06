import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import { EN } from './EN';
import { HU } from './HU';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { ...EN },
    },
    hu: {
      translation: { ...HU },
    },
  },
  fallbackLng: 'en',
});

export default i18n;
