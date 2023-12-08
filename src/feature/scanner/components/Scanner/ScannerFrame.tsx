import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

export default function ScannerFrame({ children }: PropsWithChildren) {
  return (
    <View style={styles.crop}>
      <View style={styles.frame}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  crop: {
    backgroundColor: "#bbb",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  frame: {
    height: "auto",
    width: "150%",
  },
});
