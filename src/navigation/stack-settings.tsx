import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackHeader} from './stack-header';
import {AppRoutes} from './routes';
import {SettingsScreen} from '../screens/settings';

const Stack = createStackNavigator();

export const SettingsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.settings.name}
      headerMode="screen"
      screenOptions={{header: props => <MainStackHeader {...props} />}}>
      <Stack.Screen
        name={AppRoutes.settings.name}
        component={SettingsScreen}
        options={{headerTitle: AppRoutes.settings.displayName}}
      />
    </Stack.Navigator>
  );
};
