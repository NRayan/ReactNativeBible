import type { Theme, ThemeMode } from "../../theme/types";

export type ThemeState = {
  mode: ThemeMode;
  theme: Theme;
};

export type ThemeActions = {
  setMode: (mode: ThemeMode)=> void;
};

export type ThemeStore = ThemeState & ThemeActions;
