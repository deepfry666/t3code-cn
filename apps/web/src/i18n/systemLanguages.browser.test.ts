import { expect, it, vi } from "vite-plus/test";
import { resolveLocale } from "@t3tools/client-runtime/locales";
import { stubGlobal } from "../../test/render";
import { systemLanguages } from "./systemLanguages";

it("uses desktop UI languages before Electron's English navigator", () => {
  using _languages = vi.spyOn(navigator, "languages", "get").mockReturnValue(["en-US"]);
  using _bridge = stubGlobal("desktopBridge", {
    getPreferredSystemLanguages: () => ["zh-Hans-CN", "en-US"],
  });
  expect(resolveLocale("system", systemLanguages(), ["en", "es", "zh"], "en")).toBe("zh");
  expect(resolveLocale("es", systemLanguages(), ["en", "es", "zh"], "en")).toBe("es");
});
