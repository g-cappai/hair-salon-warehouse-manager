import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Dialog as RNUIDialog, View } from "react-native-ui-lib";

type Props = {
  isOpen: boolean;
  onClose: () => void;
} & PropsWithChildren;

export function Dialog({ isOpen, onClose, children }: Props) {
  return (
    <RNUIDialog visible={isOpen} onDismiss={onClose}>
      <View style={styles.modal}>{children}</View>
    </RNUIDialog>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
});
