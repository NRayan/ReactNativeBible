import { Badge, Box, Chip, CodeBlock, Icon, RichText, Separator, Text, Toolbar } from "@components";
import type { ComponentsStackParamList } from "@navigation/ComponentsNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { s } from "@theme/spacing";
import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useComponentDetail } from "../hooks/useComponentDetail";
import { ComponentProp } from "../types";

type Props = NativeStackScreenProps<ComponentsStackParamList, "ComponentDetail">;

const SECTION_KEYS = ["chip", "description", "preview", "props", "gotchas", "code"] as const;
type SectionKey = typeof SECTION_KEYS[number];

export function ComponentDetailScreen({ route }: Props) {
    const { component, tag, strings } = useComponentDetail({ componentId: route.params.componentId });
    const [focused, setFocused] = useState(false);

    function renderItem({ item }: { item: SectionKey }) {
        switch (item) {
        case "chip":
            return (
                <Box onTouchStart={() => setFocused(false)} opacity={focused ? .2 : 1} style={{ alignSelf: "flex-start" }}>
                    <Chip icon={tag.icon} title={strings.tagTitle} />
                </Box>
            );
        case "description":
            return (
                <Box onTouchStart={() => setFocused(false)} opacity={focused ? .2 : 1}>
                    <RichText variant="body" content={component.description} />
                </Box>
            );
        case "preview":
            return (
                <Box fullWidth gap={2}>
                    <Box row justify="space-between" align="center">
                        <Text variant="section-label">{strings.preview}</Text>
                        {component.hasScroll && (
                            <Pressable onPress={() => setFocused(f => !f)} hitSlop={12}>
                                <Icon name={focused ? "IconX" : "IconMaximize"} size={16} color="text-muted" />
                            </Pressable>
                        )}
                    </Box>
                    <Box h={120} fullWidth border rounded="default" justify="center" align="center" style={{ overflow: "hidden" }}>
                        <component.previewComponent focused={focused} />
                    </Box>
                </Box>
            );
        case "props":
            return (
                <Box onTouchStart={() => setFocused(false)} fullWidth gap={2} opacity={focused ? .2 : 1}>
                    <Text variant="section-label">{strings.props}</Text>
                    <Box fullWidth border bgColor="surface" rounded="large">
                        {component.props.map((prop, index) => (
                            <React.Fragment key={prop.name}>
                                <PropDetailRow prop={prop as ComponentProp} requiredLabel={strings.required} />
                                {index < component.props.length - 1 && <Separator />}
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>
            );
        case "gotchas":
            return (
                <Box onTouchStart={() => setFocused(false)} fullWidth gap={2}>
                    <Text variant="section-label">{strings.gotchas}</Text>
                    {component.gotchas.map((gotcha, index) => (
                        <Box row key={index} px={3} py={2} gap={3} bgColor="surface" border rounded="default">
                            <Icon name="IconAlertTriangle" color="danger" size={16} />
                            <RichText content={gotcha} variant="body" flex={1} />
                        </Box>
                    ))}
                </Box>
            );
        case "code":
            return (
                <Box onTouchStart={() => setFocused(false)} fullWidth gap={2}>
                    <Text variant="section-label">{strings.code}</Text>
                    <CodeBlock code={component.codeSnippet} language="tsx" />
                </Box>
            );
        }
    }

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={component.name} showBackButton />
            {focused ? (
                <View style={{ flex: 1, padding: s(4), gap: s(6) }}>
                    {SECTION_KEYS.map(key => (
                        <React.Fragment key={key}>{renderItem({ item: key })}</React.Fragment>
                    ))}
                </View>
            ) : (
                <FlatList
                    data={SECTION_KEYS}
                    keyExtractor={item => item}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: s(4), gap: s(6), }}
                />
            )}
        </Box>
    );
}

type PropDetailRowProps = { prop: ComponentProp; requiredLabel: string }
function PropDetailRow({ prop, requiredLabel }: PropDetailRowProps) {
    return (
        <Box row fullWidth gap={2} px={2} py={2} align="center">
            <Box flex={1} gap={1}>
                <Box row gap={1} align="center">
                    <Text variant="code" color="success">{prop.name}</Text>
                    <Badge title={prop.type} />
                </Box>
                <Text variant="caption">{prop.description}</Text>
            </Box>
            {prop.required && <Text variant="caption" color="danger">{requiredLabel}</Text>}
        </Box>
    );
}
