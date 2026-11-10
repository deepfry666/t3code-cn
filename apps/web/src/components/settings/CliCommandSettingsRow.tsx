import { useLocalizedSetting } from "./useLocalizedSetting";
import { readLocale, useTranslation } from "~/i18n/useTranslation";
import {
  settingsMaintenanceMessages,
  translateMaintenanceLabel,
} from "./settingsMaintenance.messages";
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

const FAILURE_TITLES = {
  install: "Could not install t3",
  uninstall: "Could not remove t3",
  addToPath: "Could not add t3 to PATH",
} as const;

/** The desktop `t3` command's state, and its actions with a toast on failure. */
export function useDesktopCliCommand() {
  const t = useTranslation(settingsMaintenanceMessages);
  const bridge = getDesktopCliCommandBridge();
  const query = useEnvironmentQuery(bridge ? desktopCliCommandStateAtom : null);
  const [pending, setPending] = useState(false);

  const run = (action: keyof typeof FAILURE_TITLES) => {
    if (!bridge || pending) return;
    setPending(true);
    void bridge[action]()
      .then(refreshDesktopCliCommandState)
      .catch((error: unknown) => {
        toastManager.add(
          stackedThreadToast({
            type: "error",
            title: t(FAILURE_TITLES[action]),
            description:
              error instanceof Error
                ? translateMaintenanceLabel(error.message, readLocale())
                : t("Something went wrong."),
          }),
        );
      })
      .finally(() => setPending(false));
  };

  return {
    state: bridge ? query.data : undefined,
    busy: pending || query.isPending,
    run,
  };
}

export function CliCommandSettingsRow() {
  const localizedSetting = useLocalizedSetting();
  const t = useTranslation(settingsMaintenanceMessages);
  const { state, busy, run } = useDesktopCliCommand();

  if (!state?.supported) return null;
  const installed = state.installedPath !== null;
  const description = state.shadowedBy
    ? t("Another t3 at {shadowedBy} runs first in a new terminal. Remove it to use T3 Code's.", {
        shadowedBy: state.shadowedBy,
      })
    : !installed
      ? t("Run T3 Code's CLI as `t3` from any terminal.")
      : state.onPath
        ? t("Installed at {installedPath}. Open a new terminal to use it.", {
            installedPath: state.installedPath,
          })
        : state.pathSetup?.added
          ? t(
              "Installed at {installedPath} and added to PATH in {file}. Open a new terminal to use it.",
              { installedPath: state.installedPath, file: state.pathSetup.file },
            )
          : state.pathSetup
            ? t("Installed at {installedPath}, which is not on your PATH yet.", {
                installedPath: state.installedPath,
              })
            : t(
                "Installed at {installedPath}, which is not on your PATH yet. Add its folder to your PATH to run `t3`.",
                { installedPath: state.installedPath },
              );

  return (
    <SettingsRow
      {...localizedSetting("cli-command")}
      description={description}
      control={
        <div className="flex gap-2">
          {state.pathSetup && !state.pathSetup.added ? (
            <Button size="sm" variant="outline" disabled={busy} onClick={() => run("addToPath")}>
              {t("Add to PATH")}
            </Button>
          ) : null}
          <Button
            size="sm"
            variant="outline"
            disabled={busy || (!installed && Boolean(state.shadowedBy))}
            onClick={() => run(installed ? "uninstall" : "install")}
          >
            {installed ? t("Remove") : t("Install")}
          </Button>
        </div>
      }
    />
  );
}
