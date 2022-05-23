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
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { store } from "../../redux/store";
import { ChangeNameModal } from "./ChangeNameModal";
import { ChangePasswordModal } from "./ChangPasswordModal";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  const toast = useToast();

  const [isNameModalOpen, setNameModal] = useState(false);
  const [isPasswordModalOpen, setPasswordModal] = useState(false);

  const { user } = useSelector((app: any) => app.auth);

  console.log("loginuser");
  console.log(user);

  return (
    <Box flex={1} alignItems="center" justifyContent="space-around">
      <Stack space={10} mt={10} w="100%" alignItems="center">
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          size={"xl"}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton size={"md"} />
            <AlertDialog.Body>
              <Image
                size={400}
                source={{
                  uri: user.avatar,
                }}
                alt="Avatar"
              />
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
        <Box>
          <Pressable onPress={() => setIsOpen(!isOpen)}>
            <Image
              size={200}
              borderRadius={100}
              source={{
                uri: user.avatar,
              }}
              alt="Avatar"
            />
          </Pressable>
        </Box>
        <Text fontSize={"2xl"} bold>
          {user.name}
        </Text>
        <Text fontSize={"xl"} bold>
          {user.email}
        </Text>
      </Stack>
      <Stack space={4} mt={10} alignItems="center">
        <Button
          leftIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
          shadow={2}
          bgColor={theme.colors.blue[500]}
          onPress={() => {
            setNameModal(true);
          }}
        >
          Change name
        </Button>
        <Button
          leftIcon={<Icon as={MaterialIcons} name="edit" size="sm" />}
          shadow={2}
          bgColor={theme.colors.blue[500]}
          onPress={() => {
            setPasswordModal(true)
          }}
        >
          Change password
        </Button>
        <Button
          shadow={2}
          bgColor={theme.colors.red[500]}
          onPress={() => {
            store.dispatch(logoutUser());
          }}
        >
          Logout
        </Button>
      </Stack>
      <ChangeNameModal
        isOpen={isNameModalOpen}
        oldName={user.name}
        onClose={() => setNameModal(false)}
        onSuccess={() =>
          toast.show({
            description: "Name was changed",
          })
        }
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModal(false)}
        onSuccess={() =>
          toast.show({
            description: "Password was changed",
          })
        }
      />
    </Box>
  );
};
