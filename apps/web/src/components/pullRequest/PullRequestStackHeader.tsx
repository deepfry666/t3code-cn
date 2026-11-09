import { useLocale, useTranslation } from "~/i18n/useTranslation";

import { MenuGroupLabel } from "../ui/menu";
import { pullRequestUiMessages, translatePullRequestLabel } from "./pullRequestUi.messages";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";

export function PullRequestStackHeader({
  number,
  notice,
  stale = false,
}: {
  number: number;
  notice?: string | null | undefined;
  stale?: boolean;
}) {
  const t = useTranslation(pullRequestUiMessages);
  const locale = useLocale();
  return (
    <MenuGroupLabel>
      <div className="flex items-center justify-between gap-2">
        <span>{t("Stack #{number}", { number })}</span>
        {notice ? (
          <Tooltip>
            <TooltipTrigger render={<span role="status" className="text-xs font-normal" />}>
              {stale ? t("May be stale") : t("Refreshing…")}
            </TooltipTrigger>
            <TooltipPopup>{translatePullRequestLabel(notice, locale)}</TooltipPopup>
          </Tooltip>
        ) : null}
      </div>
    </MenuGroupLabel>
  );
}
