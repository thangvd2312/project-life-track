import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/assets/locales/en/translations.json";
import translationKO from "@/assets/locales/ko/translations.json";

export const defaultNS = "translations";
export const resources = {
  en: {
    [defaultNS]: translationEN,
  },
  ko: {
    [defaultNS]: translationKO,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: ["ko", "en"],
  defaultNS: defaultNS,
  ns: [defaultNS],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
