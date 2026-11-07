export type Locale = "en" | "zh-CN";
export const LOCALE_STORAGE_KEY = "t3code-cn:locale";

export function resolveLocale(saved: string | null, languages: readonly string[]): Locale {
  if (saved === "en" || saved === "zh-CN") return saved;
  return languages[0]?.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}

export function translate<Messages extends Readonly<Record<string, string>>>(
  locale: Locale,
  messages: Messages,
  key: Extract<keyof Messages, string>,
  params: Readonly<Record<string, string | number>> = {},
): string {
  const message = locale === "zh-CN" ? (messages[key] ?? key) : key;
  return message.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    Object.hasOwn(params, name) ? String(params[name]) : placeholder,
  );
}
