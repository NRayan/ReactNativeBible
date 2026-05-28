import type { ColorTokens, TypographyTokens } from "@theme/types";

export const variantDefaultColor: Record<keyof TypographyTokens, keyof ColorTokens> = {
    "screen-title": "text-primary",
    "heading": "text-primary",
    "section-label": "text-muted",
    "body": "text-secondary",
    "body-emphasis": "text-primary",
    "caption": "text-disabled",
    "code": "text-secondary",
    "tab-label": "text-disabled",
};
