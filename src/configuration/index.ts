import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageConstsKeys, AsyncStorageConstsType} from '../consts/async-storage-consts';

export const getConfiguration = async (key: keyof AsyncStorageConstsType): Promise<string | null> =>
  await AsyncStorage.getItem(AsyncStorageConstsKeys[key]);

export const getConfigurationSync = (key: keyof AsyncStorageConstsType): string | null => {
  let value: string | null = null;
  getConfiguration(key).then(val => {
    value = val;
  });
  return value;
};

export const setConfiguration = async (key: keyof AsyncStorageConstsType, value: string) => {
  await AsyncStorage.setItem(AsyncStorageConstsKeys[key], value);
};
