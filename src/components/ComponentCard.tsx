import React from "react";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { Separator } from "./Separator";
import { PressableBox } from "./PressableBox";
import { s } from "@theme/spacing";

type ComponentCardProps = {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: ()=> void;
};

export function ComponentCard({ children, title, subtitle, onPress }: ComponentCardProps) {
    return (
        <PressableBox onPress={onPress} rounded="large" border fullWidth style={{ overflow: "hidden" }}>
            <Box bgColor="background" minH={s(26)} align="center" justify="center" p={4}>
                {children}
            </Box>
            <Separator />
            <Box row align="center" bgColor="surface" px={3} py={2.5}>
                <Box flex={1}>
                    <Text variant="body-emphasis">{title}</Text>
                    {subtitle && <Text variant="caption" color="text-muted">{subtitle}</Text>}
                </Box>
                <Icon name="IconChevronRight" size={16} color="text-disabled" />
            </Box>
        </PressableBox>
    );
}
