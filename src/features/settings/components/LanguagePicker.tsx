import React from "react";
import { Box, Button, Icon, PressableBox, Separator, Text } from "@components";
import { s } from "@theme/spacing";

const languages = [
    { code: "en", label: "English" },
    { code: "pt", label: "Português" },
    { code: "es", label: "Español" },
];

type LanguagePickerProps = {
    selected: string;
    onSelect: (code: string)=> void;
};

export function LanguagePicker({ selected, onSelect }: LanguagePickerProps) {

    return (
        <Box w={"90%"} maxW={500} bgColor="surface" p={4} rounded="default">
            <Box mb={4}>
                <Text variant="heading">Language</Text>
                <Text variant="caption">Select your preferred language</Text>                
            </Box>

            <Separator style={{ marginHorizontal: -s(4), width: "auto", alignSelf: "stretch" }}/>

            <Box>
                {
                    languages.map((lang) => (
                        <Box key={lang.code}>
                            <PressableBox
                                row align="center" justify="space-between" h={s(14)}
                                onPress={() => onSelect(lang.code)}
                            >
                                <Text variant="body" color="text-primary">{lang.label}</Text>
                                {selected === lang.code && <Icon name="IconCheck" size={16} color="accent" /> }
                            </PressableBox>
                        </Box>
                    ))
                }
            </Box>

            <Separator style={{ marginHorizontal: -s(4), width: "auto", alignSelf: "stretch" }}/>

            <Box mt={4}>
                <Button variant="outline" title="Cancelar" onPress={()=>null}/>
            </Box>
        </Box>
    );
}
