import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useThemeStore } from "@stores/theme";
import { Box } from "../Box";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { PressableBox } from "../PressableBox";

const TOOLBAR_HEIGHT = 64;

type ToolbarProps = {
    title: string;
    subtitle?: string;
    showBackButton?: boolean;
};

export function Toolbar({ title, subtitle, showBackButton = false }: ToolbarProps) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { theme: { colors, size } } = useThemeStore();

    return (
        <Box bgColor="background" px={6} fullWidth
            style={{
                paddingTop: insets.top,
                borderBottomWidth: size["border-width"],
                borderBottomColor: colors.border,
            }} >
            {
                showBackButton ?
                    <Box row align="center" gap={3} h={TOOLBAR_HEIGHT}>
                        <PressableBox
                            bgColor="surface" border
                            h={38} w={38}
                            justify="center" align="center" rounded="default"
                            onPress={() => navigation.goBack()} >
                            <Icon name="IconChevronLeft" size={24} color="text-primary" />
                        </PressableBox>

                        <Text variant="body-emphasis">
                            {title}
                        </Text>
                    </Box>
                    :
                    <Box h={TOOLBAR_HEIGHT}>
                        <Text variant="screen-title">{title}</Text>
                        <Text variant="body-emphasis" color="text-secondary">{subtitle}</Text>                        
                    </Box>
            }
        </Box>
    );
}
