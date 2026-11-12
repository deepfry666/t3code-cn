import { afterEach, describe, expect, it } from "vite-plus/test";

import { setLocale } from "../../../test/locale";
import { deviceDetail } from "./deviceDetail";

afterEach(() => setLocale("en"));

describe("device status details", () => {
  it("localizes details that T3 words itself", () => {
    setLocale("zh-CN");
    expect(deviceDetail("Device stream stalled. Reconnecting…")).toBe(
      "设备画面已卡住，正在重新连接…",
    );
    expect(deviceDetail("Device control timed out. Its position is unknown.")).toBe(
      "设备控制超时，位置未知。",
    );
  });

  it("leaves the English wording unchanged", () => {
    expect(deviceDetail("Device stream stalled. Reconnecting…")).toBe(
      "Device stream stalled. Reconnecting…",
    );
  });

  it("translates the decoder prefix and preserves unknown device details", () => {
    setLocale("zh-CN");
    expect(deviceDetail("Video decoder: bad h264 profile")).toBe("视频解码器：bad h264 profile");
    expect(deviceDetail("Unknown device detail / path: unchanged")).toBe(
      "Unknown device detail / path: unchanged",
    );
    expect(deviceDetail(undefined)).toBeNull();
  });
});
