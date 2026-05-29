import type React from "react";

export type ModalStore = {
    content: React.ReactNode | null;
    open: (content: React.ReactNode)=> void;
    close: ()=> void;
};
