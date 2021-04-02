import React from 'react';
import {NavigationConsts} from '../consts/navigation-consts';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MainStackNavigator} from './stack-main';
import {isDarkModeSelected} from '../style/is-dark-mode-selected';
import {AppColors} from '../style/colors';
import {SettingsStackNavigator} from './stack-settings';
import {t} from '../i18n';

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
      <Drawer.Screen
        name={NavigationConsts.MAIN}
        component={MainStackNavigator}
        options={{drawerLabel: t('Main')}}
      />
      <Drawer.Screen
        name={NavigationConsts.SETTINGS}
        component={SettingsStackNavigator}
        options={{drawerLabel: t('Settings')}}
      />
    </Drawer.Navigator>
  );
};
