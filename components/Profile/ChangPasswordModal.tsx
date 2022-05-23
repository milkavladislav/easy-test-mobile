import React, { useEffect, useState } from "react";
import {
  theme,
  Icon,
  Button,
  Input,
  Modal,
  FormControl,
  Stack,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { ErrorAlert } from "../ErrorAlert";
import { store } from "../../redux/store";
import { changeName, changePassword } from "../../redux/actions/authActions";

export interface ChangeNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ChangeNameModalProps) => {

  const toast = useToast();
  const [oldPassShow, setOldPassShow] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [confPassShow, setConfPassShow] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");


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
        <Modal.Header>Change name</Modal.Header>
        <Modal.Body>
          Enter your old password and new password
          <FormControl mt={6}>
            <Stack space={4} w="100%" alignItems="center">
              <Input
                onChangeText={(text: string) => setOldPassword(text)}
                value={oldPassword}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                variant="rounded"
                type={oldPassShow ? "text" : "password"}
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
                        name={oldPassShow ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                    onPress={() => setOldPassShow(!oldPassShow)}
                  />
                }
                placeholder="Old password"
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
                placeholder="New password"
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
                placeholder="New password confirm"
              />
            </Stack>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button
            leftIcon={<Icon as={MaterialIcons} name="save" size="sm" />}
            shadow={2}
            bgColor={theme.colors.blue[500]}
            flex="1"
            onPress={() => {
              store.dispatch(
                changePassword(oldPassword, password, onSuccess, (error: string) =>
                  toast.show({
                    description: error,
                    bg: 'danger.500'
                  })
                )
              );
              onClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
