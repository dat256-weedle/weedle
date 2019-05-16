import { AsyncStorage } from "react-native"

const EMAIL = "EMAIL"

export const asyncStorageKeys = {
 EMAIL
}

export const getObjectFromAsyncStorage = (itemName: any) => {
 return AsyncStorage.getItem(itemName)
 .then(item => {
   if(item) { JSON.parse(item) }
   else {
     Promise.reject(Error("Empty result"))
   }}
 ).catch(error => console.log(error))
}

export const setObjectInAsyncStorage = (key: string, value: any) => {
 const valueString = JSON.stringify(value)
 AsyncStorage.setItem(key, valueString)
}