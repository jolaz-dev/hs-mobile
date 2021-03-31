import React from 'react';
import {NavigationConsts} from '../consts/navigation-consts';
import {SettingsScreen} from '../screens/settings';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackNavigator} from './main-stack';
import {isDarkModeSelected} from '../style/is-dark-mode-selected';
import {AppColors} from '../style/colors';

const Drawer = createDrawerNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName={NavigationConsts.MAIN}
      drawerStyle={{
        backgroundColor: isDarkModeSelected() ? AppColors.SpaceCadet : AppColors.Manatee,
      }}
      drawerContentOptions={{
        activeBackgroundColor: isDarkModeSelected() ? AppColors.Manatee : AppColors.AliceBlue,
        activeTintColor: isDarkModeSelected() ? AppColors.AliceBlue : AppColors.Gunmetal,
        inactiveTintColor: isDarkModeSelected() ? AppColors.Manatee : AppColors.Gunmetal,
      }}>
      <Drawer.Screen name={NavigationConsts.MAIN} component={MainStackNavigator} />
      <Drawer.Screen
        name={NavigationConsts.SETTINGS}
        component={SettingsScreen}
        options={{title: NavigationConsts.SETTINGS}}
      />
    </Drawer.Navigator>
  );
};
