import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "@theme";
import type { ThemeStore } from "./types";

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            mode: "dark",
            theme: themes.dark,
            setMode: (mode) => set({ mode, theme: themes[mode] }),
            toggleTheme: () => set((state) => {
                const newMode = state.mode === "dark" ? "light" : "dark";
                return { mode: newMode, theme: themes[newMode] };
            }),
        }),
        {
            name: "theme-store",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ mode: state.mode }),
            onRehydrateStorage: () => (state) => {
                if (state) state.theme = themes[state.mode];
            },
        },
    ),
);
