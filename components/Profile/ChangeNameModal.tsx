import React, { useEffect, useState } from "react";
import { theme, Icon, Button, Input, Modal, FormControl } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { ErrorAlert } from "../ErrorAlert";
import { store } from "../../redux/store";
import { changeName } from "../../redux/actions/authActions";

export interface ChangeNameModalProps {
  isOpen: boolean;
  oldName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ChangeNameModal = ({
  isOpen,
  oldName,
  onClose,
  onSuccess,
}: ChangeNameModalProps) => {
  const [name, setName] = useState(oldName);

  const [isError, setIsError] = useState(false);
  const [textError, setTextError] = useState("");

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
              placeholder="name"
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
            onPress={() => {
              store.dispatch(changeName(name, onSuccess));
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
