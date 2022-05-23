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
  Input,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";
import { connectToTest } from "../../redux/actions/testActions";


export const Connect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [code, setCode] = useState("");

  const toast = useToast();

  return (
    <Box flex={1} alignItems="center" justifyContent="space-around">
      <Stack space={4} mt={10} alignItems="center">
        <Input
          onChangeText={(text: string) => setCode(text)}
          value={code}
          w={{
            base: "80%",
            md: "25%",
          }}
          variant="rounded"
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Access code"
        />
        <Button
          rightIcon={<Icon as={MaterialIcons} name="flag" size="sm" />}
          shadow={2}
          bgColor={theme.colors.blue[500]}
          onPress={() => {
            console.log("Start " + code);
            store.dispatch(connectToTest(code, (error: string) =>
            toast.show({
              description: error,
            })));
          }}
        >
          Start
        </Button>
      </Stack>
    </Box>
  );
};
