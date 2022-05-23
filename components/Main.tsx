import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Text,
  useDisclose,
  Box,
  Stagger,
  HStack,
  IconButton,
  Icon,
  Heading,
  Center,
} from "native-base";
import { useSelector } from "react-redux";
import { Auth } from "./Auth/Auth";
import { APIPath, StorageKey } from "../utils/storage-keys";
import { getData } from "../utils/async-storage-functions";
import { store } from "../redux/store";
import {
  getAboutUser,
  logoutUser,
  setCurrentUser,
} from "../redux/actions/authActions";
import { axiosGet } from "../utils/axios-functions";
import { Profile } from "./Profile/Profile";
import { Result } from "./Result/Result";
import { MainTesting } from "./Testing/MainTesting";
import { MenuItems } from "../utils/enums";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CLEAR_ALL } from "../redux/types";

export default () => {
  const [loading, setLoading] = useState(true);

  const { isOpen, onToggle } = useDisclose();
  const [stage, setStage] = useState(MenuItems.profile);

  const checkIsAuth = () => {
    let resultValue: string | object | null = null;
    getData(StorageKey.user).then((user) => {
      resultValue = user && JSON.parse(user);
      console.log("checkIsAuth - user:" + user);
      if (user !== null) {
        store.dispatch(setCurrentUser(resultValue));
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    checkIsAuth();
    store.dispatch(getAboutUser());
    return () => {};
  }, []);

  const { isAuthenticated, user } = useSelector((app: any) => app.auth);

  return (
    <SafeAreaProvider>
      {loading ? (
        <Text>Loading</Text>
      ) : isAuthenticated ? (
        <>
          <Box maxH="0.5" maxW={10} alignItems="center">
            <Stagger
              zIndex={10}
              visible={isOpen}
              initial={{
                opacity: 0,
                scale: 0,
                translateX: 0,
                translateY: 0,
              }}
              animate={{
                translateX: 15,
                translateY: 110,
                transition: {
                  type: "spring",
                  mass: 0.8,
                  duration: 5000,
                  stagger: {
                    offset: 50,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateX: 10,
                translateY: 50,
                scale: 0.5,
                opacity: 0,
                transition: {
                  duration: 500,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
            >
              <IconButton
                zIndex={10}
                mb="4"
                variant="solid"
                bg="indigo.500"
                colorScheme="indigo"
                borderRadius="full"
                onPress={() => {
                  setStage(MenuItems.profile);
                  onToggle();
                }}
                icon={
                  <Icon
                    as={MaterialIcons}
                    size="6"
                    name="person"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="yellow.400"
                colorScheme="yellow"
                borderRadius="full"
                onPress={() => {
                  setStage(MenuItems.test);
                  store.dispatch({
                    type: CLEAR_ALL,
                  });
                  onToggle();
                }}
                icon={
                  <Icon
                    as={MaterialIcons}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="6"
                    name="done"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg="teal.400"
                colorScheme="teal"
                borderRadius="full"
                onPress={() => {
                  setStage(MenuItems.result);
                  onToggle();
                }}
                icon={
                  <Icon
                    as={MaterialIcons}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="6"
                    name="analytics"
                    color="warmGray.50"
                  />
                }
              />
            </Stagger>
          </Box>
          <HStack style={{ top: 0, backgroundColor: "#C2F1F4" }} pt={8} pb={2}>
            <IconButton
              left={3}
              zIndex={10}
              variant="solid"
              borderRadius="full"
              size="lg"
              onPress={onToggle}
              bg="cyan.400"
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  size="6"
                  name="dots-horizontal"
                  color="warmGray.50"
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
              }
            />
            <Heading ml="20" size="2xl">
              EasyTest
            </Heading>
          </HStack>
          {stage === MenuItems.profile ? (
            <Profile />
          ) : stage === MenuItems.test ? (
            <MainTesting />
          ) : stage === MenuItems.result ? (
            <Result goToTest={() => setStage(MenuItems.test)} />
          ) : (
            <Box />
          )}
        </>
      ) : (
        <Auth />
      )}
    </SafeAreaProvider>
  );
};
