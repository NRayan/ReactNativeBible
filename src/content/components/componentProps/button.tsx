import type { RNComponent } from "@content/components/types";
import { Button } from "react-native";

export const button: RNComponent = {
    id: "button",
    name: "Button",
    tag: "interaction",
    subtitle: "content.button.subtitle",
    description: "content.button.description",
    previewComponent: <Button title="Press me" onPress={() => null} />,
    props: [
        { name: "title", type: "string", required: true, description: "content.button.props.title" },
        { name: "onPress", type: "function", required: true, description: "content.button.props.onPress" },
        { name: "color", type: "ColorValue", required: false, description: "content.button.props.color" },
        { name: "disabled", type: "boolean", required: false, description: "content.button.props.disabled" },
    ],
    gotchas: [
        "content.button.gotchas.gotcha1",
        "content.button.gotchas.gotcha2",
        "content.button.gotchas.gotcha3",
        "content.button.gotchas.gotcha4",
    ],
    codeSnippet:
`<Button
    title="Reset"
    color="#fca5a5"
    disabled={count === 0}
    onPress={() => setCount(0)}
    accessibilityLabel="Reset counter to zero"
/>`,
};
