import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useFocusEffect } from "expo-router";
import { Scanner } from "@features/scanner/components";
import { ScannedProductDialog } from "@features/core/components";
import { CreateProductModal } from "@features/core/components/CreateProductModal";

export default function ScannerPage() {
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [barCode, setBarCode] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(true);
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
        <ScannedProductDialog
          isOpen={!!barCode}
          barCode={barCode}
          onCreate={() => setIsCreateModalOpen(true)}
          onClose={handleCloseModal}
        />
        <CreateProductModal
          barCode={barCode}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
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
