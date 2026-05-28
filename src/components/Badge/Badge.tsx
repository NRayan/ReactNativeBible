import { Box } from "../Box";
import { Text } from "../Text";

type BadgeProps={
    title: string;
}

export function Badge({ title }: BadgeProps)
{
    return (
        <Box px={2} py={.5} bgColor='surface' rounded='small' border>
            <Text variant="caption">{title}</Text>
        </Box>
    );
}