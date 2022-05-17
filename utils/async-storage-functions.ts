import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string | object) => {
  try {
    let item: string;
    if (typeof value === "object") {
      item = JSON.stringify(value);
    } else {
      item = value;
    }
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  console.log("getData")
  let resultValue: string | object | null = null;
    try {
      const value = await AsyncStorage.getItem(key)
      if (typeof value === "object") {
        resultValue =  value && JSON.parse(value);
      } else {
        resultValue =  value;
      }
    } catch (e) {
      console.log(e);
    }
    return resultValue; 
};

export const clearData = async (key: string) => {

    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e);
    }
};
