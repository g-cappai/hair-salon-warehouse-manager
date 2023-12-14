import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Scanner } from "src/feature/scanner/components";
import { ProductDiscoveryModal } from "src/feature/product/components";

export default function Home() {
  // barCode is scanned
  const [barCode, setBarCode] = useState("");
  // the scanning is paused
  const isScanningPaused = !!barCode;

  const handleCloseModal = () => {
    setBarCode("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Scanner
        isPaused={isScanningPaused}
        isActive={true}
        onScan={setBarCode}
      />
      <ProductDiscoveryModal
        isOpen={!!barCode}
        barCode={barCode}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
});
