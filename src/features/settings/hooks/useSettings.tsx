import { useModalStore } from "@stores/modal";
import { LanguagePicker } from "../components/LanguagePicker";

export function useSettings()
{
    const { open } = useModalStore();

    function handleLanguagePress()
    {
        open(<LanguagePicker />);
    }

    return {
        handleLanguagePress
    };
}