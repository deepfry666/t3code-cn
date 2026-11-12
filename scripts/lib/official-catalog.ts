// @effect-diagnostics nodeBuiltinImport:off
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import { readCatalogs, repoRoot } from "./fork-catalogs.ts";

export const OFFICIAL_ZH_PATH = "apps/web/src/i18n/translations/zh.json";
export function officialChineseCatalog() {
  const english = JSON.parse(
    NodeFS.readFileSync(NodePath.join(repoRoot, "apps/web/src/i18n/translations/en.json"), "utf8"),
  ) as Record<string, string>;
  const chinese = JSON.parse(
    NodeFS.readFileSync(NodePath.join(repoRoot, OFFICIAL_ZH_PATH), "utf8"),
  ) as Record<string, string>;
  const translations = new Map(
    readCatalogs()
      .entries.filter((entry) => !entry.source.includes("@@"))
      .map((entry) => [entry.source, entry.localized]),
  );
  return Object.fromEntries(
    Object.entries(english).map(([key, source]) => [key, translations.get(source) ?? chinese[key]]),
  );
}
export function officialChineseText() {
  return `${JSON.stringify(officialChineseCatalog(), null, 2)}\n`;
}
