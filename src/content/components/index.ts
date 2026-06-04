import type { RNComponent } from "@content/components/types";
import { button } from "@content/components/componentProps/button";
import { ComponentTag } from "@features/components/types";

export type ComponentsContent = Record<ComponentTag, RNComponent[]>

export const components: ComponentsContent = {
    interaction: [button],
    navigation: [],
    layout: [],
    feedback: [],
};
