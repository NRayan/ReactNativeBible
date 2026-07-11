import { Box, Chip, Toolbar, Text, CodeBlock, RichText, Button, ImageBlock } from "@components";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { s, size } from "@theme/spacing";
import { useEffect, useRef } from "react";
import { ScrollView, Animated } from "react-native";
import { useTopicScreen } from "../hooks/useTopicScreen";
import { useScrollReveal } from "@hooks";

type Props = NativeStackScreenProps<LearnStackParamList, "Topic">;

export function TopicScreen({ route, navigation }: Props) {
    const { section } = route.params;
    const { strings, blocks, isFirst, isLast, topicIndex, setTopicIndex, handleQuizPress } = useTopicScreen({ section, initialTopicIndex: route.params.topicIndex, navigation });
    const { opacity, handleScroll, handleLayout, handleContentSizeChange } = useScrollReveal(.5, .7);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [topicIndex]);

    return (
        <Box flex={1} bgColor="background" align="center">
            <Toolbar title={strings.sectionTitle} showBackButton />

            <Box flex={1} align="flex-start" pt={4} gap={2} fullWidth maxW={size["max-content-width"]}>

                <Box px={4}>
                    <Chip title={strings.topicTitle} subtitle={strings.position} icon={section.topics[topicIndex].icon}/>
                </Box>
                
                <ScrollView
                    ref={scrollRef}
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
                    {
                        !isFirst && 
                        <Button variant="icon" icon="IconArrowLeft" onPress={() => setTopicIndex(i => i - 1)} />
                    }
                    {
                        isLast
                            ? <Button variant="icon-cta" icon="IconBolt" onPress={handleQuizPress} />
                            : <Button variant="icon" icon="IconArrowRight" onPress={() => setTopicIndex(i => i + 1)} />
                    }
                </Animated.View>
            </Box>
        </Box>
    );
}
