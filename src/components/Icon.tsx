import React from "react";
import * as TablerIcons from "@tabler/icons-react-native";
import { useThemeStore } from "@stores/theme";
import type { ColorTokens } from "@theme/types";

type TablerIconName = keyof typeof TablerIcons;

type IconProps = {
    name: TablerIconName;
    size?: number;
    color?: keyof ColorTokens;
};

export function Icon({ name, size = 20, color = "text-primary" }: IconProps) {
    const { theme: { colors } } = useThemeStore();
    const IconComponent = TablerIcons[name] as unknown as React.ComponentType<{ size?: number; color?: string }>;
    return <IconComponent size={size} color={colors[color]} />;
}
