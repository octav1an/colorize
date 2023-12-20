import ColorizePlugin from "../main";
import { ColorizeSettings, Path } from "../types";

export class DomColorizer {
  plugin: ColorizePlugin;

  constructor(plugin: ColorizePlugin) {
    this.plugin = plugin;
  }

  public addColorToPaths(paths: Path[], colorSettings: ColorizeSettings) {
    for (const pathSetting of paths) {
      const colorValue = this.mapColorNameToColor(pathSetting, colorSettings);
      this.addColorToPath(pathSetting.path, colorValue);
    }
  }

  /**
   * Changes the color of a file-explorer item
   * @param path Path of the file item to change the color for
   * @param color New background color
   */
  public addColorToPath(path: string, color: string) {
    // The assumption is that there is only one file explorer leaf per vault
    const fileExplorer =
      this.plugin.app.workspace.getLeavesOfType("file-explorer")[0];
    // console.log(fileExplorer);
    if (!fileExplorer) {
      throw new Error("No file-explorer leaf exists");
    }

    const item = fileExplorer.view.fileItems[path].coverEl;
    item.style.backgroundColor = color;
  }

  /**
   * Map color name (used for setting colors) to actual color value
   * @param path Saved path with color name object
   * @param colorSettings Color settings
   * */
  private mapColorNameToColor(path: Path, colorSettings: ColorizeSettings) {
    const colorKey = path.color as keyof ColorizeSettings;
    return colorSettings[colorKey];
  }
}
