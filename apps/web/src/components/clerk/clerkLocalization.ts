import { zhCN } from "@clerk/localizations/zh-CN";

import type { Locale } from "../../i18n/locale";

// Clerk replaces the whole localization on update and falls back to its built-in English for
// missing keys, so an empty object switches back to English. Stable references avoid re-updates.
const ENGLISH = {};

export function clerkLocalization(locale: Locale) {
  return locale === "zh-CN" ? zhCN : ENGLISH;
}
