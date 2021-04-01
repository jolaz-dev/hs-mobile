import React, {useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import LocalizationContext from '../../i18n/context';
import {getGlobalStyle} from '../../style';
import {HomeButton} from './home-button';

export function HomeScreen() {
  const {t} = useContext(LocalizationContext);

  return (
    <SafeAreaView style={globalStyle.container}>
      <View>
        <View style={styles.iconsContainer}>
          <HomeButton iconName="camera-front-variant" buttonText={t('ViewDoorBell')} />
          <HomeButton iconName="gate" buttonText={t('MainGate')} />
        </View>
        <View style={styles.iconsContainer}>
          <HomeButton iconName="cog" buttonText={t('Settings')} />
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
