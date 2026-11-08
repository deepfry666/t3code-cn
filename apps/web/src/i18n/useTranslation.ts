import { useSyncExternalStore } from "react";

import { LOCALE_STORAGE_KEY, resolveLocale, translate, type Locale } from "./locale";

const listeners = new Set<() => void>();
let memoryLocale: Locale | undefined;

function readLocale(): Locale {
  if (memoryLocale) return memoryLocale;
  try {
    return resolveLocale(localStorage.getItem(LOCALE_STORAGE_KEY), navigator.languages);
  } catch {
    return resolveLocale(null, typeof navigator === "undefined" ? [] : navigator.languages);
  }
}

function publishLocale() {
  if (typeof document !== "undefined") document.documentElement.lang = readLocale();
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== LOCALE_STORAGE_KEY) return;
  memoryLocale = undefined;
  publishLocale();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  document.documentElement.lang = readLocale();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

export function setLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    memoryLocale = undefined;
  } catch {
    memoryLocale = locale;
    // Keep this session usable when browser storage is unavailable.
  }
  publishLocale();
}

const serverLocale = (): Locale => "en";

export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, readLocale, serverLocale);
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
