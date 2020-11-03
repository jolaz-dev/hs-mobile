import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RPiSettingsScreen} from '../screens/rpi-settings-screen';
import {ViewDoorbellScreen} from '../screens/view-doorbell-screen';
import {Header} from '../components/Header';
import {NavigationConsts} from '../consts/navigation-consts';

const Stack = createStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{header: (props) => <Header {...props} />}}>
        <Stack.Screen
          name={NavigationConsts.VIEW_DOORBELL}
          component={ViewDoorbellScreen}
          options={{title: 'Doorbell'}}
        />
        <Stack.Screen
          name="RPiSettings"
          component={RPiSettingsScreen}
          options={{title: NavigationConsts.RPI_SETTINGS}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
