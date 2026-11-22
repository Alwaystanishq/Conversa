import { Platform } from "react-native";

export const colors = {
  background: "#11100f",
  surface: "#1b1917",
  surfaceRaised: "#292622",
  border: "#6a6359",

  text: "#f4f0e6",
  textSecondary: "#d4cdc0",
  textMuted: "#aaa296",

  primary: "#78b8ef",
  primaryText: "#152332",
  accent: "#78b8ef",
  copy: "#f4f0e6",
  copyMuted: "#e4ded2",
  toner: "#211f1c",
  tonerMuted: "#655f56",
  inputBorder: "#827a6d",
  error: "#a91f42",
  heart: "#c4274f",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  md: 0,
  lg: 0,
  xl: 0,
  full: 9999,
};

export const typography = {
  display: Platform.select({
    ios: "AvenirNextCondensed-Heavy",
    android: "sans-serif-condensed",
    default: "sans-serif-condensed",
  }),
  body: Platform.select({
    ios: "Georgia",
    android: "serif",
    default: "serif",
  }),
};

export const sheetShadow = {
  shadowColor: "#050505",
  shadowOffset: { width: 5, height: 5 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};
