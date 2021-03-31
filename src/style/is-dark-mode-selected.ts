import {Appearance} from 'react-native';

export const isDarkModeSelected = (): boolean => {
  const theme = Appearance.getColorScheme();
  return theme === 'dark';
};
