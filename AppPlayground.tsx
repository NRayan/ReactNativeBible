import { Pressable } from "react-native";
import { Box, Icon, Text } from "@components";
import { useThemeStore } from "@stores/theme";
import { size } from "@theme";

export function AppPlayground() {
    const { setMode, mode } = useThemeStore();
    return (
        <>
            <Box flex={1} align='center' justify='center' bgColor='background' gap={6}>

                <Box row px={2} py={.5} bgColor='surface' rounded='small' border>
                    <Text variant="caption">string</Text>
                </Box>

                <Box justify="center" align="center" p={2} rounded="default" border>
                    <Icon name="IconPokerChip" color="text-muted"/>
                </Box>

                <Box bgColor="accent" justify="center" align="center" h={size["touch-target-min"]} w={size["touch-target-min"]} rounded="default" border borderColor="accent">
                    <Icon name="IconBolt" color="accent-foreground"/>
                </Box>

            </Box>

            <Box position='absolute' right={5} top={12} h={size["touch-target-min"]} w={size["touch-target-min"]} rounded='default' bgColor='accent'>
                <Pressable onPress={()=>setMode(mode === "dark" ? "light" : "dark")} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Icon name={mode === "dark" ? "IconSun" : "IconMoon"} color="accent-foreground"/>
                </Pressable>
            </Box>
        </>   
    );
}
