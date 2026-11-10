import { useSyncExternalStore } from "react";

import { LOCALE_STORAGE_KEY, resolveLocale, translate, type Locale } from "./locale";

const listeners = new Set<() => void>();
let memoryLocale: Locale | undefined;

let desktopLanguages:
  | { readonly bridge: object; readonly languages: readonly string[] }
  | undefined;

// Packaged desktop pins `navigator.languages` to en-US, so the OS's own list leads. Read once per
// bridge: this runs on every render and the bridge call is synchronous IPC.
function systemLanguages(): readonly string[] {
  const bridge = typeof window === "undefined" ? undefined : window.desktopBridge;
  if (bridge?.getPreferredSystemLanguages) {
    if (desktopLanguages?.bridge !== bridge) {
      desktopLanguages = { bridge, languages: bridge.getPreferredSystemLanguages() };
    }
    if (desktopLanguages.languages.length > 0) return desktopLanguages.languages;
  }
  return typeof navigator === "undefined" ? [] : (navigator.languages ?? []);
}

/** For toasts raised outside React; components use `useLocale`. */
export function readLocale(): Locale {
  if (memoryLocale) return memoryLocale;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    // Blocked storage falls back to the system language.
  }
  return resolveLocale(saved, systemLanguages());
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
