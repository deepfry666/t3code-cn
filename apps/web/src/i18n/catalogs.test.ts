import { describe, expect, it } from "vite-plus/test";

import { themeEditorUiMessages } from "../components/settings/themeEditorUi.messages";
import { settingsDetailUiMessages } from "../components/settings/settingsDetailUi.messages";
import { composerUiMessages } from "../components/chat/composerUi.messages";
import { themeUiMessages } from "../components/settings/themeUi.messages";
import { chatUiMessages } from "../components/chat/chatUi.messages";
import { timelineUiMessages } from "../components/chat/timelineUi.messages";
import { threadPanelUiMessages } from "../components/chat/threadPanelUi.messages";
import { coreUiMessages } from "../components/coreUi.messages";
import { settingsContentMessages } from "../components/settings/settingsContent.messages";
import { generalMessages } from "../components/settings/generalMessages";
import { settingsShellMessages } from "../components/settings/settingsShell.messages";
import { settingsMessages } from "../components/settings/settingsMessages";
import { settingsPanelsMessages } from "../components/settings/settingsPanels.messages";
import { settingsThreadsMessages } from "../components/settings/settingsThreads.messages";
import { settingsProvidersMessages } from "../components/settings/settingsProviders.messages";
import { settingsProviderAccountsMessages } from "../components/settings/settingsProviderAccounts.messages";
import { settingsConnectionsMessages } from "../components/settings/settingsConnections.messages";
import { settingsDevicesMessages } from "../components/settings/settingsDevices.messages";
import { settingsCodeMessages } from "../components/settings/settingsCode.messages";
import { settingsVoiceMessages } from "../components/settings/settingsVoice.messages";
import { settingsMaintenanceMessages } from "../components/settings/settingsMaintenance.messages";
import { themeErrorMessages } from "../components/settings/themeErrorMessages";
import { deviceToolVersionsMessages } from "../components/device/deviceToolVersions.messages";
import { mediaUiMessages } from "../components/media/mediaUi.messages";
import { previewUiMessages } from "../components/preview/previewUi.messages";
import { browserUiMessages } from "../browser/browserUi.messages";
import { deviceUiMessages } from "../components/device/deviceUi.messages";
import { deviceDetailMessages } from "../components/device/deviceDetail.messages";
import { usagePricesMessages } from "../components/usage/usagePrices.messages";
import { usageUiMessages } from "../components/usage/usageUi.messages";
import { sidebarUiMessages } from "../components/sidebar/sidebarUi.messages";
import { commandPaletteUiMessages } from "../components/commandPaletteUi.messages";
import { globalUiMessages } from "../components/globalUi.messages";
import { rightPanelTabsUiMessages } from "../components/rightPanelTabsUi.messages";
import { onboardingUiMessages } from "../components/onboarding/onboardingUi.messages";
import { desktopUiMessages } from "../components/desktop/desktopUi.messages";
import { diffsUiMessages } from "../components/diffs/diffsUi.messages";
import { filesUiMessages } from "../components/files/filesUi.messages";
import { gitUiMessages } from "../components/gitUi.messages";
import { projectScriptsUiMessages } from "../components/projectScriptsUi.messages";
import { pullRequestUiMessages } from "../components/pullRequest/pullRequestUi.messages";
import { timestampFormatMessages } from "../timestampFormat.messages";
import { translate } from "./locale";

const catalogs: Record<string, Readonly<Record<string, string>>> = {
  deviceToolVersions: deviceToolVersionsMessages,
  sidebar: sidebarUiMessages,
  commandPalette: commandPaletteUiMessages,
  global: globalUiMessages,
  rightPanelTabs: rightPanelTabsUiMessages,
  onboarding: onboardingUiMessages,
  desktop: desktopUiMessages,
  diffs: diffsUiMessages,
  files: filesUiMessages,
  git: gitUiMessages,
  projectScripts: projectScriptsUiMessages,
  pullRequest: pullRequestUiMessages,
  chat: chatUiMessages,
  timeline: timelineUiMessages,
  threadPanel: threadPanelUiMessages,
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
  settingsThreads: settingsThreadsMessages,
  settingsProviders: settingsProvidersMessages,
  settingsProviderAccounts: settingsProviderAccountsMessages,
  settingsConnections: settingsConnectionsMessages,
  settingsDevices: settingsDevicesMessages,
  settingsCode: settingsCodeMessages,
  settingsVoice: settingsVoiceMessages,
  settingsMaintenance: settingsMaintenanceMessages,
  usageUi: usageUiMessages,
  timestampFormat: timestampFormatMessages,
  usagePrices: usagePricesMessages,
  deviceUi: deviceUiMessages,
  deviceDetail: deviceDetailMessages,
  mediaUi: mediaUiMessages,
  previewUi: previewUiMessages,
  browserUi: browserUiMessages,
  themeErrors: themeErrorMessages,
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
