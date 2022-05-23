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
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";
import { deleteMyTest } from "../../redux/actions/testActions";
import { getAboutTest, getResult } from "../../redux/actions/resultActions";

export const TestInformation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  const { myCurrentTest, myCurrentTestQuestions } = useSelector((app: any) => {
    return app.test;
  });

  const toast = useToast();

  console.log(myCurrentTest);

  return (
    <Box flex={1} alignItems="center" mx={2}>
      <ScrollView>
        <Box
          mt={2}
          w="xs"
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
              {myCurrentTest.title}
            </Heading>
            <Divider my="2" bg={"gray.300"} />
            <Heading size="sm" textAlign={"center"}>
              {myCurrentTest.description}
            </Heading>
          </Center>
        </Box>
        <VStack space={3} my={5}>
          {myCurrentTestQuestions.map(
            (question: { question: string; json_answers: []; id: number }) => (
              <Box
                width="xs"
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
                      <Text my={1}>{answer.text}</Text>
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
            leftIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
            bg="danger.600"
            onPress={() => setIsOpen(!isOpen)}
          >
            Delete test
          </Button>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.Body>Delete Test? </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      store.dispatch(
                        deleteMyTest(myCurrentTest.id, () => {
                          toast.show({
                            description: "Test was deleted success",
                          });
                          onClose();
                        })
                      );
                    }}
                  >
                    Delete
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </VStack>
      </ScrollView>
    </Box>
  );
};
