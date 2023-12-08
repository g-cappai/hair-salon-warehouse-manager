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
    alignItems: "center",
    backgroundColor: "#bbb",
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
  },
  frame: {
    height: "auto",
    width: "150%",
  },
});
