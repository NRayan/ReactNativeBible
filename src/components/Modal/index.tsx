import React from "react";
import { Modal as RNModal, Platform } from "react-native";
import { useModalStore } from "@stores/modal";
import { Box } from "../Box";
import { PressableBox } from "../PressableBox";

export function Modal() {
    const { content, close } = useModalStore();

    return (
        <RNModal
            visible={!!content}
            animationType="fade"
            transparent
            presentationStyle={Platform.OS === "ios" ? "pageSheet" : undefined}
            onRequestClose={close}
        >
            <Box fullWidth fullHeight style={{ backgroundColor: "rgba(0,0,0,0.7)" }} justify="center" align="center">
                <PressableBox
                    position="absolute"
                    top={0} bottom={0} left={0} right={0}
                    onPress={close}
                />

                {content}
            </Box>
        </RNModal>
    );
}
