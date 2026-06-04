export const COMPONENT_TAGS = [
    { id: "interaction", icon: "IconPointer" },
    { id: "layout", icon: "IconLayout" },
    { id: "feedback", icon: "IconBell" },
] as const;

export type ComponentTag = typeof COMPONENT_TAGS[number]["id"]
