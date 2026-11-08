import { useTranslation } from "~/i18n/useTranslation";

import type { PullRequestReplyAvailability } from "./pullRequestDetail.logic";
import { pullRequestUiMessages } from "./pullRequestUi.messages";

export function PullRequestMoreReplies({
  moreReplies,
  hasMoreReplies,
  url,
}: PullRequestReplyAvailability) {
  const t = useTranslation(pullRequestUiMessages);
  if (!hasMoreReplies) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-2 py-1 text-xs text-muted-foreground">
      <span>
        {moreReplies > 0
          ? moreReplies === 1
            ? t("{count} more reply", { count: moreReplies.toLocaleString() })
            : t("{count} more replies", { count: moreReplies.toLocaleString() })
          : t("More replies")}
      </span>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground hover:underline"
        >
          {t("View on host")}
        </a>
      ) : null}
    </div>
  );
}
