import type { RNComponent } from "@content/components/types";
import { Text } from "@components";
import { FlatList } from "react-native";

export const flatlist: RNComponent = {
    id: "flatlist",
    name: "FlatList",
    tag: "layout",
    subtitle: "content.flatlist.subtitle",
    description: "content.flatlist.description",
    previewComponent: (
        <FlatList
            contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
            data={Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)}
            renderItem={({ item }) => <Text variant="body">{item}</Text>}
            keyExtractor={(item) => item}
            style={{ flexGrow: 0 }}
        />
    ),
    props: [
        { name: "data", type: "T[]", required: true, description: "content.flatlist.props.data" },
        { name: "renderItem", type: "function", required: true, description: "content.flatlist.props.renderItem" },
        { name: "keyExtractor", type: "function", required: false, description: "content.flatlist.props.keyExtractor" },
        { name: "extraData", type: "any", required: false, description: "content.flatlist.props.extraData" },
        { name: "getItemLayout", type: "function", required: false, description: "content.flatlist.props.getItemLayout" },
        { name: "numColumns", type: "number", required: false, description: "content.flatlist.props.numColumns" },
    ],
    gotchas: [
        "content.flatlist.gotchas.gotcha1",
        "content.flatlist.gotchas.gotcha2",
        "content.flatlist.gotchas.gotcha3",
        "content.flatlist.gotchas.gotcha4",
    ],
    codeSnippet:
`<FlatList
    data={items}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <Pressable onPress={() => setSelected(item.id)}>
            <Text>{item.title}</Text>
        </Pressable>
    )}
    extraData={selected}
    getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })}
/>`,
};
