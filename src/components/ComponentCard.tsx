import React from "react";
import { Pressable } from "react-native";
import { useThemeStore } from "@stores/theme";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { s } from "@theme/spacing";
import { Separator } from "./Separator";

type ComponentCardProps = {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: ()=> void;
};

export function ComponentCard({ children, title, subtitle, onPress }: ComponentCardProps) {
    const { theme: { colors, radius, size } } = useThemeStore();

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ({
                borderRadius: radius.large,
                borderWidth: size["border-width"],
                borderColor: colors.border,
                overflow: "hidden",
                opacity: pressed ? 0.7 : 1,
                width: "100%"
            })}
        >
            <Box bgColor="background" minH={s(26)} align="center" justify="center" p={4}>
                {children}
            </Box>
            <Separator/>
            <Box
                row
                align="center"
                bgColor="surface"
                px={3}
                py={2.5}
            >
                <Box flex={1}>
                    <Text variant="body-emphasis">{title}</Text>
                    {subtitle && <Text variant="caption" color="text-muted">{subtitle}</Text>}
                </Box>
                <Icon name="IconChevronRight" size={16} color="text-disabled" />
            </Box>
        </Pressable>
    );
}
