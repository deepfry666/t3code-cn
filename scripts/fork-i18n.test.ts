// @effect-diagnostics nodeBuiltinImport:off
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import { describe, expect, it } from "vite-plus/test";

import { readCatalogs, repoRoot, SNAPSHOT_PATH, snapshotText } from "./lib/fork-catalogs.ts";

// The one Chinese term for each recurring product concept.
const GLOSSARY: ReadonlyArray<readonly [english: RegExp, chinese: string]> = [
  [/\bthreads?\b/i, "会话"],
  [/\bprojects?\b/i, "项目"],
  [/\benvironments?\b/i, "环境"],
  [/\bproviders?\b/i, "提供方"],
  [/\bworktrees?\b/i, "工作树"],
  // SSH uses an authentication agent, not a coding agent.
  [/(?<!SSH config, )\bagents?\b/i, "智能体"],
  [/\bkeybindings?\b/i, "快捷键"],
  [/\barchived?\b/i, "归档"],
  [/\bsnooz\w*/i, "暂缓"],
  [/\bsettl\w*/i, "收尾"],
  [/\bsidebars?\b/i, "侧边栏"],
  [/\bpull requests?\b/i, "拉取请求"],
  [/\bbeta\b/i, "测试版"],
  [/\blabs\b/i, "实验功能"],
  [/(?<!worktree )\bcheckouts?\b(?! a ref)/i, "工作副本"],
];

// Product names, brands and technical abbreviations stay as written in Chinese.
const KEEP_ENGLISH: ReadonlyArray<string> = [
  "T3 Code",
  "T3 Connect",
  "GitHub",
  "GitLab",
  "Codex",
  "Claude",
  "Cursor",
  "OpenCode",
  "Grok",
  "Kiro",
  "Antigravity",
  "ChatGPT",
  "OpenAI",
  "CLI",
  "MCP",
  "SSH",
  "WSL",
  "API",
  "URL",
  "JSON",
  "HTTP",
  "OTLP",
  "token",
  "macOS",
  "Windows",
  "Linux",
  "Android",
  "iOS",
];

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// "Settings..." and "settings", or the menu role "selectAll" and "Select All", are one source.
const sourceKey = (source: string) =>
  source
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(?:\.\.\.|…|\.|:)$/, "");
const localizedKey = (localized: string) => localized.trim().replace(/[…。：:]$/, "");

describe("Chinese catalogs", () => {
  const { entries, unparsed } = readCatalogs();

  it("reads every Chinese string in a catalog file as an entry", () => {
    expect(entries.length).toBeGreaterThan(0);
    expect(unparsed).toEqual([]);
  });

  it("matches the translation record in i18n/zh-CN.json (vp run i18n:export)", () => {
    const record = NodeFS.readFileSync(NodePath.join(repoRoot, SNAPSHOT_PATH), "utf8");
    expect(record).toBe(snapshotText(entries));
  });

  it("keeps every placeholder and translates every entry", () => {
    const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    const broken = entries
      .filter(
        (entry) =>
          entry.localized.trim() === "" ||
          placeholders(entry.localized).join() !== placeholders(entry.source).join(),
      )
      .map((entry) => `${entry.at} ${entry.source} → ${entry.localized}`);
    expect(broken).toEqual([]);
  });

  it("translates the same English text the same way everywhere", () => {
    const bySource = Map.groupBy(entries, (entry) => sourceKey(entry.source));
    const conflicts = [...bySource.values()]
      .filter((group) => new Set(group.map((entry) => localizedKey(entry.localized))).size > 1)
      .map((group) => group.map((entry) => `${entry.at} ${entry.source} → ${entry.localized}`));
    expect(conflicts).toEqual([]);
  });

  it("uses the glossary term for recurring concepts", () => {
    const misses = entries.flatMap((entry) => {
      // Placeholders and file names are not prose to translate.
      const source = (entry.source.split("@@")[0] ?? "").replace(
        /\{\w+\}|[\w-]+\.[a-z]{2,4}\b/g,
        "",
      );
      return GLOSSARY.filter(
        ([english, chinese]) => english.test(source) && !entry.localized.includes(chinese),
      ).map(
        ([, chinese]) => `${entry.at} ${entry.source} → ${entry.localized} (expected ${chinese})`,
      );
    });
    expect(misses).toEqual([]);
  });

  it("keeps product names and abbreviations in English", () => {
    const misses = entries.flatMap((entry) => {
      const source = entry.source.split("@@")[0] ?? "";
      return KEEP_ENGLISH.filter(
        (term) =>
          new RegExp(`\\b${escapeRegExp(term)}\\b`).test(source) &&
          !new RegExp(`\\b${escapeRegExp(term)}\\b`).test(entry.localized),
      ).map((term) => `${entry.at} ${entry.source} → ${entry.localized} (expected ${term})`);
    });
    expect(misses).toEqual([]);
  });
});
