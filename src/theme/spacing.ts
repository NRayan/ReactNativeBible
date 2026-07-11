import type { RadiusTokens, SizeTokens } from "./types";

export function s(value: number): number {
    return value * 4;
}

export const radius: RadiusTokens = {
    "small": 6,
    "default": 8,
    "large": 10,
};

export const size: SizeTokens = {
    "border-width": 0.5,
    "touch-target-min": 44,
    "max-content-width": 620,
};
