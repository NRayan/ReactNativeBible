import { useTranslation } from "react-i18next";
import type { Topic } from "../types";

type UseTopicCardParams = {
    topic: Topic;
};

export function useTopicCard({ topic }: UseTopicCardParams) {
    const { t } = useTranslation();

    const strings = {
        title: t(topic.title),
        subtitle: t(topic.subtitle),
    };

    return { strings };
}
