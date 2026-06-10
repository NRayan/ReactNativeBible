import { Box, Text, Toolbar } from "@components";
import { s } from "@theme/spacing";
import { ScrollView } from "react-native";
import { useLearnScreen } from "../hooks/useLearnScreen";
import { TopicCard } from "../components";

export function LearnScreen() {
    const { sections, strings, handleTopicPress } = useLearnScreen();

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.title} subtitle="React Native Bible" />
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                {sections.map(section => (
                    <Box key={section.id} gap={4}>
                        <Text>{section.title}</Text>
                        {section.topics.map((topic, index) => 
                            <TopicCard key={topic.id} topic={topic} onPress={() => handleTopicPress(section.id, index)} />
                        )}
                    </Box>
                ))}
            </ScrollView>
        </Box>
    );
}
