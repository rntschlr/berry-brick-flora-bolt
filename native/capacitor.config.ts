import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.magdolna.notes",
  appName: "Magdolna",
  webDir: "www",
  backgroundColor: "#F4EFE4",
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    backgroundColor: "#F4EFE4",
  },
  plugins: {
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#F4EFE4",
    },
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#F4EFE4",
      showSpinner: false,
    },
  },
};

export default config;
