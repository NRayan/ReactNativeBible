import { Box, Icon, PressableBox, Text, Toolbar } from "@components";
import { s } from "@theme/spacing";
import { ScrollView } from "react-native";
import { useLearnScreen } from "../hooks/useLearnScreen";
import { TopicCard } from "../components";

export function LearnScreen() {
    const { sections, strings, handleTopicPress, handleSectionQuizPress } = useLearnScreen();

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.title} subtitle="React Native Bible" />
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                {sections.map(section => (
                    <Box key={section.id} gap={3}>
                        <Box fullWidth row justify="space-between" align="center">
                            <Text>{section.displayTitle}</Text>
                            <PressableBox onPress={() => handleSectionQuizPress(section)} align="center" row gap={1} bgColor="surface-accent" border borderColor="accent" rounded="small" py={1} pl={1} pr={2}>
                                <Icon name="IconBolt" size={16} color="accent"/>
                                <Text variant="caption" color="accent">Quiz</Text>
                            </PressableBox>
                        </Box>
                        {section.topics.map((topic, index) => 
                            <TopicCard key={topic.id} topic={topic} onPress={() => handleTopicPress(section, index)} />
                        )}
                    </Box>
                ))}
            </ScrollView>
        </Box>
    );
}
