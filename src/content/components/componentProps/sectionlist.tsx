import type { RNComponent } from "@content/components/types";
import { Text } from "@components";
import { useThemeStore } from "@stores/theme";
import { SectionList } from "react-native";

const SECTIONS = [
    { title: "Section A", data: ["Item 1", "Item 2"] },
    { title: "Section B", data: ["Item 3", "Item 4"] },
];

function SectionListPreview() {
    const { theme: { colors } } = useThemeStore();
    return (
        <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text variant="body">{item}</Text>}
            renderSectionHeader={({ section }) => (
                <Text variant="caption" style={{ backgroundColor: colors.surface }}>
                    {section.title}
                </Text>
            )}
            scrollEnabled={false}
            style={{ flexGrow: 0 }}
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
