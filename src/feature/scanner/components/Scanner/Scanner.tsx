import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import ScannerFrame from "./ScannerFrame";
import { ScannerCameraPreview } from "./ScannerCameraPreview";

type Props = {
  /**
   * Activates the camera preview.
   */
  isActive: boolean;
  /**
   * Pauses barcode scanning.
   */
  isPaused: boolean;
  /**
   * Called after a barcode is successfully scanned.
   * @param barCode
   * @returns void
   */
  onScan: (barCode: string) => void;
};

export function Scanner({ isActive, isPaused, onScan }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  // TODO Permission setup
  // There are 4 display states
  // 1- Permission not asked
  // 2- Permission refused
  // 3- Permission granted - active
  // 4- Permission granted - unactive

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == PermissionStatus.GRANTED);
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScannerFrame>
      {isActive && (
        <ScannerCameraPreview isPaused={isPaused} onBarCodeScanned={onScan} />
      )}
    </ScannerFrame>
  );
}
