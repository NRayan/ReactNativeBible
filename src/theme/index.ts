import { darkColors } from "./dark";
import { lightColors } from "./light";
import { typography } from "./typography";
import { radius, size } from "./spacing";
import type { Theme, ThemeMode } from "./types";

export const themes: Record<ThemeMode, Theme> = {
    dark: { colors: darkColors, typography, radius, size },
    light: { colors: lightColors, typography, radius, size },
};

export { typography, radius, size };
export { iconSize } from "./iconSize";
export * from "./types";
