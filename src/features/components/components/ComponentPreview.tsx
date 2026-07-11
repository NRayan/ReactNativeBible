import { Box } from "@components";
import { size } from "@theme/spacing";
import type { RNComponent } from "../types";

type ComponentPreviewProps = {
    component: RNComponent;
};

export function ComponentPreview({ component }: ComponentPreviewProps) {
    return (
        <Box fullWidth maxW={size["max-content-width"]} px={4} h={250} w={"80%"} bgColor="background" border rounded="large">
            <component.previewComponent focused />
        </Box>
    );
}
