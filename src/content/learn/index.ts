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
                        value: "import { View, StyleSheet } from \"react-native\";\n\nexport function CenteredLayout() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.box} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: \"center\",\n    alignItems: \"center\",\n  },\n  box: {\n    width: 80,\n    height: 80,\n    backgroundColor: \"#67e8f9\",\n  },\n});",
                    },
                    { type: "heading", value: "content.flexbox_basics.body.heading2" },
                    { type: "text", value: "content.flexbox_basics.body.text3" },
                ],
            },
            {
                id: "position_absolute",
                icon: "IconStack2",
                title: "content.position_absolute.title",
                subtitle: "content.position_absolute.subtitle",
                body: [
                    { type: "heading", value: "content.position_absolute.body.heading1" },
                    { type: "text", value: "content.position_absolute.body.text1" },
                    { type: "text", value: "content.position_absolute.body.text2" },
                    { type: "heading", value: "content.position_absolute.body.heading2" },
                    { type: "text", value: "content.position_absolute.body.text3" },
                    {
                        type: "code",
                        language: "typescript",
                        value: "import { View } from \"react-native\";\n\nexport function BadgeExample() {\n  return (\n    <View style={{ width: 48, height: 48 }}>\n      <View\n        style={{ flex: 1, backgroundColor: \"#6366f1\", borderRadius: 8 }}\n      />\n      <View\n        style={{\n          position: \"absolute\",\n          top: -4,\n          right: -4,\n          width: 16,\n          height: 16,\n          borderRadius: 8,\n          backgroundColor: \"#ef4444\",\n        }}\n      />\n    </View>\n  );\n}",
                    },
                    { type: "heading", value: "content.position_absolute.body.heading3" },
                    { type: "text", value: "content.position_absolute.body.text4" },
                ],
            },
            {
                id: "dimensions",
                icon: "IconRuler",
                title: "content.dimensions.title",
                subtitle: "content.dimensions.subtitle",
                body: [
                    { type: "heading", value: "content.dimensions.body.heading1" },
                    { type: "text", value: "content.dimensions.body.text1" },
                    { type: "heading", value: "content.dimensions.body.heading2" },
                    { type: "text", value: "content.dimensions.body.text2" },
                    {
                        type: "code",
                        language: "typescript",
                        value: "import { Dimensions } from \"react-native\";\n\nconst { width, height } = Dimensions.get(\"window\");",
                    },
                    { type: "heading", value: "content.dimensions.body.heading3" },
                    { type: "text", value: "content.dimensions.body.text3" },
                    {
                        type: "code",
                        language: "typescript",
                        value: "import { useWindowDimensions, View } from \"react-native\";\n\nexport function ResponsiveLayout() {\n  const { width, height } = useWindowDimensions();\n  const isLandscape = width > height;\n\n  return (\n    <View\n      style={{\n        flex: 1,\n        flexDirection: isLandscape ? \"row\" : \"column\",\n      }}\n    />\n  );\n}",
                    },
                ],
            },
        ],
    },
];
