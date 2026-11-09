import { createLabelTranslator } from "../../i18n/labelTranslation";
import { threadRuntimeMessages } from "./threadRuntime.messages";
import { englishComposer, type ComposerTranslator } from "./chatTranslators";
import {
  codexFeedbackNotice,
  type CodexFeedbackSubmission,
} from "@t3tools/client-runtime/state/threads";
import { MessageSquareIcon } from "lucide-react";

import { writeTextToClipboard } from "../../hooks/useCopyToClipboard";
import { Button } from "../ui/button";
import { toastManager } from "../ui/toast";
import type { ComposerBannerStackItem } from "./ComposerBannerStack";

const translateFeedbackLabel = createLabelTranslator(threadRuntimeMessages);

export function feedbackBannerItem(
  submission: CodexFeedbackSubmission,
  onDismiss: () => void,
  t: ComposerTranslator = englishComposer,
): ComposerBannerStackItem | null {
  const notice = codexFeedbackNotice(submission);
  if (!notice) return null;
  return {
    id: `feedback:${submission.id}`,
    variant:
      submission.status === "failed" ? "error" : submission.status === "sent" ? "success" : "info",
    icon: <MessageSquareIcon />,
    ...notice,
    title: translateFeedbackLabel(notice.title, t),
    description:
      notice.description === undefined ? undefined : translateFeedbackLabel(notice.description, t),
    actions:
      submission.status === "sent" ? (
        <Button
          size="xs"
          variant="ghost"
          onClick={() => {
            void writeTextToClipboard(submission.feedbackId, "Codex feedback thread ID").catch(
              (error: unknown) => {
                toastManager.add({
                  type: "error",
                  title: t("Could not copy thread ID"),
                  description: error instanceof Error ? error.message : t("An error occurred."),
                });
              },
            );
          }}
        >
          {t("Copy ID")}
        </Button>
      ) : undefined,
    ...(submission.status !== "uploading"
      ? { dismissLabel: t("Dismiss feedback notice"), onDismiss }
      : {}),
  };
}
