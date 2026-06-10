import { s } from "@theme/spacing";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStore } from "@stores/theme";
import { Icon } from "@components";
import { LearnNavigator } from "./LearnNavigator";
import { ComponentsNavigator } from "./ComponentsNavigator";
import { SettingsScreen } from "@features/settings/screens/SettingsScreen";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

function makeTabIcon(name: Parameters<typeof Icon>[0]["name"]) {
    return function TabIcon({ focused }: { focused: boolean }) {
        return <Icon name={name} size={20} color={focused ? "accent" : "text-disabled"} />;
    };
}

const LearnIcon = makeTabIcon("IconBook2");
const ComponentsIcon = makeTabIcon("IconLayoutGrid");
const SettingsIcon = makeTabIcon("IconSettings");

export function Navigation() {
    const { theme: { colors, size, typography } } = useThemeStore();
    const { bottom } = useSafeAreaInsets();
    const { t } = useTranslation();

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: colors.background,
                        borderTopWidth: size["border-width"],
                        borderTopColor: colors.border,
                        height: bottom + s(18),
                    },
                    tabBarItemStyle: { paddingTop: s(1) },
                    tabBarActiveTintColor: colors.accent,
                    tabBarInactiveTintColor: colors["text-disabled"],
                    tabBarLabelStyle: {
                        fontSize: typography["tab-label"].fontSize,
                        fontWeight: typography["tab-label"].fontWeight,
                    },
                }}
            >
                <Tab.Screen
                    name="learn"
                    component={LearnNavigator}
                    options={{ tabBarLabel: t("learn.title"), tabBarIcon: LearnIcon }}
                />
                <Tab.Screen
                    name="components"
                    component={ComponentsNavigator}
                    options={{ tabBarLabel: t("components.title"), tabBarIcon: ComponentsIcon }}
                />
                <Tab.Screen
                    name="settings"
                    component={SettingsScreen}
                    options={{ tabBarLabel: t("settings.title"), tabBarIcon: SettingsIcon }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
