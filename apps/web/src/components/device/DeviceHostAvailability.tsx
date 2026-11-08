import type { DevicePlatformAvailability } from "@t3tools/contracts";
import { Check, Minus } from "lucide-react";
import { useTranslation } from "~/i18n/useTranslation";
import { deviceUiMessages } from "./deviceUi.messages";
import { Tooltip, TooltipTrigger, TooltipPopup } from "../ui/tooltip";

export function DeviceHostAvailability({
  platforms,
}: {
  platforms: ReadonlyArray<DevicePlatformAvailability>;
}) {
  const t = useTranslation(deviceUiMessages);
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {platforms.map((platform) => (
        <Tooltip key={platform.platform}>
          <TooltipTrigger render={<span tabIndex={0} className="inline-flex items-center gap-1" />}>
            {platform.available ? <Check className="size-3" /> : <Minus className="size-3" />}
            {t(platform.available ? "{platform} available" : "{platform} not available", {
              platform: platform.platform === "ios" ? "iOS" : "Android",
            })}
          </TooltipTrigger>
          <TooltipPopup>
            {platform.reason ??
              (platform.platform === "ios" ? t("iOS available") : t("Android available"))}
          </TooltipPopup>
        </Tooltip>
      ))}
    </div>
  );
}
