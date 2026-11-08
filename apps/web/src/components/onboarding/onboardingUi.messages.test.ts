import { describe, expect, it } from "vite-plus/test";

import { threadImportWarning } from "./onboardingUi.messages";

describe("threadImportWarning", () => {
  it("counts each sentence on its own in English", () => {
    expect(threadImportWarning("en", { imported: 1, skipped: 1 })).toBe(
      "Imported 1 thread. 1 thread could not be imported.",
    );
    expect(threadImportWarning("en", { imported: 2, skipped: 1 })).toBe(
      "Imported 2 threads. 1 thread could not be imported.",
    );
    expect(threadImportWarning("en", { imported: 1, skipped: 3 })).toBe(
      "Imported 1 thread. 3 threads could not be imported.",
    );
    // Nothing was skipped: the projects' history was only partly imported.
    expect(threadImportWarning("en", { imported: 2, skipped: 0 })).toBe(
      "Imported 2 threads. Some thread history could not be imported.",
    );
    expect(threadImportWarning("en", { imported: 0, skipped: 2 })).toBe(
      "2 threads could not be imported.",
    );
    expect(threadImportWarning("en", { imported: 0, skipped: 0 })).toBe(
      "Could not import thread history.",
    );
  });

  it("localizes the same counts in Chinese", () => {
    expect(threadImportWarning("zh-CN", { imported: 1, skipped: 1 })).toBe(
      "已导入 1 个会话。1 个会话无法导入。",
    );
    expect(threadImportWarning("zh-CN", { imported: 2, skipped: 0 })).toBe(
      "已导入 2 个会话。部分会话历史无法导入。",
    );
    expect(threadImportWarning("zh-CN", { imported: 0, skipped: 0 })).toBe("无法导入会话历史。");
  });
});
