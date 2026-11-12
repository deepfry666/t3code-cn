import { describe, expect, it } from "vite-plus/test";

import { translate } from "./locale";

describe("interface locale", () => {
  it("uses the unchanged source message in English", () => {
    const messages = { "New thread": "新建会话" } as const;
    expect(translate("en", messages, "New thread")).toBe("New thread");
    expect(translate("zh-CN", messages, "New thread")).toBe("新建会话");
  });

  it("drops a context suffix from English and lets Chinese differ by context", () => {
    const messages = { When: "生效条件", "When@@snooze": "暂缓到" } as const;
    expect(translate("en", messages, "When@@snooze")).toBe("When");
    expect(translate("zh-CN", messages, "When@@snooze")).toBe("暂缓到");
    expect(translate("zh-CN", messages, "When")).toBe("生效条件");
  });
  it("interpolates values as plain text without substituting missing or inherited keys", () => {
    const messages = {
      "Open {name} ({count})": "打开 {name}（{count}）",
      "{toString}": "{toString}",
    } as const;
    expect(
      translate("zh-CN", messages, "Open {name} ({count})", { name: "<script>", count: 0 }),
    ).toBe("打开 <script>（0）");
    expect(translate("en", messages, "Open {name} ({count})", { name: "$&" })).toBe(
      "Open $& ({count})",
    );
    expect(translate("zh-CN", messages, "{toString}")).toBe("{toString}");
  });
});
