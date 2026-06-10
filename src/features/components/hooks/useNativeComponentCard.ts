import { useTranslation } from "react-i18next";
import type { RNComponent } from "../types";

type UseNativeComponentCardParams = {
    component: RNComponent;
};

export function useNativeComponentCard({ component }: UseNativeComponentCardParams) {
    const { t } = useTranslation();

    const strings = {
        subtitle: t(component.subtitle),
    };

    return { strings };
}
