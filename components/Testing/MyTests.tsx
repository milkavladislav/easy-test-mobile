import {
  Text,
  Box,
  theme,
  Icon,
  Stack,
  Button,
  Image,
  Pressable,
  AlertDialog,
  IconButton,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { Linking } from "react-native";
import { getMyTest, getMyTests } from "../../redux/actions/testActions";

export const MyTests = () => {
  useEffect(() => {
    store.dispatch(getMyTests());
    return () => {};
  }, []);

  const { myTests } = useSelector((app: any) => {
    return app.test;
  });

  // console.log(myTests);
  

  return (
    <Box flex={1} alignItems="center">
      <Stack space={4} mt={10} alignItems="center">
        {myTests?.map(
          (test: { title: string; id: number; description: string }) => (
            <Button
              width="full"
              shadow={2}
              key={test.id}
              bgColor={theme.colors.blueGray["100"]}
              onPress={() => {
                store.dispatch(getMyTest(test))
              }}
            >
                <Text textAlign={'left'} w="xs">{test.title}</Text>
                <Text color={theme.colors.blue[500]}>{test.description}</Text>
            </Button>
          )
        )}
      </Stack>
    </Box>
  );
};
