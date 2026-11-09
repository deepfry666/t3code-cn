import { describe, expect, it } from "vite-plus/test";

import { translateSettingsShellLabel } from "./settingsShell.messages";
import { translateThemeEditorLabel } from "./themeEditorUi.messages";
import { translateThemeErrorMessage } from "./themeErrorMessages";

describe("theme error messages", () => {
  it("rebuilds a value-carrying failure from its template", () => {
    expect(translateThemeErrorMessage('A theme named "Dusk" is already installed.', "zh-CN")).toBe(
      "已安装名为“Dusk”的主题。",
    );
    expect(
      translateThemeErrorMessage(
        "Failed to write the theme library to t3code-cn:custom-themes.",
        "zh-CN",
      ),
    ).toBe("无法将主题库写入 t3code-cn:custom-themes。");
    expect(translateThemeErrorMessage("theme/dark.json is not valid JSON.", "zh-CN")).toBe(
      "theme/dark.json 不是有效的 JSON。",
    );
  });

  it("passes through text it does not own so server errors stay as written", () => {
    const server = "EACCES: permission denied, open '/workspace/.t3/settings.json'";
    expect(translateThemeErrorMessage(server, "zh-CN")).toBe(server);
    expect(translateThemeErrorMessage('A theme named "Dusk" is already installed.', "en")).toBe(
      'A theme named "Dusk" is already installed.',
    );
  });

  it("reaches the failure through both settings surfaces", () => {
    expect(translateThemeEditorLabel("Theme files need a colors object.", "zh-CN")).toBe(
      "主题文件需要 colors 对象。",
    );
    expect(translateThemeEditorLabel('A theme named "Dusk" is already installed.', "zh-CN")).toBe(
      "已安装名为“Dusk”的主题。",
    );
    expect(
      translateSettingsShellLabel("That Open VSX extension has no readable manifest.", "zh-CN"),
    ).toBe("Open VSX 扩展的清单无法读取。");
    expect(translateSettingsShellLabel("theme/dark.json is not valid JSON.", "zh-CN")).toBe(
      "theme/dark.json 不是有效的 JSON。",
    );
  });
});
