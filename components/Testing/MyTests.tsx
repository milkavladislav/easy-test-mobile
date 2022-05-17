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
import { useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";

export const MyTests = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <Box flex={1} alignItems="center">
      <Stack space={4} mt={10} alignItems="center">
        <Button
          leftIcon={<Icon as={MaterialIcons} name="add" size="sm" />}
          shadow={2}
          bgColor={theme.colors.blue[500]}
          onPress={() => {
            console.log("Create test");
          }}
        >
          New test
        </Button>
        <Button
          width="lg"
          style={{}}
          shadow={2}
          bgColor={theme.colors.blueGray["100"]}
          onPress={() => {
            console.log("Create test");
          }}
        >
          <HStack justifyContent="space-between" width="xs">
            <Text>Math</Text>
            <Text color={theme.colors.blue[500]}>2022-05-15 17:56:22</Text>
          </HStack>
        </Button>
      </Stack>
    </Box>
  );
};
