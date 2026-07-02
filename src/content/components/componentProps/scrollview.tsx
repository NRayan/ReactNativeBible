import type { PreviewProps, RNComponent } from "@content/components/types";
import { Text } from "@components";
import { ScrollView } from "react-native";
import { s } from "@theme/spacing";

function ScrollViewPreview({ focused }: PreviewProps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={focused}
            scrollEnabled={focused}
            contentContainerStyle={{ gap: s(1), paddingHorizontal: s(8), paddingVertical: s(2), alignItems: "center" }}
            style={{ flex: 1 }}>
            {Array.from({ length: 100 }, (_, i) => <Text key={i} variant="body">Item {i + 1}</Text>)}
        </ScrollView>
    );
}

export const scrollview: RNComponent = {
    id: "scrollview",
    name: "ScrollView",
    tag: "layout",
    subtitle: "content.scrollview.subtitle",
    description: "content.scrollview.description",
    previewComponent: ScrollViewPreview,
    hasScroll: true,
    props: [
        { name: "horizontal", type: "boolean", required: false, description: "content.scrollview.props.horizontal" },
        { name: "contentContainerStyle", type: "StyleProp<ViewStyle>", required: false, description: "content.scrollview.props.contentContainerStyle" },
        { name: "showsVerticalScrollIndicator", type: "boolean", required: false, description: "content.scrollview.props.showsVerticalScrollIndicator" },
        { name: "pagingEnabled", type: "boolean", required: false, description: "content.scrollview.props.pagingEnabled" },
        { name: "onScroll", type: "function", required: false, description: "content.scrollview.props.onScroll" },
        { name: "scrollEnabled", type: "boolean", required: false, description: "content.scrollview.props.scrollEnabled" },
    ],
    gotchas: [
        "content.scrollview.gotchas.gotcha1",
        "content.scrollview.gotchas.gotcha2",
        "content.scrollview.gotchas.gotcha3",
        "content.scrollview.gotchas.gotcha4",
    ],
    codeSnippet:
`<ScrollView
    contentContainerStyle={{ padding: 16, gap: 12 }}
    showsVerticalScrollIndicator={false}
    onScroll={(e) => console.log(e.nativeEvent.contentOffset.y)}
    scrollEventThrottle={16}
>
    {items.map((item) => (
        <Text key={item.id}>{item.title}</Text>
    ))}
</ScrollView>`,
};
