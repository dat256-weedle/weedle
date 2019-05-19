import { AsyncStorage } from "react-native";

const EMAIL = "EMAIL";

export const asyncStorageKeys = {
    EMAIL
};

export const getObjectFromAsyncStorage = (key: string) => {
    return AsyncStorage.getItem(key)
        .then(item => {
            if (item) {
                return JSON.parse(item);
            } else {
                Promise.reject(Error("Empty result"));
            }
        })
        .catch(error => console.log(error));
};

export const setObjectInAsyncStorage = (key: string, value: any) => {
    const valueString = JSON.stringify(value);
    AsyncStorage.setItem(key, valueString);
    AsyncStorage.getAllKeys()
        .then((keys: string[]) => {
            return AsyncStorage.multiGet(keys);
        })
        .then(result => {
            return console.log(
                "ASYNCSTORAGE   " + result.map(r => JSON.parse(r[1]))
            );
        });
};
