// @effect-diagnostics nodeBuiltinImport:off globalConsole:off
// Lists English UI text that bypasses t() in already-localized web components.
// After an upstream merge: `vp run i18n:untranslated -- <pre-merge-commit>` shows only new lines.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";

const since = process.argv.slice(2).find((arg) => arg !== "--");
const git = (args: ReadonlyArray<string>) =>
  NodeChildProcess.execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const CANDIDATES: ReadonlyArray<RegExp> = [
  // JSX string props that render as text or are announced.
  /\b(?:title|label|description|placeholder|aria-label|tooltip|heading|emptyText)="([^"]*[A-Za-z]{2}[^"]*)"/,
  // Object fields that end up in toasts, menus and rows.
  /\b(?:title|label|description|placeholder|message|tooltip)\s*:\s*["'`]([A-Z][^"'`]*[a-z][^"'`]*)["'`]/,
  // JSX text between tags.
  />\s*([A-Z][A-Za-z0-9 ,.'’?!:-]*[a-z][A-Za-z0-9 ,.'’?!:-]*)\s*</,
  // A JSX text line on its own.
  /^\s*([A-Z][a-z]+(?: [A-Za-z0-9,.'’?!-]+)+[.?!]?)\s*$/,
];

// Generic type arguments look like JSX text to the patterns above.
const TYPE_NAMES =
  /^(?:Promise|ReadonlyArray|Array|Record|Readonly|Partial|Option|Effect|Set|Map)$/;

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

const localized = git(["ls-files", "apps/web/src"])
  .split("\n")
  .filter((file) => file.endsWith(".tsx") && !file.includes(".test."))
  .filter((file) => NodeFS.readFileSync(file, "utf8").includes("useTranslation("));

let total = 0;
for (const file of localized) {
  const added = addedLines(file);
  NodeFS.readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (added !== undefined && !added.has(index + 1)) return;
      if (/^\s*(?:\/\/|\*|import\b)|\bt\(|className=|data-/.test(line)) return;
      const text = CANDIDATES.map((pattern) => pattern.exec(line)?.[1]).find(Boolean);
      if (text === undefined || TYPE_NAMES.test(text)) return;
      total++;
      console.log(`${file}:${index + 1}  ${text.trim()}`);
    });
}
console.log(
  total === 0
    ? "No untranslated text found."
    : `${total} candidate line(s). Wrap real UI text in t() and add it to the catalog.`,
);
