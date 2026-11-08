import { timelineUiMessages } from "./timelineUi.messages";

type TimelineUiKey = Extract<keyof typeof timelineUiMessages, string>;
export type TimelineTranslator = (
  key: TimelineUiKey,
  params?: Readonly<Record<string, string | number>>,
) => string;

// Timeline logic builds these labels as English strings (shared with mobile and asserted in
// tests), so the web client translates the fixed ones when it renders them.
const FIXED_LABELS = new Set<string>([
  "Worked",
  "You stopped this response",
  "Continued",
  "Superseded attempt",
  "Compacting context",
  "Context compaction",
  "Context compacted",
  "Compacting before the cache expires…",
  "Compacting…",
  "Context automatically compacted before cache expiry",
  "Context compacted before sending",
  "Thought",
]);

const PATTERNS: ReadonlyArray<readonly [RegExp, TimelineUiKey, string]> = [
  [/^Worked for (.+)$/, "Worked for {duration}", "duration"],
  [/^You stopped after (.+)$/, "You stopped after {duration}", "duration"],
  [/^Continued for (.+)$/, "Continued for {duration}", "duration"],
  [/^Context compacted after (.+) idle$/, "Context compacted after {age} idle", "age"],
  // Live command rows: a verb and the program name.
  [/^Running (\S+)$/, "Running {command}", "command"],
  [/^Ran (\S+)$/, "Ran {command}", "command"],
  [/^Failed (\S+)$/, "Failed {command}", "command"],
  [/^Declined (\S+)$/, "Declined {command}", "command"],
  [/^Stopped (\S+)$/, "Stopped {command}", "command"],
];

export function translateTimelineLabel(label: string, t: TimelineTranslator): string {
  if (label === "Thinking") return t("Thinking@@activity");
  if (FIXED_LABELS.has(label)) return t(label as TimelineUiKey);
  for (const [pattern, key, param] of PATTERNS) {
    const match = pattern.exec(label);
    if (match) return t(key, { [param]: match[1] ?? "" });
  }
  return label;
}
