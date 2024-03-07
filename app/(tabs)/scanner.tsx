import { StyleSheet, View } from "react-native";
import { Suspense, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Scanner } from "@features/scanner/components";
import { ScannedProductHandler } from "@features/core/components";
import { Text } from "@features/ui/components";

export default function ScannerPage() {
  const [isScannerActive, setIsScannerActive] = useState(true);
  const [barCode, setBarCode] = useState("");
  const isScanningPaused = !!barCode;

  useFocusEffect(() => {
    setIsScannerActive(true);

    return () => setIsScannerActive(false);
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Scanner
          isPaused={isScanningPaused}
          isActive={isScannerActive}
          onScan={setBarCode}
        />
      </View>
      <Suspense fallback={<Text variant="body">Loading</Text>}>
        <ScannedProductHandler
          barCode={barCode}
          resetBarcode={() => setBarCode("")}
        />
      </Suspense>
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
