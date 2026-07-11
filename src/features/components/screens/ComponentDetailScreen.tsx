import { Badge, Box, Chip, CodeBlock, Icon, PressableBox, RichText, Separator, Text, Toolbar } from "@components";
import type { ComponentsStackParamList } from "@navigation/ComponentsNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { s, size } from "@theme/spacing";
import React from "react";
import { ScrollView } from "react-native";
import { useComponentDetail } from "../hooks/useComponentDetail";
import { ComponentProp } from "../types";

type Props = NativeStackScreenProps<ComponentsStackParamList, "ComponentDetail">;

export function ComponentDetailScreen({ route }: Props) {
    const { component, tag, strings, handlePreviewPress } = useComponentDetail({ componentId: route.params.componentId });

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={component.name} showBackButton />
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                <Box fullWidth maxW={size["max-content-width"]} gap={6} style={{ alignSelf: "center" }}>
                    <Box style={{ alignSelf: "flex-start" }}>
                        <Chip icon={tag.icon} title={strings.tagTitle} />
                    </Box>

                    <Box>
                        <RichText variant="body" content={component.description} />
                    </Box>

                    <PressableBox onPress={handlePreviewPress} fullWidth gap={2}>
                        <Box row justify="space-between" align="center">
                            <Text variant="section-label">{strings.preview}</Text>
                            {component.hasScroll && <Icon name="IconMaximize" size={16} color="text-muted" /> }
                        </Box>
                        <Box h={120} fullWidth border rounded="default" justify="center" align="center" style={{ overflow: "hidden" }}>
                            <component.previewComponent focused={false} />
                        </Box>
                    </PressableBox>

                    <Box fullWidth gap={2}>
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

                    <Box fullWidth gap={2}>
                        <Text variant="section-label">{strings.gotchas}</Text>
                        {component.gotchas.map((gotcha, index) => (
                            <Box row key={index} px={3} py={2} gap={3} bgColor="surface" border rounded="default">
                                <Icon name="IconAlertTriangle" color="danger" size={16} />
                                <RichText content={gotcha} variant="body" flex={1} />
                            </Box>
                        ))}
                    </Box>

                    <Box fullWidth gap={2}>
                        <Text variant="section-label">{strings.code}</Text>
                        <CodeBlock code={component.codeSnippet} language="tsx" />
                    </Box>
                </Box>
            </ScrollView>
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
