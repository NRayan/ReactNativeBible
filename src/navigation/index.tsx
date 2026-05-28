import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LearnScreen } from "../features/learn/screens/LearnScreen";
import { ComponentsScreen } from "../features/components/screens/ComponentsScreen";
import { SettingsScreen } from "../features/settings/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Learn" component={LearnScreen} />
                <Tab.Screen name="Components" component={ComponentsScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
