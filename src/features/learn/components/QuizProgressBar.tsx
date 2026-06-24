import { Box, Text } from "@components";
import { useQuizProgressBar } from "../hooks/useQuizProgressBar";

type QuizProgressBarProps = {
    current: number;
    total: number;
};

export function QuizProgressBar({ current, total }: QuizProgressBarProps) {
    const { strings, fillPercent } = useQuizProgressBar({ current, total });

    return (
        <Box fullWidth gap={1}>
            <Box fullWidth row justify="space-between">
                <Text variant="caption" color="text-muted">{strings.progress}</Text>
                <Text variant="caption" color="text-muted">{strings.percentage}</Text>
            </Box>
            <Box fullWidth bgColor="border" h={3} rounded="large">
                <Box bgColor="accent" h={3} rounded="large" style={{ width: fillPercent }} />
            </Box>
        </Box>
    );
}
