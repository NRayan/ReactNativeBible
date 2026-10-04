import { useModalStore } from "@stores/modal";
import { LanguagePicker } from "../components/LanguagePicker";
import { t } from "i18next";
import { BackHandler, Linking, Platform } from "react-native";
import { getVersion } from "react-native-device-info";

const GITHUB_URL = "https://github.com/NRayan/ReactNativeBible";

const STORE_URL = Platform.select({
    ios: undefined,
    android: "https://play.google.com/store/apps/details?id=com.reactnativebible",
});

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

    function handleRateApp()
    {
        if (STORE_URL) Linking.openURL(STORE_URL);
    }

    return {
        storeUrl: STORE_URL,
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
        handleRateApp,
    };
}