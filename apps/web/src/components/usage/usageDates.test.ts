import { formatDateTimeShort, formatDayShort } from "@t3tools/shared/usageFormat";
import { describe, expect, it } from "vite-plus/test";

import { formatUsageDayLabel, formatUsageHourLabel, formatUsageHourTipLabel } from "./usageDates";

describe("usage labels", () => {
  const hour = "2026-11-07T19:00:00.000Z";
  const reference = "2026-11-08T19:00:00.000Z";
  const zone = "America/New_York";

  it("keeps the wording shared with mobile in English", () => {
    expect(formatUsageDayLabel("2026-11-08", "en")).toBe(formatDayShort("2026-11-08"));
    expect(formatUsageHourLabel(hour, zone, true, "en")).toBe(
      formatDateTimeShort(hour, zone, true),
    );
    expect(formatUsageHourTipLabel(hour, reference, zone, true, "en")).toBe("2 PM yesterday");
    expect(formatUsageHourTipLabel(hour, reference, zone, false, "en")).toBe("14:00 yesterday");
  });

  it("formats days and hours in Chinese", () => {
    expect(formatUsageDayLabel("2026-11-08", "zh-CN")).toBe("11月8日");
    expect(formatUsageHourLabel(hour, zone, false, "zh-CN")).toBe("11月7日 14:00");
    expect(formatUsageHourTipLabel(hour, reference, zone, false, "zh-CN")).toBe("昨天 14:00");
  });

  it("compares calendar days, not elapsed hours", () => {
    // 23:00 local on the 7th against 01:00 on the 8th is yesterday, two hours apart.
    expect(
      formatUsageHourTipLabel(
        "2026-11-08T04:00:00.000Z",
        "2026-11-08T06:00:00.000Z",
        zone,
        false,
        "zh-CN",
      ),
    ).toBe("昨天 23:00");
  });

  it("leaves an unparsable day as written", () => {
    expect(formatUsageDayLabel("not-a-day", "zh-CN")).toBe("not-a-day");
  });
});
