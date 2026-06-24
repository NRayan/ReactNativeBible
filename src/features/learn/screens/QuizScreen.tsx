import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuizScreen } from "../hooks/useQuizScreen";
import { Box, Button, Icon, RichText, Toolbar } from "@components";
import { ScrollView } from "react-native";
import { s, size } from "@theme/spacing";
import { QuizProgressBar } from "../components/QuizProgressBar";
import { QuizOptionCard } from "../components/QuizOptionCard";

type Props = NativeStackScreenProps<LearnStackParamList, "Quiz">;

export function QuizScreen({ route, navigation }: Props) {
    const { strings, questionIndex, totalQuestions, hasAnswered, isAnswerCorrect, isLastQuestion, setQuestionIndex, handleOptionPress, handleQuizComplete } = useQuizScreen({ section: route.params.section, navigation });

    return (
        <Box flex={1} bgColor="background" gap={2}>
            <Toolbar title={strings.sectionTitle} showBackButton />
            <Box flex={1} gap={4}>

                <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6), paddingBottom: s(5) + size["touch-target-min"] }}>

                    <QuizProgressBar current={questionIndex + 1} total={totalQuestions} />

                    <Box gap={2}>
                        <RichText variant="heading" content={strings.question}/>

                        {
                            strings.options.map(option => 
                                <QuizOptionCard
                                    key={option.id}
                                    id={option.id}
                                    label={option.label}
                                    variant={option.variant}
                                    onPress={() => handleOptionPress(option.id)}
                                />
                            )
                        }
                    </Box>

                    {
                        hasAnswered &&
                        <Box row bgColor={isAnswerCorrect ? "surface-success" : "surface-danger"} rounded="default" border borderColor={isAnswerCorrect ? "success" : "danger"} px={2} py={3} mt={1} gap={2}>
                            <Box mt={1}>
                                <Icon name={isAnswerCorrect ? "IconCheck" : "IconX"} size={16} color={isAnswerCorrect ? "success" : "danger"} />
                            </Box>
                            <Box flex={1}>
                                <RichText variant="body" color="text-secondary" content={strings.explanation} />
                            </Box>
                        </Box>
                    }
                </ScrollView>

                {
                    hasAnswered &&
                    <Box style={{ position: "absolute", right: s(3), bottom: s(3) }}>
                        {isLastQuestion
                            ? <Button variant="icon-cta" icon="IconTrophy" onPress={handleQuizComplete} />
                            : <Button variant="icon" icon="IconArrowRight" onPress={() => setQuestionIndex(i => i + 1)} />
                        }
                    </Box>
                }
            </Box>
        </Box>
    );
}
