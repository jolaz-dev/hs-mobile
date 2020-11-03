import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react"
import { AsyncStorageConsts, AsyncStorageConstsType } from "../consts/async-storage-consts";

interface Config {
    rPi: {
        rPiIPAddress: string | null;
    }
}

const getDefaultConfig = () : Config => {
    return {
        rPi: {
            rPiIPAddress: null
        }
    }
}

export const useConfig = (autoFill = true) : [Config | null, () => Promise<void>, (key: keyof AsyncStorageConstsType, value: string) => Promise<void>] => {
    const [configs, setConfigs] = useState<Config | null>(null);

    useFocusEffect(
        useCallback(() => {
            if (autoFill)
                fillConfigs();
        }, [])
    );

    const fillConfigs = async () => {
        const newConfig = getDefaultConfig();

        newConfig.rPi.rPiIPAddress  = await AsyncStorage.getItem(
            AsyncStorageConsts.RPI_ADDRESS,
          );
          setConfigs(newConfig);
    }

    const setConfig = async (key: keyof AsyncStorageConstsType, value: string) => {
        switch (key) {
            case 'RPI_ADDRESS':
                await AsyncStorage.setItem(AsyncStorageConsts.RPI_ADDRESS, value);
                break;
        
            default:
                break;
        }
        await fillConfigs();
    }

    return [configs, fillConfigs, setConfig];
}