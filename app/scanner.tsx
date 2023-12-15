import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Scanner } from "src/feature/scanner/components";
import { ProductDiscoveryModal } from "src/feature/product/components";
import { useFocusEffect } from "expo-router";

export default function ScannerPage() {
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [barCode, setBarCode] = useState("");
  const isScanningPaused = !!barCode;

  useFocusEffect(() => {
    setIsScannerActive(true);

    return () => setIsScannerActive(false);
  });

  const handleCloseModal = () => {
    setBarCode("");
  };

  return (
    <View style={styles.container}>
      <Scanner
        isPaused={isScanningPaused}
        isActive={isScannerActive}
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
