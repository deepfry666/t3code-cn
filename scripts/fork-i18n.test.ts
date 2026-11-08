// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import { describe, expect, it } from "vite-plus/test";

// Catalogs live beside the UI they translate (web, desktop menus), so they are read as text
// here instead of imported across package boundaries.
const repoRoot = NodePath.resolve(import.meta.dirname, "..");

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
  [/\bcheckouts?\b/i, "工作副本"],
];

const CJK = /[一-鿿]/;
const ENTRY =
  /^\s*(?:"(?<double>(?:[^"\\]|\\.)*)"|'(?<single>(?:[^'\\]|\\.)*)'|(?<bare>[A-Za-z_$][\w$]*))\s*:\s*(?:\n\s*)?"(?<value>(?:[^"\\]|\\.)*)"/gm;
const CJK_LITERAL = /"(?:[^"\\\n]|\\.)*[一-鿿](?:[^"\\\n]|\\.)*"/g;

const unescape = (raw: string) => raw.replace(/\\(.)/g, "$1");

interface Entry {
  readonly at: string;
  readonly source: string;
  readonly localized: string;
}

function readCatalogs() {
  const files = NodeChildProcess.execFileSync(
    "git",
    ["ls-files", "apps/web/src", "apps/desktop/src", "packages"],
    { cwd: repoRoot, encoding: "utf8" },
  )
    .split("\n")
    .filter((file) => /\.tsx?$/.test(file) && !/\.test\./.test(file));
  const entries: Entry[] = [];
  const unparsed: string[] = [];
  for (const file of files) {
    const text = NodeFS.readFileSync(NodePath.join(repoRoot, file), "utf8");
    if (!CJK.test(text)) continue;
    const found = [...text.matchAll(ENTRY)].filter((match) => CJK.test(match.groups?.value ?? ""));
    // Files with Chinese but no catalog entries (search keywords, language names) are not catalogs.
    if (found.length === 0) continue;
    for (const match of found) {
      const line = text.slice(0, match.index).split("\n").length;
      entries.push({
        at: `${file}:${line}`,
        source: unescape(match.groups?.double ?? match.groups?.single ?? match.groups?.bare ?? ""),
        localized: unescape(match.groups?.value ?? ""),
      });
    }
    const literals = text.match(CJK_LITERAL)?.length ?? 0;
    if (literals !== found.length) unparsed.push(`${file}: ${literals - found.length}`);
  }
  return { entries, unparsed };
}

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
});
