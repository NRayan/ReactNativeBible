import { Box, Chip, Text, Toolbar } from "@components";
import type { ComponentsStackParamList } from "@navigation/ComponentsNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useComponentDetail } from "../hooks/useComponentDetail";

type Props = NativeStackScreenProps<ComponentsStackParamList, "ComponentDetail">;

export function ComponentDetailScreen({ route }: Props) {

    const { component, tag } = useComponentDetail({ component: route.params.component });

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={component.name} showBackButton/>
            <Box flex={1} p={4} align="flex-start">
                <Chip icon={tag.icon} title={tag.title}/>
                <Text>{component.name}</Text>
            </Box>
        </Box>
    );
}
