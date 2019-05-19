import { AsyncStorage } from "react-native";

export const asyncStorageKeys = {
    EMAIL: "EMAIL"
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
};
