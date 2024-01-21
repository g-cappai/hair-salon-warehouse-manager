import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Dialog, View } from "react-native-ui-lib";

type Props = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export function Modal({ isOpen, onClose, children }: Props) {
  return (
    <Dialog visible={isOpen} onDismiss={onClose}>
      <View style={styles.modal}>{children}</View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
});
