import { describe, expect, it } from "vite-plus/test";

import { themeEditorUiMessages } from "../components/settings/themeEditorUi.messages";
import { settingsDetailUiMessages } from "../components/settings/settingsDetailUi.messages";
import { composerUiMessages } from "../components/chat/composerUi.messages";
import { themeUiMessages } from "../components/settings/themeUi.messages";
import { chatUiMessages } from "../components/chat/chatUi.messages";
import { coreUiMessages } from "../components/coreUi.messages";
import { settingsContentMessages } from "../components/settings/settingsContent.messages";
import { generalMessages } from "../components/settings/generalMessages";
import { settingsShellMessages } from "../components/settings/settingsShell.messages";
import { settingsMessages } from "../components/settings/settingsMessages";
import { settingsPanelsMessages } from "../components/settings/settingsPanels.messages";
import { translate } from "./locale";

const catalogs: Record<string, Readonly<Record<string, string>>> = {
  chat: chatUiMessages,
  composer: composerUiMessages,
  theme: themeUiMessages,
  themeEditor: themeEditorUiMessages,
  settingsDetail: settingsDetailUiMessages,
  core: coreUiMessages,
  settings: settingsMessages,
  settingsShell: settingsShellMessages,
  settingsContent: settingsContentMessages,
  general: generalMessages,
  settingsPanels: settingsPanelsMessages,
};
const placeholders = (value: string) =>
  [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();

describe.each(Object.entries(catalogs))("%s localization catalog", (_name, catalog) => {
  it("preserves every source placeholder and keeps English fallback unchanged", () => {
    for (const [source, localized] of Object.entries(catalog)) {
      expect(localized.trim(), source).not.toBe("");
      expect(placeholders(localized), source).toEqual(placeholders(source));
      expect(translate("en", catalog, source), source).toBe(source.split("@@")[0]);
    }
  });
});
