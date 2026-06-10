import { useTranslation } from "react-i18next";
import type { Section } from "../types";

type UseTopicScreenParams = {
    section: Section;
    topicIndex: number;
};

export function useTopicScreen({ section, topicIndex }: UseTopicScreenParams) {
    const { t } = useTranslation();

    const topic = section.topics[topicIndex];

    const strings = {
        sectionTitle: t(section.title),
        position: `${topicIndex + 1}/${section.topics.length}`,
    };

    return { topic, strings };
}
