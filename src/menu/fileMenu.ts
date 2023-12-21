import { TAbstractFile } from "obsidian";
import { ColorizeData, ColorizeSettings, Path } from "src/types";
import ColorizePlugin from "src/main";
import { DomColorizer } from "src/colorize";

export class FileMenu {
  file: TAbstractFile;
  settings: ColorizeSettings;
  paths: Path[];
  plugin: ColorizePlugin;

  constructor(file: TAbstractFile, data: ColorizeData, plugin: ColorizePlugin) {
    this.file = file;
    this.settings = data.settings;
    this.paths = data.paths;
    this.plugin = plugin;
  }

  public createMenuFragment(): DocumentFragment {
    const fragment = new DocumentFragment();
    fragment.appendChild(this.createMenuToolbar());

    return fragment;
  }

  /**
   * Creates the menu row with all color buttons
   * @returns File menu row html element
   */
  private createMenuToolbar(): HTMLElement {
    const toolbar = document.createElement("div");
    toolbar.classList.add("colorize-container");

    // Add every color btn to the men toolbar
    for (const [name, color] of Object.entries(this.settings)) {
      const menuBtn = this.createMenuBtn(name, color);
      toolbar.appendChild(menuBtn);
    }

    return toolbar;
  }

  /**
   * Creates a color button for the file menu
   * @param name Setting color name
   * @param color Color value for the given name
   * @returns Button html element
   */
  private createMenuBtn(name: string, color: string): HTMLElement {
    const btn = document.createElement("div");

    btn.style.backgroundColor = color;
    btn.classList.add("colorize-item");
    btn.addEventListener("click", () => {
      try {
        const path: Path = {
          path: this.file.path,
          color: name
        };

        // Fist check if the path is not already colored, if it is remove the color if same
        const pathIdx = this.paths.findIndex((p) => p.path === path.path);
        const domColorizer = new DomColorizer(this.plugin);

        if (pathIdx > 0) {
          // Check if the color is the same, it that is true remove the color otherwise change it
          const isSameColor = this.paths[pathIdx].color === path.color;
          if (isSameColor) {
            domColorizer.updateColorToPath(this.file.path, "");
            this.removePath(pathIdx);
          } else {
            domColorizer.updateColorToPath(this.file.path, color);
            this.updatePath(pathIdx, path);
          }
        } else {
          domColorizer.updateColorToPath(this.file.path, color);
          this.addPath(path);
        }
      } catch (err) {
        console.log("Cannot create file menu button", err);
      }
    });

    return btn;
  }

  private updatePath(pathIdx: number, path: Path) {
    const savedPath = this.paths[pathIdx];
    savedPath.color = path.color;

    this.plugin.saveSettings();
  }

  private removePath(pathIdx: number) {
    this.paths.splice(pathIdx, 1);
    this.plugin.saveSettings();
  }

  private addPath(path: Path) {
    this.paths.push(path);
    this.plugin.saveSettings();
  }
}
