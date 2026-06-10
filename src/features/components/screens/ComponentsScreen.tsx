import { Box, Text, Toolbar } from "@components";
import type { ComponentsStackParamList } from "@navigation/ComponentsNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { s } from "@theme/spacing";
import React from "react";
import { ScrollView } from "react-native";
import { NativeComponentCard } from "../components/NativeComponentCard";
import { useComponentsScreen } from "../hooks/useComponentsScreen";

export function ComponentsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ComponentsStackParamList>>();
    const { sections, strings } = useComponentsScreen();

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.title} subtitle="React Native Bible" />
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                {sections.map(section => (
                    <Box key={section.tag} gap={4}>
                        <Text>{section.label}</Text>
                        {section.items.map(comp => (
                            <NativeComponentCard
                                key={comp.id}
                                component={comp}
                                onPress={() => navigation.navigate("ComponentDetail", { component: comp })}
                            />
                        ))}
                    </Box>
                ))}
            </ScrollView>
        </Box>
    );
}
