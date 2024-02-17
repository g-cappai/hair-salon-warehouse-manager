import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Modal as RNUIModal } from "react-native-ui-lib";
import { View } from "./View";

type Props = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export function Modal({ isOpen, onClose, children }: Props) {
  return (
    <RNUIModal
      visible={isOpen}
      onBackgroundPress={onClose}
      overlayBackgroundColor="rgba(0, 0, 0, 0.2)"
    >
      <View style={styles.container}>{children}</View>
    </RNUIModal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});
