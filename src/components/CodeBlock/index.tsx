import { ScrollView } from "react-native";
import { Box, Text, Separator } from "../index";
import { hljs, parseTokens, languageLabels } from "./CodeBlock.utils";
import type { CodeLanguage } from "./types";

type CodeBlockProps = {
    code: string;
    language?: CodeLanguage;
};

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
    const result = hljs.highlight(code, { language });
    const tokens = parseTokens(result.value);

    return (
        <Box bgColor="surface" border rounded="large" fullWidth>
            <Box px={4} py={3}>
                <Text variant="caption">{languageLabels[language] ?? language}</Text>
            </Box>

            <Separator />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Box p={4}>
                    <Text>
                        {tokens.map((token, i) => (
                            <Text variant="code" key={i} style={{ color: token.color }}>
                                {token.text}
                            </Text>
                        ))}
                    </Text>
                </Box>
            </ScrollView>
        </Box>
    );
}
