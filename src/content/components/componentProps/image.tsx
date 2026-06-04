import type { RNComponent } from "@content/components/types";
import { Image } from "react-native";

function ImagePreview() {
    return (
        <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ width: 64, height: 64 }}
            resizeMode="contain"
        />
    );
}

export const image: RNComponent = {
    id: "image",
    name: "Image",
    tag: "layout",
    subtitle: "content.image.subtitle",
    description: "content.image.description",
    previewComponent: ImagePreview,
    props: [
        { name: "source", type: "ImageSource", required: true, description: "content.image.props.source" },
        { name: "resizeMode", type: "string", required: false, description: "content.image.props.resizeMode" },
        { name: "style", type: "StyleProp<ImageStyle>", required: false, description: "content.image.props.style" },
        { name: "onLoad", type: "function", required: false, description: "content.image.props.onLoad" },
        { name: "onError", type: "function", required: false, description: "content.image.props.onError" },
        { name: "defaultSource", type: "ImageSource", required: false, description: "content.image.props.defaultSource" },
    ],
    gotchas: [
        "content.image.gotchas.gotcha1",
        "content.image.gotchas.gotcha2",
        "content.image.gotchas.gotcha3",
        "content.image.gotchas.gotcha4",
    ],
    codeSnippet:
`<Image
    source={{ uri: "https://example.com/photo.jpg" }}
    style={{ width: 200, height: 200, borderRadius: 12 }}
    resizeMode="cover"
    onLoad={({ nativeEvent: { source } }) => {
        console.log(source.width, source.height)
    }}
    onError={() => setFailed(true)}
/>`,
};
