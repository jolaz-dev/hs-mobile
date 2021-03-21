import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {MainNavigator} from './src/navigation/main-navigator';
import {Alert} from 'react-native';

export function App() {
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        console.log('token', token);
      });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
