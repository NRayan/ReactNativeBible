import type { ViewStyle } from "react-native";
import type { ColorTokens, SizeTokens } from "@theme/types";

export type ButtonVariant = "primary" | "outline" | "icon" | "icon-cta";

export const fgColor: Record<ButtonVariant, keyof ColorTokens> = {
    "primary": "accent-foreground",
    "outline": "text-secondary",
    "icon": "text-secondary",
    "icon-cta": "accent-foreground",
};

export function getBorderStyle(variant: ButtonVariant, colors: ColorTokens, size: SizeTokens): ViewStyle {
    if (variant === "primary")
        return { borderWidth: size["border-width"], borderColor: colors.accent };
    if (variant === "icon" || variant === "outline")
        return { borderWidth: size["border-width"], borderColor: colors.border };
    return {};
}

export function getBgColor(variant: ButtonVariant, pressed: boolean, colors: ColorTokens): string | undefined {
    if (variant === "primary" || variant === "icon-cta") return colors.accent;
    if (variant === "icon") return colors[pressed ? "surface-pressed" : "surface"];
    return pressed ? colors["surface-pressed"] : undefined;
}

export function getPressedOpacity(variant: ButtonVariant, pressed: boolean): ViewStyle {
    return (variant === "primary" || variant === "icon-cta") && pressed ? { opacity: 0.8 } : {};
}
