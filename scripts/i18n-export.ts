// @effect-diagnostics nodeBuiltinImport:off globalConsole:off
// Writes every zh-CN catalog entry to i18n/zh-CN.json, the fork's translation record.
// `--check` fails instead of writing when the file is out of date.
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";

import { readCatalogs, repoRoot, SNAPSHOT_PATH, snapshotText } from "./lib/fork-catalogs.ts";

import { OFFICIAL_ZH_PATH, officialChineseText } from "./lib/official-catalog.ts";

const officialTarget = NodePath.join(repoRoot, OFFICIAL_ZH_PATH);
const officialNext = officialChineseText();
if (process.argv.includes("--check")) {
  if (NodeFS.readFileSync(officialTarget, "utf8") !== officialNext)
    throw new Error("Official zh.json is stale. Run vp run i18n:export");
} else {
  NodeFS.writeFileSync(officialTarget, officialNext);
}

const target = NodePath.join(repoRoot, SNAPSHOT_PATH);
const { entries } = readCatalogs();
const next = snapshotText(entries);
const current = NodeFS.existsSync(target) ? NodeFS.readFileSync(target, "utf8") : "";

if (process.argv.includes("--check")) {
  if (current !== next) {
    console.error(`${SNAPSHOT_PATH} is out of date. Run: vp run i18n:export`);
    process.exit(1);
  }
} else {
  NodeFS.mkdirSync(NodePath.dirname(target), { recursive: true });
  NodeFS.writeFileSync(target, next);
}
const files = new Set(entries.map((entry) => entry.file)).size;
console.log(`${SNAPSHOT_PATH}: ${entries.length} entries from ${files} catalog files.`);
