import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Button, SafeAreaView, Text, TextInput, View} from 'react-native';

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
        <Text>RPi IP address</Text>
        <TextInput value={rPiIPAddress} onChangeText={setRPiIPAddress} />
        <Button title="Save settings" onPress={saveSettings} />
      </View>
    </SafeAreaView>
  );
};
