import {
  Text,
  Box,
  Icon,
  Stack,
  Button,
  Image,
  Pressable,
  AlertDialog,
  IconButton,
  Input,
  theme,
  VStack,
  ScrollView,
  Heading,
  Center,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";
import { connectToTest } from "../../redux/actions/testActions";
import { getAboutTest, getResult } from "../../redux/actions/resultActions";

export const Result = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    store.dispatch(getResult());
    return () => {};
  }, []);

  const { results, testsAbout } = useSelector((app: any) => {
    return app.result;
  });
  console.log("testsAbout");
  console.log(testsAbout);

  return (
    <Box flex={1} alignItems="center">
      <ScrollView>
        <Center mt={2}>
          <Heading size="lg">Results</Heading>
        </Center>
        <VStack space={3} my={5}>
          {results.map(
            (result: {
              activate_id: number;
              rating: number | null;
              completion_time: string;
            }, index: number) => (
              <Box
              key={index}
                backgroundColor={theme.colors.blueGray[200]}
                borderRadius={10}
                width="xs"
                py={2}
                px={5}
              >
                <HStack space={3} justifyContent={"space-between"}>
                  <Text fontSize="md" fontWeight={"bold"}>
                    {testsAbout &&
                      testsAbout.find(
                        (test: { id: number }) => test.id === result.activate_id
                      )?.title}
                  </Text>
                  <Box backgroundColor={theme.colors.cyan[100]} px={5}>
                    <Text fontSize="md" fontWeight={"bold"}>
                      {result.rating}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
