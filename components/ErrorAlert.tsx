import {
  Text,
  Alert,
  HStack,
  VStack,
  IconButton,
  CloseIcon,
} from "native-base";

export interface ErrorAlertProps {
  errorMessage: string;
  onClose: () => void;
}

export const ErrorAlert = ({ errorMessage, onClose }: ErrorAlertProps) => {
  return (
    <Alert w="80%" status="error" borderRadius={"50"}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="sm" color="coolGray.800">
              {errorMessage}
            </Text>
          </HStack>
          <IconButton
            onPress={onClose}
            variant="unstyled"
            icon={<CloseIcon size="2" color="coolGray.600" />}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};
