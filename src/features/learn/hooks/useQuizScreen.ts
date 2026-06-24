import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { quizzes } from "@content/quiz";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { QuizQuestion, Section } from "../types";

type UseQuizScreenParams = {
    section: Section;
    navigation: NativeStackNavigationProp<LearnStackParamList, "Quiz">;
};

type OptionVariant = "default" | "correct" | "wrong";

function shuffle<T>(arr: T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function useQuizScreen({ section, navigation }: UseQuizScreenParams) {
    const { t } = useTranslation();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [correctCount, setCorrectCount] = useState(0);

    const [shuffledQuestions] = useState<QuizQuestion[]>(() => {
        const quiz = quizzes.find(q => q.sectionId === section.id)!;
        return shuffle(quiz.questions).map(q => ({
            ...q,
            options: shuffle(q.options),
        }));
    });

    useEffect(() => {
        setSelectedOptionId(null);
    }, [questionIndex]);

    const question = shuffledQuestions[questionIndex];
    const letters = "abcdef";

    function handleOptionPress(optionId: string) {
        if (selectedOptionId !== null) return;
        setSelectedOptionId(optionId);
        const optionIndex = letters.indexOf(optionId);
        if (question.options[optionIndex]?.isCorrect) {
            setCorrectCount(c => c + 1);
        }
    }

    function handleQuizComplete() {
        navigation.replace("QuizResult", {
            correct: correctCount,
            total: shuffledQuestions.length,
            sectionId: section.id,
        });
    }

    function getVariant(optionId: string, isCorrect: boolean): OptionVariant {
        if (selectedOptionId === null) return "default";
        if (optionId === selectedOptionId) return isCorrect ? "correct" : "wrong";
        if (isCorrect) return "correct";
        return "default";
    }

    const strings = {
        sectionTitle: t(section.title),
        question: t(question.question),
        explanation: t(question.explanation),
        options: question.options.map((opt, index) => {
            const id = letters[index];
            return {
                id,
                label: t(opt.label),
                isCorrect: opt.isCorrect,
                variant: getVariant(id, opt.isCorrect),
            };
        }),
    };

    const isAnswerCorrect = selectedOptionId === null
        ? null
        : question.options[letters.indexOf(selectedOptionId)]?.isCorrect ?? false;

    return {
        strings,
        questionIndex,
        setQuestionIndex,
        totalQuestions: shuffledQuestions.length,
        hasAnswered: selectedOptionId !== null,
        isLastQuestion: questionIndex === shuffledQuestions.length - 1,
        isAnswerCorrect,
        handleOptionPress,
        handleQuizComplete,
    };
}
