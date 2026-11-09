import type { EnvironmentId } from "@t3tools/contracts";
import type { TimestampFormat } from "@t3tools/contracts/settings";
import {
  pickSnoozePreset as pickSharedSnoozePreset,
  resolveSnoozePresets as resolveSharedSnoozePresets,
  snoozeWakeLabel,
  type SnoozePreset,
} from "@t3tools/client-runtime/state/thread-settled";

import { readLocale, translateNow } from "~/i18n/useTranslation";
import { appAtomRegistry } from "../rpc/atomRegistry";
import { sidebarUiMessages } from "./sidebar/sidebarUi.messages";
import { serverEnvironment } from "../state/server";
import { formatShortTimestamp } from "../timestampFormat";
import { translateSnoozeWhen, translateThreadsLabel } from "./settings/settingsThreads.messages";
import { toastManager } from "./ui/toast";

export { snoozeWakeLabel, type SnoozePreset };

/** The snooze menu for a thread, from its environment's presets, read when the menu opens. */
export function resolveSnoozePresets(
  now: Date,
  timestampFormat: TimestampFormat,
  environmentId: EnvironmentId,
): ReadonlyArray<SnoozePreset> {
  return resolveSharedSnoozePresets(now, snoozeOptions(timestampFormat, environmentId)).map(
    (preset) => localizePreset(preset, now),
  );
}

/** A shown menu choice as picked; see the shared `pickSnoozePreset`. */
export function pickSnoozePreset(
  shown: ReadonlyArray<SnoozePreset>,
  id: string,
  timestampFormat: TimestampFormat,
  environmentId: EnvironmentId,
): SnoozePreset | undefined {
  const picked = pickSharedSnoozePreset({
    shown,
    id,
    now: new Date(),
    ...snoozeOptions(timestampFormat, environmentId),
  });
  if (!picked) {
    toastManager.add({
      type: "warning",
      title: "Could not snooze thread",
      description: translateNow(
        sidebarUiMessages,
        "That snooze time has passed. Choose another time.",
      ),
    });
  }
  return picked;
}

// The shared presets are English; the menu is built when it opens, so reading the locale then is enough.
function localizePreset(preset: SnoozePreset, now: Date): SnoozePreset {
  const locale = readLocale();
  return {
    ...preset,
    label: translateThreadsLabel(preset.label, locale),
    whenLabel: translateSnoozeWhen(preset, now, locale),
  };
}

function snoozeOptions(timestampFormat: TimestampFormat, environmentId: EnvironmentId) {
  const presets = appAtomRegistry.get(
    serverEnvironment.settingsValueAtom(environmentId),
  )?.snoozePresets;
  return {
    ...(presets ? { presets } : {}),
    formatTime: (date: Date) => formatShortTimestamp(date.toISOString(), timestampFormat),
  };
}
