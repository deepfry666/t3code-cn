import type { ExecutionEnvironmentPlatformOs, FileManagerRevealKind } from "@t3tools/contracts";

import { translateNow } from "~/i18n/useTranslation";

import { previewUiMessages } from "./previewUi.messages";

export function revealInFileExplorerLabel(platform: string): string {
  const normalized = platform.toLowerCase();
  if (normalized.includes("mac")) return translateNow(previewUiMessages, "Reveal in Finder");
  if (normalized.includes("win")) return translateNow(previewUiMessages, "Reveal in File Explorer");
  return translateNow(previewUiMessages, "Reveal in Files");
}

export function revealInFileExplorerLabelForOs(os: ExecutionEnvironmentPlatformOs): string {
  if (os === "darwin") return translateNow(previewUiMessages, "Reveal in Finder");
  if (os === "windows") return translateNow(previewUiMessages, "Reveal in File Explorer");
  return translateNow(previewUiMessages, "Reveal in Files");
}

export function revealInFileExplorerLabelForKind(kind: FileManagerRevealKind): string {
  if (kind === "finder") return translateNow(previewUiMessages, "Reveal in Finder");
  if (kind === "file-explorer") return translateNow(previewUiMessages, "Reveal in File Explorer");
  return translateNow(previewUiMessages, "Reveal in Files");
}
