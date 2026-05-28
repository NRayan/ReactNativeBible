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
  fontWeight: "400" | "500" | "600" | "700";
  letterSpacing?: number;
  textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
};

export type TypographyTokens = {
  "screen-title": TypographyToken;
  "heading": TypographyToken;
  "section-label": TypographyToken;
  "body": TypographyToken;
  "body-emphasis": TypographyToken;
  "caption": TypographyToken;
  "code": TypographyToken;
  "tab-label": TypographyToken;
};

export type RadiusTokens = {
  small: number;
  default: number;
  large: number;
};

export type SizeTokens = {
  borderWidth: number;
  touchTargetMin: number;
};

export type Theme = {
  colors: ColorTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  size: SizeTokens;
};

export type ThemeMode = "dark" | "light";
