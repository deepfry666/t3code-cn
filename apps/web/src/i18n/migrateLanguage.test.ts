import { expect, it } from "vite-plus/test";
import { migrateLanguage } from "./migrateLanguage";

it("imports either legacy choice before clearing the legacy key", () => {
  expect(migrateLanguage(undefined, "zh-CN")).toBe("zh");
  expect(migrateLanguage(undefined, "en")).toBe("en");
  expect(migrateLanguage("es", null)).toBe("es");
  expect(migrateLanguage(undefined, null)).toBeUndefined();
  expect(migrateLanguage(undefined, "invalid")).toBeUndefined();
  expect(migrateLanguage("system", "zh-CN")).toBe("zh");
  expect(migrateLanguage("en", "zh-CN")).toBe("zh");
});
