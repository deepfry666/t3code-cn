// @effect-diagnostics nodeBuiltinImport:off - builds a disposable artifact directory on disk.
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import { expect, it } from "vite-plus/test";

import {
  assertAcceptanceVersions,
  findDesktopArtifact,
  parseDesktopArtifactVersion,
  renderLatestYml,
} from "./windows-update-acceptance.ts";

it("accepts only a strictly newer stable artifact version", () => {
  expect(() => assertAcceptanceVersions("0.1.7", "0.1.8")).not.toThrow();
  expect(() => assertAcceptanceVersions("0.1.7", "0.1.7")).toThrow(/greater than the baseline/);
  expect(() => assertAcceptanceVersions("0.1.7", "0.1.6")).toThrow(/greater than the baseline/);
  expect(() => assertAcceptanceVersions("0.1.7", "0.1.8-nightly.20261108.1")).toThrow(
    /not a stable x\.y\.z version/,
  );
});

it("reads the version out of the electron-builder installer name", () => {
  expect(parseDesktopArtifactVersion("T3-Code-0.1.8-x64.exe")).toBe("0.1.8");
  expect(parseDesktopArtifactVersion("T3-Code-1.2.3-x64.exe.blockmap")).toBeNull();
  expect(parseDesktopArtifactVersion("elevate.exe")).toBeNull();
});

it("finds the one installer for the requested version", () => {
  const directory = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-windows-artifact-"));
  try {
    NodeFS.writeFileSync(NodePath.join(directory, "T3-Code-0.1.8-x64.exe"), "");
    const found = findDesktopArtifact(directory, "0.1.8");
    expect(NodePath.basename(found)).toBe("T3-Code-0.1.8-x64.exe");
    expect(() => findDesktopArtifact(directory, "0.1.9")).toThrow(
      /do not report the requested new version 0\.1\.9/,
    );
  } finally {
    NodeFS.rmSync(directory, { recursive: true, force: true });
  }
});

it("renders the electron-updater feed the mock server serves", () => {
  const latest = renderLatestYml({
    version: "0.1.8",
    fileName: "T3-Code-0.1.8-x64.exe",
    sha512: "digest",
    size: 42,
    releaseDate: "2026-11-09T00:00:00.000Z",
  });
  expect(latest).toContain("version: '0.1.8'");
  expect(latest).toContain("  - url: T3-Code-0.1.8-x64.exe");
  expect(latest).toContain("    sha512: digest");
  expect(latest).toContain("    size: 42");
  expect(latest).toContain("path: 'T3-Code-0.1.8-x64.exe'");
  expect(latest).toContain("releaseDate: '2026-11-09T00:00:00.000Z'");
});
