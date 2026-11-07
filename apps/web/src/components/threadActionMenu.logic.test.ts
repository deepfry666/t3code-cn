import { translate } from "../i18n/locale";
import { coreUiMessages } from "./coreUi.messages";
import { describe, expect, it } from "vite-plus/test";

import { buildThreadActionMenuItems, type ThreadActionMenuState } from "./threadActionMenu.logic";

const baseState: ThreadActionMenuState = {
  canOperate: true,
  branch: null,
  projectFilter: null,
  isPinned: false,
  isSettled: false,
  autoSettleEnabled: true,
  isSnoozed: false,
  canSnoozeNow: true,
  isRegeneratingTitle: false,
  isRunning: false,
  supports: {
    settlement: true,
    autoSettleOptOut: true,
    snooze: true,
    pinning: true,
    titleRegeneration: true,
  },
  snoozePresets: [
    { id: "hour", label: "In 1 hour", whenLabel: "3:00 PM", snoozedUntil: "2026-08-07T15:00:00Z" },
  ],
};

describe("buildThreadActionMenuItems", () => {
  it.each([
    [false, "en"],
    [true, "en"],
    [false, "zh-CN"],
    [true, "zh-CN"],
  ] as const)(
    "disables both lifecycle directions without permission (reversed: %s, locale: %s)",
    (reversed, locale) => {
      const items = buildThreadActionMenuItems(
        {
          ...baseState,
          canOperate: false,
          isPinned: reversed,
          isSettled: reversed,
          isSnoozed: reversed,
        },
        (key, params) => translate(locale, coreUiMessages, key, params),
      );
      const expected = reversed
        ? [
            "unpin",
            "unsettle",
            "unsnooze",
            "rename",
            "regenerate-title",
            "auto-settle",
            "archive",
            "delete",
          ]
        : [
            "pin",
            "settle",
            "snooze",
            "rename",
            "regenerate-title",
            "auto-settle",
            "archive",
            "delete",
          ];
      expect(items.filter((item) => item.disabled).map((item) => item.id)).toEqual(expected);
      expect(
        items.find((item) => item.id === "snooze")?.children?.every((child) => child.disabled) ??
          true,
      ).toBe(true);
    },
  );

  it("disables archive and turning into a project while the thread is running", () => {
    const items = buildThreadActionMenuItems({
      ...baseState,
      isRunning: true,
      canTurnIntoProject: true,
    });
    expect(items.find((item) => item.id === "archive")?.disabled).toBe(true);
    expect(items.find((item) => item.id === "turn-into-project")?.disabled).toBe(true);
  });
  it("preserves identifiers and user-provided labels when localizing action menus", () => {
    const branch = "feature/{count}-$&";
    const project = "<project>{branch}";
    const state = { ...baseState, branch, projectFilter: { label: project, isActive: false } };
    const english = buildThreadActionMenuItems(state);
    const chinese = buildThreadActionMenuItems(state, (key, params) =>
      translate("zh-CN", coreUiMessages, key, params),
    );
    expect(chinese.map(({ id, disabled, destructive }) => ({ id, disabled, destructive }))).toEqual(
      english.map(({ id, disabled, destructive }) => ({ id, disabled, destructive })),
    );
    expect(chinese.find(({ id }) => id === "new-thread-on-branch")?.label).toContain(branch);
    expect(chinese.find(({ id }) => id === "filter-by-project")?.label).toContain(project);
    expect(chinese.find(({ id }) => id === "snooze")?.children?.[0]).toEqual(
      english.find(({ id }) => id === "snooze")?.children?.[0],
    );
  });
});
