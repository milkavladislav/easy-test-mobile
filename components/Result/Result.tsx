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
  useToast,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { store } from "../../redux/store";

import { getResult } from "../../redux/actions/resultActions";
import { continueTest } from "../../redux/actions/testActions";

export const Result = (props: {goToTest: () => void}) => {
  const toast = useToast();

  useEffect(() => {
    store.dispatch(getResult());
    return () => {};
  }, []);

  const { results, testsAbout, activityIdTestId } = useSelector((app: any) => {
    return app.result;
  });
  // console.log(results);
  // console.log("testsAbout");
  // console.log(testsAbout);
  // console.log("activityIdTestId");
  // console.log(activityIdTestId);

  return (
    <Box flex={1} alignItems="center">
      <ScrollView>
        <Center mt={2}>
          <Heading size="lg">Results</Heading>
        </Center>
        <VStack space={3} my={5}>
          {results.map(
            (
              result: {
                activate_id: number;
                rating: number | null;
                completion_time: string | null;
                id: number
              }
            ) => (
              <Box
                key={result.id}
                backgroundColor={theme.colors.blueGray[200]}
                borderRadius={10}
                width="xs"
                py={2}
                px={5}
              >
                <HStack space={3} justifyContent={"space-between"}>
                  <VStack space={1}>
                    <Text fontSize="md" fontWeight={"bold"}>
                      {activityIdTestId &&
                        testsAbout &&
                        testsAbout.find(
                          (test: { id: number }) =>
                            test.id ===
                            activityIdTestId.find(
                              (test: { activityId: number }) =>
                                test.activityId === result.activate_id
                            )?.testId
                        )?.title}
                    </Text>
                    {
                      result.completion_time !== null && <Text>{result.completion_time}</Text>
                    }
                    
                  </VStack>
                  {
                    result.rating !== null ? <Box
                    backgroundColor={theme.colors.cyan[100]}
                    px={5}
                    justifyContent={"center"}
                  >
                    <Text fontSize="xl" fontWeight={"bold"}>
                      {result.rating}
                    </Text>
                  </Box> : <Button
                  backgroundColor={theme.colors.cyan[300]}
                  onPress={() => {
                    toast.show({
                      title: "Loading...",
                      description: "Please wait",
                      duration: 1000
                    })
                    store.dispatch(continueTest(result.id))
                    setTimeout(() => {
                      props.goToTest()
                    }, 500)
                  }}
                  >
                    Continue
                  </Button>
                  }
                </HStack>
              </Box>
            )
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
