import type { RNComponent } from "@content/components/types";
import { ActivityIndicator } from "react-native";

export const activityindicator: RNComponent = {
    id: "activityindicator",
    name: "ActivityIndicator",
    tag: "feedback",
    subtitle: "content.activityindicator.subtitle",
    description: "content.activityindicator.description",
    previewComponent: (
        <ActivityIndicator size="large" />
    ),
    props: [
        { name: "animating", type: "boolean", required: false, description: "content.activityindicator.props.animating" },
        { name: "color", type: "ColorValue", required: false, description: "content.activityindicator.props.color" },
        { name: "size", type: "string", required: false, description: "content.activityindicator.props.size" },
        { name: "hidesWhenStopped", type: "boolean", required: false, description: "content.activityindicator.props.hidesWhenStopped" },
    ],
    gotchas: [
        "content.activityindicator.gotchas.gotcha1",
        "content.activityindicator.gotchas.gotcha2",
        "content.activityindicator.gotchas.gotcha3",
    ],
    codeSnippet:
`<ActivityIndicator
    animating={isLoading}
    size="large"
    color="#6366f1"
/>`,
};
