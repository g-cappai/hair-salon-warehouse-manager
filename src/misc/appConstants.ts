import constants, { AppOwnership } from "expo-constants";
import * as Device from "expo-device";

export default {
  IS_EXPO: constants.appOwnership === AppOwnership.Expo,
  IS_EMULATOR: !Device.isDevice,
};
