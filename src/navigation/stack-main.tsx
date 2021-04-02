import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ViewDoorbellScreen} from '../screens/view-doorbell-screen';
import {NavigationConsts} from '../consts/navigation-consts';
import {HomeScreen} from '../screens/home';
import {MainStackHeader} from './stack-header';
import {AppRoutes} from './routes';
import {t} from '../i18n';

const Stack = createStackNavigator();

export const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoutes.home.name}
      headerMode="screen"
      screenOptions={{header: props => <MainStackHeader {...props} />}}>
      <Stack.Screen
        name={AppRoutes.home.name}
        component={HomeScreen}
        options={{headerTitle: 'JoLAZ - Home Security'}}
      />
      <Stack.Screen
        name={NavigationConsts.VIEW_DOORBELL}
        component={ViewDoorbellScreen}
        options={{headerTitle: t('Doorbell')}}
      />
    </Stack.Navigator>
  );
};
