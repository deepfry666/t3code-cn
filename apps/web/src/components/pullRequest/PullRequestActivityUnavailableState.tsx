import { RefreshIcon } from "~/components/ui/refresh-icon";

import { useLocale, useTranslation } from "~/i18n/useTranslation";
import { cn } from "~/lib/utils";

import { Button } from "../ui/button";
import { pullRequestUiMessages, translatePullRequestLabel } from "./pullRequestUi.messages";

export function PullRequestActivityUnavailableState({
  error,
  term,
  onRetry,
  compact = false,
}: {
  error: string;
  /** The host's word for a change request, as in "pull request". */
  term: string;
  onRetry: () => void;
  compact?: boolean;
}) {
  const t = useTranslation(pullRequestUiMessages);
  const locale = useLocale();
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-center",
        compact ? "py-3" : "min-h-48 px-4 py-10",
      )}
    >
      <p className="text-sm font-medium text-foreground">
        {t("Could not load {kind} activity", {
          kind: translatePullRequestLabel(term, locale),
        })}
      </p>
      <p className="max-w-md text-xs text-muted-foreground">{error}</p>
      <Button size="sm" variant="outline" onClick={onRetry}>
        <RefreshIcon aria-hidden size="sm" />
        {t("Retry")}
      </Button>
    </div>
  );
}
