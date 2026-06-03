import type { ComponentTag, RNComponent } from "@content/components/types";
import { button } from "@content/components/rnComponents/button";

export type ComponentsContent = Record<ComponentTag, RNComponent[]>

export const components: ComponentsContent = {
    interaction: [button],
    navigation: [],
    layout: [],
    feedback: [],
};
