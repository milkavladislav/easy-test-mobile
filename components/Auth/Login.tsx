import {
  Text,
  Box,
  theme,
  Icon,
  Stack,
  Checkbox,
  Button,
  Input,
  Pressable,
} from "native-base";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ErrorAlert } from "../ErrorAlert";
import { RestorePasswordModal } from "./RestorePasswordModal";
import { axiosPost } from "../../utils/axios-functions";
import { APIPath, StorageKey } from "../../utils/storage-keys";
import { storeData } from "../../utils/async-storage-functions";

import { connect, useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";

export const Login = () => {

  const {isAuthenticated, user} = useSelector((app: any)=> app.auth);
  console.log("user:");
  console.log(user);


  //const dispatch = useDispatch();

  const [passShow, setPassShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);

  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

  const [emailModalVisible, setEmailModalVisible] = useState(false);

  // const loginUser = () => {
  //   axiosPost(
  //     APIPath.auth,
  //     (text) => console.log("Error: " + text),
  //     (value) => storeData(StorageKey.token, value.remember_token),
  //     {
  //       email: email,
  //       password: password,
  //     }
  //   );
  // };

  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Box rounded="md" width="90%" height="50%" maxWidth="100%">
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
          {isError && (
            <ErrorAlert
              errorMessage={textError}
              onClose={() => setIsError(false)}
            />
          )}
          {/* <Checkbox
            onChange={(isSelected: boolean) => setIsRemember(isSelected)}
            shadow={2}
            value="remember"
            isChecked={isRemember}
            accessibilityLabel="This is a dummy checkbox"
            defaultIsChecked
          >
            <Text ml="3" color={theme.colors.muted[400]}>
              Remember
            </Text>
          </Checkbox> */}
          <Button
            leftIcon={<Icon as={MaterialIcons} name="people" size="sm" />}
            shadow={2}
            bgColor={theme.colors.blue[500]}
            onPress={() => {
              store.dispatch(loginUser(email, password));
            }}
          >
            Login
          </Button>
          {/* <Pressable onPress={() => setEmailModalVisible(true)}>
            <Text underline>Forgot password</Text>
          </Pressable>
          <RestorePasswordModal
            isOpen={emailModalVisible}
            onClose={() => {
              setEmailModalVisible(false);
            }}
          /> */}
        </Stack>
      </Box>
    </Box>
  );
};