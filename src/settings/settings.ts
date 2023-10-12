import { App, PluginSettingTab, Setting } from "obsidian";
import ColorizePlugin from "../main";
import { ColorizeSettings } from "src/types";
import { DEFAULT_SETTINGS } from "src/defaults";

export class SettingTab extends PluginSettingTab {
  plugin: ColorizePlugin;

  constructor(app: App, plugin: ColorizePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h3", { text: "Colorize Settings" });

    this.createColorSetting("Color 1", "color_1", containerEl);
    this.createColorSetting("Color 2", "color_2", containerEl);
    this.createColorSetting("Color 3", "color_3", containerEl);
    this.createColorSetting("Color 4", "color_4", containerEl);
    this.createColorSetting("Color 5", "color_5", containerEl);
    this.createColorSetting("Color 6", "color_6", containerEl);
  }

  private createColorSetting<TColorSetting extends keyof ColorizeSettings>(
    name: string,
    colorSetting: TColorSetting,
    containerEl: HTMLElement
  ) {
    const setting = new Setting(containerEl)
      .setName(name)
      // prettier-ignore
      .addButton((button) => {
        button.setButtonText("Default").onClick(async () => {
          this.plugin.data.settings[colorSetting] =
            DEFAULT_SETTINGS[colorSetting];
          await this.plugin.saveSettings();
          // Reload settings after change to default
          this.display();
        });
      })

      .addColorPicker((color) =>
        color
          .setValue(this.plugin.data.settings[colorSetting])
          .onChange(async (value) => {
            this.plugin.data.settings[colorSetting] = value;
            await this.plugin.saveSettings();
          })
      );
    return setting;
  }
}
