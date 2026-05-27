export type ColorTokens = {
  background: string;
  surface: string;
  surfacePressed: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDisabled: string;
  accent: string;
  accentForeground: string;
  success: string;
  danger: string;
  surfaceAccent: string;
  surfaceSuccess: string;
  surfaceDanger: string;
};

export type TypographyToken = {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
  letterSpacing?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
};

export type TypographyTokens = {
  screenTitle: TypographyToken;
  heading: TypographyToken;
  sectionLabel: TypographyToken;
  body: TypographyToken;
  bodyEmphasis: TypographyToken;
  caption: TypographyToken;
  code: TypographyToken;
  tabLabel: TypographyToken;
};

export type SpacingTokens = {
  borderWidth: number;
  radiusSmall: number;
  radiusDefault: number;
  radiusLarge: number;
  touchTargetMin: number;
};

export type Theme = {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
};

export type ThemeMode = 'dark' | 'light';
