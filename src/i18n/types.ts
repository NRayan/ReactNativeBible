import type en from "./locales/en.json";
import type enContent from "./content/en/components.json";

type TranslationResource = typeof en & { content: typeof enContent };

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"
    resources: {
      translation: TranslationResource
    }
  }
}