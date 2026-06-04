import type { RNComponent } from "@content/components/types";
import { activityindicator } from "@content/components/componentProps/activityindicator";
import { button } from "@content/components/componentProps/button";
import { flatlist } from "@content/components/componentProps/flatlist";
import { image } from "@content/components/componentProps/image";
import { scrollview } from "@content/components/componentProps/scrollview";
import { pressable } from "@content/components/componentProps/pressable";
import { touchableopacity } from "@content/components/componentProps/touchableopacity";
import { switchComponent } from "@content/components/componentProps/switch";
import { textinput } from "@content/components/componentProps/textinput";
import { ComponentTag } from "@features/components/types";

export type ComponentsContent = Record<ComponentTag, RNComponent[]>

export const components: ComponentsContent = {
    interaction: [button, textinput, switchComponent, pressable, touchableopacity],
    layout: [flatlist, scrollview, image],
    feedback: [activityindicator],
};
