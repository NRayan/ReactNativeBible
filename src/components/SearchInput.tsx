import { TextInput } from "react-native";
import { useThemeStore } from "@stores/theme";
import { Box } from "./Box";
import { Icon } from "./Icon";

type SearchInputProps = {
    value: string;
    onValueChange: (value: string)=> void;
    placeholder?: string;
};

export function SearchInput({ value, onValueChange, placeholder }: SearchInputProps) {
    const { theme: { colors, typography } } = useThemeStore();

    return (
        <Box row align="center" bgColor="surface" rounded="default" border px={3} py={2.5} gap={2}>
            <Icon name="IconSearch" size={16} color="text-disabled" />
            <TextInput
                value={value}
                onChangeText={onValueChange}
                placeholder={placeholder}
                placeholderTextColor={colors["text-disabled"]}
                style={{
                    flex: 1,
                    fontSize: typography.body.fontSize,
                    fontWeight: typography.body.fontWeight,
                    color: colors["text-primary"],
                    padding: 0,
                }}
            />
        </Box>
    );
}
