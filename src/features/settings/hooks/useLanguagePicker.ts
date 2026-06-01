import { t } from "i18next";
import { useLanguageStore } from "@stores/language";
import { useModalStore } from "@stores/modal";
import type { Language } from "@stores/language/types";

export function useLanguagePicker() {
    const { language, setLanguage } = useLanguageStore();
    const { close } = useModalStore();

    function handleSelectLanguage(lang: Language) {
        setLanguage(lang);
        close();
    }

    return {
        language,
        handleSelectLanguage,
        close,
        strings: {
            pt: t("languages.pt"),
            es: t("languages.es"),
            en: t("languages.en"),
            title: t("settings.language"),
            subtitle: t("settings.selectLanguage"),
            close: t("common.close"),
        },
    };
}
