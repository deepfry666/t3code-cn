import { translate } from "~/i18n/locale";
import { composerUiMessages } from "./composerUi.messages";
import { threadPanelUiMessages } from "./threadPanelUi.messages";

type CatalogTranslator<Messages> = (
  key: Extract<keyof Messages, string>,
  params?: Readonly<Record<string, string | number>>,
) => string;

export type ComposerTranslator = CatalogTranslator<typeof composerUiMessages>;
export type ThreadPanelTranslator = CatalogTranslator<typeof threadPanelUiMessages>;

/** Default for logic shared with tests and other surfaces that do not pass a translator. */
export const englishComposer: ComposerTranslator = (key, params) =>
  translate("en", composerUiMessages, key, params);
export const englishThreadPanel: ThreadPanelTranslator = (key, params) =>
  translate("en", threadPanelUiMessages, key, params);
