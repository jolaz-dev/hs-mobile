import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {useColorScheme} from 'react-native';
import {MainNavigator} from './src/navigation/main-navigator';

export function App() {
  let colorScheme = useColorScheme();

  return (
    <ThemeProvider useDark={colorScheme === 'dark'}>
      <MainNavigator />
    </ThemeProvider>
  );
}
