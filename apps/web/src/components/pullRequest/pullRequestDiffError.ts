import { readLocale, translateNow } from "~/i18n/useTranslation";

import { pullRequestUiMessages, translatePullRequestLabel } from "./pullRequestUi.messages";

/** Diff failures currently include transport wrappers, so recognize the reason inside them. */
export function describePullRequestDiffError(error: string, providerName: string, term: string) {
  if (/\brate limit\b|\brate[-_]limited\b|\btoo many requests\b/i.test(error)) {
    return {
      title: translateNow(pullRequestUiMessages, "{provider} rate limit reached", {
        provider: providerName,
      }),
      description: translateNow(
        pullRequestUiMessages,
        "{provider} is temporarily limiting requests, so this diff couldn't be loaded. Try again after the limit resets, or view the changes on {provider}.",
        { provider: providerName },
      ),
    };
  }

  return {
    title: translateNow(pullRequestUiMessages, "Couldn't load the changes"),
    description: translateNow(
      pullRequestUiMessages,
      "The environment couldn't load this {kind}'s diff. Try again, or view the changes on {provider}.",
      { kind: translatePullRequestLabel(term, readLocale()), provider: providerName },
    ),
  };
}
