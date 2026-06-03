import { Box, Text, Toolbar } from "@components";
import { components } from "@content/components";
import { s } from "@theme/spacing";
import React from "react";
import { ScrollView } from "react-native";
import { NativeComponentCard } from "../components/NativeComponentCard";
import { ComponentTag } from "../types";

export function ComponentsScreen() {

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={"teste"} subtitle="React Native Bible"/>
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                {
                    (Object.keys(components) as ComponentTag[]).map(key => (
                        <Box key={key} gap={2}>
                            <Text>{key}</Text>
                            {
                                components[key].map(comp => <NativeComponentCard key={comp.id} component={comp} /> )
                            }
                        </Box>
                    ))
                }
            </ScrollView>
        </Box>
    );
}
