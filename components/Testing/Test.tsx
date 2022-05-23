import {
  Text,
  Box,
  theme,
  Icon,
  VStack,
  Button,
  Image,
  Pressable,
  AlertDialog,
  IconButton,
  Input,
  Heading,
  Center,
  Radio,
  ScrollView,
  Checkbox,
  HStack,
  useToast,
  Skeleton,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";
import {
  completeTest,
  updateProgress,
  updateProgressLocal,
} from "../../redux/actions/testActions";
import { COMPLETE_TEST, SAVE_TEST } from "../../redux/types";

export const Test = () => {
  const {
    currentTestAbout,
    currentTestQuestions,
    testPassing,
    currentTestInformation,
    isLoading,
  } = useSelector((app: any) => {
    console.log(app.test);
    return app.test;
  });

  const toast = useToast();

  return (
    <Box flex={1} alignItems="center">
      <ScrollView>
        {isLoading ? (
          <VStack space={5} mt={2}>
            <Skeleton w={"sm"} rounded="full" />
            <Skeleton
              w={"sm"}
              h="40"
              rounded="md"
              startColor={theme.colors.blue["100"]}
            />
            <Skeleton
              w={"sm"}
              h="40"
              rounded="md"
              startColor={theme.colors.blue["100"]}
            />
            <Skeleton
              w={"sm"}
              h="40"
              rounded="md"
              startColor={theme.colors.blue["100"]}
            />
          </VStack>
        ) : (
          <Box>
            <Center mt={2}>
              <Heading size="lg" mx={1.5}>
                {currentTestAbout.title}
              </Heading>
              <Text fontSize="md">{currentTestAbout.description}</Text>
            </Center>
            <VStack space={3} my={5}>
              {currentTestQuestions.map(
                (question: {
                  question: string;
                  json_answers: [];
                  id: number;
                }) => (
                  <Box
                    width="sm"
                    key={question.id}
                    backgroundColor={theme.colors.blue["100"]}
                    padding={2}
                    borderRadius={10}
                    alignItems="flex-start"
                  >
                    <Heading size="sm">{question.question}</Heading>
                    {testPassing?.find(
                      (q: { id: number }) => q.id === question.id
                    ).oneAnswer ? (
                      <Radio.Group
                        name="myRadioGroup"
                        accessibilityLabel="favorite number"
                        value={
                          testPassing.find(
                            (q: {
                              answers: [];
                              id: number;
                              oneAnswer: boolean;
                            }) => question.id === q.id
                          )?.answers?.find((answer: { checked: boolean }) => 
                          answer.checked
                          )?.id.toString()
                        }
                        onChange={(nextValue) => {
                          console.log(nextValue, question.id);
                          store.dispatch(
                            updateProgressLocal(question.id, +nextValue)
                          );
                        }}
                      >{
                        // console.log(testPassing.find(
                        //   (q: {
                        //     answers: [];
                        //     id: number;
                        //     oneAnswer: boolean;
                        //   }) => question.id === q.id
                        // )?.answers?.find((answer: { checked: boolean }) => 
                        // answer.checked
                        // )?.id)
                      }
                        {question.json_answers.map(
                          (
                            answer: { text: string; checked: boolean },
                            index: number
                          ) => (
                            <Radio
                              key={question.id + " " + index}
                              value={index.toString()}
                              my={1}
                            >
                              {answer.text}
                            </Radio>
                          )
                        )}
                      </Radio.Group>
                    ) : (
                      question.json_answers.map(
                        (
                          answer: { text: string; checked: boolean },
                          index: number
                        ) => (
                          <Checkbox
                            onChange={(isSelected: boolean) => {
                              store.dispatch(
                                updateProgressLocal(question.id, index)
                              );
                            }}
                            isChecked={
                              testPassing.find(
                                (q: {
                                  answers: [];
                                  id: number;
                                  oneAnswer: boolean;
                                }) => question.id === q.id
                              )?.answers[index].checked
                            }
                            key={question.id + " " + index}
                            value={
                              testPassing[question.id - 1]?.answers[index]
                                .checked
                            }
                            my={1}
                          >
                            {answer.text}
                          </Checkbox>
                        )
                      )
                    )}
                  </Box>
                )
              )}
            </VStack>
            <HStack justifyContent="center" space={"2xl"} mb={4}>
              <Button
                leftIcon={<Icon as={MaterialIcons} name="save" size="sm" />}
                onPress={() =>
                  store.dispatch(
                    updateProgress(
                      testPassing,
                      currentTestInformation.id,
                      () => {
                        toast.show({
                          description: "Saved successfully",
                        }),
                          setTimeout(
                            () =>
                              store.dispatch({
                                type: SAVE_TEST,
                              }),
                            2000
                          );
                      }
                    )
                  )
                }
              >
                Save
              </Button>
              <Button
                leftIcon={<Icon as={MaterialIcons} name="done" size="sm" />}
                onPress={() =>
                  store.dispatch(
                    completeTest(testPassing, currentTestInformation.id)
                  )
                }
              >
                Submit
              </Button>
            </HStack>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};
