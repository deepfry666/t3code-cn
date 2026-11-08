import type { PullRequestStack } from "@t3tools/contracts";
import { useLocale } from "~/i18n/useTranslation";
import { cn } from "~/lib/utils";
import { resolvePullRequestState } from "./pullRequestPresentation";
import { translatePullRequestLabel } from "./pullRequestUi.messages";

export function PullRequestStackLayerContent({
  layer,
  compact = false,
}: {
  layer: PullRequestStack["layers"][number];
  compact?: boolean;
}) {
  const locale = useLocale();
  const state = resolvePullRequestState({
    state: layer.state,
    isDraft: layer.isDraft ?? false,
  });
  return (
    <>
      <state.Icon aria-hidden className={cn("size-4 shrink-0", state.toneClassName)} />
      <span className="min-w-0 flex-1">
        <span className="block truncate">{layer.title || layer.headBranch}</span>
        <span className="block truncate text-xs font-normal text-muted-foreground">
          #{layer.number} · {compact ? null : `${layer.headBranch} · `}
          {translatePullRequestLabel(state.label, locale)}
        </span>
      </span>
    </>
  );
}
