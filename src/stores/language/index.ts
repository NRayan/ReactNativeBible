import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { languages } from "./types";
import type { LanguageStore } from "./types";

export const useLanguageStore = create<LanguageStore>()(
    persist(
        (set) => ({
            language: languages[0],
            setLanguage: (language) => set({ language }),
        }),
        {
            name: "language-store",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
