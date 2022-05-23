import {
  Text,
  Box,
  theme,
  Icon,
  Stack,
  Checkbox,
  Button,
  Input,
  IconButton,
  Pressable,
  KeyboardAvoidingView,
  Slide,
  Alert,
  Toast,
  useToast,
  Modal,
  Heading,
} from "native-base";
import axios from "axios";
import { Image, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../ErrorAlert";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";
import { store } from "../../redux/store";
import { registerUser } from "../../redux/actions/authActions";

export const Registration = () => {
  const toast = useToast();

  const [passShow, setPassShow] = useState(false);
  const [confPassShow, setConfPassShow] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const [captcha, setCaptcha] = useState(" ");
  const [captchaText, setCaptchaText] = useState("");

  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

  const [isOpenTop, setIsOpenTop] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack space={4} mt={10} w="100%" alignItems="center">
      <Input
        onChangeText={(text: string) => setEmail(text)}
        value={email}
        w={{
          base: "80%",
          md: "25%",
        }}
        variant="rounded"
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="email" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        placeholder="E-mail"
      />
      <Input
        onChangeText={(text: string) => setName(text)}
        value={name}
        w={{
          base: "80%",
          md: "25%",
        }}
        variant="rounded"
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="assignment-ind" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        placeholder="Name"
      />
      <Input
        onChangeText={(text: string) => setPassword(text)}
        value={password}
        w={{
          base: "80%",
          md: "25%",
        }}
        variant="rounded"
        type={passShow ? "text" : "password"}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="no-encryption" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        InputRightElement={
          <Icon
            as={
              <MaterialIcons
                name={passShow ? "visibility" : "visibility-off"}
              />
            }
            size={5}
            mr="2"
            color="muted.400"
            onPress={() => setPassShow(!passShow)}
          />
        }
        placeholder="Password"
      />
      <Input
        isInvalid={password !== confPassword && password !== ""}
        onChangeText={(text: string) => setConfPassword(text)}
        value={confPassword}
        w={{
          base: "80%",
          md: "25%",
        }}
        variant="rounded"
        type={confPassShow ? "text" : "password"}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="no-encryption" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        InputRightElement={
          <Icon
            as={
              <MaterialIcons
                name={confPassShow ? "visibility" : "visibility-off"}
              />
            }
            size={5}
            mr="2"
            color="muted.400"
            onPress={() => setConfPassShow(!confPassShow)}
          />
        }
        placeholder="Password confirm"
      />
      {isError ? (
        <ErrorAlert
          errorMessage={textError}
          onClose={() => setIsError(false)}
        />
      ) : (
        <Slide in={isOpenTop} duration={500} placement="top">
          <Alert justifyContent="center" status="error">
            <Alert.Icon />
            <Text color="error.600" fontWeight="medium">
              No Internet Connection
            </Text>
          </Alert>
        </Slide>
      )}

      <Button
        leftIcon={<Icon as={MaterialIcons} name="account-circle" size="sm" />}
        shadow={2}
        bgColor={theme.colors.blue[500]}
        onPress={() => {
          store.dispatch(
            registerUser(email, name, password, () => setIsOpen(true))
          );
        }}
      >
        Register
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content maxWidth="400px" p={2}>
          <Modal.CloseButton />
          <Heading size={"md"} pb={2}>
            Success
          </Heading>
          <Heading size={"sm"} pb={2}>
            Confirm your email, the message has been sent to your email:
          </Heading>
          <Heading size={"sm"} pb={2}>{email}</Heading>
          <Button
            width={"full"}
            onPress={() => {
              Linking.openURL("mailto:support@example.com");
            }}
          >
            Open mail app
          </Button>
        </Modal.Content>
      </Modal>
    </Stack>
  );
};
