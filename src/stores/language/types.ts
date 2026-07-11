export type Language = {
  code: "en" | "pt" | "es";
  nativeLabel: string;
  flag: string;
};

export const languages: Language[] = [
    { code: "en", nativeLabel: "English", flag: "🇺🇸" },
    { code: "pt", nativeLabel: "Português (BR)", flag: "🇧🇷" },
    { code: "es", nativeLabel: "Español", flag: "🇪🇸" },
];

export type LanguageState = {
  language: Language;
};

export type LanguageActions = {
  setLanguage: (language: Language)=> void;
};

export type LanguageStore = LanguageState & LanguageActions;
