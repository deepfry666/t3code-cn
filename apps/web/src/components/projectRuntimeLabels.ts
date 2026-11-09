import { createLabelTranslator } from "../i18n/labelTranslation";
import { translate, type Locale } from "../i18n/locale";
import { commandPaletteUiMessages } from "./commandPaletteUi.messages";

const translateLabel = createLabelTranslator(commandPaletteUiMessages, [
  "Enter the full owner/repository name.",
  "Provider status unavailable. Open Source Control settings and rescan.",
  "Enter a project path.",
  "Windows-style paths are only supported on Windows environments.",
  "Relative paths require an active project in this environment.",
  "No project in this environment can read {host}/{repository}.",
]);
export function translateProjectRuntimeLabel(label: string, locale: Locale): string {
  return translateLabel(label, (key, params) =>
    translate(locale, commandPaletteUiMessages, key, params),
  );
}
