import { Editor, Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: "default",
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: "space-to-list",
      name: "Space to list",
      editorCallback: (editor: Editor) => {
        const selectedText = editor.getSelection();

        let result = "";

        selectedText.split(/\s+/).forEach((v) => {
          if (v.trim() === "") {
            return;
          }
          result += "- " + v + "\n";
        });

        editor.replaceSelection(`${result}`);
      },
    });
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
