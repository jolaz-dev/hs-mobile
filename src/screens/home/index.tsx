import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import LocalizationContext from '../../i18n/context';
import {AppRoutes} from '../../navigation/routes';
import {getGlobalStyle} from '../../style';
import {HomeButton} from './home-button';

export function HomeScreen() {
  const {t} = useContext(LocalizationContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={globalStyle.container}>
      <View>
        <View style={styles.iconsContainer}>
          <HomeButton iconName="camera-front-variant" buttonText={t('ViewDoorbell')} />
          <HomeButton iconName="gate" buttonText={t('MainGate')} />
        </View>
        <View style={styles.iconsContainer}>
          <HomeButton
            iconName="cog"
            buttonText={t('Settings')}
            onPress={() => navigation.navigate(AppRoutes.settings.name)}
          />
        </View>
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
});
