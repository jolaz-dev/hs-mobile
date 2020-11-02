import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ViewDoorbellScreen} from './src/screens/view-doorbell-screen';
import {RPiSettingsScreen} from './src/screens/rpi-settings-screen';

const Stack = createStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ViewDoorbell" component={ViewDoorbellScreen} />
        <Stack.Screen name="RPiSettings" component={RPiSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
