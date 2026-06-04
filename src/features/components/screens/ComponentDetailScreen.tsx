import { Badge, Box, Chip, Icon, RichText, Separator, Text, Toolbar } from "@components";
import type { ComponentsStackParamList } from "@navigation/ComponentsNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { useComponentDetail } from "../hooks/useComponentDetail";
import { s } from "@theme/spacing";
import { ScrollView } from "react-native";
import { ComponentProp } from "../types";

type Props = NativeStackScreenProps<ComponentsStackParamList, "ComponentDetail">;

export function ComponentDetailScreen({ route }: Props) {

    const { component, tag } = useComponentDetail({ component: route.params.component });

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={component.name} showBackButton/>
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6), alignItems: "flex-start" }}>
                <Chip icon={tag.icon} title={tag.title}/>
                <RichText variant="body" content={component.description}/>

                <Box fullWidth gap={2}>
                    <Text variant="section-label">Preview</Text>
                    <Box h={120} fullWidth border rounded="default" justify="center" align="center" >
                        {component.previewComponent}
                    </Box>
                </Box>

                <Box fullWidth gap={2}>
                    <Text variant="section-label">Main props</Text>
                    <Box fullWidth border bgColor="surface" rounded="large">
                        {component.props.map((prop, index)=>
                            <React.Fragment key={prop.name}>
                                <PropDetailRow prop={prop} />
                                {index < component.props.length - 1 && <Separator/>}
                            </React.Fragment>
                        )}
                    </Box>
                </Box>

                <Box fullWidth gap={2}>
                    <Text variant="section-label">Gotchas</Text>
                    {component.gotchas.map((gotcha, index)=>
                        <Box row key={index} px={3} py={2} gap={3} bgColor="surface" border rounded="default">
                            <Icon name="IconAlertTriangle" color="danger" size={16}/>
                            <RichText content={gotcha} variant="body" flex={1}/>
                        </Box>
                    )}
                </Box>

            </ScrollView>
        </Box>
    );
}

type PropDetailRowProps={ prop: ComponentProp }
function PropDetailRow({ prop }: PropDetailRowProps)
{
    return(
        <Box row fullWidth gap={2} px={2} py={2} align="center">
            <Box flex={1} gap={1}>
                <Box row gap={1} align="center">
                    <Text variant="code" color="success">{prop.name}</Text>
                    <Badge title={prop.type}/>
                </Box>
                <Text variant="caption">{prop.description}</Text>
            </Box>

            {prop.required && <Text variant="caption" color="danger">Required</Text>}
        </Box>
    );
}
