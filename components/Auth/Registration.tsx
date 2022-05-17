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
  Toast
} from "native-base";
import axios from "axios";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../ErrorAlert";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath } from "../../utils/storage-keys";

export const Registration = () => {
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

  const registerUser = () => {
    axiosPost(
      APIPath.registration,
      (error) => {
        setIsError(true);
        setTextError(error);
        console.log("error")
        console.log(error);
        // getUrlCaptcha(true);
      },
      (text) =>{
        console.log(text);
      },
      {
        email: email,
        name: name,
        password: password,
      },
    );
  };

  // const getUrlCaptcha = (isMounted: boolean) => {
  //   axios
  //     .get(APIPath.root + APIPath.refreshCaptcha)
  //     .then((res) => {
  //       console.log(res.data.captcha);
  //       if (isMounted) setCaptcha(res.data.captcha);
  //     })
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    let isMounted = true;
    //getUrlCaptcha(isMounted);
    return () => {
      isMounted = false;
    };
  }, []);

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
      {/* <Stack direction={"row"}>
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
          onPress={() => getUrlCaptcha(true)}
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
        w={{
          base: "80%",
          md: "25%",
        }}
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
      /> */}
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
        onPress={() => registerUser()}
      >
        Register
      </Button>
    </Stack>
  );
};
