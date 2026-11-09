import { describe, expect, it, vi } from "vite-plus/test";
import type * as Electron from "electron";

import { localizeApplicationMenu, localizeDesktopText } from "./menuLocalization.ts";

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
    expect(
      localizeApplicationMenu([{ label: "View" }], ["zh-CN"], "T3 Code", "darwin")[0]?.label,
    ).toBe("显示");
    expect(
      localizeApplicationMenu([{ label: "View" }], ["zh-CN"], "T3 Code", "win32")[0]?.label,
    ).toBe("查看");
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
    const source = "T3 Code {version} is currently the newest version available.";
    const version = "1.2.3-{$build}";
    expect(localizeDesktopText(source, ["zh-CN"], { version })).toBe(
      `T3 Code ${version} 已是最新版本。`,
    );
    expect(localizeDesktopText(source, ["en-US", "zh-CN"], { version })).toBe(
      `T3 Code ${version} is currently the newest version available.`,
    );
    expect(localizeDesktopText("toString", ["zh-CN"])).toBe("toString");
  });
});
