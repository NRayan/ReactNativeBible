import { Box, Chip, Toolbar } from "@components";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { s } from "@theme/spacing";
import { ScrollView } from "react-native";
import { useTopicScreen } from "../hooks/useTopicScreen";

type Props = NativeStackScreenProps<LearnStackParamList, "Topic">;

export function TopicScreen({ route }: Props) {
    const { strings, topic } = useTopicScreen({ section: route.params.section, topicIndex: route.params.topicIndex });

    console.log(topic);
    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={"teste"} showBackButton />

            <Box align="flex-start" p={4}>
                <Chip title={strings.sectionTitle} subtitle={strings.position} icon="IconAB"/>

                <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                    <Box/>
                </ScrollView>
            </Box>
        </Box>
    );
}
