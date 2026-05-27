import { darkColors } from './dark';
import { lightColors } from './light';
import { typography } from './typography';
import { spacing } from './spacing';
import type { Theme, ThemeMode } from './types';

export const themes: Record<ThemeMode, Theme> = {
  dark: { colors: darkColors, typography, spacing },
  light: { colors: lightColors, typography, spacing },
};

export { typography, spacing };
export { iconSize } from './iconSize';
export * from './types';
