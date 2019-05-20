import { AsyncStorage } from "react-native";

/**
 * Defines what we can store in the AsyncStorage
 */
export const asyncStorageKeys = {
    EMAIL: "EMAIL",
    CARS: "CARS"
};

/**
 * Abstracted getter for AsyncStorage
 * @param key field from the object asyncStorageKeys
 */
export const getObjectFromAsyncStorage = (key: string) => {
    return AsyncStorage.getItem(key)
        .then(item => {
            if (item) {
                return JSON.parse(item);
            } else {
                return undefined;
            }
        })
        .catch(error => console.log(error));
};

/**
 * Abstracted setter for AsyncStorage
 * @param key is a field from the object asyncStorageKeys
 * @param value item to be stored under the key used
 */
export const setObjectInAsyncStorage = (key: string, value: any) => {
    const valueString = JSON.stringify(value);
    AsyncStorage.setItem(key, valueString);
};
