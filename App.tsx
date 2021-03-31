import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {MainNavigator} from './src/navigation';
import {CallingScreen} from './src/components/calling';
import {navigationRef} from './src/navigation/root-navigation';
import RNCallKeep from 'react-native-callkeep';
import {StatusBar} from 'react-native';
import {AppColors} from './src/style/colors';
import {isDarkModeSelected} from './src/style/is-dark-mode-selected';

export function App() {
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      RNCallKeep.displayIncomingCall(remoteMessage.messageId || '', '5694', 'Portão', 'generic');
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <CallingScreen />
      <StatusBar
        animated={true}
        backgroundColor={isDarkModeSelected() ? AppColors.Manatee : AppColors.SpaceCadet}
      />
      <MainNavigator />
    </NavigationContainer>
  );
}
