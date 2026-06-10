import { sections } from "@content/learn";
import type { LearnStackParamList } from "@navigation/LearnNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export function useLearnScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<LearnStackParamList>>();

    const translatedSections = sections.map(section => ({
        ...section,
        title: t(section.title),
    }));

    function handleTopicPress(sectionId: string, topicIndex: number) {
        const section = sections.find(s => s.id === sectionId)!;
        navigation.navigate("Topic", { section, topicIndex });
    }

    const strings = {
        title: t("learn.title"),
    };

    return { sections: translatedSections, strings, handleTopicPress };
}