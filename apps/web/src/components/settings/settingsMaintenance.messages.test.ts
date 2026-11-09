import { expect, it } from "vite-plus/test";

import { translateMaintenanceLabel } from "./settingsMaintenance.messages";

it("maps server worktree blockers without changing terminal actions or English errors", () => {
  expect(translateMaintenanceLabel("Open terminal", "zh-CN")).toBe("有打开的终端");
  expect(translateMaintenanceLabel("open terminal", "zh-CN")).toBe("有打开的终端");
  expect(
    translateMaintenanceLabel(
      "Error invoking remote method 'desktop:cleanup': Error: Open terminal",
      "zh-CN",
    ),
  ).toBe("有打开的终端");
  expect(translateMaintenanceLabel("Open terminal", "en")).toBe("Open terminal");
});
