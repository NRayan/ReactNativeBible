import { useModalStore } from "@stores/modal";
import { LanguagePicker } from "../components/LanguagePicker";
import { t } from "i18next";
import { BackHandler } from "react-native";

export function useSettings()
{
    const { open } = useModalStore();

    function handleLanguagePress()
    {
        open(<LanguagePicker />);
    }

    function handleCloseApp()
    {
        BackHandler.exitApp();
    }

    return {
        strings: {
            title: t("settings.title"),
            preferences: t("settings.preferences"),
            darkTheme: t("settings.darkTheme"),
            language: t("settings.language"),
            rateTheApp: t("settings.rateTheApp"),
            about: t("settings.about"),
            close: t("common.close"),
        },
        handleLanguagePress,
        handleCloseApp,
    };
}