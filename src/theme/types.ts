export type ColorTokens = {
  "background": string;
  "surface": string;
  "surface-pressed": string;
  "border": string;
  "text-primary": string;
  "text-secondary": string;
  "text-muted": string;
  "text-disabled": string;
  "accent": string;
  "accent-foreground": string;
  "success": string;
  "danger": string;
  "surface-accent": string;
  "surface-success": string;
  "surface-danger": string;
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
  "small": number;
  "default": number;
  "large": number;
};

export type SizeTokens = {
  "border-width": number;
  "touch-target-min": number;
};

export type Theme = {
  colors: ColorTokens;
  typography: TypographyTokens;
  radius: RadiusTokens;
  size: SizeTokens;
};

export type ThemeMode = "dark" | "light";
