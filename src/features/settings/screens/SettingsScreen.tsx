import { Badge, Box, Icon, IconTile, PressableBox, Separator, Text, Toolbar } from "@components";
import { STACK_LIBS } from "@content/settings/stack";
import { useLanguageStore } from "@stores/language";
import { useThemeStore } from "@stores/theme";
import { s } from "@theme/spacing";
import { ScrollView, Switch } from "react-native";
import { useSettings } from "../hooks/useSettings";

type SettingsRowProps = { 
    children: React.ReactNode;
    onPress?: ()=> void;
    small?: boolean;
}

export function SettingsRow({ children, onPress, small }: SettingsRowProps) {
    return (
        <PressableBox row align="center" px={4} h={s(small ? 12 : 16)} onPress={onPress}>
            {children}
        </PressableBox>
    );
}

export function SettingsScreen() {
    const { toggleTheme, mode, theme: { colors } } = useThemeStore();
    const { language } = useLanguageStore();
    const { handleLanguagePress, handleCloseApp, handleGithubPress, strings, appVersion } = useSettings();

    return (
        <Box flex={1} bgColor="background">
            <Toolbar title={strings.title} subtitle="React Native Bible"/>
            <ScrollView contentContainerStyle={{ padding: s(4), gap: s(6) }}>

                <Box gap={2}>
                    <Text variant="section-label">{strings.preferences}</Text>
                    <Box bgColor="surface" fullWidth rounded="large" border>
                        <SettingsRow onPress={toggleTheme}>
                            <Box row align="center" gap={2} flex={1}>
                                <IconTile icon="IconMoon" bgColor="background"/>
                                <Text>{strings.darkTheme}</Text>
                            </Box>
                            <Switch value={mode === "dark"} thumbColor={mode === "dark" ? colors.accent : colors["text-muted"]} trackColor={{ false: colors["text-disabled"], true: colors["text-disabled"] }} onValueChange={toggleTheme}/>
                        </SettingsRow>
                        <Separator />
                        <SettingsRow onPress={handleLanguagePress}>
                            <Box row align="center" gap={2} flex={1}>
                                <IconTile icon="IconLanguage" bgColor="background"/>
                                <Text>{strings.language}</Text>
                            </Box>
                            <Box row align="center" gap={2}>
                                <Text variant="caption" color="text-muted">{language.nativeLabel}</Text>
                                <Icon name="IconChevronRight" size={16} color="text-disabled"/>
                            </Box>
                        </SettingsRow>
                    </Box>
                </Box>

                <Box gap={2}>
                    <Text variant="section-label">App</Text>
                    <Box bgColor="surface" fullWidth rounded="large" border>
                        <SettingsRow onPress={()=>null}>
                            <Box row align="center" gap={2} flex={1}>
                                <IconTile icon="IconStar" bgColor="background"/>
                                <Text>{strings.rateTheApp}</Text>
                            </Box>
                            <Icon name="IconChevronRight" size={16} color="text-disabled"/>
                        </SettingsRow>
                        <Separator />
                        <SettingsRow onPress={handleCloseApp}>
                            <Box row align="center" gap={2} flex={1}>
                                <IconTile icon="IconX" bgColor="background" color="danger"/>
                                <Text color="danger">{strings.close}</Text>
                            </Box>
                        </SettingsRow>
                    </Box>
                </Box>

                <Box gap={2}>
                    <Text variant="section-label">Stack</Text>
                    <Box bgColor="surface" fullWidth rounded="large" border>
                        {STACK_LIBS.map((item, index) => (
                            <Box key={item.lib}>
                                <SettingsRow small>
                                    <Text flex={1}>{item.lib}</Text>
                                    <Badge title={item.version}/>
                                </SettingsRow>
                                {index < STACK_LIBS.length - 1 && <Separator/>}
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box gap={2}>
                    <Text variant="section-label">{strings.about}</Text>
                    <Box bgColor="surface" fullWidth rounded="large" border>
                        <SettingsRow>
                            <Text flex={1}>React Native Bible</Text>
                            <Badge title={appVersion}/>
                        </SettingsRow>
                        <Separator/>
                        <SettingsRow onPress={handleGithubPress}>
                            <Box row align="center" gap={2} flex={1}>
                                <IconTile icon="IconBrandGithub" bgColor="background"/>
                                <Text>GitHub</Text>
                            </Box>
                            <Icon name="IconChevronRight" size={16} color="text-disabled"/>
                        </SettingsRow>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
}