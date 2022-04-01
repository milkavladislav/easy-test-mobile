import React, { useEffect, useState } from "react";
import {
  Text,
  Box,
  theme,
  Icon,
  Stack,
  Checkbox,
  Button,
  Input,
  Modal,
  IconButton,
  FormControl,
} from "native-base";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { ErrorAlert } from "../ErrorAlert";

export interface RestorePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestorePasswordModal = ({
  isOpen,
  onClose,
}: RestorePasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState(" ");
  const [captchaText, setCaptchaText] = useState("");

  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

  const restorePassword = () => {
    axios
      .post("http://easy-test.asyx.ru/app/restore", {
        email: email,
        captcha: captchaText,
      })
      .then((res) => {
        const data = res.data;
        const isError = "error" in data;
        console.log(data);

        if (isError) {
          setIsError(true);
          setTextError(data.error);
        } else {
          onClose();
        }
      })
      .catch((err) => console.log("Error: " + err));
  };

  const getUrlCaptcha = () => {
    axios
      .get("http://easy-test.asyx.ru/refresh-captcha")
      .then((res) => {
        setCaptcha(res.data.captcha);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUrlCaptcha();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      avoidKeyboard
      justifyContent="center"
      m="1"
      bottom="4"
      size="lg"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Forgot Password?</Modal.Header>
        <Modal.Body>
          Enter email address and we'll send a link to reset your password.
          <FormControl mt="3">
            <Input
              onChangeText={(text: string) => setEmail(text)}
              value={email}
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
            <Stack mt={"2"} justifyContent={"space-evenly"} direction={"row"}>
              <Image
                source={{
                  uri: captcha,
                }}
                style={{
                  resizeMode: "cover",
                  height: 55,
                  width: 200,
                }}
              />
              <IconButton
                icon={<Icon as={MaterialIcons} name="rotate-right" />}
                borderRadius="full"
                onPress={getUrlCaptcha}
                _pressed={{
                  bg: theme.colors.blue[300],
                }}
                _icon={{
                  color: theme.colors.blue[500],
                  size: "xl",
                }}
              />
            </Stack>
            <Input
              onChangeText={(text: string) => setCaptchaText(text)}
              value={captchaText}
              variant="rounded"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="edit" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Captcha"
            />
            {isError && (
              <ErrorAlert
                errorMessage={textError}
                onClose={() => setIsError(false)}
              />
            )}
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button
            leftIcon={<Icon as={MaterialIcons} name="email" size="sm" />}
            shadow={2}
            bgColor={theme.colors.blue[500]}
            flex="1"
            onPress={restorePassword}
          >
            Send email
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
