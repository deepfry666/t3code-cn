import { translateNow } from "~/i18n/useTranslation";
import { threadTitleRegenerationToastMessages } from "./threadTitleRegenerationToast.messages";
import type { ThreadTitleRegenerationOutcome } from "@t3tools/contracts";
import {
  type AtomCommandResult,
  isAtomCommandInterrupted,
  squashAtomCommandFailure,
} from "@t3tools/client-runtime/state/runtime";

import { stackedThreadToast } from "./ui/toast";

type TitleRegenerationResult = AtomCommandResult<ThreadTitleRegenerationOutcome | null, unknown>;

function failureMessage(result: TitleRegenerationResult): string | null {
  if (result._tag === "Failure") {
    if (isAtomCommandInterrupted(result)) return null;
    const error = squashAtomCommandFailure(result);
    return error instanceof Error
      ? error.message
      : translateNow(threadTitleRegenerationToastMessages, "An error occurred.");
  }
  return result.value?.status === "failed"
    ? (result.value.message ??
        translateNow(threadTitleRegenerationToastMessages, "Title generation failed."))
    : null;
}

function isKept(result: TitleRegenerationResult): boolean {
  return result._tag === "Success" && result.value?.status === "unchanged";
}

export function titleRegenerationToast(results: ReadonlyArray<TitleRegenerationResult>) {
  const failures = results.flatMap((result) => {
    const message = failureMessage(result);
    return message === null ? [] : [message];
  });
  if (failures.length > 0) {
    return stackedThreadToast({
      type: "error",
      title:
        results.length === 1
          ? translateNow(threadTitleRegenerationToastMessages, "Failed to regenerate thread title")
          : translateNow(
              threadTitleRegenerationToastMessages,
              "Failed to regenerate {value1} of {value2} thread titles",
              { value1: String(failures.length), value2: String(results.length) },
            ),
      description: failures[0],
    });
  }
  const kept = results.filter(isKept).length;
  if (kept === 0) return null;
  if (results.length === 1) {
    return stackedThreadToast({
      type: "info",
      title: translateNow(threadTitleRegenerationToastMessages, "Title kept"),
      description: translateNow(
        threadTitleRegenerationToastMessages,
        "The current title already fits this thread.",
      ),
    });
  }
  return stackedThreadToast({
    type: "info",
    title:
      kept === results.length
        ? translateNow(threadTitleRegenerationToastMessages, "Titles kept")
        : translateNow(threadTitleRegenerationToastMessages, "Kept {value1} of {value2} titles", {
            value1: String(kept),
            value2: String(results.length),
          }),
    description:
      kept === results.length
        ? translateNow(
            threadTitleRegenerationToastMessages,
            "The current titles already fit these threads.",
          )
        : translateNow(
            threadTitleRegenerationToastMessages,
            "Those titles already fit their threads.",
          ),
  });
}
