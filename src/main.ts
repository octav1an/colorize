import { Menu, MenuItem, Plugin, TAbstractFile, TFolder } from "obsidian";

import { ColorizeData } from "./types";
import { DEFAULT_DATA } from "./defaults";
import { SettingTab } from "./settings";
import { FileMenu } from "./menu";

export default class ColorizePlugin extends Plugin {
  data: ColorizeData;

  async onload() {
    await this.loadSettings();

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new SettingTab(this.app, this));

    this.registerEvent(
      this.app.workspace.on("file-menu", this.handleFileMenu, this)
    );
  }

  onunload() {}

  handleFileMenu(menu: Menu, abstractFile: TAbstractFile, source: string) {
    if (abstractFile instanceof TFolder) {
      const fileMenu = new FileMenu(abstractFile, this.data, this);
      const fragment = fileMenu.createMenuFragment();

      menu.addItem((item: MenuItem) => {
        item.setTitle(fragment).setSection("action");
        // .onClick(async () => {
        // 	console.log("click on Menu");
        // });
      });
    }
  }

  async loadSettings() {
    this.data = Object.assign({}, DEFAULT_DATA, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.data);
  }
}
