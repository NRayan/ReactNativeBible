import { Box } from "./Box";
import { Icon, TablerIconName } from "./Icon";
import { Separator } from "./Separator";
import { Text } from "./Text";

type ChipProps = {
    icon: TablerIconName;
    title: string;
    subtitle?: string;
};

export function Chip({ icon, title, subtitle }: ChipProps) {
    return (
        <Box row align="center" bgColor="surface" rounded="default" border px={2} py={2} gap={2}>
            <Icon name={icon} size={16} color="text-disabled" />
            <Text variant="caption" color="text-muted">{title}</Text>
            {subtitle && (
                <>
                    <Separator vertical thickness={1}/>
                    <Text variant="caption" color="text-disabled">{subtitle}</Text>
                </>
            )}
        </Box>
    );
}
