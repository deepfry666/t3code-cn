import { T3CHAT_PLAN_TUNNEL_LIMITS, type RelayT3ChatLink } from "@t3tools/contracts/relay";
import { MessageSquareIcon } from "lucide-react";
import type { ReactNode } from "react";

import { useManagedTunnelUsage } from "../../cloud/managedRelayState";
import { fillNode } from "../../i18n/fillNode";
import { useTranslation } from "../../i18n/useTranslation";
import { T3CHAT_SUBSCRIPTION_URL, TunnelUsageMeter } from "../cloud/TunnelUsage";
import { Button } from "../ui/button";
import {
  ClerkUserProfilePage,
  ClerkUserProfileRefreshButton,
  ClerkUserProfileRow,
} from "./ClerkUserProfilePage";
import { clerkUiMessages } from "./clerkUi.messages";
import { useT3ChatLink } from "./useT3ChatLink";

type T = ReturnType<typeof useTranslation<typeof clerkUiMessages>>;

function planLabel(link: RelayT3ChatLink, t: T): ReactNode {
  const upgradeLink = (
    <a
      className="underline"
      href={T3CHAT_SUBSCRIPTION_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("Upgrade on T3 Chat")}
    </a>
  );
  switch (link.plan) {
    case "premier":
      return t("Premier · up to {count} tunnels", { count: T3CHAT_PLAN_TUNNEL_LIMITS.premier });
    case "pro":
      return fillNode(
        t("Pro · up to {count} tunnels. {upgrade} to Premier for {premier}.", {
          count: T3CHAT_PLAN_TUNNEL_LIMITS.pro,
          premier: T3CHAT_PLAN_TUNNEL_LIMITS.premier,
        }),
        upgradeLink,
      );
    case "free":
      return fillNode(t("{upgrade} for more tunnels"), upgradeLink);
  }
}

/** Links a T3 Chat account so paid subscribers get more tunnels. */
export function T3ChatUserProfilePage() {
  const { linkState, pending, linkUrl, link: handleLink, unlink: handleUnlink } = useT3ChatLink();
  const usage = useManagedTunnelUsage();
  const t = useTranslation(clerkUiMessages);

  const data = linkState.data;
  const link = data?.link ?? null;

  return (
    <ClerkUserProfilePage
      title="T3 Chat"
      description={t(
        "Link a paid T3 Chat account for more T3 Connect tunnels: up to {pro} with Pro, {premier} with Premier.",
        { pro: T3CHAT_PLAN_TUNNEL_LIMITS.pro, premier: T3CHAT_PLAN_TUNNEL_LIMITS.premier },
      )}
      action={
        <ClerkUserProfileRefreshButton
          disabled={pending !== null}
          isPending={linkState.isPending}
          onClick={usage.refresh}
        />
      }
    >
      {linkState.error ? (
        <div className="border-t py-3 text-xs" role="alert">
          <p className="font-medium text-destructive-foreground">
            {t("Could not load T3 Chat link")}
          </p>
          <p className="mt-0.5 text-muted-foreground">{linkState.error}</p>
        </div>
      ) : data === null ? null : !data.available ? (
        <p className="border-t py-4 text-xs text-muted-foreground">
          {t("This T3 Connect server does not support T3 Chat linking.")}
        </p>
      ) : (
        <ul className="border-t">
          <ClerkUserProfileRow icon={<MessageSquareIcon className="size-4" />}>
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm leading-4.5 font-medium text-foreground">
                  {link ? link.email : t("Not linked")}
                </h3>
                <p className="mt-1 text-xs leading-4.5 text-muted-foreground">
                  {link
                    ? planLabel(link, t)
                    : linkUrl
                      ? fillNode(
                          t("Confirm on {link}, then select Refresh."),
                          <a
                            className="underline"
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            t3.chat
                          </a>,
                        )
                      : t("You confirm the link on t3.chat.")}
                </p>
              </div>
              {link ? (
                <Button
                  size="sm"
                  variant="destructive-outline"
                  disabled={pending !== null}
                  onClick={() => void handleUnlink()}
                >
                  {pending === "unlink" ? t("Unlinking…") : t("Unlink")}
                </Button>
              ) : (
                <Button size="sm" disabled={pending !== null} onClick={() => void handleLink()}>
                  {pending === "link" ? t("Opening…") : t("Link T3 Chat")}
                </Button>
              )}
            </div>
          </ClerkUserProfileRow>
          {usage.used !== null && usage.limit !== null ? (
            <li className="border-t py-4">
              <TunnelUsageMeter used={usage.used} limit={usage.limit} />
            </li>
          ) : null}
        </ul>
      )}
    </ClerkUserProfilePage>
  );
}
