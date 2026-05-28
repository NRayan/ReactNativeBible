import React from "react";
import { Text as RNText, Platform } from "react-native";
import type { TextStyle } from "react-native";
import { useThemeStore } from "@stores/theme";
import type { ColorTokens, TypographyTokens } from "@theme/types";

type TextProps = {
  variant?: keyof TypographyTokens;
  color?: keyof ColorTokens;
} & React.ComponentProps<typeof RNText>;

const variantDefaultColor: Record<keyof TypographyTokens, keyof ColorTokens> = {
    "screen-title": "textPrimary",
    "heading": "textPrimary",
    "section-label": "textMuted",
    "body": "textSecondary",
    "body-emphasis": "textPrimary",
    "caption": "textDisabled",
    "code": "textSecondary",
    "tab-label": "textDisabled",
};

export function Text({ variant = "body", color, style, ...rest }: TextProps) {
    const { theme: { colors, typography } } = useThemeStore();
    const token = typography[variant];

    const computedStyle: TextStyle = {
        fontSize: token.fontSize,
        fontWeight: token.fontWeight,
        ...(token.letterSpacing !== undefined && { letterSpacing: token.letterSpacing }),
        ...(token.textTransform !== undefined && { textTransform: token.textTransform }),
        ...(variant === "code" && {
            fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
        }),
        color: colors[color ?? variantDefaultColor[variant]],
    };

    return <RNText style={[computedStyle, style]} {...rest} />;
}
