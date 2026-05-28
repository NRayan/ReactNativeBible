import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppPlayground } from "./AppPlayground";
import { DEV_CONFIG } from "./config";
import { Navigation } from "@navigation";

export function App() {

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar barStyle="dark-content" />
                {
                    DEV_CONFIG.playground ? 
                        <AppPlayground /> 
                        : 
                        <Navigation />
                }
            </SafeAreaProvider>
        </View>
    );
}
