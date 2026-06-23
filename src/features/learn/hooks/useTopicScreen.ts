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
        topicTitle: t(topic.title),
        position: `${topicIndex + 1}/${section.topics.length}`,
    };

    const blocks = topic.body.map((block, index) => ({
        ...(block.type === "code" || block.type === "image" ? block : { ...block, value: t(block.value) }),
        id: `${block.type}-${index}`,
    }));

    return { strings, blocks };
}
