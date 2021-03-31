import React from 'react';
import {NavigationConsts} from '../consts/navigation-consts';
import {SettingsScreen} from '../screens/settings';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackNavigator} from './main-stack';

const Drawer = createDrawerNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName={NavigationConsts.MAIN}>
      <Drawer.Screen name={NavigationConsts.MAIN} component={MainStackNavigator} />
      <Drawer.Screen
        name={NavigationConsts.SETTINGS}
        component={SettingsScreen}
        options={{title: NavigationConsts.SETTINGS}}
      />
    </Drawer.Navigator>
  );
};
