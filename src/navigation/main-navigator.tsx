import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RPiSettingsScreen} from '../screens/rpi-settings-screen';
import {ViewDoorbellScreen} from '../screens/view-doorbell-screen';
import {Header} from '../components/Header';

const Stack = createStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: (props) => <Header {...props} />}}>
        <Stack.Screen
          name="ViewDoorbell"
          component={ViewDoorbellScreen}
          options={{title: 'Doorbell'}}
        />
        <Stack.Screen
          name="RPiSettings"
          component={RPiSettingsScreen}
          options={{title: 'RPi Settings'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
