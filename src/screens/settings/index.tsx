import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import {Form} from '../../components/form';
import {getConfigurationSync, setConfiguration} from '../../configuration';
import {NavigationConsts} from '../../consts/navigation-consts';
import {t} from '../../i18n';
import {getGlobalStyle} from '../../style';
import {validateContent, validateLength} from './validation';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const saveSettings = async (rPiIPAdress: string) => {
    await setConfiguration('RPI_ADDRESS', rPiIPAdress);
    navigation.navigate(NavigationConsts.VIEW_DOORBELL);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Form
        action={saveSettings}
        fields={{
          rPiIPAddress: {
            label: t('RPiIPAddress'),
            // validators: [validateContent, validateLength],
          },
        }}
        initialValues={{rPiIPAddress: getConfigurationSync('RPI_ADDRESS') || ''}}
        buttonText={t('Save')}
      />
    </SafeAreaView>
  );
};

const globalStyles = getGlobalStyle();
