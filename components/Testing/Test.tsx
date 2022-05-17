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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";

export const Test = () => {
  const { currentTestAbout, currentTestQuestions } = useSelector((app: any) => {
    //console.log(app);
    return app.test;
  });
  //console.log(currentTestQuestions.length);

  return (
    <Box flex={1} alignItems="center">
      <ScrollView>
        <Center mt={2}>
          <Heading size="lg">{currentTestAbout.title}</Heading>
          <Text fontSize="md">{currentTestAbout.description}</Text>
        </Center>
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
                <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  //value={value}
                  onChange={(nextValue) => {
                    // setValue(nextValue);
                  }}
                >
                  {question.json_answers.map(
                    (answer: { text: string; checked: boolean }, index: number) => (
                      <Radio key={question.id + " " + index} value="one" my={1}>
                        {answer.text}
                      </Radio>
                    )
                  )}
                </Radio.Group>
              </Box>
            )
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
