import type { ServerProviderUsageWindow } from "@t3tools/contracts";

import { translateNow } from "~/i18n/useTranslation";
import { usageUiMessages } from "./usageUi.messages";

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

/** `2h 5m`, in the interface locale. */
export function formatUsageDuration(ms: number): string {
  const days = Math.floor(ms / DAY_MS);
  const hours = Math.floor((ms % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((ms % HOUR_MS) / MINUTE_MS);
  if (days > 0) return translateNow(usageUiMessages, "{days}d {hours}h", { days, hours });
  if (hours > 0) return translateNow(usageUiMessages, "{hours}h {minutes}m", { hours, minutes });
  return translateNow(usageUiMessages, "{minutes}m", { minutes });
}

type ResetState =
  | { readonly kind: "now" }
  | { readonly kind: "momentarily" }
  | { readonly kind: "in"; readonly ms: number };

// Same thresholds as the shared `formatResetsIn`, which words the countdown for mobile.
function resetState(window: ServerProviderUsageWindow, now: number): ResetState | null {
  if (window.resetsAt === undefined) return null;
  const resetsAt = Date.parse(window.resetsAt);
  if (!Number.isFinite(resetsAt)) return null;
  if (resetsAt <= now) return { kind: "now" };
  if (resetsAt - now < MINUTE_MS) return { kind: "momentarily" };
  return { kind: "in", ms: resetsAt - now };
}

export function formatResetsIn(window: ServerProviderUsageWindow, now: number): string | null {
  const state = resetState(window, now);
  if (state === null) return null;
  if (state.kind === "now") return translateNow(usageUiMessages, "resets now");
  if (state.kind === "momentarily") return translateNow(usageUiMessages, "Resets momentarily");
  return translateNow(usageUiMessages, "resets in {duration}", {
    duration: formatUsageDuration(state.ms),
  });
}

/** The countdown alone, for rows that already say when the window resets. */
export function formatResetsInShort(window: ServerProviderUsageWindow, now: number): string | null {
  const state = resetState(window, now);
  if (state === null) return null;
  if (state.kind === "now") return translateNow(usageUiMessages, "resets now");
  if (state.kind === "momentarily") return translateNow(usageUiMessages, "Resets momentarily");
  return translateNow(usageUiMessages, "in {duration}", {
    duration: formatUsageDuration(state.ms),
  });
}
