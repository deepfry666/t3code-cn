import { setLocale, useLocale, useTranslation } from "~/i18n/useTranslation";

import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "../ui/select";
import { SettingsRow, SettingsSection } from "./settingsLayout";

const messages = {
  Language: "语言",
  "Interface language": "界面语言",
  "Saved on this device. Model responses, terminal output, and project files are not translated.":
    "仅保存在此设备。不会翻译模型回复、终端输出或项目文件。",
} as const;

const languages = [
  { value: "en", label: "English" },
  { value: "zh-CN", label: "简体中文" },
];

export function LanguageSettings() {
  const locale = useLocale();
  const t = useTranslation(messages);
  return (
    <SettingsSection id="interface-language" title={t("Language")}>
      <SettingsRow
        title={t("Interface language")}
        description={t(
          "Saved on this device. Model responses, terminal output, and project files are not translated.",
        )}
        control={
          <Select
            items={languages}
            value={locale}
            onValueChange={(value) => {
              if (value === "en" || value === "zh-CN") setLocale(value);
            }}
          >
            <SelectTrigger aria-label={t("Interface language")}>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        }
      />
    </SettingsSection>
  );
}
