export interface ColorizeSettings {
  color_1: string;
  color_2: string;
  color_3: string;
  color_4: string;
  color_5: string;
  color_6: string;
}

export type Path = {
  path: string;
  color: string;
};

export type ColorizeData = {
  settings: ColorizeSettings;
  paths: Path[];
};
