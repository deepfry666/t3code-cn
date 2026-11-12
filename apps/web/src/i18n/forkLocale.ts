import type { Locale } from "./locale";

let locale: Locale = "en";
const listeners = new Set<() => void>();
export const readLocale = (): Locale => locale;
export function activateForkLocale(language: string): void {
  const next = language === "zh" ? "zh-CN" : "en";
  if (next === locale) return;
  locale = next;
  for (const listener of listeners) listener();
}
export function subscribeForkLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
