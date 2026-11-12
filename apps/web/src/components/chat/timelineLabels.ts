import { createLabelTranslator } from "../../i18n/labelTranslation";
import { timelineSharedMessages } from "./timelineShared.messages";
import { timelineUiMessages } from "./timelineUi.messages";

type TimelineUiKey = Extract<keyof typeof timelineUiMessages, string>;
export type TimelineTranslator = (
  key: TimelineUiKey,
  params?: Readonly<Record<string, string | number>>,
) => string;

// Timeline logic builds these labels as English strings (shared with mobile and asserted in
// tests), so the web client translates the fixed ones when it renders them.
const FIXED_LABELS = new Set<string>([
  "Declined",
  "Request ended",
  "Waiting for an answer in the original thread",
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
  "Provider error",
  "Ran command",
  "Searched files",
  "File search",
  "Searched the web",
  "Web search",
  "Checkpoint captured",
  "Approval requested",
  "Answered questions",
  "Input requested",
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
  [/^Changed (\d+) files$/, "Changed {count} files", "count"],
  [/^Changed (.+)$/, "Changed {name}", "name"],
  [/^Retrying provider \((.+)\)$/, "Retrying provider ({progress})", "progress"],
  [/^Provider recovered \((.+) retries\)$/, "Provider recovered ({progress} retries)", "progress"],
  [/^Provider retry stopped \((.+)\)$/, "Provider retry stopped ({progress})", "progress"],
  [/^Provider error after (.+) retries$/, "Provider error after {progress} retries", "progress"],
];

const translateSharedLabel = createLabelTranslator(timelineSharedMessages);

function translateSharedTimelineLabel(label: string, t: TimelineTranslator): string {
  const translated = translateSharedLabel(label, (key, params) => {
    const target = params?.target;
    const error = params?.error;
    return t(key, {
      ...params,
      ...(typeof target === "string" ? { target: translateSharedLabel(target, t) } : {}),
      ...(error === "the other environment refused"
        ? { error: t("the other environment refused") }
        : {}),
    });
  });
  return translated;
}

export function translateTimelineLabel(label: string, t: TimelineTranslator): string {
  if (label === "Thinking") return t("Thinking@@activity");
  if (FIXED_LABELS.has(label)) return t(label as TimelineUiKey);
  const tasks = /^Tasks (\d+)\/(\d+)(?: · ([\s\S]+))?$/.exec(label);
  if (tasks) {
    const progress = t("Tasks {done}/{total}", { done: tasks[1]!, total: tasks[2]! });
    // The step after the count is the agent's own text.
    return tasks[3] === undefined ? progress : `${progress} · ${tasks[3]}`;
  }
  // A group summary joins several labels; "Changed …" would otherwise swallow the sentence.
  const joined = translateJoinedLabel(label, t);
  if (joined !== null) return joined;
  for (const [pattern, key, param] of PATTERNS) {
    const match = pattern.exec(label);
    if (match) return t(key, { [param]: match[1] ?? "" });
  }
  return translateSharedTimelineLabel(label, t);
}

function translateJoinedLabel(label: string, t: TimelineTranslator): string | null {
  const parts = label.split(
    /(?:, and | and |, )(?=(?:sent|delegated|read|waited on|listed|requested|checked|updated|scheduled|set|searched|organized|edited|reordered|answered|asked|handed off|registered|deleted|cloned|forgot|prepared|discarded|linked|unlinked|watching|stopped watching|started|used|previewed|rendered|changed|received|ran|created|performed|tried to)\b)/iu,
  );
  if (parts.length === 1) return null;
  const translated = parts.map((part) =>
    translateSharedTimelineLabel(part.charAt(0).toUpperCase() + part.slice(1), t),
  );
  const everyPartTranslated = translated.every(
    (part, index) =>
      part !== parts[index] &&
      part !== parts[index]!.charAt(0).toUpperCase() + parts[index]!.slice(1),
  );
  return everyPartTranslated ? translated.join("，") : null;
}
