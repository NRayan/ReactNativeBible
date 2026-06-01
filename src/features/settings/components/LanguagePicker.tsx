import React from "react";
import { Box, Button, Icon, PressableBox, Separator, Text } from "@components";
import { s } from "@theme/spacing";
import { languages } from "@stores/language/types";
import { useLanguagePicker } from "../hooks/useLanguagePicker";

export function LanguagePicker() {

    const { language, handleSelectLanguage, close, strings } = useLanguagePicker();

    return (
        <Box w={"90%"} maxW={500} bgColor="surface" p={4} rounded="default">
            <Box mb={4}>
                <Text variant="heading">{strings.title}</Text>
                <Text variant="caption">{strings.subtitle}</Text>
            </Box>

            <Separator style={{ marginHorizontal: -s(4), width: "auto", alignSelf: "stretch" }}/>

            <Box>
                {
                    languages.map((lang) => 
                    {
                        const selected = lang.code === language.code;

                        return (
                            <Box key={lang.code}>
                                <PressableBox
                                    row align="center" justify="space-between" h={s(14)} gap={3}
                                    onPress={() => handleSelectLanguage(lang)}
                                >
                                    <Text variant="body" color="text-primary">{lang.flag}</Text>
                                    <Box flex={1}>
                                        <Text variant="body" color="text-primary">{strings[lang.code]}</Text>
                                        <Text variant="caption" color="text-muted">{lang.nativeLabel}</Text>
                                    </Box>
                                    {selected && <Icon name="IconCheck" size={16} color="accent" /> }
                                </PressableBox>
                            </Box>
                        );
                    }
                    )
                }
            </Box>

            <Separator style={{ marginHorizontal: -s(4), width: "auto", alignSelf: "stretch" }}/>

            <Box mt={4}>
                <Button variant="outline" title={strings.close} onPress={close}/>
            </Box>
        </Box>
    );
}
