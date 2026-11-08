import { ClerkProvider } from "@clerk/react";
import { zhCN } from "@clerk/localizations/zh-CN";
import type { ReactNode } from "react";

import { ManagedRelayAuthProvider } from "../../cloud/managedAuth";
import { useLocale } from "~/i18n/useTranslation";
import { clerkAppearance } from "./clerkAppearance";

/** Lazy-load Clerk so cloudless local mode never downloads it. */
export default function BrowserManagedAuthShell({
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
      localization={locale === "zh-CN" ? zhCN : undefined}
    >
      <ManagedRelayAuthProvider>{children}</ManagedRelayAuthProvider>
    </ClerkProvider>
  );
}
