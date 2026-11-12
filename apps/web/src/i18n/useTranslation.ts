import { useSyncExternalStore } from "react";

import { translate } from "./locale";
import { readLocale, subscribeForkLocale } from "./forkLocale";
export { readLocale } from "./forkLocale";

export function useLocale() {
  return useSyncExternalStore(subscribeForkLocale, readLocale, () => "en" as const);
}

export function useTranslation<const Messages extends Readonly<Record<string, string>>>(
  messages: Messages,
) {
  const locale = useLocale();
  return (
    key: Extract<keyof Messages, string>,
    params?: Readonly<Record<string, string | number>>,
  ) => translate(locale, messages, key, params);
}

// For imperative text outside render, such as toasts and native context menus.
export function translateNow<const Messages extends Readonly<Record<string, string>>>(
  messages: Messages,
  key: Extract<keyof Messages, string>,
  params?: Readonly<Record<string, string | number>>,
): string {
  return translate(readLocale(), messages, key, params);
}
