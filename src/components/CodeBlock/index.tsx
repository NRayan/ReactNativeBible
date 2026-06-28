import { ScrollView } from "react-native";
import { Box, Text, Separator } from "../index";
import { hljs, parseTokens } from "./CodeBlock.utils";

type CodeBlockProps = {
    code: string;
    language?: string;
};

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
    const result = hljs.highlight(code, { language });
    const tokens = parseTokens(result.value);

    return (
        <Box bgColor="surface" border rounded="large" fullWidth>
            <Box px={4} py={3}>
                <Text variant="caption">{language.charAt(0).toUpperCase() + language.slice(1)}</Text>
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
