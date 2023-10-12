import { ColorizeData, ColorizeSettings } from "./types";

const DEFAULT_SETTINGS: ColorizeSettings = {
  color_1: "#f2d2c6",
  color_2: "#f8d9b6",
  color_3: "#fcf2c5",
  color_4: "#cde2c3",
  color_5: "#caddf3",
  color_6: "#d1c6f5"
};

const DEFAULT_DATA: ColorizeData = {
  settings: DEFAULT_SETTINGS,
  paths: {}
};

export { DEFAULT_DATA, DEFAULT_SETTINGS };
