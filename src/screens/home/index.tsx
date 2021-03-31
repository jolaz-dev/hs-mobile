import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getGlobalStyle} from '../../style';
import {AppColors} from '../../style/colors';
import {isDarkModeSelected} from '../../style/is-dark-mode-selected';

export function HomeScreen() {
  const renderButton = (iconName: string, buttonText: string) => {
    return (
      <TouchableOpacity style={styles.iconBox}>
        <Icon name={iconName} style={styles.icon} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={globalStyle.container}>
      <View>
        <View style={styles.iconsContainer}>
          {renderButton('camera-front-variant', 'View doorbell')}
          {renderButton('gate', 'Main gate')}
        </View>
        <View style={styles.iconsContainer}>{renderButton('cog', 'Settings')}</View>
      </View>
    </SafeAreaView>
  );
}

const globalStyle = getGlobalStyle();
const styles = ScaledSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
