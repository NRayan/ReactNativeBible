import { useThemeStore } from "@stores/theme";
import { Box } from "./Box";

type SeparatorProps = {
    vertical?: boolean;
    horizontal?: boolean;
};

export function Separator({ vertical }: SeparatorProps) {
    const { theme: { size } } = useThemeStore();

    return vertical ? 
        <Box fullHeight w={size["border-width"]} bgColor="border" />
        : 
        <Box fullWidth h={size["border-width"]} bgColor="border" />;
}
