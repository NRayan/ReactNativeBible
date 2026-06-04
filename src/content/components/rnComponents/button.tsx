import type { RNComponent } from "@content/components/types";
import { Button } from "react-native";

export const button: RNComponent = {
    id: "button",
    name: "Button",
    tag: "interaction",
    subtitle: "A basic pressable element that triggers an action. Renders as a native button on each platform",
    description:
    "A basic pressable element that triggers an action. Renders as a native button on each platform — a `UIButton` on iOS and an `android.widget.Button` on Android — so its appearance follows the OS styling by default.\n\nBecause `Button` delegates rendering to the platform, its customisation surface is intentionally minimal. For full visual control use `Pressable` or `TouchableOpacity` instead.\n\nThe `onPress` handler receives a `GestureResponderEvent` but it is rarely needed; most handlers ignore the argument entirely.",
    previewComponent: <Button title="Press me" onPress={() => null} />,
    props: [
        {
            name: "title",
            type: "string",
            required: true,
            description: "Text label. Uppercased automatically on Android.",
        },
        {
            name: "onPress",
            type: "function",
            required: true,
            description: "Fired when the button is pressed.",
        },
        {
            name: "color",
            type: "ColorValue",
            required: false,
            description: "Text color on iOS, background color on Android.",
        },
        {
            name: "disabled",
            type: "boolean",
            required: false,
            description: "Disables interaction and renders in a muted style.",
        },
    ],
    gotchas: [
        "*iOS vs Android* — `color` sets the text color on iOS but the background fill on Android. A single value will look inconsistent across platforms.",
        "*No style prop* — `Button` doesn't accept `style`. Any customisation beyond `color` and `disabled` requires `Pressable` or `TouchableOpacity`.",
        "*Android* — The `title` is automatically uppercased by the OS. Use `Pressable` with a `Text` child if case matters.",
        "*Touch target* — React Native recommends 44×44pt minimum. `Button` doesn't enforce this — small labels produce small buttons.",
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
