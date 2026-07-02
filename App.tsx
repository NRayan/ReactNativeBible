import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppPlayground } from "./AppPlayground";
import { DEV_CONFIG } from "./config";
import { Navigation } from "@navigation";
import { Modal } from "@components";
import { useLanguageStore } from "@stores/language";
import { useThemeStore } from "@stores/theme";
import i18n from "./src/i18n";
import { useEffect } from "react";

export function App() {
    const { mode } = useThemeStore();

    useEffect(() => {
        const unsub = useLanguageStore.persist.onFinishHydration((state) => {
            i18n.changeLanguage(state.language.code);
            unsub();
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />
                {
                    DEV_CONFIG.playground ? 
                        <AppPlayground /> 
                        : 
                        <Navigation />
                }
                <Modal/>
            </SafeAreaProvider>
        </View>
    );
}
