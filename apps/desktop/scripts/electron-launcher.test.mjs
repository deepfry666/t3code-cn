import * as NodeChildProcess from "node:child_process";
import * as NodeEvents from "node:events";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeVM from "node:vm";

import { FORK_IDENTITY } from "@t3tools/shared/forkIdentity";

import { assert, describe, it } from "vite-plus/test";

import {
  makeDevelopmentEnvironmentScript,
  makeDevelopmentLauncherScript,
  resolveElectronBinaryPath,
  resolveMacLauncherPaths,
  writeDevelopmentLauncherScript,
} from "./electron-launcher.mjs";

describe("electron development launcher", () => {
  it.each([false, true])(
    "brands main and helper bundles and caches their identity (dev=%s)",
    (development) => {
      const source = NodeFS.readFileSync(
        new URL("./electron-launcher.mjs", import.meta.url),
        "utf8",
      )
        .replace(/^import\s[\s\S]*?;\n/gm, "")
        .replaceAll("export ", "")
        .replaceAll("import.meta.url", "moduleUrl");
      const commands = [];
      const files = new Map();
      const context = {
        FORK_IDENTITY,
        NodeChildProcess: {
          spawnSync: (command, args) => {
            commands.push([command, args]);
            return { status: 0 };
          },
        },
        NodeFS: {
          existsSync: () => true,
          statSync: () => ({ mtimeMs: 1 }),
          readFileSync: (path) => files.get(path) ?? "",
          writeFileSync: (path, text) => files.set(path, text),
          mkdirSync: () => {},
          cpSync: () => {},
          copyFileSync: () => {},
          rmSync: () => {},
          chmodSync: () => {},
        },
        NodeOS: { platform: () => "darwin" },
        NodePath,
        NodeURL: { fileURLToPath: () => "/repo/apps/desktop/scripts/electron-launcher.mjs" },
        moduleUrl: "file:///repo/apps/desktop/scripts/electron-launcher.mjs",
        process: { env: development ? { VITE_DEV_SERVER_URL: "http://localhost:1234" } : {} },
      };
      // Run the real bundle patching path with inert filesystem and subprocess boundaries.
      const run = (identity = FORK_IDENTITY) =>
        NodeVM.runInNewContext(
          `${source}\nbuildMacLauncher("/electron/Electron.app/Contents/MacOS/Electron");`,
          { ...context, FORK_IDENTITY: identity },
        );
      run();
      const displayName = `${FORK_IDENTITY.displayName} (${development ? "Dev" : "Beta"})`;
      const bundleId = `${FORK_IDENTITY.appId}${development ? ".dev.repo" : ""}`;
      const bundlePath = `/repo/apps/desktop/.electron-runtime/${displayName}.app`;
      const plistWrites = commands
        .filter(([command]) => command === "plutil")
        .map(([, args]) => args);
      assert.deepInclude(plistWrites, [
        "-replace",
        "CFBundleDisplayName",
        "-string",
        displayName,
        `${bundlePath}/Contents/Info.plist`,
      ]);
      assert.deepInclude(plistWrites, [
        "-replace",
        "CFBundleIdentifier",
        "-string",
        bundleId,
        `${bundlePath}/Contents/Info.plist`,
      ]);
      for (const [name, suffix] of [
        ["", "helper"],
        [" (GPU)", "helper.gpu"],
        [" (Plugin)", "helper.plugin"],
        [" (Renderer)", "helper.renderer"],
      ]) {
        const plist = `${bundlePath}/Contents/Frameworks/Electron Helper${name}.app/Contents/Info.plist`;
        assert.deepInclude(plistWrites, [
          "-replace",
          "CFBundleDisplayName",
          "-string",
          `${displayName} Helper${name}`,
          plist,
        ]);
        assert.deepInclude(plistWrites, [
          "-replace",
          "CFBundleIdentifier",
          "-string",
          `${bundleId}.${suffix}`,
          plist,
        ]);
      }
      const metadata = JSON.parse(files.get("/repo/apps/desktop/.electron-runtime/metadata.json"));
      assert.equal(metadata.appDisplayName, displayName);
      assert.equal(metadata.appBundleId, bundleId);
      assert.deepEqual(metadata.appProtocolSchemes, [
        development ? FORK_IDENTITY.devUrlScheme : FORK_IDENTITY.urlScheme,
      ]);
      commands.length = 0;
      run();
      assert.isFalse(commands.some(([command]) => command === "plutil"));
      run({ ...FORK_IDENTITY, displayName: "Renamed Fork" });
      assert.isTrue(commands.some(([command]) => command === "plutil"));
      assert.equal(
        JSON.parse(files.get("/repo/apps/desktop/.electron-runtime/metadata.json")).appDisplayName,
        `Renamed Fork (${development ? "Dev" : "Beta"})`,
      );
    },
  );

  it("uses captured values only as fallbacks for a live runner environment", () => {
    const environmentScript = makeDevelopmentEnvironmentScript({
      VITE_DEV_SERVER_URL: "http://127.0.0.1:8526",
      T3CODE_PORT: "16566",
      T3CODE_HOME: "/tmp/t3",
      T3CODE_OTLP_PROTOCOL: "http/protobuf",
    });

    assert.include(
      environmentScript,
      "if [ -z \"${VITE_DEV_SERVER_URL:-}\" ]; then export VITE_DEV_SERVER_URL='http://127.0.0.1:8526'; fi",
    );
    assert.include(
      environmentScript,
      "if [ -z \"${T3CODE_OTLP_PROTOCOL:-}\" ]; then export T3CODE_OTLP_PROTOCOL='http/protobuf'; fi",
    );
    assert.notInclude(environmentScript, "\nexport VITE_DEV_SERVER_URL=");
  });

  it("keeps the launcher script free of volatile environment values", () => {
    const script = makeDevelopmentLauncherScript({
      electronBinaryPath: "/repo/node_modules/electron/Electron",
      mainEntryPath: "/repo/apps/desktop/dist-electron/main.cjs",
      desktopRoot: "/repo/apps/desktop",
      environmentFilePath: "/repo/apps/desktop/.electron-runtime/dev-environment.sh",
    });

    assert.include(
      script,
      "if [ -f '/repo/apps/desktop/.electron-runtime/dev-environment.sh' ]; then . '/repo/apps/desktop/.electron-runtime/dev-environment.sh'; fi",
    );
    assert.notInclude(script, "VITE_DEV_SERVER_URL");
    assert.include(
      script,
      "exec '/repo/node_modules/electron/Electron' --t3code-dev-root='/repo/apps/desktop' '/repo/apps/desktop/dist-electron/main.cjs' \"$@\"",
    );
  });

  it("repairs Electron before loading the package entrypoint", () => {
    const calls = [];
    const electronPath = resolveElectronBinaryPath({
      ensureRuntime: () => {
        calls.push("ensure");
      },
      createRequire: () => (specifier) => {
        calls.push(`require:${specifier}`);
        return "/repo/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron";
      },
      moduleUrl: import.meta.url,
    });

    assert.equal(
      electronPath,
      "/repo/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron",
    );
    assert.deepEqual(calls, ["ensure", "require:electron"]);
  });

  it("keeps the native Electron executable name inside the branded macOS bundle", () => {
    const paths = resolveMacLauncherPaths(
      "/repo/apps/desktop/.electron-runtime/T3 Code (Dev).app",
      "T3 Code (Dev)",
    );

    assert.equal(paths.launcherExecutableName, "T3 Code (Dev) Launcher");
    assert.equal(
      paths.launcherBinaryPath,
      "/repo/apps/desktop/.electron-runtime/T3 Code (Dev).app/Contents/MacOS/T3 Code (Dev) Launcher",
    );
    assert.equal(
      paths.runtimeElectronBinaryPath,
      "/repo/apps/desktop/.electron-runtime/T3 Code (Dev).app/Contents/MacOS/Electron",
    );

    const script = makeDevelopmentLauncherScript({
      electronBinaryPath: paths.runtimeElectronBinaryPath,
      mainEntryPath: "/repo/apps/desktop/dist-electron/main.cjs",
      desktopRoot: "/repo/apps/desktop",
      environmentFilePath: "/repo/apps/desktop/.electron-runtime/dev-environment.sh",
    });
    assert.include(
      script,
      "exec '/repo/apps/desktop/.electron-runtime/T3 Code (Dev).app/Contents/MacOS/Electron'",
    );
    assert.notInclude(script, "node_modules/electron");
  });

  it("restores execute permissions on an unchanged launcher", () => {
    const directory = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-launcher-"));
    const launcherPath = NodePath.join(directory, "launcher");
    try {
      writeDevelopmentLauncherScript(launcherPath, "/runtime/Electron");
      NodeFS.chmodSync(launcherPath, 0o644);

      assert.isFalse(writeDevelopmentLauncherScript(launcherPath, "/runtime/Electron"));
      assert.equal(NodeFS.statSync(launcherPath).mode & 0o777, 0o755);
    } finally {
      NodeFS.rmSync(directory, { recursive: true, force: true });
    }
  });
});

async function startupCleanupPattern(desktopDir) {
  const source = NodeFS.readFileSync(new URL("./dev-electron.mjs", import.meta.url), "utf8");
  let pattern;
  // Supply inert imports so the real startup runs without launching Electron or signalling processes.
  await NodeVM.runInNewContext(
    `(async () => { ${source.replace(/^import\s[\s\S]*?;\n/gm, "")} })()`,
    {
      NodeChildProcess: {
        execFileSync: () => undefined,
        spawnSync: (command, args) => {
          if (command === "pkill" && args.includes("-f")) pattern = args.at(-1);
        },
        spawn: () => new NodeEvents.EventEmitter(),
      },
      NodeFS: { watch: () => ({ close: () => undefined }) },
      NodeOS: { platform: () => "linux" },
      NodePath,
      desktopDir,
      resolveDevProtocolClient: () => null,
      resolveElectronLaunchCommand: (args) => ({ electronPath: "electron", args }),
      waitForResources: async () => undefined,
      URL,
      process: {
        env: { VITE_DEV_SERVER_URL: "http://localhost:1234" },
        execPath: "node",
        once: () => undefined,
      },
    },
  );
  assert.isString(pattern);
  return pattern;
}

it
  // oxlint-disable-next-line t3code/no-global-process-runtime -- Native pgrep is unavailable on Windows.
  .skipIf(NodeOS.platform() === "win32")
  .each([
    "/tmp/t3-feature.one/apps/desktop",
    "/tmp/t3-feature.one [two](three)+?^${four}|back\\slash*/apps/desktop",
  ])("dev cleanup matches only the literal root argument: %s", async (desktopDir) => {
  const pattern = await startupCleanupPattern(desktopDir);
  const flag = `--t3code-dev-root=${desktopDir}`;
  const argvCases = [
    [flag],
    [flag, "main.cjs"],
    [flag.replace(".one", "Xone")],
    [`${flag}-two`],
    [`prefix${flag}`],
    [`--t3code-dev-root=/other${desktopDir}`],
  ];
  const children = [];
  try {
    for (const args of argvCases) {
      const child = NodeChildProcess.spawn(
        process.execPath,
        ["-e", "process.send('ready'); setInterval(() => {}, 1000)", "--", ...args],
        { stdio: ["ignore", "ignore", "inherit", "ipc"] },
      );
      children.push(child);
      await Promise.race([
        NodeEvents.once(child, "message"),
        NodeEvents.once(child, "exit").then(() => {
          throw new Error("Fixture exited before readiness");
        }),
      ]);
    }
    // Use the native ERE engine, but never execute the launcher's signal-producing command.
    const result = NodeChildProcess.spawnSync(
      "pgrep",
      ["-P", String(process.pid), "-f", "--", pattern],
      { encoding: "utf8" },
    );
    assert.equal(result.status, 0, result.stderr);
    const matches = result.stdout.trim().split(/\s+/).map(Number);
    assert.sameMembers(
      matches,
      children.slice(0, 2).map((child) => child.pid),
    );
  } finally {
    await Promise.all(
      children.map(async (child) => {
        if (child.exitCode !== null || child.signalCode !== null) return;
        const exited = NodeEvents.once(child, "exit");
        child.kill("SIGTERM");
        await exited;
      }),
    );
  }
});
