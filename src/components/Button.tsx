import { Pressable } from "react-native";
import type { ViewStyle } from "react-native";
import { useThemeStore } from "@stores/theme";
import { s } from "@theme/spacing";
import type { ColorTokens } from "@theme/types";
import { Icon, TablerIconName } from "./Icon";
import { Text } from "./Text";

type ButtonVariant = "primary" | "outline" | "icon" | "icon-cta";

type ButtonProps = {
    variant?: ButtonVariant;
    icon?: TablerIconName;
    title?: string;
    onPress: ()=> void;
    disabled?: boolean;
};

const fgColor: Record<ButtonVariant, keyof ColorTokens> = {
    "primary": "accent-foreground",
    "outline": "text-secondary",
    "icon": "text-secondary",
    "icon-cta": "accent-foreground",
};

export function Button({ variant = "primary", icon, title, onPress, disabled = false }: ButtonProps) {
    const { theme: { colors, radius, size } } = useThemeStore();

    const isIconVariant = variant === "icon" || variant === "icon-cta";

    const baseStyle: ViewStyle = {
        borderRadius: radius.default,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.4 : 1,
        ...(isIconVariant
            ? { width: size["touch-target-min"], height: size["touch-target-min"] }
            : { paddingHorizontal: s(4), paddingVertical: s(3), minHeight: size["touch-target-min"], width: "100%" }
        ),
    };

    const getBorderStyle = (): ViewStyle => {
        if (variant === "primary")
            return { borderWidth: size["border-width"], borderColor: colors.accent };
        if (variant === "icon")
            return { borderWidth: size["border-width"], borderColor: colors.border };
        if (variant === "outline")
            return { borderWidth: size["border-width"], borderColor: colors.border };
        return {};
    };

    const getBgColor = (pressed: boolean): string | undefined => {
        if (variant === "primary" || variant === "icon-cta") return colors.accent;
        if (variant === "icon") return colors[pressed ? "surface-pressed" : "surface"];
        return pressed ? colors["surface-pressed"] : undefined;
    };

    const getPressedOpacity = (pressed: boolean): ViewStyle =>
        (variant === "primary" || variant === "icon-cta") && pressed ? { opacity: 0.8 } : {};

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                baseStyle,
                getBorderStyle(),
                { backgroundColor: getBgColor(pressed) },
                getPressedOpacity(pressed),
            ]}
        >
            {isIconVariant && icon ? (
                <Icon name={icon} color={fgColor[variant]} />
            ) : (
                <Text variant="body-emphasis" color={fgColor[variant]}>{title}</Text>
            )}
        </Pressable>
    );
}
