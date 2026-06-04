import type { RNComponent } from "@content/components/types";
import { useState } from "react";
import { Text } from "@components";
import { TouchableOpacity } from "react-native";

function TouchableOpacityPreview() {
    const [count, setCount] = useState(0);
    const label = count === 0 ? "Press me" : `Pressed ${count}×`;
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setCount(c => c + 1)}>
            <Text variant="body">{label}</Text>
        </TouchableOpacity>
    );
}

export const touchableopacity: RNComponent = {
    id: "touchableopacity",
    name: "TouchableOpacity",
    tag: "interaction",
    subtitle: "content.touchableopacity.subtitle",
    description: "content.touchableopacity.description",
    previewComponent: TouchableOpacityPreview,
    props: [
        { name: "onPress", type: "function", required: false, description: "content.touchableopacity.props.onPress" },
        { name: "activeOpacity", type: "number", required: false, description: "content.touchableopacity.props.activeOpacity" },
        { name: "disabled", type: "boolean", required: false, description: "content.touchableopacity.props.disabled" },
        { name: "onLongPress", type: "function", required: false, description: "content.touchableopacity.props.onLongPress" },
    ],
    gotchas: [
        "content.touchableopacity.gotchas.gotcha1",
        "content.touchableopacity.gotchas.gotcha2",
        "content.touchableopacity.gotchas.gotcha3",
    ],
    codeSnippet:
`<TouchableOpacity
    activeOpacity={0.7}
    onPress={handlePress}
    style={{ borderRadius: 8, overflow: "hidden" }}
>
    <Text>Press me</Text>
</TouchableOpacity>`,
};
