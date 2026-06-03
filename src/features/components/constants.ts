export const COMPONENT_TAGS = [
    { id: "interaction", title: "Interaction", icon: "IconPointer" },
    { id: "navigation", title: "Navigation", icon: "IconRoute" },
    { id: "layout", title: "Layout", icon: "IconLayout" },
    { id: "feedback", title: "Feedback", icon: "IconBell" },
] as const;

export type ComponentTag = typeof COMPONENT_TAGS[number]["id"]
