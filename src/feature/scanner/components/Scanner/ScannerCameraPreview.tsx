import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";

type Props = { onBarCodeScanned: (barCode: string) => void; isPaused: boolean };

export function ScannerCameraPreview({ isPaused, onBarCodeScanned }: Props) {
  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    onBarCodeScanned(data);
  };

  return (
    <BarCodeScanner
      barCodeTypes={[
        BarCodeScanner.Constants.BarCodeType.ean13,
        BarCodeScanner.Constants.BarCodeType.ean8,
      ]}
      onBarCodeScanned={isPaused ? undefined : handleBarCodeScanned}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
