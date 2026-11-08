import { useRef } from "react";

import { Textarea } from "../ui/textarea";
import { SettingsRow, SettingResetButton } from "./settingsLayout";
import { useSettingsScope } from "./SettingsScopeContext";
import { useLocalizedSetting } from "./useLocalizedSetting";
import {
  useScopedSettings,
  useScopedSettingsMixed,
  useUpdateScopedSettings,
} from "./useScopedSettings";
import { useTranslation } from "~/i18n/useTranslation";
import { settingsThreadsMessages } from "./settingsThreads.messages";

export function ThreadTitleInstructionsSettings() {
  const localizedSetting = useLocalizedSetting();
  const t = useTranslation(settingsThreadsMessages);
  const settings = useScopedSettings();
  const { targets } = useSettingsScope();
  const scopeKey = targets.map((target) => `${target.environmentId}:${target.projectId}`).join(",");
  const edited = useRef(false);
  const updateSettings = useUpdateScopedSettings();
  const mixed = useScopedSettingsMixed(["threadTitleInstructions"]);

  return (
    <SettingsRow
      serverScoped
      settingKeys={["threadTitleInstructions"]}
      {...localizedSetting("thread-title-instructions")}
      description={t("Appended to the prompt for new and regenerated thread titles.")}
      resetAction={
        mixed || settings.threadTitleInstructions !== "" ? (
          <SettingResetButton
            label={t("thread title instructions")}
            onClick={() => updateSettings({ threadTitleInstructions: "" })}
          />
        ) : null
      }
    >
      <div className="mt-3 max-w-2xl pb-3.5">
        <Textarea
          key={`${scopeKey}:${mixed}:${settings.threadTitleInstructions}`}
          aria-label={t("Thread title instructions")}
          onChange={() => {
            edited.current = true;
          }}
          rows={4}
          defaultValue={mixed ? "" : settings.threadTitleInstructions}
          placeholder={
            mixed
              ? t("Mixed. Enter instructions to apply to all selected targets.")
              : t("Keep titles to a few words. Lead with the main subject.")
          }
          onBlur={(event) => {
            const value = event.target.value.trim();
            if (edited.current && (mixed || value !== settings.threadTitleInstructions))
              updateSettings({ threadTitleInstructions: value });
            edited.current = false;
          }}
        />
      </div>
    </SettingsRow>
  );
}
