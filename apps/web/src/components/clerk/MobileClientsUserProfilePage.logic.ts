import type { RelayClientDeviceRecord } from "@t3tools/contracts/relay";

import { translate, type Locale } from "../../i18n/locale";
import { clerkUiMessages } from "./clerkUi.messages";

const mobileClientUpdatedAtFormatters = {
  en: new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }),
  "zh-CN": new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }),
} satisfies Record<Locale, Intl.DateTimeFormat>;

const NOTIFICATION_PREFERENCES = [
  ["notifyOnApproval", "approvals@@alert"],
  ["notifyOnInput", "input requests@@alert"],
  ["notifyOnCompletion", "completions@@alert"],
  ["notifyOnFailure", "failures@@alert"],
] as const satisfies ReadonlyArray<
  readonly [keyof RelayClientDeviceRecord["notifications"], keyof typeof clerkUiMessages]
>;

export function mobileClientPlatformLabel(device: RelayClientDeviceRecord): string {
  const platform =
    device.platform === "android"
      ? "Android"
      : device.iosMajorVersion === null
        ? "iOS"
        : `iOS ${device.iosMajorVersion}`;
  return `${platform}${device.appVersion ? ` · T3 Code ${device.appVersion}` : ""}`;
}

export function mobileClientNotificationDetail(
  device: RelayClientDeviceRecord,
  locale: Locale,
): string {
  if (!device.notifications.enabled) {
    return translate(locale, clerkUiMessages, "Push notifications are disabled on this device.");
  }

  const enabledPreferences = NOTIFICATION_PREFERENCES.flatMap(([preference, label]) =>
    device.notifications[preference] ? [translate(locale, clerkUiMessages, label)] : [],
  );
  return enabledPreferences.length > 0
    ? translate(locale, clerkUiMessages, "Alerts enabled for {types}.", {
        types: enabledPreferences.join(locale === "zh-CN" ? "、" : ", "),
      })
    : translate(
        locale,
        clerkUiMessages,
        "Push notifications are enabled, but no alert types are selected.",
      );
}

export function mobileClientUpdatedAtLabel(updatedAt: string, locale: Locale): string {
  const date = new Date(updatedAt);
  return Number.isNaN(date.getTime())
    ? translate(locale, clerkUiMessages, "Update time unavailable")
    : translate(locale, clerkUiMessages, "Updated {date}", {
        date: mobileClientUpdatedAtFormatters[locale].format(date),
      });
}
