import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {AppColors} from './colors';
import {isDarkModeSelected} from './is-dark-mode-selected';

export const getGlobalStyle = () => {
  return ScaledSheet.create({
    container: {
      backgroundColor: isDarkModeSelected() ? AppColors.SpaceCadet : AppColors.Manatee,
      flexGrow: 1,
    },
  });
};
