// @effect-diagnostics nodeBuiltinImport:off
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import { describe, expect, it } from "vite-plus/test";

// Upstream merges can add code that names the official install without conflicting.
// Fork names belong in packages/shared/src/forkIdentity.ts; anything else needs a reason here.
const repoRoot = NodePath.resolve(import.meta.dirname, "..");

const RULES: ReadonlyArray<{
  readonly name: string;
  readonly pattern: RegExp;
  readonly allow: Readonly<Record<string, string>>;
}> = [
  {
    name: "official app id",
    pattern: /com\.t3tools\.t3code/,
    allow: {
      "scripts/build-desktop-artifact.ts": "upstream source filename of the AppStream metadata",
      "apps/web/public/.well-known/apple-app-site-association.json": "official mobile app links",
      "apps/web/public/.well-known/assetlinks.json": "official mobile app links",
      "apps/web/src/components/settings/MobileAppSettingsRow.tsx": "official mobile store link",
    },
  },
  {
    name: "official release repository",
    pattern: /["'`]pingdotgg\/t3code["'`]|pingdotgg\/t3code\/releases|repos\/pingdotgg\/t3code/,
    allow: {
      "apps/web/src/components/GitHubStarPrompt.tsx": "asks users to star upstream",
      "apps/server/src/triage/triagePrompt.ts": "triage files upstream issues",
    },
  },
  {
    name: "official deep-link scheme",
    pattern: /\bt3code(?:-dev)?:\/\//,
    allow: {},
  },
  {
    name: "official home variable",
    pattern: /\bT3CODE_HOME\b/,
    allow: {
      "apps/desktop/src/backend/DesktopBackendConfiguration.ts": "strips the inherited variable",
      "apps/server/src/serviceLauncher.ts": "strips the inherited variable",
      "scripts/dev-runner.ts": "strips the inherited variable",
    },
  },
  {
    name: "official systemd slice",
    pattern: /app-t3code[-.]/,
    allow: {},
  },
  {
    name: "official data home",
    pattern: /["'`]\.t3["'`]|\$HOME\/\.t3\b|~\/\.t3\b/,
    allow: {
      "packages/shared/src/devHome.ts": "per-worktree dev state, not the official home",
      "scripts/setup-worktree.ts": "per-worktree setup marker",
      "apps/server/scripts/migrate-dev-db.ts": "refuses to rebuild the official database",
      "apps/server/scripts/t3-sqlite-state.ts": "refuses to mutate the official database",
    },
  },
  {
    name: "official resource namespace",
    pattern: /["'`]t3code["'`]/,
    allow: {
      "apps/server/src/cloud/npmRelease.ts": "package.json metadata field name",
      "apps/web/src/components/chat/QueuedRunsControl.tsx": "message attribution value",
      "apps/web/src/components/chat/TimelineUserMessageRow.tsx": "message attribution value",
      "packages/client-runtime/src/userMessage.ts": "message attribution value",
      "packages/provider-grok/src/server/acpSupport.ts": "OAuth referrer registered with Grok",
      "packages/shared/src/t3McpToolPresentation.ts": "MCP server alias providers report",
      "packages/source-control-gitcafe/src/server/GitCafeApi.ts": "HTTP user agent",
      "packages/source-control-github/src/server/GitHubAppSignIn.ts": "HTTP user agent",
      "packages/source-control-github/src/server/GitHubRequestPolicy.ts": "HTTP user agent",
      "packages/ssh/src/auth.ts": "placeholder DISPLAY value",
    },
  },
];

// Mobile and the marketing site stay identical to upstream; tests may name official identities.
const SKIPPED =
  /^(apps\/mobile|apps\/marketing|scripts\/mobile)|\.test\.|\/test\/|testkit|fixtures|testUtils/;

const COMMENT = /^\s*(?:\/\/|\/?\*|#)/;

function productionFiles(): ReadonlyArray<string> {
  const output = NodeChildProcess.execFileSync("git", ["ls-files", "apps", "packages", "scripts"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  return output
    .split("\n")
    .filter(
      (file) => /\.(?:[cm]?[jt]sx?|json|sh|ps1|xml|plist)$/.test(file) && !SKIPPED.test(file),
    );
}

describe("fork isolation guard", () => {
  const contents = new Map(
    productionFiles().map((file) => [
      file,
      NodeFS.readFileSync(NodePath.join(repoRoot, file), "utf8"),
    ]),
  );

  it.each(RULES)("names no $name outside FORK_IDENTITY", ({ pattern, allow }) => {
    const offenders: string[] = [];
    for (const [file, text] of contents) {
      if (Object.hasOwn(allow, file)) continue;
      text.split("\n").forEach((line, index) => {
        if (!COMMENT.test(line) && pattern.test(line)) {
          offenders.push(`${file}:${index + 1}: ${line.trim()}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });

  it.each(RULES)("keeps every $name exception in use", ({ pattern, allow }) => {
    const stale = Object.keys(allow).filter(
      (file) =>
        !(contents.get(file) ?? "")
          .split("\n")
          .some((line) => !COMMENT.test(line) && pattern.test(line)),
    );
    expect(stale).toEqual([]);
  });
});
