import { Pressable } from "react-native";
import type { ViewStyle } from "react-native";
import { useThemeStore } from "@stores/theme";
import { s } from "@theme/spacing";
import { Icon, TablerIconName } from "../Icon";
import { Text } from "../Text";
import { fgColor, getBorderStyle, getBgColor, getPressedOpacity } from "./Button.utils";
import type { ButtonVariant } from "./Button.utils";

type ButtonProps = {
    variant?: ButtonVariant;
    icon?: TablerIconName;
    title?: string;
    onPress: ()=> void;
    disabled?: boolean;
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

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                baseStyle,
                getBorderStyle(variant, colors, size),
                { backgroundColor: getBgColor(variant, pressed, colors) },
                getPressedOpacity(variant, pressed),
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
