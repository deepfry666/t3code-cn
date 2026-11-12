import { describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser";

import { setLocale } from "../../test/locale";
import { render } from "../../test/render";
import { DeviceTabRenameInput } from "./RightPanelTabs";

const deviceSurface = (input: { readonly title?: string; readonly name?: string }) => ({
  id: "device" as const,
  kind: "device" as const,
  ...(input.title === undefined ? {} : { title: input.title }),
  ...(input.name === undefined
    ? {}
    : {
        target: { hostId: "host", deviceId: "phone", platform: "ios" as const, name: input.name },
      }),
});

describe("device tab rename", () => {
  it("starts from the name the user set, not from a translated label", async () => {
    using _locale = { [Symbol.dispose]: () => setLocale("en") };
    setLocale("zh-CN");
    await using _screen = await render(
      <DeviceTabRenameInput
        surface={deviceSurface({ name: "Settings" })}
        onFinishRename={() => undefined}
        onCancelRename={() => undefined}
      />,
    );
    await expect.element(page.getByRole("textbox", { name: "设备标签名" })).toHaveValue("Settings");
  });

  it("opens an unnamed device tab with an empty field", async () => {
    using _locale = { [Symbol.dispose]: () => setLocale("en") };
    setLocale("zh-CN");
    await using _screen = await render(
      <DeviceTabRenameInput
        surface={deviceSurface({})}
        onFinishRename={() => undefined}
        onCancelRename={() => undefined}
      />,
    );
    await expect.element(page.getByRole("textbox", { name: "设备标签名" })).toHaveValue("");
  });

  it("drops the edit on Escape without saving it", async () => {
    const onFinishRename = vi.fn();
    const onCancelRename = vi.fn();
    using _locale = { [Symbol.dispose]: () => setLocale("en") };
    setLocale("zh-CN");
    await using _screen = await render(
      <DeviceTabRenameInput
        surface={deviceSurface({ name: "iPhone" })}
        onFinishRename={onFinishRename}
        onCancelRename={onCancelRename}
      />,
    );
    const input = page.getByRole("textbox", { name: "设备标签名" });
    await userEvent.clear(input);
    await userEvent.type(input, "厨房");
    await userEvent.keyboard("{Escape}");
    expect(onCancelRename).toHaveBeenCalledOnce();
    expect(onFinishRename).not.toHaveBeenCalled();
  });

  it("saves the typed name on Enter", async () => {
    const onFinishRename = vi.fn();
    using _locale = { [Symbol.dispose]: () => setLocale("en") };
    setLocale("zh-CN");
    await using _screen = await render(
      <DeviceTabRenameInput
        surface={deviceSurface({ name: "iPhone" })}
        onFinishRename={onFinishRename}
        onCancelRename={() => undefined}
      />,
    );
    const input = page.getByRole("textbox", { name: "设备标签名" });
    await userEvent.clear(input);
    await userEvent.type(input, "Living room{Enter}");
    expect(onFinishRename).toHaveBeenCalledWith("device", "Living room");
  });
});
