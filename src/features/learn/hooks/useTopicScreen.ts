import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { Section } from "../types";

type UseTopicScreenParams = {
    section: Section;
    initialTopicIndex: number;
    navigation: NativeStackNavigationProp<LearnStackParamList, "Topic">;
};

export function useTopicScreen({ section, initialTopicIndex, navigation }: UseTopicScreenParams) {
    const { t } = useTranslation();
    const [topicIndex, setTopicIndex] = useState(initialTopicIndex);

    const topic = section.topics[topicIndex];
    const isFirst = topicIndex === 0;
    const isLast = topicIndex === section.topics.length - 1;

    const strings = {
        sectionTitle: t(section.title),
        topicTitle: t(topic.title),
        position: `${topicIndex + 1}/${section.topics.length}`,
    };

    const blocks = topic.body.map((block, index) => ({
        ...(block.type === "code"
            ? block
            : block.type === "image"
                ? { ...block, caption: t(block.caption) }
                : { ...block, value: t(block.value) }),
        id: `${block.type}-${index}`,
    }));

    function handleQuizPress() {
        navigation.replace("Quiz", { section });
    }

    return { strings, blocks, isFirst, isLast, topicIndex, setTopicIndex, handleQuizPress };
}
