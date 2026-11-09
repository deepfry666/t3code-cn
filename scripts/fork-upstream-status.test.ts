import { assert, it } from "@effect/vitest";

import { decideForkUpstreamAction } from "./fork-upstream-status.ts";

it.each([
  {
    name: "stays idle when the merged version is released and upstream has nothing newer",
    input: {
      officialVersion: "0.1.7",
      forkVersion: "0.1.7",
      releaseTags: ["v0.1.7-cn.2", "v0.1.7-cn.4"],
    },
    expected: { action: "idle", version: "0.1.7-cn.4" },
  },
  {
    name: "syncs when upstream publishes a newer stable version",
    input: { officialVersion: "0.1.8", forkVersion: "0.1.7", releaseTags: ["v0.1.7-cn.4"] },
    expected: { action: "sync", officialVersion: "0.1.8", branch: "chore/sync-v0.1.8" },
  },
  {
    name: "releases cn.1 once the sync is merged, ignoring nightlies and other bases",
    input: {
      officialVersion: "0.1.8",
      forkVersion: "0.1.8",
      releaseTags: ["v0.1.7-cn.4", "v0.1.8-nightly.20261109.4392", "v0.1.80-cn.1"],
    },
    expected: { action: "release", version: "0.1.8-cn.1" },
  },
  {
    name: "waits for an open sync pull request instead of opening another",
    input: {
      officialVersion: "0.1.9",
      forkVersion: "0.1.7",
      releaseTags: ["v0.1.7-cn.4"],
      openSyncPullRequest: "https://github.com/deepfry666/t3code-cn/pull/31",
    },
    expected: { action: "wait", pullRequest: "https://github.com/deepfry666/t3code-cn/pull/31" },
  },
] as const)("$name", ({ input, expected }) => {
  assert.deepStrictEqual(
    decideForkUpstreamAction({ openSyncPullRequest: undefined, ...input }),
    expected,
  );
});
