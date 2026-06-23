import { TextProps } from "../Text";
import { Text } from "../Text";

type RichTextProps = {
  content: string
} & TextProps

export function RichText({ content, ...rest }: RichTextProps) {
    const parts = content.split(/(`[^`]+`|\*[^*]+\*)/);

    return (
        <Text {...rest}>
            {parts.map((part, i) => {
                if (part.startsWith("`") && part.endsWith("`"))
                    return <Text key={i} variant="code" color="success">{part.slice(1, -1)}</Text>;

                if (part.startsWith("*") && part.endsWith("*"))
                    return <Text key={i} variant="body-emphasis">{part.slice(1, -1)}</Text>;

                return part;
            })}
        </Text>
    );
}
