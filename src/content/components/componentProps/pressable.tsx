import type { RNComponent } from "@content/components/types";
import { useState } from "react";
import { Text } from "@components";
import { Pressable } from "react-native";

function PressablePreview() {
    const [count, setCount] = useState(0);
    const label = count === 0 ? "Press me" : `Pressed ${count}×`;
    return (
        <Pressable onPress={() => setCount(c => c + 1)}>
            <Text variant="body">{label}</Text>
        </Pressable>
    );
}

export const pressable: RNComponent = {
    id: "pressable",
    name: "Pressable",
    tag: "interaction",
    subtitle: "content.pressable.subtitle",
    description: "content.pressable.description",
    previewComponent: PressablePreview,
    props: [
        { name: "onPress", type: "function", required: false, description: "content.pressable.props.onPress" },
        { name: "onPressIn", type: "function", required: false, description: "content.pressable.props.onPressIn" },
        { name: "onLongPress", type: "function", required: false, description: "content.pressable.props.onLongPress" },
        { name: "hitSlop", type: "number", required: false, description: "content.pressable.props.hitSlop" },
        { name: "disabled", type: "boolean", required: false, description: "content.pressable.props.disabled" },
        { name: "android_ripple", type: "object", required: false, description: "content.pressable.props.android_ripple" },
    ],
    gotchas: [
        "content.pressable.gotchas.gotcha1",
        "content.pressable.gotchas.gotcha2",
        "content.pressable.gotchas.gotcha3",
        "content.pressable.gotchas.gotcha4",
    ],
    codeSnippet:
`<Pressable
    onPress={handlePress}
    hitSlop={8}
    style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
    })}
    android_ripple={{ color: "rgba(0,0,0,0.1)", borderless: false }}
>
    {({ pressed }) => (
        <Text>{pressed ? "Pressing…" : "Press me"}</Text>
    )}
</Pressable>`,
};
