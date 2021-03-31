import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RPiSettingsScreen} from '../screens/rpi-settings-screen';
import {ViewDoorbellScreen} from '../screens/view-doorbell-screen';
import {NavigationConsts} from '../consts/navigation-consts';
import {HomeScreen} from '../screens/home';
import {MainStackHeader} from './main-stack-header';
import {AppRoutes} from './routes';

const Stack = createStackNavigator();

export const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.home.name}
      headerMode="screen"
      screenOptions={{header: props => <MainStackHeader {...props} />}}>
      <Stack.Screen name={AppRoutes.home.displayName} component={HomeScreen} />
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
  );
};
