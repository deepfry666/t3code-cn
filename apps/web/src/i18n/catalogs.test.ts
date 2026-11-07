import { describe, expect, it } from "vite-plus/test";

import { composerUiMessages } from "../components/chat/composerUi.messages";
import { themeUiMessages } from "../components/settings/themeUi.messages";
import { chatUiMessages } from "../components/chat/chatUi.messages";
import { coreUiMessages } from "../components/coreUi.messages";
import { settingsContentMessages } from "../components/settings/settingsContent.messages";
import { settingsMessages } from "../components/settings/settingsMessages";
import { translate } from "./locale";

const catalogs: Record<string, Readonly<Record<string, string>>> = {
  chat: chatUiMessages,
  composer: composerUiMessages,
  theme: themeUiMessages,
  core: coreUiMessages,
  settings: settingsMessages,
  settingsContent: settingsContentMessages,
};
const placeholders = (value: string) =>
  [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

describe.each(Object.entries(catalogs))("%s localization catalog", (_name, catalog) => {
  it("preserves every source placeholder and keeps English fallback unchanged", () => {
    for (const [source, localized] of Object.entries(catalog)) {
      expect(localized.trim(), source).not.toBe("");
      expect(placeholders(localized), source).toEqual(placeholders(source));
      expect(translate("en", catalog, source), source).toBe(source);
    }
  });
});
