import { describe, expect, it } from "vite-plus/test";

import { setLocale } from "../test/locale";
import {
  formatDayAwareTimestamp,
  formatUpcomingTimestamp,
  formatRelativeTimeLabel,
} from "./timestampFormat";

describe("timestamps in an explicit time zone", () => {
  // 23:00 UTC on July 1 is 7 PM on July 1 in New York, whatever the host zone.
  const now = Date.parse("2026-07-01T23:00:00.000Z");
  const zone = "America/New_York";

  it("picks relative days from the calendar in that zone", () => {
    expect(formatUpcomingTimestamp("2026-07-02T00:30:00.000Z", "12-hour", now, zone)).not.toMatch(
      /tomorrow/,
    );
    expect(formatRelativeTimeLabel("2026-06-22T23:00:00.000Z", now)).toBe("9d ago");
    expect(formatUpcomingTimestamp("2026-07-02T05:30:00.000Z", "12-hour", now, zone)).toMatch(
      /^tomorrow at /,
    );
    expect(formatDayAwareTimestamp("2026-07-01T03:30:00.000Z", "12-hour", now, zone)).toMatch(
      /^yesterday at /,
    );
  });
});

describe("relative days in the interface language", () => {
  const now = Date.parse("2026-07-01T23:00:00.000Z");
  const zone = "America/New_York";

  it("switches to Chinese and back to the same English", () => {
    try {
      setLocale("zh-CN");
      expect(formatRelativeTimeLabel("2026-06-22T23:00:00.000Z", now)).toBe("9 天前");
      expect(formatRelativeTimeLabel("2026-07-01T21:00:00.000Z", now)).toBe("2 小时前");
      expect(formatRelativeTimeLabel("2026-07-01T22:58:00.000Z", now)).toBe("2 分钟前");
      expect(formatRelativeTimeLabel("2026-07-01T23:00:00.000Z", now)).toBe("刚刚");
      expect(formatUpcomingTimestamp("2026-07-02T05:30:00.000Z", "12-hour", now, zone)).toMatch(
        /^明天 /,
      );
      expect(formatDayAwareTimestamp("2026-07-01T03:30:00.000Z", "12-hour", now, zone)).toMatch(
        /^昨天 /,
      );
    } finally {
      setLocale("en");
    }
    expect(formatRelativeTimeLabel("2026-06-22T23:00:00.000Z", now)).toBe("9d ago");
    expect(formatUpcomingTimestamp("2026-07-02T05:30:00.000Z", "12-hour", now, zone)).toMatch(
      /^tomorrow at /,
    );
    expect(formatDayAwareTimestamp("2026-07-01T03:30:00.000Z", "12-hour", now, zone)).toMatch(
      /^yesterday at /,
    );
  });
});
