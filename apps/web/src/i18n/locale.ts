export type Locale = "en" | "zh-CN";
export const LOCALE_STORAGE_KEY = "t3code-cn:locale";

// "When@@snooze" lets one English word take a different Chinese meaning per context;
// everything from "@@" on is dropped from the English text.
const CONTEXT_SEPARATOR = "@@";

/** The English text a catalog key stands for, e.g. to keep it searchable in another locale. */
export const sourceText = (key: string) => key.split(CONTEXT_SEPARATOR, 1)[0] ?? key;

export function translate<Messages extends Readonly<Record<string, string>>>(
  locale: Locale,
  messages: Messages,
  key: Extract<keyof Messages, string>,
  params: Readonly<Record<string, string | number>> = {},
): string {
  const message = locale === "zh-CN" ? (messages[key] ?? sourceText(key)) : sourceText(key);
  return message.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    Object.hasOwn(params, name) ? String(params[name]) : placeholder,
  );
}
