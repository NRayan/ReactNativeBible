import { s } from "@theme/spacing";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStore } from "@stores/theme";
import { Icon } from "@components";
import { LearnScreen } from "@features/learn/screens/LearnScreen";
import { ComponentsScreen } from "@features/components/screens/ComponentsScreen";
import { SettingsScreen } from "@features/settings/screens/SettingsScreen";

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
                    name="Learn"
                    component={LearnScreen}
                    options={{ tabBarIcon: LearnIcon }}
                />
                <Tab.Screen
                    name="Components"
                    component={ComponentsScreen}
                    options={{ tabBarIcon: ComponentsIcon }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ tabBarIcon: SettingsIcon }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
