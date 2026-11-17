import type { Locale } from "~/i18n/locale";
import { useLocale } from "~/i18n/useTranslation";
import { translateComposerLabel } from "./composerUi.messages";

export function translateTraitLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  return label
    .split(" · ")
    .map((part) => {
      const translated = translateComposerLabel(part, locale);
      if (translated !== part) return translated;
      const suffix = /^(.*) (On|Off|Fast|Ultrafast)$/.exec(part);
      return suffix
        ? `${translateComposerLabel(suffix[1]!, locale)} ${translateComposerLabel(suffix[2]!, locale)}`
        : part;
    })
    .join(" · ");
}

export function useTraitLabel() {
  const locale = useLocale();
  return (label: string) => translateTraitLabel(label, locale);
}
