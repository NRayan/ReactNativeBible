import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./locales/pt.json";
import en from "./locales/en.json";
import es from "./locales/es.json";

import enContent from "./content/en/components.json";
import ptContent from "./content/pt/components.json";
import esContent from "./content/es/components.json";

i18n.use(initReactI18next).init({
    resources:
    {
        pt: { translation: { ...pt, content: ptContent } },
        en: { translation: { ...en, content: enContent } },
        es: { translation: { ...es, content: esContent } },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;