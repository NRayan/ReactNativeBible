import type { RNComponent } from "@content/components/types";
import { View } from "react-native";

function ViewPreview() {    
    return (
        <View style={{ width: 120, height: 80, backgroundColor: "#009C3B", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
            <View style={{ width: "40%", aspectRatio: 1, backgroundColor: "#FFDF00", transform: [{ rotate: "45deg" }], alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "60%", aspectRatio: 1, backgroundColor: "#002776", borderRadius: 999, transform: [{ rotate: "-45deg" }], alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <View style={{ width: "130%", height: 4, backgroundColor: "#ffffff" }} />
                </View>
            </View>
        </View>
    );
}

export const view: RNComponent = {
    id: "view",
    name: "View",
    tag: "layout",
    subtitle: "content.view.subtitle",
    description: "content.view.description",
    previewComponent: ViewPreview,
    props: [
        { name: "style", type: "StyleProp<ViewStyle>", required: false, description: "content.view.props.style" },
        { name: "onLayout", type: "function", required: false, description: "content.view.props.onLayout" },
        { name: "pointerEvents", type: "string", required: false, description: "content.view.props.pointerEvents" },
        { name: "collapsable", type: "boolean", required: false, description: "content.view.props.collapsable" },
        { name: "accessible", type: "boolean", required: false, description: "content.view.props.accessible" },
    ],
    gotchas: [
        "content.view.gotchas.gotcha1",
        "content.view.gotchas.gotcha2",
        "content.view.gotchas.gotcha3",
        "content.view.gotchas.gotcha4",
    ],
    codeSnippet:
`<View
    style={{ flex: 1, flexDirection: "row", gap: 12, padding: 16 }}
    onLayout={({ nativeEvent }) => {
        const { width, height } = nativeEvent.layout;
        console.log(width, height);
    }}
>
    <View style={{ flex: 1, backgroundColor: "#e0e7ff", borderRadius: 8 }} />
    <View style={{ flex: 2, backgroundColor: "#ede9fe", borderRadius: 8 }} />
</View>`,
};
