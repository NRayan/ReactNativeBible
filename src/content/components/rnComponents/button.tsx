import type { RNComponent } from "@content/components/types";
import { Button } from "react-native";

export const button: RNComponent = {
    id: "button",
    name: "Button",
    tag: "interaction",
    description:
    "A basic pressable element that triggers an action. Renders as a native button on each platform",
    previewComponent: <Button title="Press me" onPress={() => null} />,
    props: [
        {
            name: "title",
            type: "string",
            required: true,
            description:
        "The text label rendered inside the button. On Android the text is automatically uppercased by the OS.",
        },
        {
            name: "onPress",
            type: "(event: GestureResponderEvent) => void",
            required: true,
            description: "Callback fired when the button is pressed.",
        },
        {
            name: "color",
            type: "ColorValue",
            required: false,
            description:
        "Tint color for the button. On iOS this changes the text color; on Android it changes the background color of the button.",
        },
        {
            name: "disabled",
            type: "boolean",
            required: false,
            description:
        "When `true` the button is non-interactive and rendered in a muted style. Defaults to `false`.",
        },
        {
            name: "accessibilityLabel",
            type: "string",
            required: false,
            description:
        "Text read by screen readers in place of the `title`. Use when the visible label alone is insufficient to describe the action.",
        },
        {
            name: "testID",
            type: "string",
            required: false,
            description: "Identifier used to locate the element in end-to-end tests.",
        },
        {
            name: "hasTVPreferredFocus",
            type: "boolean",
            required: false,
            description: "TV platforms only. When `true` this button receives focus on initial render.",
        },
        {
            name: "nextFocusDown",
            type: "number",
            required: false,
            description:
        "Android TV only. The view to receive focus when the user navigates downward from this button.",
        },
        {
            name: "nextFocusForward",
            type: "number",
            required: false,
            description: "Android TV only. The view to receive focus when the user presses Tab.",
        },
        {
            name: "nextFocusLeft",
            type: "number",
            required: false,
            description:
        "Android TV only. The view to receive focus when the user navigates left from this button.",
        },
        {
            name: "nextFocusRight",
            type: "number",
            required: false,
            description:
        "Android TV only. The view to receive focus when the user navigates right from this button.",
        },
        {
            name: "nextFocusUp",
            type: "number",
            required: false,
            description:
        "Android TV only. The view to receive focus when the user navigates upward from this button.",
        },
        {
            name: "touchSoundDisabled",
            type: "boolean",
            required: false,
            description:
        "Android only. When `true` suppresses the system sound played on press. Defaults to `false`.",
        },
    ],
    gotchas: [
        {
            label: "`color` behaves differently per platform",
            description:
        "On iOS `color` sets the text color and the button remains transparent. On Android `color` sets the background fill. A single `color` value will therefore look inconsistent across platforms — if you need a uniform branded button, use `Pressable` or `TouchableOpacity` with an explicit `backgroundColor` style.",
        },
        {
            label: "Title is uppercased on Android",
            description:
        "Android's `Button` widget transforms the `title` string to uppercase automatically via the OS theme. If case matters to you, replace `Button` with `Pressable` and a `Text` child where you control the style.",
        },
        {
            label: "No style prop",
            description:
        "`Button` does not accept a `style` prop. You cannot change its size, border-radius, font, padding, or layout via styles. Any customisation beyond `color` and `disabled` requires a different component.",
        },
        {
            label: "Minimum touch target is not enforced automatically",
            description:
        "React Native's accessibility guidelines recommend a 44×44 pt minimum touch target. `Button` does not guarantee this on its own — small labels produce small buttons. Test on device and add wrapper padding if needed.",
        },
        {
            label: "Not the right choice for custom UI",
            description:
        "`Button` is useful for quick prototypes and simple utilities. Production apps almost always need `Pressable` (fine-grained press state) or `TouchableOpacity` (opacity feedback) to match a design system.",
        },
    ],
    codeSnippet: `import { useState } from 'react'
        import { Button, StyleSheet } from 'react-native'
        import { View, Text } from '@/components'

        export function CounterExample() {
        const [count, setCount] = useState(0)

        return (
            <View style={styles.container}>
            <Text variant="heading">{count}</Text>

            <Button title="Increment" onPress={() => setCount(c => c + 1)} />

            <Button
                title="Reset"
                color="#fca5a5"
                disabled={count === 0}
                onPress={() => setCount(0)}
                accessibilityLabel="Reset counter to zero"
            />
            </View>
        )
        }

        const styles = StyleSheet.create({
        container: {
            gap: 12,
            alignItems: 'center',
            padding: 24,
        },
        })
    `,        
};
