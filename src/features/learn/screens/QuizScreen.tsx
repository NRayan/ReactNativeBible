import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuizScreen } from "../hooks/useQuizScreen";
import { Box, Toolbar } from "@components";
import { ScrollView } from "react-native";
import { s } from "@theme/spacing";

type Props = NativeStackScreenProps<LearnStackParamList, "Quiz">;

export function QuizScreen({ route }: Props) {
    const { strings } = useQuizScreen({ section: route.params.section });

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.sectionTitle} showBackButton />
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }} />
        </Box>
    );
}
