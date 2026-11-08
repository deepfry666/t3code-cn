import { passkeys } from "@clerk/electron/passkeys";
import { ClerkProvider } from "@clerk/electron/react";
import { zhCN } from "@clerk/localizations/zh-CN";
import type { ReactNode } from "react";

import { ManagedRelayAuthProvider } from "../../cloud/managedAuth";
import { useLocale } from "~/i18n/useTranslation";
import { clerkAppearance } from "./clerkAppearance";

/** Load only lazily inside desktop; clerk-js is statically bundled and would otherwise enter every
 * client's startup graph. */
export default function ElectronManagedAuthShell({
  publishableKey,
  children,
}: {
  readonly publishableKey: string;
  readonly children: ReactNode;
}) {
  const locale = useLocale();
  return (
    <ClerkProvider
      appearance={clerkAppearance}
      publishableKey={publishableKey}
      passkeys={passkeys}
      localization={locale === "zh-CN" ? zhCN : undefined}
    >
      <ManagedRelayAuthProvider>{children}</ManagedRelayAuthProvider>
    </ClerkProvider>
  );
}
