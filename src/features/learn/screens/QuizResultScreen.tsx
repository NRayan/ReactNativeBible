import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Icon, Text, Toolbar } from "@components";
import { useQuizResultScreen } from "../hooks/useQuizResultScreen";

type Props = NativeStackScreenProps<LearnStackParamList, "QuizResult">;

export function QuizResultScreen({ route, navigation }: Props) {
    const { correct, total, sectionId } = route.params;
    const { strings, iconColor, bgColor, onTryAgain, onBackToTopics } = useQuizResultScreen({ correct, total, sectionId, navigation });

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.title} showBackButton />
            <Box flex={1} p={4}>
                
                <Box flex={1} align="center" justify="center" gap={2}>
                    <Box h={70} w={70} justify="center" align="center" rounded="default" border borderColor={iconColor} bgColor={bgColor}>
                        <Icon name="IconTrophy" size={32} color={iconColor} />
                    </Box>
                    <Text variant="screen-title">{strings.score}</Text>
                    <Text variant="body-emphasis" color="text-secondary" textAlign="center">{strings.resultMessage}</Text>
                </Box>

                <Box gap={3}>
                    <Button variant="primary" title="Try again" onPress={onTryAgain} />
                    <Button variant="outline" title="Back to topics" onPress={onBackToTopics} />
                </Box>
            </Box>
        </Box>
    );
}
