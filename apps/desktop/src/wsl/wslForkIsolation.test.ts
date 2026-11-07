import { describe, expect, it } from "vite-plus/test";

import {
  buildWslRuntimeInstallScript,
  buildWslRuntimeInvalidateScript,
  buildWslRuntimePruneScript,
} from "./DesktopWslEnvironment.ts";

describe("fork WSL runtime cache isolation", () => {
  it.each([
    ["install", buildWslRuntimeInstallScript("/runtime.tar.gz", "sha256-test", "b".repeat(64))],
    ["prune", buildWslRuntimePruneScript("sha256-test")],
    ["invalidate", buildWslRuntimeInvalidateScript("sha256-test")],
  ])("keeps %s inside the fork cache", (_, script) => {
    expect(script).toContain("$HOME/.t3code-cn/wsl-runtime");
    expect(script).not.toContain("$HOME/.t3/wsl-runtime");
  });
});
