import { useLocale } from "~/i18n/useTranslation";

import { translateSettingsLabel } from "./settingsMessages";
import { searchableSetting } from "./settingsSearch";

export function useLocalizedSetting() {
  const locale = useLocale();
  return (id: Parameters<typeof searchableSetting>[0]) => {
    const item = searchableSetting(id);
    return { ...item, title: translateSettingsLabel(item.title, locale) };
  };
}
