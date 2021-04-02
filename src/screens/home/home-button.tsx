import React from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColors} from '../../style/colors';
import {isDarkModeSelected} from '../../style/is-dark-mode-selected';

interface Props {
  iconName: string;
  buttonText: string;
  onPress?: (ev: GestureResponderEvent) => void;
}

export function HomeButton({iconName, buttonText, onPress}: Props) {
  return (
    <TouchableOpacity style={styles.iconBox} onPress={onPress}>
      <Icon name={iconName} style={styles.icon} />
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  iconBox: {
    alignItems: 'center',
    margin: '10@ms',
    borderWidth: 1,
    borderColor: AppColors.Gunmetal,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    backgroundColor: isDarkModeSelected() ? AppColors.Manatee : AppColors.Gunmetal,
  },
  icon: {
    fontSize: '70@ms',
    margin: '15@ms',
    color: '#fff',
  },
  buttonText: {
    marginBottom: '4@ms',
    color: '#fff',
  },
});
