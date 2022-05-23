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
  Heading,
  useClipboard,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { Linking, Share } from "react-native";
import {
  deleteActivate,
  getMyTests,
  showAllActivatesByTest,
} from "../../redux/actions/testActions";
import { APIPath } from "../../utils/storage-keys";

export const ActiveTests = () => {
  const { onCopy } = useClipboard();
  const toast = useToast();

  const { myCurrentTestActivates, myCurrentTest } = useSelector((app: any) => {
    return app.test;
  });
  console.log(myCurrentTestActivates);

  useEffect(() => {
    store.dispatch(showAllActivatesByTest(myCurrentTest.id));
    return () => {};
  }, []);

  return (
    <Box flex={1} alignItems="center">
      <Stack space={4} mt={10} alignItems="center">
        {myCurrentTestActivates?.map(
          (
            activate: { title: string; id: number; access_code: string },
            index: number
          ) => (
            <Button.Group
              isAttached
              key={index}
              colorScheme="blue"
              mx={{
                base: "auto",
                md: 0,
              }}
              size="sm"
              shadow={7}
            >
              <Button
                width="2xs"
                bgColor={theme.colors.lightBlue["100"]}
                onLongPress={() => {
                  onCopy(
                    APIPath.root.slice(0, -4) +
                      APIPath.testingLink +
                      activate.access_code
                  );
                  toast.show({
                    description: "Link was copied to clipboard",
                  });
                }}
                pl={20}
              >
                <Heading textAlign={"left"} size={"md"} w="xs">
                  {activate.title}
                </Heading>
                <Text color={theme.colors.blue[500]}>{activate.access_code}</Text>
              </Button>
              <Button
                bg="blue.300"
                leftIcon={<Icon as={MaterialIcons} name="share" size="sm" />}
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message:
                        APIPath.root.slice(0, -4) +
                        APIPath.testingLink +
                        activate.access_code,
                    });
                    if (result.action === Share.sharedAction) {
                      if (result.activityType) {
                      }
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              ></Button>
              <Button
                bg="danger.600"
                leftIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
                onPress={() => {
                  store.dispatch(
                    deleteActivate(activate.id, myCurrentTest.id,() => {
                      toast.show({
                        description: "Activate testing has been deleted",
                      });
                    })
                  );
                }}
              ></Button>
            </Button.Group>
          )
        )}
      </Stack>
    </Box>
  );
};
