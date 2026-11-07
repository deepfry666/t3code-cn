import { describe, expect, it, vi } from "vite-plus/test";
import type * as Electron from "electron";

import { localizeApplicationMenu } from "./menuLocalization.ts";

describe("native menu localization", () => {
  it("keeps non-Chinese menus unchanged and uses only the preferred language", () => {
    const template = [{ label: "File" }];
    expect(localizeApplicationMenu(template, ["en-US", "zh-CN"], "T3 Code")).toBe(template);
    expect(localizeApplicationMenu(template, [], "T3 Code")).toBe(template);
  });

  it("changes labels without changing roles, accelerators, callbacks or state", () => {
    const click = vi.fn();
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: "Edit",
        submenu: [
          { role: "copy", enabled: false },
          {
            label: "Paste as Text",
            accelerator: "CmdOrCtrl+Shift+V",
            click,
            visible: false,
          },
        ],
      },
    ];
    const localized = localizeApplicationMenu(template, ["zh-TW"], "T3 Code");
    expect(localized[0]?.label).toBe("编辑");
    const submenu = localized[0]?.submenu;
    if (!Array.isArray(submenu)) throw new Error("Expected menu items");
    expect(submenu[0]).toEqual({ role: "copy", enabled: false, label: "复制" });
    expect(submenu[1]).toEqual({
      label: "粘贴为纯文本",
      accelerator: "CmdOrCtrl+Shift+V",
      click,
      visible: false,
    });
    expect(template[0]?.label).toBe("Edit");
    expect(click).not.toHaveBeenCalled();
  });

  it("preserves application names and unknown labels literally", () => {
    const name = "Test {$name}";
    const localized = localizeApplicationMenu(
      [{ label: `About ${name}` }, { label: "Custom theme" }, { type: "separator" }],
      ["zh-CN"],
      name,
    );
    expect(localized).toEqual([
      { label: `关于 ${name}` },
      { label: "Custom theme" },
      { type: "separator" },
    ]);
  });
});
