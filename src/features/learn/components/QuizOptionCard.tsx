import { Box, IconTile, PressableBox, RichText } from "@components";
import type { ColorTokens } from "@theme/types";

type QuizOptionCardVariant = "default" | "correct" | "wrong";

type VariantStyle = {
    bgColor: keyof ColorTokens;
    borderColor: keyof ColorTokens | undefined;
    badgeBgColor: keyof ColorTokens;
    badgeColor: keyof ColorTokens | undefined;
};

type QuizOptionCardProps = {
    id: string;
    label: string;
    variant?: QuizOptionCardVariant;
    onPress: ()=> void;
};

const variantMap: Record<QuizOptionCardVariant, VariantStyle> = {
    default: { bgColor: "surface", borderColor: undefined, badgeBgColor: "background", badgeColor: undefined },
    correct: { bgColor: "surface-success", borderColor: "success", badgeBgColor: "success", badgeColor: "accent-foreground" },
    wrong: { bgColor: "surface-danger", borderColor: "danger", badgeBgColor: "danger", badgeColor: "accent-foreground" },
};

export function QuizOptionCard({ id, label, variant = "default", onPress }: QuizOptionCardProps) {
    const { bgColor, borderColor, badgeBgColor, badgeColor } = variantMap[variant];

    return (
        <PressableBox
            onPress={onPress}
            row
            fullWidth
            gap={3}
            bgColor={bgColor}
            border
            borderColor={borderColor}
            rounded="default"
            align="center"
            px={3}
            py={3}
        >
            <IconTile letter={id} bgColor={badgeBgColor} color={badgeColor} />

            <Box flex={1}>
                <RichText variant="body" content={label} />
            </Box>
        </PressableBox>
    );
}
