import { Box, Chip, Toolbar, Text, CodeBlock, RichText, Button, ImageBlock } from "@components";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { s, size } from "@theme/spacing";
import { ScrollView, Animated } from "react-native";
import { useTopicScreen } from "../hooks/useTopicScreen";
import { useScrollReveal } from "@hooks";

type Props = NativeStackScreenProps<LearnStackParamList, "Topic">;

export function TopicScreen({ route }: Props) {
    const { strings, blocks } = useTopicScreen({ section: route.params.section, topicIndex: route.params.topicIndex });
    const { opacity, handleScroll, handleLayout, handleContentSizeChange } = useScrollReveal(.5, .7);

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.topicTitle} showBackButton />

            <Box flex={1} align="flex-start" pt={4} gap={2}>

                <Box px={4}>
                    <Chip title={strings.sectionTitle} subtitle={strings.position} icon="IconAB"/>
                </Box>
                
                <ScrollView
                    onScroll={handleScroll}
                    onLayout={handleLayout}
                    onContentSizeChange={handleContentSizeChange}
                    contentContainerStyle={{ padding: s(4), paddingBottom: (s(5) + size["touch-target-min"]), gap: s(6) }}
                    scrollEventThrottle={14}>
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
                                return <ImageBlock key={block.id} imagePath={block.imagePath} caption={block.caption} />;
                            }
                        })
                    }
                </ScrollView>

                <Animated.View style={{ flexDirection: "row", gap: s(2), position: "absolute", right: s(3), bottom: s(3), opacity }}>
                    <Button variant="icon" icon="IconArrowLeft" onPress={()=>null} />
                    <Button variant="icon" icon="IconArrowRight" onPress={()=>null} />
                </Animated.View>
            </Box>
        </Box>
    );
}
