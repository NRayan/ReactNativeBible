import { Box, Text } from "@components";
import type { PreviewProps, RNComponent } from "@content/components/types";
import { s } from "@theme/spacing";
import { SectionList } from "react-native";

const SECTIONS = [
    { title: "🍎 Fruits", data: ["Apple", "Banana", "Orange", "Grape", "Mango"] },
    { title: "🥕 Vegetables", data: ["Carrot", "Broccoli", "Spinach", "Potato", "Tomato"] },
    { title: "🐶 Animals", data: ["Dog", "Cat", "Bird", "Fish", "Rabbit"] },
    { title: "🏠 Places", data: ["Home", "Office", "Park", "Beach", "Mountain"] },
    { title: "⚡ Tech", data: ["Phone", "Laptop", "Tablet", "Watch", "Camera"] },
];

function SectionListPreview({ focused }: PreviewProps) {

    return (
        <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text variant="body">{item}</Text>}
            renderSectionHeader={({ section }) => (
                <Box rounded="large" px={2} py={1} bgColor="surface" style={{ alignSelf: "flex-start" }}>
                    <Text variant="caption">{section.title}</Text>
                </Box>
            )}
            showsVerticalScrollIndicator={focused}
            scrollEnabled={focused}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ paddingHorizontal: s(8), paddingVertical: s(2) }}
            stickySectionHeadersEnabled={false}
        />
    );
}

export const sectionlist: RNComponent = {
    id: "sectionlist",
    name: "SectionList",
    tag: "layout",
    subtitle: "content.sectionlist.subtitle",
    description: "content.sectionlist.description",
    previewComponent: SectionListPreview,
    hasScroll: true,
    props: [
        { name: "sections", type: "array", required: true, description: "content.sectionlist.props.sections" },
        { name: "renderItem", type: "function", required: true, description: "content.sectionlist.props.renderItem" },
        { name: "renderSectionHeader", type: "function", required: false, description: "content.sectionlist.props.renderSectionHeader" },
        { name: "stickySectionHeadersEnabled", type: "boolean", required: false, description: "content.sectionlist.props.stickySectionHeadersEnabled" },
        { name: "extraData", type: "any", required: false, description: "content.sectionlist.props.extraData" },
        { name: "ItemSeparatorComponent", type: "function", required: false, description: "content.sectionlist.props.ItemSeparatorComponent" },
    ],
    gotchas: [
        "content.sectionlist.gotchas.gotcha1",
        "content.sectionlist.gotchas.gotcha2",
        "content.sectionlist.gotchas.gotcha3",
        "content.sectionlist.gotchas.gotcha4",
    ],
    codeSnippet:
`<SectionList
    sections={sections}
    keyExtractor={(item, index) => \`\${item}-\${index}\`}
    renderItem={({ item }) => (
        <Text>{item}</Text>
    )}
    renderSectionHeader={({ section }) => (
        <Text>{section.title}</Text>
    )}
    stickySectionHeadersEnabled={true}
    ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
/>`,
};
