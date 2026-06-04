import type { RNComponent } from "@content/components/types";
import { useState } from "react";
import { useThemeStore } from "@stores/theme";
import { TextInput } from "react-native";

function TextInputPreview() {
    const { theme: { colors } } = useThemeStore();
    const [value, setValue] = useState("");
    
    return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder="Type something…"
            placeholderTextColor={colors["text-muted"]}
            style={{ backgroundColor: colors.surface, color: colors["text-primary"], width: "70%", maxWidth: 350 }}
        />
    );
}

export const textinput: RNComponent = {
    id: "textinput",
    name: "TextInput",
    tag: "interaction",
    subtitle: "content.textinput.subtitle",
    description: "content.textinput.description",
    previewComponent: TextInputPreview,
    props: [
        { name: "value", type: "string", required: false, description: "content.textinput.props.value" },
        { name: "onChangeText", type: "function", required: false, description: "content.textinput.props.onChangeText" },
        { name: "placeholder", type: "string", required: false, description: "content.textinput.props.placeholder" },
        { name: "keyboardType", type: "string", required: false, description: "content.textinput.props.keyboardType" },
        { name: "secureTextEntry", type: "boolean", required: false, description: "content.textinput.props.secureTextEntry" },
        { name: "multiline", type: "boolean", required: false, description: "content.textinput.props.multiline" },
        { name: "editable", type: "boolean", required: false, description: "content.textinput.props.editable" },
        { name: "maxLength", type: "number", required: false, description: "content.textinput.props.maxLength" },
    ],
    gotchas: [
        "content.textinput.gotchas.gotcha1",
        "content.textinput.gotchas.gotcha2",
        "content.textinput.gotchas.gotcha3",
        "content.textinput.gotchas.gotcha4",
    ],
    codeSnippet:
`<TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="email@example.com"
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    maxLength={100}
/>`,
};
