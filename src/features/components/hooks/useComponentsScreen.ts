import { components } from "@content/components";
import { useTranslation } from "react-i18next";
import { COMPONENT_TAGS } from "../constants";

export function useComponentsScreen() {
    const { t } = useTranslation();

    const sections = COMPONENT_TAGS.map(tag => ({
        tag: tag.id,
        label: t(`components.tags.${tag.id}`),
        items: components[tag.id],
    }));

    const strings = {
        title: t("components.title"),
    };

    return { sections, strings };
}
