import React from "react";
import { Text as RNText, Platform } from "react-native";
import type { TextStyle } from "react-native";
import { useThemeStore } from "@stores/theme";
import type { ColorTokens, TypographyTokens } from "@theme/types";
import { variantDefaultColor } from "./Text.utils";

export type TextProps = {
    variant?: keyof TypographyTokens;
    color?: keyof ColorTokens;
    flex?: number;
} & React.ComponentProps<typeof RNText>;

export function Text({ variant = "body", color, flex, style, ...rest }: TextProps) {
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

    return <RNText style={[computedStyle, flex !== undefined && { flex }, style]} {...rest} />;
}
