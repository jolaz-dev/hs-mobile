import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {MainNavigator} from './src/navigation/main-navigator';
import {CallingScreen} from './src/components/calling';
import {navigationRef} from './src/navigation/root-navigation';
import RNCallKeep from 'react-native-callkeep';

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
      <MainNavigator />
    </NavigationContainer>
  );
}
