import React, { useState } from "react";
import { Image, Modal, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "@theme/spacing";
import { Box } from "../Box";
import { Text } from "../Text";
import { Separator } from "../Separator";
import { PressableBox } from "../PressableBox";
import { Icon } from "../Icon";

type ImageBlockProps = {
    imagePath: number;
    caption: string;
};

export function ImageBlock({ imagePath, caption }: ImageBlockProps) {
    const [fullscreen, setFullscreen] = useState(false);
    const { width: screenWidth } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const asset = Image.resolveAssetSource(imagePath);
    const aspectRatio = asset.width / asset.height;

    return (
        <>
            <Box bgColor="surface" pt={2} border rounded="large" fullWidth style={{ overflow: "hidden" }}>
                <PressableBox p={2} style={{ width: "100%", aspectRatio }} onPress={() => setFullscreen(true)}>
                    <Image
                        source={imagePath}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                    />
                </PressableBox>
                
                <Separator />

                <Box px={4} py={3}>
                    <Text variant="caption" color="text-muted">{caption}</Text>
                </Box>

                <Box position="absolute" style={{ top: s(3), right: s(3), opacity: 0.3 }}>
                    <Icon name="IconArrowsMaximize" size={18} color="text-primary" />
                </Box>
            </Box>

            <Modal
                visible={fullscreen}
                animationType="fade"
                transparent
                onRequestClose={() => setFullscreen(false)}
            >
                <Box
                    fullWidth fullHeight
                    style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
                    justify="center"
                    align="center"
                >
                    <Image
                        source={imagePath}
                        style={{ width: screenWidth, height: screenWidth / aspectRatio }}
                        resizeMode="contain"
                    />

                    <PressableBox
                        position="absolute"
                        bgColor="surface"
                        border
                        rounded="default"
                        h={38}
                        w={38}
                        justify="center"
                        align="center"
                        style={{ top: insets.top + 12, right: 16 }}
                        onPress={() => setFullscreen(false)}
                    >
                        <Icon name="IconX" size={20} color="text-primary" />
                    </PressableBox>
                </Box>
            </Modal>
        </>
    );
}
