import { useThemeStore } from "@stores/theme";
import { Box, BoxProps } from "../Box";

type SeparatorProps = BoxProps & {
    vertical?: boolean;
    thickness?: number;
};

export function Separator({ vertical, thickness, ...rest }: SeparatorProps) {
    const { theme: { size } } = useThemeStore();
    const t = thickness ?? size["border-width"];

    return vertical ?
        <Box fullHeight w={t} bgColor="border" {...rest} />
        :
        <Box fullWidth h={t} bgColor="border" {...rest} />;
}