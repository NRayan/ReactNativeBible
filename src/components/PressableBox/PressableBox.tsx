import React from "react";
import { Pressable } from "react-native";
import { useThemeStore } from "@stores/theme";
import { BoxProps, buildBoxStyle } from "../Box";

type PressableBoxProps = BoxProps & {
    onPress?: ()=> void;
    onLongPress?: ()=> void;
    disabled?: boolean;
};

export function PressableBox({ onPress, onLongPress, disabled, style, children, ...boxProps }: PressableBoxProps) {
    const { theme } = useThemeStore();
    const computedStyle = buildBoxStyle(boxProps, theme);

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
            style={({ pressed }) => [
                computedStyle,
                style,
                disabled ? { opacity: 0.4 } : pressed && onPress ? { opacity: 0.7 } : undefined,
            ]}
        >
            {children}
        </Pressable>
    );
}
