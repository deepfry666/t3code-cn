import { formatHourShort, usageDayOffset } from "@t3tools/shared/usageFormat";

import { translate, type Locale } from "~/i18n/locale";
import { usageUiMessages } from "./usageUi.messages";

// Shared formats usage days and hours for mobile, which stays English; web formats them in
// the interface locale at the call site instead.
const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(locale: Locale, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = JSON.stringify([locale, options]);
  let cached = formatters.get(key);
  if (!cached) {
    cached = new Intl.DateTimeFormat(locale, options);
    formatters.set(key, cached);
  }
  return cached;
}

function formatDayPart(
  instant: string,
  timeZone: string | undefined,
  locale: Locale,
): string | null {
  const date = new Date(instant);
  if (Number.isNaN(date.getTime())) return null;
  return formatter(locale, { month: "short", day: "numeric", timeZone }).format(date);
}

/** `YYYY-MM-DD` names a calendar day, so format it as a UTC date to avoid shifting it. */
export function formatUsageDayLabel(day: string, locale: Locale): string {
  const [year, month, dayOfMonth] = day.split("-").map((part) => Number(part));
  if (!year || !month || !dayOfMonth) return day;
  return formatter(locale, { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, dayOfMonth)),
  );
}

/** The shared format's `Nov 7, 2 PM`, with the day part in the interface locale. */
export function formatUsageHourLabel(
  hourStart: string,
  timeZone: string,
  hour12: boolean,
  locale: Locale,
): string {
  const day = formatDayPart(hourStart, timeZone, locale);
  if (day === null) return hourStart;
  return translate(locale, usageUiMessages, "{day}, {hour}", {
    day,
    hour: formatHourShort(hourStart, timeZone, hour12),
  });
}

export function formatUsageHourTipLabel(
  hourStart: string,
  referenceTime: string | undefined,
  timeZone: string,
  hour12: boolean,
  locale: Locale,
): string {
  const hour = formatHourShort(hourStart, timeZone, hour12);
  const daysAgo =
    referenceTime === undefined ? null : usageDayOffset(hourStart, referenceTime, timeZone);
  if (daysAgo === 0) return translate(locale, usageUiMessages, "{hour} today", { hour });
  if (daysAgo === 1) return translate(locale, usageUiMessages, "{hour} yesterday", { hour });
  return formatUsageHourLabel(hourStart, timeZone, hour12, locale);
}
