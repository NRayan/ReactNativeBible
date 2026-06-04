import type { RNComponent } from "@content/components/types";
import { Switch } from "react-native";

export const switchComponent: RNComponent = {
    id: "switch",
    name: "Switch",
    tag: "interaction",
    subtitle: "content.switch.subtitle",
    description: "content.switch.description",
    previewComponent: (
        <Switch value={true} onValueChange={() => null} />
    ),
    props: [
        { name: "value", type: "boolean", required: true, description: "content.switch.props.value" },
        { name: "onValueChange", type: "function", required: true, description: "content.switch.props.onValueChange" },
        { name: "disabled", type: "boolean", required: false, description: "content.switch.props.disabled" },
        { name: "trackColor", type: "object", required: false, description: "content.switch.props.trackColor" },
        { name: "thumbColor", type: "ColorValue", required: false, description: "content.switch.props.thumbColor" },
        { name: "ios_backgroundColor", type: "ColorValue", required: false, description: "content.switch.props.ios_backgroundColor" },
    ],
    gotchas: [
        "content.switch.gotchas.gotcha1",
        "content.switch.gotchas.gotcha2",
        "content.switch.gotchas.gotcha3",
    ],
    codeSnippet:
`<Switch
    value={isEnabled}
    onValueChange={setIsEnabled}
    trackColor={{ false: "#767577", true: "#6366f1" }}
    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
    ios_backgroundColor="#3e3e3e"
/>`,
};
