import { useTranslation } from "react-i18next";

type UseQuizProgressBarParams = {
    current: number;
    total: number;
};

export function useQuizProgressBar({ current, total }: UseQuizProgressBarParams) {
    const { t } = useTranslation();

    const fillPercent: `${number}%` = `${Math.round((current / total) * 100)}%`;

    const strings = {
        progress: t("quiz.progress", { current, total }),
        percentage: fillPercent,
    };

    return { strings, fillPercent };
}
