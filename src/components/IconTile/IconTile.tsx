import { s } from "@theme/spacing";
import { ColorTokens } from "@theme";
import { Box } from "../Box";
import { Icon, TablerIconName } from "../Icon";
import { Text } from "../Text";

type IconTileProps={
    icon?: TablerIconName;
    letter?: string;
    bgColor?: keyof ColorTokens;
    color?: keyof ColorTokens;
}

export function IconTile({ icon, letter, bgColor, color = "text-muted" }: IconTileProps)
{
    return (
        <Box justify="center" align="center" h={s(9)} w={s(9)} rounded="default" border bgColor={bgColor}>
            {
                icon ?
                    <Icon name={icon} color={color}/>
                    :
                    <Text style={{ textTransform: "capitalize" }} variant="caption" color={color}>{letter?.[0] ?? "-"}</Text>
            }
        </Box>
    );
}
