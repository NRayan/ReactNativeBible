import { Box, Icon, IconTile, PressableBox, Text } from "@components";
import { useTopicCard } from "../hooks/useTopicCard";
import { Topic } from "../types";

type TopicCardProps = {
    topic: Topic;
    onPress: ()=> void;
};

export function TopicCard({ topic, onPress }: TopicCardProps) {
    const { strings } = useTopicCard({ topic });

    return (
        <PressableBox onPress={onPress} row fullWidth gap={2} bgColor="surface" border rounded="default" align="center" px={2} py={2}>
            <IconTile icon={topic.icon} bgColor="background" />

            <Box gap={1} flex={1}>
                <Text variant="body-emphasis">{strings.title}</Text>
                <Text variant="caption">{strings.subtitle}</Text>
            </Box>

            <Icon name="IconChevronRight" size={16} color="text-disabled" />
        </PressableBox>
    );
}