import { translateNow } from "~/i18n/useTranslation";
import { speechUiMessages } from "./speechUi.messages";

export type BrowserMicrophone = Pick<MediaDeviceInfo, "deviceId" | "label">;

export async function listBrowserMicrophones(): Promise<BrowserMicrophone[]> {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices
    .filter((device) => device.kind === "audioinput")
    .map(({ deviceId, label }, index) => ({
      deviceId,
      label: label || translateNow(speechUiMessages, "Microphone {index}", { index: index + 1 }),
    }));
}
