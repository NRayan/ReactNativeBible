import { useTranslation } from "react-i18next";
import type { Section } from "../types";

type UseQuizScreenParams = {
    section: Section;
};

export function useQuizScreen({ section }: UseQuizScreenParams) {
    const { t } = useTranslation();

    const strings = {
        sectionTitle: t(section.title),
    };

    return { strings };
}
