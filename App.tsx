import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { StorageManager, ColorMode, View } from "native-base";
import {
  NativeBaseProvider,
  Text,
  Box,
  theme,
  Icon,
  HStack,
  VStack,
  Pressable,
  Image,
  Center,
  Button,
  Input,
} from "native-base";
import { SSRProvider } from "@react-aria/ssr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIPath, StorageKey } from "./utils/storage-keys";
import { Entypo } from "@native-base/icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "./components/Auth/Auth";
import { getData } from "./utils/async-storage-functions";
import React, { useEffect, useRef, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { setCurrentUser } from "./redux/actions/authActions";
import Main from "./components/Main";
import { axiosGet } from "./utils/axios-functions";

export default () => {
  const [loading, setLoading] = useState(true);
  // axiosGet(
  //   APIPath.user,
  //   (error) => {
  //     console.log(error)
  //   },
  //   (data) => {
  //     console.log("data: ")
  //     console.log(data);
  //   }
  // )

  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem(StorageKey.colorMode);
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem(StorageKey.colorMode, value || "light");
      } catch (e) {
        console.log(e);
      }
    },
  };

  return (
    <SSRProvider>
      <Provider store={store}>
        <NativeBaseProvider colorModeManager={colorModeManager}>
         <Main/>
        </NativeBaseProvider>
      </Provider>
    </SSRProvider>
  );
};

{
  /* <SafeAreaProvider>
        <SafeAreaView>
        </SafeAreaView>
      </SafeAreaProvider> */
}
