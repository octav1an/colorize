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
      this.updateColorToPath(pathSetting.path, colorValue);
    }
  }

  /**
   * Changes the color of a file-explorer item
   * To remove the color pass empty string ""
   * @param path Path of the file item to change the color for
   * @param color New background color
   */
  public updateColorToPath(path: string, color: string) {
    const fileExplorer = this.getFileExplorer();

    const item = fileExplorer.view.fileItems[path].coverEl;
    item.style.backgroundColor = color;
  }

  private getFileExplorer() {
    // The assumption is that there is only one file explorer leaf per vault
    const fileExplorer =
      this.plugin.app.workspace.getLeavesOfType("file-explorer")[0];

    if (!fileExplorer) {
      throw new Error("No file-explorer leaf exists");
    }

    return fileExplorer;
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
