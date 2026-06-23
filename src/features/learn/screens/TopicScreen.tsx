import { Box, Chip, Toolbar, Text, CodeBlock, RichText } from "@components";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { s } from "@theme/spacing";
import { ScrollView, Image } from "react-native";
import { useTopicScreen } from "../hooks/useTopicScreen";

type Props = NativeStackScreenProps<LearnStackParamList, "Topic">;

export function TopicScreen({ route }: Props) {
    const { strings, blocks } = useTopicScreen({ section: route.params.section, topicIndex: route.params.topicIndex });

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.topicTitle} showBackButton />

            <Box flex={1} align="flex-start" p={4} gap={2}>
                <Chip title={strings.sectionTitle} subtitle={strings.position} icon="IconAB"/>

                <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>
                    {
                        blocks.map(block=>{
                            switch (block.type) {
                            case "heading":
                                return <Text key={block.id} variant="heading">{block.value}</Text>;
                            case "text":
                                return <RichText key={block.id} content={block.value}/>;
                            case "code":
                                return <CodeBlock key={block.id} language={block.language} code={block.value} />;
                            case "image":
                                return <Image key={block.id} source={{ uri: block.uri }} />;
                            }
                        })
                    }
                </ScrollView>
            </Box>
        </Box>
    );
}
