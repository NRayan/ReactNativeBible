import type en from "./locales/en.json";
import type enContent from "./content/en/components.json";
import type enLearn from "./content/en/learn.json";

type TranslationResource = typeof en & { content: typeof enContent & typeof enLearn };

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"
    resources: {
      translation: TranslationResource
    }
  }
}