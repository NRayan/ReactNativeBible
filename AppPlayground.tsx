import { Pressable, Text } from "react-native";
import { Box } from "./src/components";
import { useThemeStore } from "./src/stores/theme";

export function AppPlayground() {
    const { setMode, mode } = useThemeStore();
    return (
        <>
            <Box flex={1} align='center' justify='center' bgColor='background'>

                <Box px={2} py={4} bgColor='surface' rounded='default' border>
                    <Text>AppPlayground</Text>
                </Box>
            </Box>

            <Box position='absolute' right={5} top={10} h={10} w={10} rounded='default' bgColor='accent'>
                <Pressable onPress={()=>setMode(mode === "dark" ? "light" : "dark")} style={{ flex: 1 }}/>
            </Box>
        </>   
    );
}
