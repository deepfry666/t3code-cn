import { buildTraitsTriggerDisplay, isReasoningSelect } from "@t3tools/client-runtime/model-traits";
import {
  getProviderOptionCurrentLabel,
  getProviderOptionCurrentValue,
} from "@t3tools/shared/model";
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

/**
 * Keeps selected reasoning levels in their original English (even "Off" or "Default") while
 * translating speed suffixes, toggles, and non-reasoning options.
 */
export function buildLocalizedTraitsTriggerDisplay(
  input: Parameters<typeof buildTraitsTriggerDisplay>[0],
  locale: Locale,
): ReturnType<typeof buildTraitsTriggerDisplay> {
  const display = buildTraitsTriggerDisplay(input);
  if (locale !== "zh-CN" || !display.label) return display;

  const reasoningParts = new Map<number, string>();
  let partIndex = 0;
  for (const descriptor of input.descriptors) {
    if (descriptor.id === "fastMode" && descriptor.type === "boolean") continue;
    if (descriptor.id === "ultracode" && descriptor.type === "boolean") {
      if (descriptor.currentValue === true) partIndex += 1;
      continue;
    }
    if (descriptor.id === "serviceTier" && descriptor.type === "select") {
      const current = getProviderOptionCurrentValue(descriptor);
      const hasSpeedTier = descriptor.options.some(
        ({ label }) => label === "Fast" || label === "Ultrafast",
      );
      if (
        (hasSpeedTier && current === "default") ||
        descriptor.options.some(
          ({ id, label }) => id === current && (label === "Fast" || label === "Ultrafast"),
        )
      ) {
        continue;
      }
    }
    const level = isReasoningSelect(descriptor)
      ? input.ultrathinkPromptControlled && descriptor.id === input.primarySelectDescriptorId
        ? "Ultrathink"
        : getProviderOptionCurrentLabel(
            descriptor,
            input.modelSelection,
            input.reportedModelSelection,
          )
      : null;
    if (level) {
      reasoningParts.set(partIndex, level);
      partIndex += 1;
      continue;
    }
    const hasLabel =
      descriptor.type === "boolean" ||
      Boolean(
        getProviderOptionCurrentLabel(
          descriptor,
          input.modelSelection,
          input.reportedModelSelection,
        ) ?? (descriptor.id === "thinking" ? descriptor.label : null),
      );
    if (hasLabel) partIndex += 1;
  }

  const label = display.label
    .split(" · ")
    .map((part, index) => {
      const level = reasoningParts.get(index);
      if (!level) return translateTraitLabel(part, locale);
      return display.speedLabel && part === `${level} ${display.speedLabel}`
        ? `${level} ${translateComposerLabel(display.speedLabel, locale)}`
        : level;
    })
    .join(" · ");
  return { ...display, label };
}

export function useTraitLabel() {
  const locale = useLocale();
  return (label: string) => translateTraitLabel(label, locale);
}
