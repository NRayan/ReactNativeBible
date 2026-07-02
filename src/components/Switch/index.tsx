import { Platform } from "react-native";
import { Switch as RNSwitch } from "react-native";
import { useThemeStore } from "@stores/theme";

type SwitchProps = {
    value: boolean;
    onValueChange: (value: boolean)=> void;
};

export function Switch({ value, onValueChange }: SwitchProps) {
    const { theme: { colors } } = useThemeStore();

    const isIOS = Platform.OS === "ios";

    return (
        <RNSwitch
            value={value}
            onValueChange={onValueChange}
            thumbColor={isIOS ? undefined : (value ? colors.accent : colors["text-muted"])}
            trackColor={{
                false: colors["text-disabled"],
                true: isIOS ? colors.accent : colors["text-disabled"],
            }}
            style={{ alignSelf: "center" }}
        />
    );
}
