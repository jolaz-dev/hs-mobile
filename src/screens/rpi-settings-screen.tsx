import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import {useConfig} from '../config/use-config';
import {NavigationConsts} from '../consts/navigation-consts';

export const RPiSettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [rPiIPAddress, setRPiIPAddress] = useState<string>('');
  const [config, _, setConfig] = useConfig();

  useFocusEffect(
    useCallback(() => {
      if (!config) return;
      setRPiIPAddress(config.rPi.rPiIPAddress || '');
    }, [config]),
  );

  const saveSettings = async () => {
    if (rPiIPAddress) {
      await setConfig('RPI_ADDRESS', rPiIPAddress);
      navigation.navigate(NavigationConsts.VIEW_DOORBELL);
    }
  };

  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <View>
        <Text>RPi IP address</Text>
        <TextInput
          placeholder="x.x.x.x"
          value={rPiIPAddress}
          onChangeText={setRPiIPAddress}
        />
        <Button title="Save settings" onPress={saveSettings} />
      </View>
    </SafeAreaView>
  );
};
