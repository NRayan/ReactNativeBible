import { useThemeStore } from "@stores/theme";
import { Box } from "../Box";

type SeparatorProps = {
    vertical?: boolean;
    horizontal?: boolean;
    thickness?: number;
};

export function Separator({ vertical, thickness }: SeparatorProps) {
    const { theme: { size } } = useThemeStore();
    const t = thickness ?? size["border-width"];

    return vertical ?
        <Box fullHeight w={t} bgColor="border" />
        :
        <Box fullWidth h={t} bgColor="border" />;
}
