import { ColorizeData } from "./types";
import { DEFAULT_DATA } from "./defaults";
import { SettingTab } from "./settings";
import { Plugin } from "obsidian";

export default class ColorizePlugin extends Plugin {
  data: ColorizeData;

  async onload() {
    await this.loadSettings();

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new SettingTab(this.app, this));

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(
      window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
    );
  }

  onunload() {}

  async loadSettings() {
    this.data = Object.assign({}, DEFAULT_DATA, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.data);
  }
}
