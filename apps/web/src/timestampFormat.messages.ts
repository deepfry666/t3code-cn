import { translate, type Locale } from "./i18n/locale";
import { createLabelTranslator } from "./i18n/labelTranslation";

export const timestampFormatMessages = {
  "just now": "刚刚",
  "{count}m ago": "{count} 分钟前",
  "{count}h ago": "{count} 小时前",
  "{count}d ago": "{count} 天前",
  "yesterday at {time}": "昨天 {time}",
  "tomorrow at {time}": "明天 {time}",
} as const;

const timestampLabel = createLabelTranslator(timestampFormatMessages);

export function translateTimestampLabel(label: string, locale: Locale): string {
  return timestampLabel(label, (key, params) =>
    translate(locale, timestampFormatMessages, key, params),
  );
}
