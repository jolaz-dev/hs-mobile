import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {useConfig} from '../config/use-config';

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
      navigation.navigate('ViewDoorbell');
    }
  };

  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <View>
        <Input
          label="RPi IP address"
          placeholder="x.x.x.x"
          value={rPiIPAddress}
          onChangeText={setRPiIPAddress}
        />
        <Button title="Save settings" onPress={saveSettings} />
      </View>
    </SafeAreaView>
  );
};
