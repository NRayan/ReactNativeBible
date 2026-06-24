import type { Section } from "@features/learn/types";

export const sections: Section[] = [
    {
        id: "layout",
        icon: "IconAdCircleOff",
        title: "content.sections.layout",
        topics: [
            {
                id: "flexbox_basics",
                icon: "IconLayoutGrid",
                title: "content.flexbox_basics.title",
                subtitle: "content.flexbox_basics.subtitle",
                body: [
                    { type: "heading", value: "content.flexbox_basics.body.heading1" },
                    { type: "text", value: "content.flexbox_basics.body.text1" },
                    { type: "text", value: "content.flexbox_basics.body.text2" },
                    {
                        type: "code",
                        language: "typescript",
                        value: "import { View, StyleSheet } from 'react-native';\n\nexport function CenteredLayout() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.box} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  box: {\n    width: 80,\n    height: 80,\n    backgroundColor: '#67e8f9',\n  },\n});",
                    },
                    { type: "image", imagePath: require("./assets/old-architecture.png"), caption: "content.flexbox_basics.body.image1" },
                    { type: "heading", value: "content.flexbox_basics.body.heading2" },
                    { type: "text", value: "content.flexbox_basics.body.text3" },
                ],
            },
        ],
    },
];
