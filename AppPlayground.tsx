import { Badge, Box, Button, Chip, CodeBlock, Icon, IconTile, PressableBox, SearchInput } from "@components";
import { LanguagePicker } from "@features/settings/components/LanguagePicker";
import { useModalStore } from "@stores/modal";
import { useThemeStore } from "@stores/theme";
import { size } from "@theme";
import { Image, ScrollView } from "react-native";

const imgAdress = "data:image/png;base64,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";

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

            <Box position="absolute" left={0} top={0} flex={1} align="center" fullHeight fullWidth bgColor="accent" >
                <Image source={{ uri: imgAdress }} style={{ height: 100, width: 100 }}/>

                {/* <Text>No SafeArea</Text>  */}
            </Box>
        </>   
    );
}
