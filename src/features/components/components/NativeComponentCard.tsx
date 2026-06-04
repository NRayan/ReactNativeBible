import { Box, Icon, PressableBox, Text } from "@components";
import type { RNComponent } from "@features/components/types";
import { useTranslation } from "react-i18next";
import React from "react";

type NativeComponentCardProps = {
  component: RNComponent;
  onPress: ()=> void;
}

export function NativeComponentCard({ component, onPress }: NativeComponentCardProps) {
    const { t } = useTranslation();
    return (
        <PressableBox rounded="default" border style={{ overflow: "hidden" }} onPress={onPress}>
            <Box h={100} bgColor="background" align="center" justify="center">
                {component.previewComponent}
            </Box>

            <Box row bgColor="surface" py={3} px={4} gap={2} align="center">
                <Box flex={1}>
                    <Text variant="body-emphasis" color="text-primary" flex={1}>{component.name} </Text>
                    <Text variant="caption" color="text-muted" numberOfLines={2} flex={1}>{t(component.subtitle)}</Text>
                </Box>

                <Icon name="IconChevronRight" size={16} color="text-disabled" />
            </Box>
        </PressableBox>
    );
}
