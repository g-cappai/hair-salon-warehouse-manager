import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "hair-salon-warehouse-manager",
  slug: "hair-salon-warehouse-manager",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "hswm",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.gcappai.hairsalonwarehousemanager",
    softwareKeyboardLayoutMode: "resize",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "612e6a13-b668-4848-b42c-6b3d96f66fc3",
    },
  },
  plugins: [
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 33,
        },
      },
    ],
    "expo-router",
  ],
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
});
