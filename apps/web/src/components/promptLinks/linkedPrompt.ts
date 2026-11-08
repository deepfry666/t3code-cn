import type { LinkedPrompt } from "@t3tools/shared/promptLinks";

import { type ComposerThreadTarget, useComposerDraftStore } from "~/composerDraftStore";
import { translate } from "~/i18n/locale";
import { readLocale } from "~/i18n/useTranslation";

import { toastManager } from "../ui/toast";
import { promptLinksUiMessages } from "./promptLinksUi.messages";

const t = (
  key: keyof typeof promptLinksUiMessages,
  params?: Readonly<Record<string, string | number>>,
) => translate(readLocale(), promptLinksUiMessages, key, params);

function hiddenCharactersNotice(count: number): string {
  return count === 1
    ? t("T3 Code removed {count} hidden character. Read the prompt before you send it.", { count })
    : t("T3 Code removed {count} hidden characters. Read the prompt before you send it.", {
        count,
      });
}

export function warnAboutHiddenCharacters(prompt: LinkedPrompt): void {
  if (prompt.hiddenCharacters === 0) return;
  toastManager.add({
    type: "warning",
    title: t("This prompt had hidden characters, it may be malicious"),
    description: hiddenCharactersNotice(prompt.hiddenCharacters),
    timeout: 0,
  });
}

export function placeLinkedPrompt(
  target: ComposerThreadTarget,
  prompt: LinkedPrompt,
  notes: ReadonlyArray<string> = [],
): void {
  warnAboutHiddenCharacters(prompt);
  const place = () => {
    useComposerDraftStore.getState().setPrompt(target, prompt.text);
    toastManager.add({
      type: "info",
      title: t("Prompt added from a link"),
      description: [t("Read it before you send."), ...notes].join(" "),
    });
  };
  const existing = useComposerDraftStore.getState().getComposerDraft(target)?.prompt ?? "";
  if (existing.trim().length === 0 || existing === prompt.text) {
    place();
    return;
  }
  const id = toastManager.add({
    type: "info",
    title: t("Linked prompt ready"),
    description: t("This thread already has a draft. Replace it with the linked prompt?"),
    timeout: 0,
    actionProps: {
      children: t("Replace draft"),
      onClick: () => {
        toastManager.close(id);
        place();
      },
    },
  });
}
