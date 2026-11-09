import { describe, expect, it } from "vite-plus/test";

import { translate } from "~/i18n/locale";

import {
  pullRequestFilterOptionLabel,
  pullRequestTermAtStart,
  pullRequestUiMessages,
} from "./pullRequestUi.messages";

describe("pull request filter option labels", () => {
  it("translates fixed UI options", () => {
    expect(pullRequestFilterOptionLabel({ label: "All", translateLabel: true }, "zh-CN")).toBe(
      "全部",
    );
  });

  it("leaves project, environment and host data untouched even when it matches a UI label", () => {
    expect(pullRequestFilterOptionLabel({ label: "Checks" }, "zh-CN")).toBe("Checks");
    expect(pullRequestFilterOptionLabel({ label: "Open", translateLabel: false }, "zh-CN")).toBe(
      "Open",
    );
  });
});

describe("pull request terms at the start of English copy", () => {
  it("capitalizes the host's change request term", () => {
    expect(pullRequestTermAtStart("pull request", "en")).toBe("Pull request");
    expect(pullRequestTermAtStart("merge request", "en")).toBe("Merge request");
  });

  it("keeps the term in English in Chinese", () => {
    expect(pullRequestTermAtStart("pull request", "zh-CN")).toBe("Pull request");
  });
});

describe("English source punctuation", () => {
  it("keeps the freshness sentence's final period in every count variant", () => {
    expect(
      translate(
        "en",
        pullRequestUiMessages,
        "This branch is out-of-date with {branch} by {count} commit.",
        {
          branch: "main",
          count: 1,
        },
      ),
    ).toBe("This branch is out-of-date with main by 1 commit.");
    expect(
      translate(
        "en",
        pullRequestUiMessages,
        "This branch is out-of-date with {branch} by {count} commits.",
        {
          branch: "main",
          count: 2,
        },
      ),
    ).toBe("This branch is out-of-date with main by 2 commits.");
  });
});
