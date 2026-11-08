import type { KeybindingCommand, ResolvedKeybindingsConfig } from "@t3tools/contracts";
import type { UsageChartMetric } from "./UsageProviderChart";
import type { usageUiMessages } from "./usageUi.messages";
import { resolveShortcutCommand, type ShortcutEventLike } from "../../keybindings";

export type UsageMetric = UsageChartMetric | "limits";

/** Option labels are catalog keys; the usage page passes them through `t()`. */
type OptionLabel = keyof typeof usageUiMessages;

export const METRIC_OPTIONS = [
  { value: "cost", label: "Cost", command: "usage.cost" },
  { value: "tokens", label: "Tokens", command: "usage.tokens" },
  { value: "limits", label: "Limits", command: "usage.limits" },
] as const satisfies readonly {
  value: UsageMetric;
  label: OptionLabel;
  command: KeybindingCommand;
}[];

export const WINDOW_OPTIONS = [
  { days: 1, label: "Past 24h", command: "usage.period.day" },
  { days: 7, label: "7 days", command: "usage.period.week" },
  { days: 30, label: "30 days", command: "usage.period.month" },
  { days: 90, label: "90 days", command: "usage.period.quarter" },
] as const satisfies readonly { days: number; label: OptionLabel; command: KeybindingCommand }[];

export function resolveUsageShortcut(
  event: ShortcutEventLike & { target: EventTarget | null },
  keybindings: ResolvedKeybindingsConfig,
) {
  const target = event.target;
  if (
    target instanceof HTMLElement &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable ||
      target.closest(
        '[role="dialog"]:not([data-app-modal]), [aria-modal="true"]:not([data-app-modal]), [data-slot$="popup"]:not([data-app-modal])',
      ))
  ) {
    return null;
  }

  return resolveShortcutCommand(event, keybindings, {
    context: { usagePageOpen: true },
  });
}
