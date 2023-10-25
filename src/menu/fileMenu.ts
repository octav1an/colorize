import { TAbstractFile } from "obsidian";
import { ColorizeData, ColorizeSettings, Paths } from "src/types";
import ColorizePlugin from "src/main";

export class FileMenu {
  file: TAbstractFile;
  settings: ColorizeSettings;
  paths: Paths;
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
    const btn = document.createElement(name);

    btn.style.backgroundColor = color;
    btn.classList.add("colorize-item");
    btn.addEventListener("click", () => {
      try {
        this.addColorToFolderPath(this.file.path, name);
        this.addColorToDOMLarge(this.plugin, this.file.path, color);
      } catch (err) {
        console.log("Something went wrong", err);
      }
    });

    return btn;
  }

  /** TODO move to separate class */
  private addColorToDOMLarge(
    plugin: ColorizePlugin,
    path: string,
    color: string
  ) {
    const fileExplorers = plugin.app.workspace.getLeavesOfType("file-explorer");
    console.log("fileExplorers ", fileExplorers);
    fileExplorers.forEach((fileExplorer) => {
      const titleEl = fileExplorer.view.fileItems[path].coverEl;
      titleEl.style.backgroundColor = color;
    });
  }

  private addColorToFolderPath(path: string, color: string) {
    this.paths[path] = color;
    this.plugin.saveSettings();
  }
}
