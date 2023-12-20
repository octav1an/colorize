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
        const domColorizer = new DomColorizer(this.plugin);
        domColorizer.addColorToPath(this.file.path, color);

        this.savePath(path);
      } catch (err) {
        console.log("Cannot create file menu button", err);
      }
    });

    return btn;
  }

  private savePath(path: Path) {
    this.paths.push(path);
    this.plugin.saveSettings();
  }
}
