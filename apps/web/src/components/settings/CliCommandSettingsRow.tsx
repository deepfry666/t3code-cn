import { useLocalizedSetting } from "./useLocalizedSetting";
import { useTranslation } from "~/i18n/useTranslation";
import { settingsMaintenanceMessages } from "./settingsMaintenance.messages";
import { useState } from "react";

import {
  desktopCliCommandStateAtom,
  getDesktopCliCommandBridge,
  refreshDesktopCliCommandState,
} from "~/state/desktopCliCommand";
import { useEnvironmentQuery } from "~/state/query";
import { Button } from "../ui/button";
import { stackedThreadToast, toastManager } from "../ui/toast";
import { SettingsRow } from "./settingsLayout";

export function CliCommandSettingsRow() {
  const localizedSetting = useLocalizedSetting();
  const t = useTranslation(settingsMaintenanceMessages);
  const bridge = getDesktopCliCommandBridge();
  const query = useEnvironmentQuery(bridge ? desktopCliCommandStateAtom : null);
  const state = query.data;
  const [pending, setPending] = useState(false);

  const change = (action: "install" | "uninstall") => {
    if (!bridge || pending) return;
    setPending(true);
    void bridge[action]()
      .then(refreshDesktopCliCommandState)
      .catch((error: unknown) => {
        toastManager.add(
          stackedThreadToast({
            type: "error",
            title:
              action === "install" ? t("Could not install t3-cn") : t("Could not remove t3-cn"),
            description: error instanceof Error ? error.message : t("Something went wrong."),
          }),
        );
      })
      .finally(() => setPending(false));
  };

  if (!bridge || !state?.supported) return null;
  const installed = state.installedPath !== null;
  const description = state.shadowedBy
    ? t(
        "Another t3-cn at {shadowedBy} runs first in a new terminal. Remove it to use T3 Code CN's.",
        { shadowedBy: state.shadowedBy },
      )
    : !installed
      ? t("Run T3 Code CN's CLI as `t3-cn` from any terminal.")
      : state.onPath
        ? t("Installed at {installedPath}. Open a new terminal to use it.", {
            installedPath: state.installedPath,
          })
        : t(
            "Installed at {installedPath}, which is not on your PATH yet. Add its folder to your PATH to run `t3-cn`.",
            { installedPath: state.installedPath },
          );

  return (
    <SettingsRow
      {...localizedSetting("cli-command")}
      description={description}
      control={
        <Button
          size="sm"
          variant="outline"
          disabled={pending || query.isPending || (!installed && Boolean(state.shadowedBy))}
          onClick={() => change(installed ? "uninstall" : "install")}
        >
          {installed ? t("Remove") : t("Install")}
        </Button>
      }
    />
  );
}
