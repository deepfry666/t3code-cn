export function migrateLanguage(
  language: string | undefined,
  legacy: string | null,
): string | undefined {
  // Persistence decoders fill missing fields, so old profiles already arrive with a default language.
  return legacy === "zh-CN" ? "zh" : legacy === "en" ? "en" : language;
}
