import { translateRuntimeError } from "../runtimeErrorLabels";
import { createLabelTranslator } from "../../i18n/labelTranslation";
import { translate, type Locale } from "../../i18n/locale";
import { readLocale } from "../../i18n/useTranslation";
import { threadRuntimeMessages } from "./threadRuntime.messages";

const translateLabel = createLabelTranslator(threadRuntimeMessages);

export function translateThreadRuntimeLabel(label: string, locale: Locale = readLocale()): string {
  if (locale === "en") return label;
  return translateLabel(label, (key, params) => {
    const tasks = params?.tasks;
    return translate(locale, threadRuntimeMessages, key, {
      ...params,
      ...(typeof params?.error === "string"
        ? { error: translateRuntimeError(params.error, locale) }
        : {}),
      ...(typeof tasks === "string"
        ? {
            tasks: tasks
              .split(/, and | and |, /u)
              .map((part) =>
                translateLabel(part, (taskKey, taskParams) =>
                  translate(locale, threadRuntimeMessages, taskKey, taskParams),
                ),
              )
              .join(locale === "zh-CN" ? "、" : " and "),
          }
        : {}),
    });
  });
}
