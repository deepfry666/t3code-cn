import { activateForkLocale } from "../src/i18n/forkLocale";
import type { Locale } from "../src/i18n/locale";
export function setLocale(locale: Locale): void {
  activateForkLocale(locale === "zh-CN" ? "zh" : "en");
}
