import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

import { ScrollView } from "react-native";
import { Box, Text, Separator } from "./index";

hljs.registerLanguage("typescript", typescript);

const tokenColors: Record<string, string> = {
    "hljs-keyword": "#67e8f9",
    "hljs-string": "#86efac",
    "hljs-comment": "#71717a",
    "hljs-number": "#fca5a5",
    "hljs-title": "#fafafa",
    "hljs-built_in": "#67e8f9",
    "hljs-attr": "#fca5a5",
    "hljs-tag": "#67e8f9",
};

function decodeEntities(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#x27;/g, "'")
        .replace(/&#x60;/g, "`");
}

function parseTokens(html: string) {
    const tokens: { text: string; color: string }[] = [];
    const regex = /<span class="([^"]+)">([^<]+)<\/span>|([^<]+)/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
        if (match[1] && match[2]) {
            tokens.push({
                text: decodeEntities(match[2]),
                color: tokenColors[match[1]] ?? "#a1a1aa",
            });
        } else if (match[3]) {
            tokens.push({
                text: decodeEntities(match[3]),
                color: "#a1a1aa",
            });
        }
    }

    return tokens;
}

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
                    <Text style={{ fontFamily: "monospace", fontSize: 12 }}>
                        {tokens.map((token, i) => (
                            <Text key={i} style={{ color: token.color }}>
                                {token.text}
                            </Text>
                        ))}
                    </Text>
                </Box>
            </ScrollView>
        </Box>
    );
}