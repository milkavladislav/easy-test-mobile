import React, { useEffect, useState } from "react";
import {
  theme,
  Icon,
  Button,
  Input,
  Modal,
  FormControl,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { ErrorAlert } from "../ErrorAlert";

export interface ChangeNameModalProps {
  isOpen: boolean;
  oldName: string;
  onClose: () => void;
}

export const ChangeNameModal = ({
  isOpen,
  oldName,
  onClose,
}: ChangeNameModalProps) => {
  const [name, setName] = useState("");

  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

  const restorePassword = () => {
    axios
      .post('http://easy-test.asyx.ru/app/changeName', {
          "name": name,
      })
      .then((res) => {
        const data = res.data;
        const isError = "error" in data;
        console.log(data)

        if (isError) {
          setIsError(true);
          setTextError(data.error);

        }else{
          onClose()
        }
      })
      .catch((err) =>
      console.log("Error: " + err)
      );
  };

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
          Enter your name
          <FormControl mt="3">
            <Input
              onChangeText={(text: string) => setName(text)}
              value={name}
              variant="rounded"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="E-mail"
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
            leftIcon={<Icon as={MaterialIcons} name="save" size="sm" />}
            shadow={2}
            bgColor={theme.colors.blue[500]}
            flex="1"
            onPress={restorePassword}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
