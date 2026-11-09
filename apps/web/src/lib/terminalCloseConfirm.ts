import { projectScriptsUiMessages } from "~/components/projectScriptsUi.messages";
import { translateNow } from "~/i18n/useTranslation";
import { readLocalApi } from "~/localApi";

let pendingConfirmations = 0;

export function isTerminalCloseConfirmPending(): boolean {
  return pendingConfirmations > 0;
}

export async function confirmTerminalClose(
  labels: readonly [string, ...string[]],
): Promise<boolean> {
  const localApi = readLocalApi();
  if (!localApi) return true;
  pendingConfirmations += 1;
  try {
    return await localApi.dialogs.confirm(
      labels.length === 1
        ? [
            translateNow(projectScriptsUiMessages, 'Close terminal "{label}"?', {
              label: labels[0],
            }),
            translateNow(
              projectScriptsUiMessages,
              "This stops the running process and clears its history.",
            ),
          ].join("\n")
        : [
            translateNow(projectScriptsUiMessages, "Close {count} terminals?", {
              count: labels.length,
            }),
            translateNow(
              projectScriptsUiMessages,
              "This stops their running processes and clears their histories: {labels}.",
              { labels: labels.map((label) => `“${label}”`).join("、") },
            ),
          ].join("\n"),
      { variant: "destructive" },
    );
  } catch {
    return false;
  } finally {
    pendingConfirmations -= 1;
  }
}
