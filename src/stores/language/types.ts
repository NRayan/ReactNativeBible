export type Language = {
  code: "en" | "pt" | "es";
  label: string;
  nativeLabel: string;
  flag: string;
};

export const languages: Language[] = [
    { code: "pt", label: "Portuguese", nativeLabel: "Português (BR)", flag: "🇧🇷" },
    { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
    { code: "en", label: "English", nativeLabel: "English", flag: "🇺🇸" },
];

export type LanguageState = {
  language: Language;
};

export type LanguageActions = {
  setLanguage: (language: Language)=> void;
};

export type LanguageStore = LanguageState & LanguageActions;
