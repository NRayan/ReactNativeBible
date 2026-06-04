import { COMPONENT_TAGS } from "../constants";
import type { RNComponent } from "@features/components/types";
import { useTranslation } from "react-i18next";

type UseComponentDetailParams = {
  component: RNComponent;
};

export function useComponentDetail({ component }: UseComponentDetailParams) {
    const { t } = useTranslation();
    const tag = COMPONENT_TAGS.find(ct => ct.id === component.tag)!;

    const translatedComponent = {
        ...component,
        subtitle: t(component.subtitle),
        description: t(component.description),
        props: component.props.map(prop => ({ ...prop, description: t(prop.description) })),
        gotchas: component.gotchas.map(key => t(key)),
    };

    const strings = {
        props: t("components.props"),
        preview: t("components.preview"),
        gotchas: t("components.gotchas"),
        code: t("components.code"),
        required: t("components.required"),
        tagTitle: t(`components.tags.${tag.id}`),
    };

    return { component: translatedComponent, tag, strings };
}
