import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';

export const RPiSettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [rPiIPAddress, setRPiIPAddress] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      async function getCurrentRPiIPAddress() {
        const ip = await AsyncStorage.getItem('@rpi_address');
        setRPiIPAddress(ip || '');
      }
      getCurrentRPiIPAddress();
    }, []),
  );

  const saveSettings = async () => {
    if (rPiIPAddress) {
      await AsyncStorage.setItem('@rpi_address', rPiIPAddress);
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
