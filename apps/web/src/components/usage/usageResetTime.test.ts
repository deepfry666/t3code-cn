import type { ServerProviderUsageWindow } from "@t3tools/contracts";
import { formatResetsIn as formatSharedResetsIn } from "@t3tools/shared/usageLimits";
import { afterEach, describe, expect, it } from "vite-plus/test";

import { setLocale } from "../../../test/locale";
import { formatResetsIn, formatResetsInShort } from "./usageResetTime";

const now = Date.parse("2026-09-03T12:00:00.000Z");

const windowResettingAt = (resetsAt: string): ServerProviderUsageWindow => ({
  id: "five_hour",
  kind: "session",
  label: "Session",
  usedPercent: 40,
  resetsAt,
});

afterEach(() => setLocale("en"));

describe("usage reset countdown", () => {
  const cases = [
    "2026-09-03T14:30:00.000Z",
    "2026-09-03T12:00:30.000Z",
    "2026-09-03T11:00:00.000Z",
    "2026-09-05T15:15:00.000Z",
  ];

  it("keeps the wording shared with mobile in English", () => {
    for (const resetsAt of cases) {
      const window = windowResettingAt(resetsAt);
      expect(formatResetsIn(window, now)).toBe(formatSharedResetsIn(window, now));
    }
  });

  it("words the countdown in Chinese", () => {
    setLocale("zh-CN");
    expect(formatResetsIn(windowResettingAt("2026-09-03T14:30:00.000Z"), now)).toBe(
      "2 小时 30 分钟 后重置",
    );
    expect(formatResetsIn(windowResettingAt("2026-09-03T12:00:30.000Z"), now)).toBe("即将重置");
    expect(formatResetsIn(windowResettingAt("2026-09-03T11:00:00.000Z"), now)).toBe("已到重置时间");
    expect(formatResetsInShort(windowResettingAt("2026-09-03T14:30:00.000Z"), now)).toBe(
      "还需 2 小时 30 分钟",
    );
  });

  it("has no countdown without a reset time", () => {
    const window = { id: "weekly", kind: "weekly", label: "Week", usedPercent: 0 } as const;
    expect(formatResetsIn(window, now)).toBeNull();
    expect(formatResetsInShort(window, now)).toBeNull();
  });
});
