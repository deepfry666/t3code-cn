import { useLocale, useTranslation } from "~/i18n/useTranslation";
import {
  settingsMaintenanceMessages,
  translateMaintenanceLabel,
} from "./settingsMaintenance.messages";
import { APP_VERSION } from "../../branding";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { InlineButton } from "../ui/button";
import { stackedThreadToast, toastManager } from "../ui/toast";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";

export function AboutVersionTitle() {
  const t = useTranslation(settingsMaintenanceMessages);
  const locale = useLocale();
  const { copyToClipboard } = useCopyToClipboard<void>({
    target: "version",
    onError: (error) => {
      toastManager.add(
        stackedThreadToast({
          type: "error",
          title: t("Could not copy version"),
          description: translateMaintenanceLabel(error.message, locale),
        }),
      );
    },
  });

  return (
    <span className="inline-flex items-baseline gap-2">
      <span>{t("Version")}</span>
      <code className="text-2xs font-medium">
        <Tooltip>
          <TooltipTrigger
            render={
              <InlineButton
                tone="muted"
                aria-label={t("Copy version {APP_VERSION}", { APP_VERSION })}
                onClick={() => copyToClipboard(APP_VERSION, undefined)}
              >
                {APP_VERSION}
              </InlineButton>
            }
          />
          <TooltipPopup>{t("Copy version")}</TooltipPopup>
        </Tooltip>
      </code>
    </span>
  );
}
