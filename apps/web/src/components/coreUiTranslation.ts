import { translate } from "../i18n/locale";
import { coreUiMessages } from "./coreUi.messages";

export type CoreUiTranslator = (
  key: keyof typeof coreUiMessages,
  params?: Readonly<Record<string, string | number>>,
) => string;

export const translateCoreUiEnglish: CoreUiTranslator = (key, params) =>
  translate("en", coreUiMessages, key, params);
