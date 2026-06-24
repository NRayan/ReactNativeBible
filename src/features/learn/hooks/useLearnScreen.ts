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
        displayTitle: t(section.title),
    }));

    function handleTopicPress(section: (typeof translatedSections)[number], topicIndex: number) {
        navigation.navigate("Topic", { section, topicIndex });
    }

    function handleSectionQuizPress(section: (typeof translatedSections)[number]) {
        navigation.navigate("Quiz", { section });
    }

    const strings = {
        title: t("learn.title"),
    };

    return { sections: translatedSections, strings, handleTopicPress, handleSectionQuizPress };
}