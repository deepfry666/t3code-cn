import {
  connectionStatusText,
  type EnvironmentConnectionPresentation,
} from "@t3tools/client-runtime/connection";

import { translate, type Locale } from "../../i18n/locale";
import { translateConnectionLabel } from "../settings/settingsConnections.messages";
import { cloudUiMessages } from "./cloudUi.messages";

export interface SavedCloudEnvironmentConnectionPresentation {
  readonly buttonLabel: string;
  readonly statusText: string;
  readonly tone: "connected" | "connecting" | "error" | "idle";
}

export function presentSavedCloudEnvironmentConnection(
  connection: EnvironmentConnectionPresentation,
  locale: Locale = "en",
): SavedCloudEnvironmentConnectionPresentation {
  const label = (key: keyof typeof cloudUiMessages) => translate(locale, cloudUiMessages, key);
  const statusText = translateConnectionLabel(connectionStatusText(connection), locale);
  switch (connection.phase) {
    case "connected":
      return {
        buttonLabel: label("Connected"),
        statusText,
        tone: "connected",
      };
    case "connecting":
      return {
        buttonLabel: label("Connecting…"),
        statusText,
        tone: "connecting",
      };
    case "reconnecting":
      return {
        buttonLabel: label("Reconnecting…"),
        statusText,
        tone: "connecting",
      };
    case "unsupported":
      return {
        buttonLabel: label("Client not supported"),
        statusText,
        tone: "idle",
      };
    case "error":
      return {
        buttonLabel: label("Connection failed"),
        statusText,
        tone: "error",
      };
    case "offline":
      return {
        buttonLabel: label("Offline"),
        statusText,
        tone: "idle",
      };
    case "available":
      return {
        buttonLabel: label("Not connected"),
        statusText,
        tone: "idle",
      };
  }
}
