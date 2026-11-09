import { useLocale } from "../i18n/useTranslation";
import { translateRuntimeError } from "./runtimeErrorLabels";

export function RuntimeErrorText({ children }: { readonly children: string | null | undefined }) {
  const locale = useLocale();
  return children == null ? null : translateRuntimeError(children, locale);
}
