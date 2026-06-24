import { LearnScreen } from "@features/learn/screens/LearnScreen";
import { TopicScreen } from "@features/learn/screens/TopicScreen";
import { QuizScreen } from "@features/learn/screens/QuizScreen";
import { QuizResultScreen } from "@features/learn/screens/QuizResultScreen";
import type { Section } from "@features/learn/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export type LearnStackParamList = {
    Learn: undefined;
    Topic: { section: Section; topicIndex: number };
    Quiz: { section: Section };
    QuizResult: { correct: number; total: number; sectionId: string };
};

const Stack = createNativeStackNavigator<LearnStackParamList>();

export function LearnNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Learn" component={LearnScreen} />
            <Stack.Screen name="Topic" component={TopicScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="QuizResult" component={QuizResultScreen} />
        </Stack.Navigator>
    );
}
