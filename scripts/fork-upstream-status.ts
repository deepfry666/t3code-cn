// @effect-diagnostics nodeBuiltinImport:off globalConsole:off
// Fork-only: decides the next step of the Chinese upstream-tracking routine and prints it as JSON.
// Upstream bumps package.json on main right after each stable release ("prepare vX.Y.Z"), so the
// version on official/main is the latest official release and origin/main's is the one merged here.
//
//   node scripts/fork-upstream-status.ts
import * as NodeChildProcess from "node:child_process";

import { compareSemverVersions } from "@t3tools/shared/semver";

const FORK_REPOSITORY = "deepfry666/t3code-cn";
export const SYNC_BRANCH_PREFIX = "chore/sync-v";

export type ForkUpstreamAction =
  | { readonly action: "sync"; readonly officialVersion: string; readonly branch: string }
  | { readonly action: "wait"; readonly pullRequest: string }
  | { readonly action: "release"; readonly version: string }
  | { readonly action: "idle"; readonly version: string };

export function decideForkUpstreamAction(input: {
  readonly officialVersion: string;
  readonly forkVersion: string;
  readonly releaseTags: ReadonlyArray<string>;
  readonly openSyncPullRequest: string | undefined;
}): ForkUpstreamAction {
  const releasedForBase = input.releaseTags.flatMap((tag) => {
    const match = /^v(\d+\.\d+\.\d+)-cn\.(\d+)$/.exec(tag);
    return match?.[1] === input.forkVersion ? [Number(match[2])] : [];
  });
  if (releasedForBase.length === 0) {
    return { action: "release", version: `${input.forkVersion}-cn.1` };
  }
  if (input.openSyncPullRequest !== undefined) {
    return { action: "wait", pullRequest: input.openSyncPullRequest };
  }
  if (compareSemverVersions(input.officialVersion, input.forkVersion) > 0) {
    return {
      action: "sync",
      officialVersion: input.officialVersion,
      branch: `${SYNC_BRANCH_PREFIX}${input.officialVersion}`,
    };
  }
  return { action: "idle", version: `${input.forkVersion}-cn.${Math.max(...releasedForBase)}` };
}

const run = (command: string, args: ReadonlyArray<string>) =>
  NodeChildProcess.execFileSync(command, args, { encoding: "utf8" });

const packageVersion = (ref: string): string =>
  JSON.parse(run("git", ["show", `${ref}:apps/server/package.json`])).version;

if (import.meta.main) {
  run("git", ["fetch", "--quiet", "official", "main"]);
  run("git", ["fetch", "--quiet", "origin", "main"]);
  const releases: ReadonlyArray<{ tagName: string; isDraft: boolean }> = JSON.parse(
    run("gh", [
      "release",
      "list",
      "-R",
      FORK_REPOSITORY,
      "--limit",
      "200",
      "--json",
      "tagName,isDraft",
    ]),
  );
  const pullRequests: ReadonlyArray<{ headRefName: string; url: string }> = JSON.parse(
    run("gh", [
      "pr",
      "list",
      "-R",
      FORK_REPOSITORY,
      "--state",
      "open",
      "--json",
      "headRefName,url",
    ]),
  );
  const decision = decideForkUpstreamAction({
    officialVersion: packageVersion("official/main"),
    forkVersion: packageVersion("origin/main"),
    releaseTags: releases.filter((release) => !release.isDraft).map((release) => release.tagName),
    openSyncPullRequest: pullRequests.find((pr) => pr.headRefName.startsWith(SYNC_BRANCH_PREFIX))
      ?.url,
  });
  console.log(JSON.stringify(decision));
}
