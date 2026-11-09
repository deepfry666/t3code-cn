// @effect-diagnostics nodeBuiltinImport:off globalConsole:off
// Lists English text in the web and desktop clients, and the client code they share with
// mobile, that no zh-CN catalog translates.
// After an upstream merge: `vp run i18n:untranslated -- <pre-merge-commit>` shows only new lines.
// `--path <prefix>` narrows the scan. Text kept in English on purpose is listed in KEEP_ENGLISH_PATH.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";

const KEEP_ENGLISH_PATH = "i18n/keep-english.txt";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const pathIndex = args.indexOf("--path");
const pathPrefix = pathIndex === -1 ? undefined : args[pathIndex + 1];
const since = args.find(
  (arg, index) => !arg.startsWith("--") && (pathIndex === -1 || index !== pathIndex + 1),
);
const git = (args: ReadonlyArray<string>) =>
  NodeChildProcess.execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const CATALOG_FILE = /(?:\.messages|Messages|menuLocalization)\.ts$/;
const CATALOG_ENTRY = /^\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|([A-Za-z_$][\w$]*))\s*:/gm;
// JSX text and string props, which are not quoted string literals.
const JSX_TEXT: ReadonlyArray<RegExp> = [
  /\b(?:title|label|description|placeholder|aria-label|tooltip|heading|emptyText)="([^"]*[A-Za-z]{2}[^"]*)"/,
  />\s*([A-Z][A-Za-z0-9 ,.'’?!:-]*[a-z][A-Za-z0-9 ,.'’?!:-]*)\s*</,
  /^\s*([A-Z][a-z]+(?: [A-Za-z0-9,.'’?!-]+)+[.?!]?)\s*$/,
];
const LITERAL = /(["'`])((?:(?!\1)[^\\\n]|\\.){3,}?)\1/g;
// Diagnostics for logs and bug reports stay in English.
const DIAGNOSTIC_LINE =
  /new \w*Error\(|\bthrow\b|Effect\.(?:fail|die|log\w*)\(|console\.\w+\(|\blog(?:Info|Warning|Error|Debug)\(|\$\{this\./;
const SKIPPED_LINE =
  /^\s*(?:\/\/|\*|\/\*|import\b|export \* )|\bt\(|translate\w*\(|className=|data-/;

// "Retry…", `Open ${name}` and "Open {name}" are one text.
const normalize = (text: string) =>
  text
    .replace(/\$\{[^}]*\}|\{\w+\}/g, "{}")
    .replace(/\.\.\./g, "…")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.:…]+$/, "")
    .toLowerCase();

function looksLikeProse(text: string): boolean {
  const plain = text.replace(/\$\{[^}]*\}/g, "x");
  if (!/^[A-Z]/.test(plain) || !/[a-z]{2}/.test(plain)) return false;
  if (/[<>=;{}]|https?:|^[A-Z][\w-]*(?:\.[\w-]+)+$/.test(plain)) return false;
  return / [A-Za-z]/.test(plain) || /[.?!…]$/.test(plain);
}

function addedLines(file: string): ReadonlySet<number> | undefined {
  if (since === undefined) return undefined;
  const lines = new Set<number>();
  for (const hunk of git(["diff", "-U0", since, "--", file]).matchAll(
    /^@@ .*\+(\d+)(?:,(\d+))? @@/gm,
  )) {
    const start = Number(hunk[1]);
    const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
    for (let line = start; line < start + count; line++) lines.add(line);
  }
  return lines;
}

const tracked = git([
  "ls-files",
  "apps/web/src",
  "apps/desktop/src",
  // Shared with mobile; the web translates its English where it renders it.
  "packages/client-runtime/src",
]).split("\n");
const translated = new Set(
  tracked
    .filter((file) => CATALOG_FILE.test(file))
    .flatMap((file) =>
      [...NodeFS.readFileSync(file, "utf8").matchAll(CATALOG_ENTRY)].map((match) =>
        normalize((match[1] ?? match[2] ?? match[3] ?? "").split("@@")[0] ?? ""),
      ),
    ),
);
const keptEnglish = new Set(
  NodeFS.readFileSync(KEEP_ENGLISH_PATH, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("#"))
    .map(normalize),
);

const sources = tracked
  .filter((file) => /\.tsx?$/.test(file) && !file.endsWith(".d.ts"))
  .filter((file) => !/\.(?:test|browser\.test|stories)\.|\/test\/|test-fixtures/.test(file))
  .filter((file) => !CATALOG_FILE.test(file))
  .filter((file) => pathPrefix === undefined || file.startsWith(pathPrefix));

let total = 0;
for (const file of sources) {
  const added = addedLines(file);
  if (added?.size === 0) continue;
  const lines = NodeFS.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (added !== undefined && !added.has(index + 1)) return;
    if (SKIPPED_LINE.test(line) || DIAGNOSTIC_LINE.test(line)) return;
    const texts = [...line.matchAll(LITERAL)].map((match) => match[2] ?? "").filter(looksLikeProse);
    if (file.endsWith(".tsx")) {
      const jsx = JSX_TEXT.map((pattern) => pattern.exec(line)?.[1]).find(Boolean);
      if (jsx !== undefined && looksLikeProse(jsx.trim())) texts.push(jsx.trim());
    }
    for (const text of new Set(texts)) {
      const key = normalize(text);
      if (translated.has(key) || keptEnglish.has(key)) continue;
      total++;
      console.log(`${file}:${index + 1}  ${text}`);
    }
  });
}
console.log(
  total === 0
    ? "No untranslated text found."
    : `${total} candidate(s). Wrap UI text in t() and add it to the catalog, or list text that stays English in ${KEEP_ENGLISH_PATH}.`,
);
