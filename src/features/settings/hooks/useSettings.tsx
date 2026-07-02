import { useModalStore } from "@stores/modal";
import { LanguagePicker } from "../components/LanguagePicker";
import { t } from "i18next";
import { BackHandler, Linking } from "react-native";
import { getVersion } from "react-native-device-info";

const GITHUB_URL = "https://github.com/NRayan/ReactNativeBible";

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

    function handleGithubPress()
    {
        Linking.openURL(GITHUB_URL);
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
        appVersion: getVersion(),
        handleLanguagePress,
        handleCloseApp,
        handleGithubPress,
    };
}