import type { ProviderDriverKind, ProviderInstanceId } from "@t3tools/contracts";
import {
  resolveSelectableProviderInstanceEntry,
  type ProviderInstanceEntry,
} from "../../providerInstances";

function providerSupportsManualCompaction(
  provider: ProviderInstanceEntry | null | undefined,
): boolean {
  return provider?.snapshot.slashCommands.some((command) => command.name === "compact") ?? false;
}

export function hasAvailableCompactionProvider(input: {
  readonly providers: ReadonlyArray<ProviderInstanceEntry>;
  readonly driverKind: ProviderDriverKind;
  readonly instanceId: ProviderInstanceId | null;
  readonly lockedInstanceId: ProviderInstanceId | null;
}): boolean {
  const driverProviders = input.providers.filter(
    (provider) => provider.driverKind === input.driverKind,
  );
  const lockedContinuationGroupKey = input.lockedInstanceId
    ? driverProviders.find((provider) => provider.instanceId === input.lockedInstanceId)
        ?.continuationGroupKey
    : undefined;
  const compatibleProviders = lockedContinuationGroupKey
    ? driverProviders.filter(
        (provider) => provider.continuationGroupKey === lockedContinuationGroupKey,
      )
    : driverProviders;

  return providerSupportsManualCompaction(
    resolveSelectableProviderInstanceEntry(compatibleProviders, input.instanceId ?? undefined),
  );
}

type CompactionMessage =
  | "Compacts automatically at about {tokens} tokens."
  | "Context compacts automatically when needed.";
type TranslateCompactionMessage = (
  key: CompactionMessage,
  params?: Readonly<Record<string, string | number>>,
) => string;
const englishCompactionMessage: TranslateCompactionMessage = (key, params) =>
  key.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    params && Object.hasOwn(params, name) ? String(params[name]) : placeholder,
  );

export function formatContextWindowCompactionMessage(
  autoCompactThreshold?: number | null,
  t: TranslateCompactionMessage = englishCompactionMessage,
): string {
  if (typeof autoCompactThreshold === "number" && autoCompactThreshold > 0) {
    return t("Compacts automatically at about {tokens} tokens.", {
      tokens: autoCompactThreshold.toLocaleString("en-US"),
    });
  }
  return t("Context compacts automatically when needed.");
}
