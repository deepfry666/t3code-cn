import { createLabelTranslator } from "../i18n/labelTranslation";
import { translate, type Locale } from "../i18n/locale";
import { runtimeErrorsMessages } from "./runtimeErrors.messages";

const translateLabel = createLabelTranslator(runtimeErrorsMessages);
const hints = Object.keys(runtimeErrorsMessages).filter(
  (key) => key.startsWith("Hint:") || key.startsWith("Your DNS"),
);

export function translateRuntimeError(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  const translated = translateLabel(label, (key, params) => {
    const error = params?.error;
    return translate(locale, runtimeErrorsMessages, key, {
      ...params,
      ...(typeof error === "string" ? { error: translateRuntimeError(error, locale) } : {}),
    });
  });
  if (translated !== label) return translated;
  const trace = /^(.*)( Trace ID: \S+)$/su.exec(label);
  if (trace) return translateRuntimeError(trace[1]!, locale) + trace[2];
  // Relay errors append one of the fixed network or DPoP hints to their main message.
  for (const key of hints) {
    if (label.endsWith(` ${key}`)) {
      return `${translateRuntimeError(label.slice(0, -key.length - 1), locale)} ${translateRuntimeError(key, locale)}`;
    }
  }
  const stage =
    /^(Relay cannot provision the managed endpoint \(.+?\)\.) (Failed stage: .+\.)$/u.exec(label);
  if (stage)
    return `${translateRuntimeError(stage[1]!, locale)} ${translateRuntimeError(stage[2]!, locale)}`;
  return label;
}
