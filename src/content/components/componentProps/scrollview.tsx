import type { RNComponent } from "@content/components/types";
import { Text } from "@components";
import { ScrollView } from "react-native";

export const scrollview: RNComponent = {
    id: "scrollview",
    name: "ScrollView",
    tag: "layout",
    subtitle: "content.scrollview.subtitle",
    description: "content.scrollview.description",
    previewComponent: (
        <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 16, alignItems: "center" }}
            style={{ flexGrow: 0 }} >
            {
                Array.from({ length: 10 }, (_, i) => <Text key={i} variant="body">Item {i + 1}</Text> )
            }
        </ScrollView>
    ),
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
