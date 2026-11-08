import {
  type AuthMcpApprovalDecision,
  type AuthMcpApprovalDetails,
  AuthMcpApprovalError,
  AuthMcpClientAccess,
  AuthMcpAuthorizationRequest,
  isRuntimeModeAbove,
} from "@t3tools/contracts";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { isLoopbackHost } from "@t3tools/shared/preview";
import { EyeIcon, type LucideIcon } from "lucide-react";
import type * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { type ReactNode, useEffect, useState } from "react";

import { PrimaryEnvironmentHttpClient } from "~/environments/primary/httpClient";
import { fillNode } from "~/i18n/fillNode";
import type { Locale } from "~/i18n/locale";
import { useLocale, useTranslation } from "~/i18n/useTranslation";
import { runPrimaryHttp } from "~/lib/runtime";
import { cn } from "~/lib/utils";
import { authUiMessages } from "./authUi.messages";
import { resolveMcpAccess } from "./ConnectAgentSurface.logic";
import { runtimeModeConfig } from "../chat/runtimeModeConfig";
import { translateConnectionLabel } from "../settings/settingsConnections.messages";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Spinner } from "../ui/spinner";
import { StandalonePage, StandalonePageHeader } from "../ui/standalone-page";

export const accessConfig: Record<
  AuthMcpClientAccess,
  { readonly label: string; readonly description: string; readonly icon: LucideIcon }
> = {
  "read-only": {
    label: "Read only",
    description: "Read projects and threads. Cannot start, message or change anything.",
    icon: EyeIcon,
  },
  ...runtimeModeConfig,
};

function redirectsToThisComputer(redirectHost: string): boolean {
  return isLoopbackHost(new URL(`http://${redirectHost}`).hostname);
}

type Loaded =
  | { readonly status: "loading" }
  | { readonly status: "invalid"; readonly message: string }
  | { readonly status: "ready"; readonly details: AuthMcpApprovalDetails };

const UNREACHABLE = "Could not reach this environment. Try again.";
const isApprovalError = Schema.is(AuthMcpApprovalError);

type Answer<A> =
  | { readonly kind: "ok"; readonly value: A }
  | { readonly kind: "redirect"; readonly url: string }
  | { readonly kind: "error"; readonly message: string };

function runApproval<A>(
  call: (
    client: Context.Service.Shape<typeof PrimaryEnvironmentHttpClient>,
  ) => Effect.Effect<A | { readonly redirectTo: string }, unknown>,
): Promise<Answer<A>> {
  return runPrimaryHttp(
    PrimaryEnvironmentHttpClient.pipe(
      Effect.flatMap(call),
      Effect.map((value): Answer<A> =>
        typeof value === "object" && value !== null && "redirectTo" in value
          ? { kind: "redirect", url: value.redirectTo }
          : { kind: "ok", value: value as A },
      ),
      Effect.catch((error) =>
        Effect.succeed<Answer<A>>({
          kind: "error",
          message: isApprovalError(error) ? error.message : UNREACHABLE,
        }),
      ),
    ),
  ).catch((): Answer<A> => ({ kind: "error", message: UNREACHABLE }));
}

const decodeAuthorizationRequest = Schema.decodeSync(AuthMcpAuthorizationRequest);

function readAuthorizationRequest(): AuthMcpAuthorizationRequest {
  return decodeAuthorizationRequest(Object.fromEntries(new URL(window.location.href).searchParams));
}

/** Sessions can grant only scopes they hold. */
function oneClickApproves(details: AuthMcpApprovalDetails, access: AuthMcpClientAccess) {
  return details.csrfToken !== undefined && (details.oneClickAccess ?? []).includes(access);
}

type T = ReturnType<typeof useTranslation<typeof authUiMessages>>;

/** Approval errors come from the server in English; only this page's own fallbacks translate. */
const ownMessage = (message: string, t: T) =>
  Object.hasOwn(authUiMessages, message) ? t(message as keyof typeof authUiMessages) : message;

export function ConnectAgentSurface() {
  const t = useTranslation(authUiMessages);
  const locale = useLocale();
  const [authorization] = useState(readAuthorizationRequest);
  const [loaded, setLoaded] = useState<Loaded>({ status: "loading" });
  const [requestedAccess, setAccess] = useState<AuthMcpClientAccess>("auto");
  const access = resolveMcpAccess(
    requestedAccess,
    loaded.status === "ready" ? loaded.details.runtimeModeCeiling : undefined,
  );
  const [pairingCode, setPairingCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState<"approve" | "deny" | null>(null);

  // oxlint-disable-next-line t3code/no-unreasoned-state-sync -- fetches the MCP OAuth approval and redirects the window or stores details, ignoring stale answers
  useEffect(() => {
    let cancelled = false;
    void runApproval((client) => client.mcpOAuth.approval({ payload: authorization })).then(
      (answer) => {
        if (cancelled) return;
        if (answer.kind === "redirect") {
          window.location.replace(answer.url);
          return;
        }
        setLoaded(
          answer.kind === "error"
            ? { status: "invalid", message: answer.message }
            : { status: "ready", details: answer.value },
        );
      },
    );
    return () => {
      cancelled = true;
    };
  }, [authorization]);

  const decide = async (choice: "approve" | "deny") => {
    if (loaded.status !== "ready") return;
    setPending(choice);
    setErrorMessage("");
    const { csrfToken } = loaded.details;
    const decision: AuthMcpApprovalDecision =
      choice === "deny"
        ? { _tag: "deny" }
        : csrfToken !== undefined && oneClickApproves(loaded.details, access)
          ? { _tag: "browser-session", access, csrfToken }
          : { _tag: "pairing-code", access, code: pairingCode.trim() };
    const answer = await runApproval((client) =>
      client.mcpOAuth.decision({ payload: { authorization, decision } }),
    );
    if (answer.kind === "redirect") {
      window.location.replace(answer.url);
      return;
    }
    setPending(null);
    setErrorMessage(answer.kind === "error" ? answer.message : "The sign-in could not continue.");
  };

  if (loaded.status === "loading") {
    return (
      <StandalonePage>
        <ConnectAgentHeading
          title={t("Checking the sign-in request")}
          description={t("One moment while this environment verifies the agent's request.")}
        />
        <Spinner className="mt-6" size="lg" tone="muted" />
      </StandalonePage>
    );
  }

  if (loaded.status === "invalid") {
    return (
      <StandalonePage>
        <ConnectAgentHeading
          title={t("This sign-in cannot continue")}
          description={ownMessage(loaded.message, t)}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          {t("Close this page and start the sign-in again from your agent.")}
        </p>
      </StandalonePage>
    );
  }

  const { details } = loaded;
  const oneClick = oneClickApproves(details, access);
  const canApprove = pending === null && (oneClick || pairingCode.trim().length > 0);

  return (
    <StandalonePage>
      <ConnectAgentHeading
        title={t("Connect {client}", { client: details.clientName })}
        description={fillNode(
          t("This agent wants to use the threads in every project on {host}."),
          <span className="font-medium text-foreground">{details.environmentHost}</span>,
        )}
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {redirectsToThisComputer(details.redirectHost)
          ? t(
              "The name is chosen by the agent. Approval returns to {host} on the computer that opened this page. Only approve a sign-in you just started.",
              { host: details.redirectHost },
            )
          : fillNode(
              t(
                "The name is chosen by the agent. Approval gives access to whoever runs {host}. Only approve a sign-in you just started there.",
              ),
              <span className="font-medium text-foreground">{details.redirectHost}</span>,
            )}
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          if (canApprove) void decide("approve");
        }}
      >
        <div className="space-y-2">
          <span id="connect-agent-access-label" className="text-sm font-medium">
            {t("What it may do")}
          </span>
          <RadioGroup
            aria-labelledby="connect-agent-access-label"
            value={access}
            onValueChange={(value) => setAccess(value as AuthMcpClientAccess)}
          >
            {AuthMcpClientAccess.literals.map((option) => (
              <AccessOption
                key={option}
                access={option}
                selected={option === access}
                managedReason={ceilingReason(details, option, t, locale)}
              />
            ))}
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            {t(
              "Beyond read only, it can start, message and stop threads, and none of them can run with more than the mode you pick.",
            )}
          </p>
        </div>

        {oneClick ? null : (
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="connect-agent-pairing-code">
              {t("Pairing code")}
            </label>
            <Input
              id="connect-agent-pairing-code"
              autoCapitalize="none"
              autoComplete="one-time-code"
              autoCorrect="off"
              disabled={pending !== null}
              nativeInput
              onChange={(event) => setPairingCode(event.currentTarget.value)}
              placeholder={t("Paste a one-time pairing code")}
              spellCheck={false}
              value={pairingCode}
            />
            <p className="text-xs text-muted-foreground">
              {fillNode(
                t("Create one in Settings → Sharing & access, or run {command} on this machine."),
                <code>t3 auth pairing create</code>,
              )}
            </p>
          </div>
        )}

        {errorMessage ? (
          <Alert variant="error">
            <AlertDescription>{ownMessage(errorMessage, t)}</AlertDescription>
          </Alert>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button disabled={!canApprove} type="submit">
            {pending === "approve" ? t("Approving…") : t("Approve")}
          </Button>
          <Button
            disabled={pending !== null}
            onClick={() => void decide("deny")}
            type="button"
            variant="outline"
          >
            {pending === "deny" ? t("Denying…") : t("Deny")}
          </Button>
        </div>
      </form>
    </StandalonePage>
  );
}

function ConnectAgentHeading({
  title,
  description,
}: {
  readonly title: string;
  readonly description: ReactNode;
}) {
  const t = useTranslation(authUiMessages);
  return (
    <StandalonePageHeader context={t("Agent sign-in")} title={title} description={description} />
  );
}

/** Why a managed policy keeps `access` from being granted, or undefined when it may be. */
function ceilingReason(
  details: AuthMcpApprovalDetails,
  access: AuthMcpClientAccess,
  t: T,
  locale: Locale,
) {
  const ceiling = details.runtimeModeCeiling;
  return ceiling === undefined ||
    access === "read-only" ||
    !isRuntimeModeAbove(access, ceiling.maxRuntimeMode)
    ? undefined
    : t("{organization} limits threads to {mode}.", {
        organization: ceiling.organization,
        mode: translateConnectionLabel(accessConfig[ceiling.maxRuntimeMode].label, locale),
      });
}

function AccessOption({
  access,
  selected,
  managedReason,
}: {
  readonly access: AuthMcpClientAccess;
  readonly selected: boolean;
  readonly managedReason: string | undefined;
}) {
  const locale = useLocale();
  const { label, description, icon: Icon } = accessConfig[access];
  return (
    <RadioPrimitive.Root
      value={access}
      disabled={managedReason !== undefined}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-left outline-none transition-[background-color,border-color,box-shadow]",
        "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        selected
          ? "border-primary bg-background ring-2 ring-inset ring-primary/25 dark:border-transparent dark:bg-primary/10 dark:ring-1 dark:ring-primary/30"
          : "border-border bg-background hover:bg-muted/50 dark:border-transparent dark:bg-white/[0.035] dark:hover:bg-accent",
      )}
    >
      <Icon
        aria-hidden
        className={cn(
          "mt-0.5 size-4 shrink-0",
          selected ? "text-primary" : "text-muted-foreground",
        )}
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">
          {translateConnectionLabel(label, locale)}
        </span>
        <span className="block text-xs text-muted-foreground">
          {managedReason ?? translateConnectionLabel(description, locale)}
        </span>
      </span>
    </RadioPrimitive.Root>
  );
}
