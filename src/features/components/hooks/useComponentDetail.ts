import { COMPONENT_TAGS } from "../constants";
import type { RNComponent } from "@features/components/types";
import { useTranslation } from "react-i18next";

type UseComponentDetailParams = {
  component: RNComponent;
};

export function useComponentDetail({ component }: UseComponentDetailParams) {
    const { t } = useTranslation();
    const tag = COMPONENT_TAGS.find(t => t.id === component.tag)!;

    const strings = {
        props: t("components.props"),
        preview: t("components.preview"),
        gotchas: t("components.gotchas"),
        code: t("components.code"),
        required: t("components.required"),
        tagTitle: t(`components.tags.${tag.id}`),
    };

    return { component, tag, strings };
}
