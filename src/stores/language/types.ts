export type Language = {
  code: "en" | "pt" | "es";
  nativeLabel: string;
  flag: string;
};

export const languages: Language[] = [
    { code: "pt", nativeLabel: "Português (BR)", flag: "🇧🇷" },
    { code: "es", nativeLabel: "Español", flag: "🇪🇸" },
    { code: "en", nativeLabel: "English", flag: "🇺🇸" },
];

export type LanguageState = {
  language: Language;
};

export type LanguageActions = {
  setLanguage: (language: Language)=> void;
};

export type LanguageStore = LanguageState & LanguageActions;
