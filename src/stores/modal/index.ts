import { create } from "zustand";
import type { ModalStore } from "./types";

export const useModalStore = create<ModalStore>()((set) => ({
    content: null,
    open: (content) => set({ content }),
    close: () => set({ content: null }),
}));
