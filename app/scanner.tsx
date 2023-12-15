import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Scanner } from "src/features/scanner/components";
import { ProductDiscoveryModal } from "src/features/product/components";
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
      <View style={styles.row}>
        <Scanner
          isPaused={isScanningPaused}
          isActive={isScannerActive}
          onScan={setBarCode}
        />
      </View>
      <View style={styles.row}>
        <ProductDiscoveryModal
          isOpen={!!barCode}
          barCode={barCode}
          onClose={handleCloseModal}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-around",
  },
  row: {
    maxHeight: "50%",
  },
});
