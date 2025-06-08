
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import modular translation files
import enCommon from '../locales/en/common.json';
import enAnalysis from '../locales/en/analysis.json';
import enCompetitorAnalysis from '../locales/en/competitorAnalysis.json';
import enSettings from '../locales/en/settings.json';

import deCommon from '../locales/de/common.json';
import deAnalysis from '../locales/de/analysis.json';
import deCompetitorAnalysis from '../locales/de/competitorAnalysis.json';
import deSettings from '../locales/de/settings.json';

const resources = {
  en: {
    translation: {
      common: enCommon,
      analysis: enAnalysis,
      competitorAnalysis: enCompetitorAnalysis,
      settings: enSettings
    }
  },
  de: {
    translation: {
      common: deCommon,
      analysis: deAnalysis,
      competitorAnalysis: deCompetitorAnalysis,
      settings: deSettings
    }
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
