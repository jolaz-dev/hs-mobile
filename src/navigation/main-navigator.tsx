import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RPiSettingsScreen} from '../screens/rpi-settings-screen';
import {ViewDoorbellScreen} from '../screens/view-doorbell-screen';
import {NavigationConsts} from '../consts/navigation-consts';

const Stack = createStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={NavigationConsts.VIEW_DOORBELL}>
        <Stack.Screen
          name={NavigationConsts.VIEW_DOORBELL}
          component={ViewDoorbellScreen}
          options={{title: 'Doorbell'}}
        />
        <Stack.Screen
          name={NavigationConsts.RPI_SETTINGS}
          component={RPiSettingsScreen}
          options={{title: NavigationConsts.RPI_SETTINGS}}
        />
      </Stack.Navigator>
    </>
  );
};
