import { COMPONENT_TAGS } from "../constants";
import type { RNComponent } from "@features/components/types";

type UseComponentDetailParams = {
  component: RNComponent;
};

export function useComponentDetail({ component }: UseComponentDetailParams) {
    const tag = COMPONENT_TAGS.find(t => t.id === component.tag)!;
    return { component, tag };
}
