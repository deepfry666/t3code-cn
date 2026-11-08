import { useTranslation, useLocale } from "~/i18n/useTranslation";
import { settingsCodeMessages, translateCodeLabel } from "./settingsCode.messages";
import {
  isSecretReference,
  type EnvironmentId,
  type SecretReference,
  type SettingsSecretValue,
} from "@t3tools/contracts";
import { ExternalLinkIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { useEnvironmentSettings } from "../../hooks/useSettings";
import {
  readHostCredentialSettings,
  type SourceControlDefinition,
  type SourceControlHostCredentials,
} from "@t3tools/client-runtime/source-control-clients";
import { serverEnvironment } from "../../state/server";
import { useAtomCommand } from "../../state/use-atom-command";
import { Button, InlineButton } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SecretSourceInput, useSecretSources } from "./SecretSourceInput";

export function SourceControlCodeText({
  text,
  values,
}: {
  readonly text: string;
  readonly values: Readonly<Record<string, string>>;
}) {
  return Array.from(text.matchAll(/\{\w+\}|[^{]+|\{/g), (match) => {
    const part = match[0];
    const key = part.slice(1, -1);
    return (
      <Fragment key={match.index}>
        {part.startsWith("{") && Object.hasOwn(values, key) ? (
          <code className="rounded bg-muted px-1 py-px text-2xs">{values[key]}</code>
        ) : (
          part
        )}
      </Fragment>
    );
  });
}

const hasToken = (token: SettingsSecretValue | undefined) =>
  typeof token === "string" ? token.length > 0 : token !== undefined;

export function SourceControlTokenSettings({
  environmentId,
  definition,
  credentials,
  onSaved,
}: {
  readonly environmentId: EnvironmentId;
  readonly definition: SourceControlDefinition;
  readonly credentials: SourceControlHostCredentials;
  readonly onSaved: () => void;
}) {
  const locale = useLocale();
  const t = useTranslation(settingsCodeMessages);
  const { tokens } = useEnvironmentSettings(environmentId, (settings) =>
    readHostCredentialSettings(settings, definition.kind),
  );
  const updateSettings = useAtomCommand(serverEnvironment.updateSettings, {
    label: t("save {label} token", { label: definition.label }),
  });
  const defaultHost = definition.publicHost ?? "";
  const [host, setHost] = useState(defaultHost);
  const secretSources = useSecretSources(environmentId);
  const [pending, setPending] = useState<{
    readonly key: string;
    readonly draft: string | SecretReference;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const normalizedHost = host.trim().toLowerCase();
  const savedToken = tokens[normalizedHost];
  const isSaved = hasToken(savedToken);
  const savedHosts = Object.entries(tokens)
    .filter(([, value]) => hasToken(value))
    .map(([saved]) => saved);
  const sourceKey = JSON.stringify([normalizedHost, savedToken ?? ""]);
  const draft =
    pending?.key === sourceKey ? pending.draft : isSecretReference(savedToken) ? savedToken : "";
  const submission = typeof draft === "string" ? draft.trim() : draft;

  const save = async (target: string, token: SettingsSecretValue) => {
    setSaving(true);
    const result = await updateSettings({
      environmentId,
      // Send the whole map; other tokens' redaction markers preserve their values.
      input: {
        patch: {
          sourceControlHosts: { [definition.kind]: { tokens: { ...tokens, [target]: token } } },
        },
      },
    });
    setSaving(false);
    if (result._tag === "Success") {
      setPending(null);
      onSaved();
    }
  };

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (normalizedHost && submission !== "") void save(normalizedHost, submission);
      }}
    >
      {/* Locked while saving: a successful save clears the draft, which would drop edits made mid-request. */}
      <fieldset disabled={saving} className="contents">
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          <SourceControlCodeText
            text={t(
              "A token saved here is used before {tokenEnvVar} and the {cliName} login, so {label} works without the {cliLabel}. Give it {tokenAccess}.",
              {
                label: definition.label,
                cliLabel: credentials.cliLabel,
                tokenAccess: translateCodeLabel(credentials.tokenAccess, locale),
              },
            )}
            values={{ tokenEnvVar: credentials.tokenEnvVar, cliName: credentials.cliName }}
          />{" "}
          {normalizedHost || defaultHost ? (
            <InlineButton
              render={
                <a
                  href={credentials.newTokenUrl(normalizedHost || defaultHost)}
                  target="_blank"
                  rel="noreferrer noopener"
                />
              }
            >
              {t("Create a token")}
              <ExternalLinkIcon aria-hidden className="size-3" />
            </InlineButton>
          ) : null}
        </p>
        <div className="grid gap-3 sm:grid-cols-[12rem_1fr]">
          <div className="grid gap-1.5">
            <Label htmlFor={`${definition.kind}-token-host-${environmentId}`}>{t("Host")}</Label>
            <Input
              id={`${definition.kind}-token-host-${environmentId}`}
              autoComplete="off"
              size="sm"
              placeholder={defaultHost}
              value={host}
              onChange={(event) => setHost(event.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`${definition.kind}-token-${environmentId}`}>{t("Token")}</Label>
            <SecretSourceInput
              id={`${definition.kind}-token-${environmentId}`}
              size="sm"
              aria-label={t("{label} token", { label: definition.label })}
              configured={isSaved && !isSecretReference(savedToken)}
              value={draft}
              sources={secretSources}
              onChange={(event) => setPending({ key: sourceKey, draft: event.target.value })}
              onSecretChange={(secret) => setPending({ key: sourceKey, draft: secret ?? "" })}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {savedHosts.length === 0
              ? t("No token saved; the server uses {tokenEnvVar} or the {cliName} login.", {
                  tokenEnvVar: credentials.tokenEnvVar,
                  cliName: credentials.cliName,
                })
              : t("Saved for {hosts}.", { hosts: savedHosts.join(", ") })}
          </p>
          <div className="flex shrink-0 gap-2">
            {isSaved ? (
              <Button
                size="xs"
                variant="outline"
                disabled={saving}
                onClick={() => void save(normalizedHost, "")}
              >
                {t("Remove")}
              </Button>
            ) : null}
            <Button
              type="submit"
              size="xs"
              disabled={!normalizedHost || submission === "" || saving}
            >
              {t("Save")}
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
