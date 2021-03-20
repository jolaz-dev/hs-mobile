import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigator} from './src/navigation/main-navigator';

export function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
