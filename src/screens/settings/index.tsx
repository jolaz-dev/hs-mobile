import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';
import {getConfigurationSync, setConfiguration} from '../../configuration';
import {NavigationConsts} from '../../consts/navigation-consts';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [rPiIPAddress, setRPiIPAddress] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      let address = getConfigurationSync('RPI_ADDRESS');
      setRPiIPAddress(address || '');
    }, []),
  );

  const saveSettings = async () => {
    if (rPiIPAddress) {
      await setConfiguration('RPI_ADDRESS', rPiIPAddress);
      navigation.navigate(NavigationConsts.VIEW_DOORBELL);
    }
  };

  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <View>
        <Text>RPi IP address</Text>
        <TextInput placeholder="x.x.x.x" value={rPiIPAddress} onChangeText={setRPiIPAddress} />
        <Button title="Save settings" onPress={saveSettings} />
      </View>
    </SafeAreaView>
  );
};
