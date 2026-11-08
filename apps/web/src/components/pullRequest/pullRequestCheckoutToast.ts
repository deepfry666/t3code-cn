import type { ChangeRequestTerminology } from "@t3tools/client-runtime/source-control-clients";

import { readLocale, translateNow } from "~/i18n/useTranslation";

import { pullRequestUiMessages, translatePullRequestLabel } from "./pullRequestUi.messages";

export function offHeadPullRequestCheckoutToast(terminology: ChangeRequestTerminology) {
  return {
    type: "warning",
    title: translateNow(
      pullRequestUiMessages,
      "Checked out, but not confirmed on the latest commit",
    ),
    description: translateNow(
      pullRequestUiMessages,
      "This checkout could not be confirmed at the {kind}'s latest commit, so its code may differ. Local commits or uncommitted work keep a checkout where it is.",
      { kind: translatePullRequestLabel(terminology.singular, readLocale()) },
    ),
  } as const;
}
