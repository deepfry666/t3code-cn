import { translateNow } from "~/i18n/useTranslation";
import { deviceDetailMessages } from "./deviceDetail.messages";

const knownDetail = (detail: string): keyof typeof deviceDetailMessages | null =>
  Object.hasOwn(deviceDetailMessages, detail)
    ? (detail as keyof typeof deviceDetailMessages)
    : null;

/** Localizes a client-runtime status detail; unknown details pass through untouched. */
export function deviceDetail(detail: string | null | undefined): string | null {
  if (!detail) return null;
  const key = knownDetail(detail);
  return key === null ? detail : translateNow(deviceDetailMessages, key);
}
