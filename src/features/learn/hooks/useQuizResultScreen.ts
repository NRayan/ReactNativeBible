import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { ColorTokens } from "@theme/types";
import { sections } from "@content/learn";

type UseQuizResultScreenParams = {
    correct: number;
    total: number;
    sectionId: string;
    navigation: NativeStackNavigationProp<LearnStackParamList, "QuizResult">;
};

const INDICES = ["1", "2", "3"] as const;

export function useQuizResultScreen({ correct, total, sectionId, navigation }: UseQuizResultScreenParams) {
    const { t } = useTranslation();

    const randomIndex = useMemo(() => INDICES[Math.floor(Math.random() * 3)], []);

    const percentage = correct / total;
    const level = percentage < 0.5 ? "bad" : percentage < 0.8 ? "medium" : "good";

    const strings = {
        title: t("quiz.result"),
        score: `${correct}/${total}`,
        resultMessage: t(`content.quizResult.${level}.${randomIndex}`),
    };

    function onTryAgain() {
        const section = sections.find(s => s.id === sectionId)!;
        navigation.replace("Quiz", { section });
    }

    function onBackToTopics() {
        navigation.navigate("Learn");
    }

    const iconColor: keyof ColorTokens = level === "bad" ? "danger" : "success";
    const bgColor: keyof ColorTokens = level === "bad" ? "surface-danger" : "surface-success";

    return { strings, level, iconColor, bgColor, onTryAgain, onBackToTopics };
}
