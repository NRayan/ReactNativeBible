import { ComponentDetailScreen } from '@features/components/screens/ComponentDetailScreen';
import { ComponentsScreen } from '@features/components/screens/ComponentsScreen';
import type { RNComponent } from '@features/components/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type ComponentsStackParamList = {
  ComponentsList: undefined;
  ComponentDetail: { component: RNComponent };
};

const Stack = createNativeStackNavigator<ComponentsStackParamList>();

export function ComponentsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ComponentsList" component={ComponentsScreen} />
      <Stack.Screen name="ComponentDetail" component={ComponentDetailScreen} />
    </Stack.Navigator>
  );
}
