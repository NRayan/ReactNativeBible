import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

import enContent from "./content/en/components.json";
import ptContent from "./content/pt/components.json";
import esContent from "./content/es/components.json";

import enLearn from "./content/en/learn.json";
import ptLearn from "./content/pt/learn.json";
import esLearn from "./content/es/learn.json";

i18n.use(initReactI18next).init({
    resources:
    {
        pt: { translation: { ...pt, content: { ...ptContent, ...ptLearn } } },
        en: { translation: { ...en, content: { ...enContent, ...enLearn } } },
        es: { translation: { ...es, content: { ...esContent, ...esLearn } } },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;