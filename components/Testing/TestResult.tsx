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
  Divider,
  Radio,
  Checkbox,
  Progress,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";
import { closeResult, connectToTest } from "../../redux/actions/testActions";
import { getAboutTest, getResult } from "../../redux/actions/resultActions";

export const TestResult = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [code, setCode] = useState("");

  const { testResult, currentTestAbout, currentTestQuestions, testPassing } =
    useSelector((app: any) => {
      console.log(app)
      return app.test;
    });
  const { user } = useSelector((app: any) => {
    return app.auth;
  });

  return (
    <Box flex={1} alignItems="center" mx={2}>
      <ScrollView>
        <Box
          mt={2}
          py={"3"}
          px={"10"}
          bg={"gray.100"}
          shadow={"3"}
          borderRadius={"md"}
          borderColor={"gray.400"}
          borderWidth="1"
        >
          <Center>
            <Heading size="md" textAlign={"center"}>
              {testResult.activate_testing.title}
            </Heading>
            <Divider my="2" bg={"gray.300"} />
            <HStack space={"2xl"} my={1} alignItems={"center"}>
              <Image
                size={30}
                borderRadius={100}
                source={{
                  uri: user.avatar,
                }}
                alt="Avatar"
              />
              <Heading size="sm">{user.name}</Heading>
            </HStack>
            <Divider my="2" bg={"gray.300"} />
            <Heading size="md" textAlign={"center"} color="gray.400">
              {testResult.rating}/{currentTestAbout.max_rating} point
            </Heading>
            <Progress
              mt="3"
              size="lg"
              mb={4}
              value={(testResult.rating / currentTestAbout.max_rating) * 100}
              w="full"
            />
            <Heading size="md" textAlign={"center"} color="gray.500">
              {(testResult.rating / currentTestAbout.max_rating) * 100}%
            </Heading>
          </Center>
        </Box>
        <VStack space={3} my={5}>
          {currentTestQuestions.map(
            (question: { question: string; json_answers: []; id: number }) => (
              <Box
                width="sm"
                key={question.id}
                backgroundColor={theme.colors.blue["100"]}
                padding={2}
                borderRadius={10}
                alignItems="flex-start"
              >
                <Heading size="sm">{question.question}</Heading>
                {}
                {question.json_answers.map(
                  (
                    answer: { text: string; checked: boolean },
                    index: number
                  ) => (
                    <HStack space={2} key={question.id + " " + index}>
                      <Text
                        my={1}
                        bg={
                          testResult.json_answers.find(
                            (q: { id: number }) => q.id === question.id
                          ).answers[index].checked && answer.checked
                            ? "green.500"
                            : testResult.json_answers.find(
                                (q: { id: number }) => q.id === question.id
                              ).answers[index].checked
                            ? "red.500"
                            : null
                        }
                      >
                        {answer.text}
                      </Text>
                      {answer.checked && (
                        <Icon as={MaterialIcons} name="done" size="sm"></Icon>
                      )}
                    </HStack>
                  )
                )}
              </Box>
            )
          )}
          <Button
            onPress={() => {
              store.dispatch(
                closeResult()
              )
            }}
          >
            Close
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};
