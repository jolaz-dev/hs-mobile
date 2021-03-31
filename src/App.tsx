import React, {useCallback, useEffect} from 'react';
import {StatusBar} from 'react-native';
import i18n from 'i18n-js';
import messaging from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';
import {NavigationContainer} from '@react-navigation/native';
import {CallingScreen} from './components/calling';
import {MainNavigator} from './navigation';
import {navigationRef} from './navigation/root-navigation';
import {AppColors} from './style/colors';
import {isDarkModeSelected} from './style/is-dark-mode-selected';
import * as appi18n from './i18n';
import {LanguageCodesType, LanguageTokens} from './i18n/types';
import LocalizationContext from './i18n/context';

export function App() {
  const [locale, setLocale] = React.useState(appi18n.setI18nConfig());

  const localizationContext = React.useMemo(
    () => ({
      t: (token: keyof LanguageTokens, options?: i18n.TranslateOptions) =>
        appi18n.t(token, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );

  const handleLocalizationChange = useCallback(
    (newLocale?: keyof LanguageCodesType) => {
      const newSetLocale = appi18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  useEffect(() => {
    handleLocalizationChange();
  }, []);

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
      <StatusBar
        animated={true}
        backgroundColor={isDarkModeSelected() ? AppColors.Manatee : AppColors.SpaceCadet}
      />
      <LocalizationContext.Provider value={localizationContext}>
        <MainNavigator />
      </LocalizationContext.Provider>
    </NavigationContainer>
  );
}
