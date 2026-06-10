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
                        language: "jsx",
                        value: "import { View, StyleSheet } from 'react-native';\n\nexport function CenteredLayout() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.box} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  box: {\n    width: 80,\n    height: 80,\n    backgroundColor: '#67e8f9',\n  },\n});",
                    },
                    { type: "heading", value: "content.flexbox_basics.body.heading2" },
                    { type: "text", value: "content.flexbox_basics.body.text3" },
                ],
            },
            {
                id: "positioning",
                icon: "IconStack2",
                title: "content.positioning.title",
                subtitle: "content.positioning.subtitle",
                body: [
                    { type: "heading", value: "content.positioning.body.heading1" },
                    { type: "text", value: "content.positioning.body.text1" },
                    { type: "text", value: "content.positioning.body.text2" },
                    {
                        type: "code",
                        language: "jsx",
                        value: "import { View, StyleSheet } from 'react-native';\n\nexport function OverlayExample() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.base} />\n      <View style={styles.badge} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    width: 80,\n    height: 80,\n  },\n  base: {\n    width: 80,\n    height: 80,\n    backgroundColor: '#083344',\n  },\n  badge: {\n    position: 'absolute',\n    bottom: 0,\n    right: 0,\n    width: 20,\n    height: 20,\n    backgroundColor: '#67e8f9',\n    zIndex: 1,\n  },\n});",
                    },
                ],
            },
        ],
    },
];
