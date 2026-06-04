import { TypographyTokens } from "@theme";
import { Text } from "../";
import { TextProps } from "@components/Text/Text";

type RichTextProps = {
  content: string
  variant?: keyof TypographyTokens
} & TextProps

export function RichText({ content, ...rest }: RichTextProps) {
    const parts = content.split(/(`[^`]+`)/);

    return (
        <Text {...rest}>
            {parts.map((part, i) =>
                part.startsWith("`") && part.endsWith("`")
                    ? <Text key={i} variant="code" color="success">{part.slice(1, -1)}</Text>
                    : part
            )}
        </Text>
    );
}