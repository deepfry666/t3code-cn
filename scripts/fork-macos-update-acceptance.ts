/* oxlint-disable t3code/no-global-process-runtime -- Standalone macOS acceptance has no Effect runtime and must inspect the host. */
// @effect-diagnostics nodeBuiltinImport:off globalDate:off globalConsole:off globalFetch:off - Host-side macOS automation reads the clock and process table directly.
// Fork-only acceptance for the Chinese macOS update path. It installs a baseline dmg into a
// temporary folder, serves a newer build from a mock feed, and drives the real updater through
// Squirrel.Mac's signature check, install and relaunch, then checks version, data and UI.
//
//   node scripts/fork-macos-update-acceptance.ts --baseline-dmg <dmg> --new-dir release/macos-<new> \
//     --baseline-version 0.1.7-cn.3 --new-version 0.1.7-cn.4
//
// Squirrel relaunches the app through LaunchServices, which drops this script's environment.
// Both test copies get LSEnvironment (re-signed with the same identity) so the relaunch keeps
// the temporary T3CODE_HOME, but LaunchServices forces the real HOME, so Electron's userData is
// the live app's. The script therefore runs only while the live app holds that profile's
// single-instance lock: the relaunch then hands off to it and quits before touching anything.
import * as NodeChildProcess from "node:child_process";
import * as NodeCrypto from "node:crypto";
import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeTimersPromises from "node:timers/promises";
import * as NodeUtil from "node:util";
import { _electron, type ElectronApplication, type Page } from "playwright-core";
import { compareSemverVersions } from "@t3tools/shared/semver";

import { serializeUpdateManifest } from "./lib/update-manifest.ts";

const FIXTURE_DB = NodePath.join(import.meta.dirname, "fixtures/desktop-launch/statev2.sqlite");
const THREAD_TITLE = "Release launch check";
const APP_NAME = "T3 Code (Beta).app";
const EXECUTABLE = "Contents/MacOS/T3 Code (Beta)";
const LAUNCH_TIMEOUT_MS = 90_000;
const DOWNLOAD_TIMEOUT_MS = 5 * 60_000;
const INSTALL_TIMEOUT_MS = 5 * 60_000;
const CJK = /[一-鿿]/;
// Packaged builds pin navigator.languages to en-US, so pick Chinese the way Settings stores it.
const LOCALE_STORAGE_KEY = "t3code-cn:locale";

interface UpdateState {
  readonly enabled: boolean;
  readonly status: string;
  readonly channel: string;
  readonly currentVersion: string;
  readonly availableVersion: string | null;
  readonly downloadedVersion: string | null;
  readonly notAppliedVersion?: string | undefined;
  readonly message: string | null;
}

interface UpdateActionResult {
  readonly accepted: boolean;
  readonly completed: boolean;
  readonly state: UpdateState;
}

interface DesktopBridgeHandle {
  readonly getUpdateState: () => Promise<UpdateState>;
  readonly checkForUpdate: () => Promise<{
    readonly checked: boolean;
    readonly state: UpdateState;
  }>;
  readonly downloadUpdate: () => Promise<UpdateActionResult>;
  readonly installUpdate: (expectedVersion?: string) => Promise<UpdateActionResult>;
}

const { values } = NodeUtil.parseArgs({
  options: {
    "baseline-dmg": { type: "string" },
    "new-dir": { type: "string" },
    "baseline-version": { type: "string" },
    "new-version": { type: "string" },
    "artifacts-dir": { type: "string" },
    "mock-server-port": { type: "string", default: "3399" },
    "signing-dir": {
      type: "string",
      default: NodePath.join(NodeOS.homedir(), ".t3code-cn-signing"),
    },
  },
});
const baselineDmg = values["baseline-dmg"];
const newDir = values["new-dir"];
const baselineVersion = values["baseline-version"];
const newVersion = values["new-version"];
if (!baselineDmg || !newDir || !baselineVersion || !newVersion) {
  throw new Error(
    "Usage: fork-macos-update-acceptance.ts --baseline-dmg <dmg> --new-dir <dir> --baseline-version <v> --new-version <v> [--artifacts-dir <dir>]",
  );
}
if (compareSemverVersions(newVersion, baselineVersion) <= 0) {
  throw new Error(`The new version ${newVersion} must be greater than ${baselineVersion}.`);
}
const port = Number(values["mock-server-port"]);
const signingDir = values["signing-dir"]!;
const root = NodeFS.realpathSync(
  NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-macos-update-acceptance-")),
);
const home = NodePath.join(root, "home");
const t3Home = NodePath.join(home, ".t3");
const installDir = NodePath.join(root, "Applications");
const appPath = NodePath.join(installDir, APP_NAME);
const executable = NodePath.join(appPath, EXECUTABLE);
const feedDir = NodePath.join(root, "update-feed");
const artifactsDir = NodePath.resolve(
  values["artifacts-dir"] ?? NodePath.join("release", "macos-update-acceptance"),
);
const realHome = NodeOS.userInfo().homedir;
const liveProfile = NodePath.join(realHome, "Library/Application Support/t3code-v2");
const shipItDir = NodePath.join(realHome, "Library/Caches/com.t3tools.t3code.ShipIt");
const shipItFiles = ["ShipItState.plist", "ShipIt_stderr.log", "ShipIt_stdout.log"];
const lsregister =
  "/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister";
const eventsPath = NodePath.join(artifactsDir, "events.ndjson");

const run = (command: string, args: ReadonlyArray<string>): string =>
  NodeChildProcess.execFileSync(command, args, { encoding: "utf8" }).trim();

const record = (step: string, detail?: unknown): void => {
  console.log(
    `[macos-update-acceptance] ${step}${detail === undefined ? "" : ` ${JSON.stringify(detail)}`}`,
  );
  NodeFS.appendFileSync(
    eventsPath,
    `${JSON.stringify({ at: new Date().toISOString(), step, detail })}\n`,
  );
};

const writeJson = (name: string, value: unknown): void =>
  NodeFS.writeFileSync(NodePath.join(artifactsDir, name), `${JSON.stringify(value, null, 2)}\n`);

async function waitFor<T>(
  label: string,
  read: () => T | Promise<T>,
  done: (value: T) => boolean,
  timeoutMs: number,
  intervalMs = 1_000,
): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  let last: T | undefined;
  while (Date.now() < deadline) {
    last = await read();
    if (done(last)) return last;
    await NodeTimersPromises.setTimeout(intervalMs);
  }
  throw new Error(`Timed out waiting for ${label}. Last value: ${JSON.stringify(last)}`);
}

const launchServicesEnvironment = {
  T3CODE_HOME: t3Home,
  T3CODE_TELEMETRY_ENABLED: "false",
  T3CODE_DESKTOP_MOCK_UPDATES: "true",
  T3CODE_DESKTOP_MOCK_UPDATE_SERVER_PORT: String(port),
};
const appEnvironment = { ...launchServicesEnvironment, HOME: home };

function signingIdentity(): { identity: string; keychain: string } {
  const keychain = NodePath.join(signingDir, "signing.keychain-db");
  const passphrase = NodeFS.readFileSync(NodePath.join(signingDir, "passphrase"), "utf8").trim();
  run("security", ["unlock-keychain", "-p", passphrase, keychain]);
  const identity = /^\s*1\) ([0-9A-F]{40}) /m.exec(
    run("security", ["find-identity", "-p", "codesigning", keychain]),
  )?.[1];
  if (!identity) throw new Error(`No code signing identity in ${keychain}.`);
  return { identity, keychain };
}

function isolateAndResign(app: string, signing: { identity: string; keychain: string }): void {
  const plist = NodePath.join(app, "Contents/Info.plist");
  run("plutil", [
    "-replace",
    "LSEnvironment",
    "-json",
    JSON.stringify(launchServicesEnvironment),
    plist,
  ]);
  run("codesign", [
    "--force",
    "--sign",
    signing.identity,
    "--keychain",
    signing.keychain,
    "--timestamp=none",
    "--preserve-metadata=identifier,entitlements,requirements,flags",
    app,
  ]);
  run("codesign", ["--verify", "--deep", "--strict", app]);
}

const bundleVersion = (app: string): string =>
  run("/usr/libexec/PlistBuddy", [
    "-c",
    "Print :CFBundleShortVersionString",
    NodePath.join(app, "Contents/Info.plist"),
  ]);

const designatedRequirement = (app: string): string => {
  const result = NodeChildProcess.spawnSync("codesign", ["-d", "-r-", app], { encoding: "utf8" });
  const line = `${result.stdout}\n${result.stderr}`
    .split("\n")
    .find((entry) => entry.startsWith("designated => "));
  return line?.slice("designated => ".length) ?? "";
};

// Only processes whose executable lives under this run's private mkdtemp folder, which no
// other app or dev server can share. LaunchServices reports /var rather than /private/var.
function processesUnderRoot(): ReadonlyArray<{ pid: number; command: string }> {
  return run("ps", ["-axo", "pid=,comm="])
    .split("\n")
    .map((line) => /^\s*(\d+)\s+(.*)$/.exec(line))
    .filter((match): match is RegExpExecArray => match !== null)
    .map((match) => ({ pid: Number(match[1]), command: match[2]! }))
    .filter((entry) => entry.command.replace(/^\/var\//, "/private/var/").startsWith(`${root}/`));
}

async function stopProcessesUnderRoot(label: string): Promise<void> {
  const processes = processesUnderRoot();
  if (processes.length === 0) return;
  record(`stopping ${label}`, processes);
  for (const entry of processes) {
    try {
      process.kill(entry.pid, "SIGTERM");
    } catch {}
  }
  await waitFor(`${label} to exit`, processesUnderRoot, (left) => left.length === 0, 30_000);
}

async function launchApp(): Promise<{ app: ElectronApplication; page: Page }> {
  const app = await _electron.launch({
    executablePath: executable,
    args: ["--use-mock-keychain"],
    env: { ...process.env, ...appEnvironment },
    timeout: LAUNCH_TIMEOUT_MS,
  });
  const page = await app.firstWindow({ timeout: LAUNCH_TIMEOUT_MS });
  await page.waitForFunction(
    () => Boolean((globalThis as unknown as { desktopBridge?: unknown }).desktopBridge),
    undefined,
    { timeout: LAUNCH_TIMEOUT_MS },
  );
  return { app, page };
}

const readState = (page: Page) =>
  page.evaluate(() =>
    (
      globalThis as unknown as { desktopBridge: DesktopBridgeHandle }
    ).desktopBridge.getUpdateState(),
  );

async function checkDataAndLanguage(page: Page, label: string): Promise<void> {
  await page
    .locator("li[data-thread-item]", { hasText: THREAD_TITLE })
    .waitFor({ timeout: LAUNCH_TIMEOUT_MS });
  const bodyText = await page.locator("body").innerText();
  if (!CJK.test(bodyText)) throw new Error(`The ${label} app does not show a Chinese interface.`);
  await page.screenshot({ path: NodePath.join(artifactsDir, `${label}.png`), timeout: 10_000 });
  record(`${label} app shows the seeded thread in Chinese`);
}

function liveProfileLockHolder(): number | undefined {
  try {
    const pid = Number(
      /-(\d+)$/.exec(NodeFS.readlinkSync(NodePath.join(liveProfile, "SingletonLock")))?.[1],
    );
    process.kill(pid, 0);
    return pid;
  } catch {
    return undefined;
  }
}

const main = async (): Promise<void> => {
  if (process.platform !== "darwin" || process.arch !== "arm64") {
    throw new Error("Run this acceptance on an Apple silicon Mac.");
  }
  const lockHolder = liveProfileLockHolder();
  if (lockHolder === undefined) {
    throw new Error(
      `Open the installed T3 Code first: Squirrel's relaunch uses ${liveProfile}, and only the ` +
        "running app's single-instance lock makes that relaunch quit without touching it.",
    );
  }
  NodeFS.rmSync(artifactsDir, { recursive: true, force: true });
  NodeFS.mkdirSync(artifactsDir, { recursive: true });
  const shipItBackup = NodePath.join(root, "shipit-backup");
  NodeFS.mkdirSync(shipItBackup);
  for (const file of shipItFiles) {
    const source = NodePath.join(shipItDir, file);
    if (NodeFS.existsSync(source)) NodeFS.copyFileSync(source, NodePath.join(shipItBackup, file));
  }
  let app: ElectronApplication | undefined;
  let page: Page | undefined;
  let mockServer: NodeChildProcess.ChildProcess | undefined;
  const mockLog: string[] = [];
  let mountPoint: string | undefined;
  try {
    record("inputs", {
      baselineDmg,
      newDir,
      baselineVersion,
      newVersion,
      root,
      artifactsDir,
      liveProfileLockHolder: lockHolder,
    });
    const signing = signingIdentity();

    NodeFS.mkdirSync(NodePath.join(t3Home, "userdata"), { recursive: true });
    NodeFS.copyFileSync(FIXTURE_DB, NodePath.join(t3Home, "userdata/statev2.sqlite"));

    mountPoint = NodePath.join(root, "dmg");
    run("hdiutil", ["attach", "-nobrowse", "-readonly", "-mountpoint", mountPoint, baselineDmg]);
    NodeFS.mkdirSync(installDir, { recursive: true });
    run("ditto", [NodePath.join(mountPoint, APP_NAME), appPath]);
    run("hdiutil", ["detach", mountPoint]);
    mountPoint = undefined;
    const releaseRequirement = designatedRequirement(appPath);
    if (bundleVersion(appPath) !== baselineVersion) {
      throw new Error(`The baseline dmg holds ${bundleVersion(appPath)}, not ${baselineVersion}.`);
    }
    isolateAndResign(appPath, signing);
    if (designatedRequirement(appPath) !== releaseRequirement) {
      throw new Error("Re-signing the test copy changed its designated requirement.");
    }
    record("baseline installed from the dmg", { appPath, releaseRequirement });

    const newZip = NodePath.join(newDir, `T3-Code-${newVersion}-arm64.zip`);
    const extractDir = NodePath.join(root, "new-app");
    run("ditto", ["-x", "-k", newZip, extractDir]);
    const newApp = NodePath.join(extractDir, APP_NAME);
    if (designatedRequirement(newApp) !== releaseRequirement) {
      throw new Error("The new release is not signed with the baseline's identity.");
    }
    isolateAndResign(newApp, signing);
    NodeFS.mkdirSync(feedDir, { recursive: true });
    const feedZipName = NodePath.basename(newZip);
    const feedZip = NodePath.join(feedDir, feedZipName);
    run("ditto", ["-c", "-k", "--sequesterRsrc", "--keepParent", newApp, feedZip]);
    const sha512 = NodeCrypto.createHash("sha512")
      .update(NodeFS.readFileSync(feedZip))
      .digest("base64");
    NodeFS.writeFileSync(
      NodePath.join(feedDir, "latest-mac.yml"),
      serializeUpdateManifest(
        {
          version: newVersion,
          releaseDate: new Date().toISOString(),
          files: [{ url: feedZipName, sha512, size: NodeFS.statSync(feedZip).size }],
          extras: { path: feedZipName, sha512 },
        },
        { platformLabel: "macOS" },
      ),
    );
    record("mock feed prepared", { feedZipName });

    mockServer = NodeChildProcess.spawn(
      process.execPath,
      [NodePath.join(import.meta.dirname, "mock-update-server.ts")],
      {
        env: {
          ...process.env,
          T3CODE_DESKTOP_MOCK_UPDATE_SERVER_PORT: String(port),
          T3CODE_DESKTOP_MOCK_UPDATE_SERVER_ROOT: feedDir,
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    mockServer.stdout?.on("data", (chunk: Buffer) => mockLog.push(chunk.toString()));
    mockServer.stderr?.on("data", (chunk: Buffer) => mockLog.push(chunk.toString()));
    await waitFor(
      "the mock feed",
      () =>
        fetch(`http://localhost:${port}/latest-mac.yml`).then(
          (response) => response.status,
          () => 0,
        ),
      (status) => status === 200,
      30_000,
    );

    ({ app, page } = await launchApp());
    const baselinePage = page;
    if (
      (await app.evaluate(({ app: electronApp }) => electronApp.getVersion())) !== baselineVersion
    ) {
      throw new Error("The baseline app reports the wrong version.");
    }
    await baselinePage.evaluate((key) => localStorage.setItem(key, "zh-CN"), LOCALE_STORAGE_KEY);
    await baselinePage.reload();
    await checkDataAndLanguage(baselinePage, "01-baseline");

    const ready = await waitFor(
      "the updater to settle",
      () => readState(baselinePage),
      (state) => state.enabled || state.status === "disabled",
      60_000,
    );
    writeJson("01-update-state.json", ready);
    if (!ready.enabled) throw new Error(`Updates are disabled: ${ready.message ?? ready.status}`);

    await baselinePage.evaluate(() =>
      (
        globalThis as unknown as { desktopBridge: DesktopBridgeHandle }
      ).desktopBridge.checkForUpdate(),
    );
    const available = await waitFor(
      `version ${newVersion} to be offered`,
      () => readState(baselinePage),
      (state) => state.status === "available" && state.availableVersion === newVersion,
      120_000,
    );
    writeJson("02-update-available.json", available);
    record("update discovered");

    const download = await baselinePage.evaluate(() =>
      (
        globalThis as unknown as { desktopBridge: DesktopBridgeHandle }
      ).desktopBridge.downloadUpdate(),
    );
    if (!download.accepted) throw new Error(`Download refused: ${JSON.stringify(download)}`);
    const downloaded = await waitFor(
      `version ${newVersion} to download`,
      () => readState(baselinePage),
      (state) =>
        (state.status === "downloaded" && state.downloadedVersion === newVersion) ||
        state.status === "error",
      DOWNLOAD_TIMEOUT_MS,
    );
    writeJson("03-update-downloaded.json", downloaded);
    if (downloaded.status !== "downloaded") {
      throw new Error(`The download failed: ${downloaded.message}`);
    }
    await baselinePage.screenshot({
      path: NodePath.join(artifactsDir, "02-downloaded.png"),
      timeout: 10_000,
    });
    record("update downloaded and handed to Squirrel.Mac");

    const child = app.process();
    const install = baselinePage
      .evaluate(
        (version) =>
          (
            globalThis as unknown as { desktopBridge: DesktopBridgeHandle }
          ).desktopBridge.installUpdate(version),
        newVersion,
      )
      .catch((error: unknown) => ({
        quitting: error instanceof Error ? error.message : String(error),
      }));
    await waitFor(
      "the baseline app to quit for the install",
      () => child.exitCode !== null || child.signalCode !== null,
      Boolean,
      INSTALL_TIMEOUT_MS,
      500,
    );
    record("baseline quit for the install", await install);
    app = undefined;
    page = undefined;

    await waitFor(
      `the bundle to report ${newVersion}`,
      () => bundleVersion(appPath),
      (version) => version === newVersion,
      INSTALL_TIMEOUT_MS,
      2_000,
    );
    const quarantine = NodeChildProcess.spawnSync("xattr", [
      "-p",
      "com.apple.quarantine",
      appPath,
    ]).status;
    writeJson("04-installed.json", {
      version: bundleVersion(appPath),
      designatedRequirement: designatedRequirement(appPath),
      quarantined: quarantine === 0,
    });
    if (quarantine === 0) throw new Error("The installed update carries a quarantine flag.");
    run("codesign", ["--verify", "--deep", "--strict", appPath]);
    record("Squirrel.Mac installed the update without quarantine");

    const launchedLine = `Successfully launched application at ${new URL(`file://${appPath.replace(/^\/private\/var\//, "/var/")}/`).href}`;
    const shipItLog = await waitFor(
      "Squirrel.Mac to relaunch the app",
      () => NodeFS.readFileSync(NodePath.join(shipItDir, "ShipIt_stderr.log"), "utf8"),
      (log) => log.includes(launchedLine),
      120_000,
      2_000,
    );
    NodeFS.writeFileSync(
      NodePath.join(artifactsDir, "shipit.log"),
      shipItLog.slice(shipItLog.lastIndexOf("Detected this as an install request")),
    );
    await waitFor(
      "the relaunched app to hand off to the live app and quit",
      processesUnderRoot,
      (processes) => processes.length === 0,
      60_000,
    );
    record("Squirrel.Mac relaunched the updated app, which handed off to the live app");

    ({ app, page } = await launchApp());
    const updatedPage = page;
    const updatedVersion = await app.evaluate(({ app: electronApp }) => electronApp.getVersion());
    if (updatedVersion !== newVersion) {
      throw new Error(`The updated app reports ${updatedVersion}, expected ${newVersion}.`);
    }
    await checkDataAndLanguage(updatedPage, "03-updated");
    const updatedState = await waitFor(
      "the updated app's updater",
      () => readState(updatedPage),
      (state) => state.enabled || state.status === "disabled",
      60_000,
    );
    writeJson("05-updated-state.json", updatedState);
    if (updatedState.currentVersion !== newVersion || updatedState.notAppliedVersion) {
      throw new Error(`The updated app's updater disagrees: ${JSON.stringify(updatedState)}`);
    }
    record("acceptance passed", { baselineVersion, updatedVersion });
  } catch (error) {
    record("acceptance failed", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    await page
      ?.screenshot({ path: NodePath.join(artifactsDir, "failure.png"), timeout: 10_000 })
      .catch(() => {});
    process.exitCode = 1;
  } finally {
    await Promise.race([app?.close().catch(() => {}), NodeTimersPromises.setTimeout(10_000)]);
    await stopProcessesUnderRoot("leftover test processes").catch((error: unknown) =>
      record("could not stop leftover processes", String(error)),
    );
    if (mountPoint) NodeChildProcess.spawnSync("hdiutil", ["detach", "-force", mountPoint]);
    mockServer?.kill();
    for (const file of shipItFiles) {
      const backup = NodePath.join(root, "shipit-backup", file);
      if (NodeFS.existsSync(backup)) NodeFS.copyFileSync(backup, NodePath.join(shipItDir, file));
    }
    for (const bundle of [appPath, NodePath.join(root, "new-app", APP_NAME)]) {
      NodeChildProcess.spawnSync(lsregister, ["-u", bundle]);
    }
    NodeFS.writeFileSync(NodePath.join(artifactsDir, "mock-update-server.log"), mockLog.join(""));
    for (const logs of [NodePath.join(t3Home, "userdata/logs"), NodePath.join(t3Home, "logs")]) {
      if (NodeFS.existsSync(logs)) {
        NodeFS.cpSync(logs, NodePath.join(artifactsDir, "t3-logs"), { recursive: true });
      }
    }
    if (processesUnderRoot().length === 0) NodeFS.rmSync(root, { recursive: true, force: true });
    console.log(`[macos-update-acceptance] evidence in ${artifactsDir}`);
  }
};

await main();
