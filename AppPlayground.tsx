import { Badge, Box, Button, Chip, CodeBlock, Icon, IconTile, PressableBox, SearchInput } from "@components";
import { LanguagePicker } from "@features/settings/components/LanguagePicker";
import { useModalStore } from "@stores/modal";
import { useThemeStore } from "@stores/theme";
import { size } from "@theme";
import { ScrollView } from "react-native";

const code = `import { useState } from 'react';
import { View, Pressable } from 'react-native';

type CounterProps = {
  initialValue?: number;
};

export function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <View>
      <Pressable onPress={() => setCount(c => c + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
}`;

export function AppPlayground() {

    const { setMode, mode } = useThemeStore();
    const { open } = useModalStore();
    
    function openModal()
    {
        open(<LanguagePicker />);
    }

    return (
        <>
            <Box flex={1} align='center' justify='center' bgColor='background' gap={6} py={8}>
                <ScrollView style={{ flex: 1, width: "100%" }} contentContainerStyle={{ gap: 40, padding: 20, alignItems: "flex-start" }}>

                    <Badge title="teste"/>
                    <IconTile icon="IconSunset2"/>
                    <IconTile letter="a"/>
                    <Button variant="primary" title="teste" onPress={()=>null}/>
                    <Button variant="outline" title="teste" onPress={()=>null}/>
                    <Button variant="icon" icon="IconBolt" onPress={()=>null}/>
                    <Button variant="icon-cta" icon="IconBolt" onPress={()=>null}/>
                    <Chip icon="IconMoon2" title="Under the hood"/>
                    <Chip icon="IconMoon2" title="Under the hood" subtitle="6/6"/>
                    <SearchInput value="" placeholder="search..." onValueChange={()=>null}/>

                    <CodeBlock code={code}/>

                    <Button onPress={openModal}/>

                </ScrollView>

            </Box>

            <PressableBox 
                onPress={()=>setMode(mode === "dark" ? "light" : "dark")}
                position='absolute' right={5} top={12} 
                justify="center" align="center"
                h={size["touch-target-min"]} w={size["touch-target-min"]} 
                rounded='default' bgColor='accent'>
                <Icon name={mode === "dark" ? "IconSun" : "IconMoon"} color="accent-foreground"/>
            </PressableBox>
        </>   
    );
}
