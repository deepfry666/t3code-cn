/* oxlint-disable t3code/no-global-process-runtime -- Standalone Windows acceptance has no Effect runtime and must inspect the host. */
// @effect-diagnostics nodeBuiltinImport:off globalDate:off globalConsole:off - Host-side Windows automation reads the clock and process table directly.
// Windows-only acceptance for the installed-app update handoff. It installs the last
// published build, points the app's mock update feed at a newer Actions artifact, then
// checks the app finds, downloads, installs and restarts on it without losing state.
// See .github/workflows/fork-windows-update-test.yml for the runner and inputs.
import * as NodeChildProcess from "node:child_process";
import * as NodeCrypto from "node:crypto";
import * as NodeFS from "node:fs";
import * as NodeHttp from "node:http";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";
import * as NodeTimersPromises from "node:timers/promises";
import * as NodeUtil from "node:util";
import { extractFile, uncache } from "@electron/asar";
import { _electron, type ElectronApplication, type Page } from "playwright-core";
import { compareSemverVersions } from "@t3tools/shared/semver";

import { parseUpdateManifest, serializeUpdateManifest } from "./lib/update-manifest.ts";

const FIXTURE_DB = NodePath.join(import.meta.dirname, "fixtures/desktop-launch/statev2.sqlite");
const THREAD_TITLE = "Release launch check";
const THREAD_MESSAGE = "The release opens and shows this thread.";
const LAUNCH_TIMEOUT_MS = 90_000;
const DOWNLOAD_TIMEOUT_MS = 5 * 60_000;
const INSTALL_APPLY_TIMEOUT_MS = 10 * 60_000;
const RELAUNCH_TIMEOUT_MS = 3 * 60_000;
const WINDOW_TIMEOUT_MS = 2 * 60_000;

interface AcceptanceOptions {
  readonly baselineInstaller: string;
  readonly newArtifactDir: string;
  readonly baselineVersion: string;
  readonly newVersion: string;
  readonly installDir: string;
  readonly artifactsDir: string;
  readonly mockServerPort: number;
}

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

interface UpdateCheckResult {
  readonly checked: boolean;
  readonly state: UpdateState;
}

interface DesktopBridgeHandle {
  readonly getUpdateState: () => Promise<UpdateState>;
  readonly checkForUpdate: () => Promise<UpdateCheckResult>;
  readonly downloadUpdate: () => Promise<UpdateActionResult>;
  readonly installUpdate: (expectedVersion?: string) => Promise<UpdateActionResult>;
}

interface AppProcess {
  readonly pid: number;
  readonly window: number;
}

function parseStableVersion(version: string, label: string): void {
  if (!/^\d+\.\d+\.\d+(?:-cn\.\d+)?$/.test(version)) {
    throw new Error(`${label} '${version}' is not a supported version.`);
  }
}

export function compareStableVersions(a: string, b: string): number {
  parseStableVersion(a, "Version");
  parseStableVersion(b, "Version");
  return compareSemverVersions(a, b);
}

export function assertAcceptanceVersions(baselineVersion: string, newVersion: string): void {
  parseStableVersion(baselineVersion, "Baseline version");
  parseStableVersion(newVersion, "New version");
  if (compareStableVersions(newVersion, baselineVersion) <= 0) {
    throw new Error(
      `The new artifact version '${newVersion}' must be greater than the baseline '${baselineVersion}'. ` +
        "Build the artifact with a higher T3CODE_DESKTOP_VERSION; electron-updater ignores an equal version.",
    );
  }
}

export function parseDesktopArtifactVersion(fileName: string): string | null {
  return /^T3-Code-(.+)-x64\.exe$/i.exec(fileName)?.[1] ?? null;
}

function listFilesRecursive(directory: string): ReadonlyArray<string> {
  const files: string[] = [];
  const walk = (current: string): void => {
    for (const entry of NodeFS.readdirSync(current, { withFileTypes: true })) {
      const fullPath = NodePath.join(current, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      else if (entry.isFile()) files.push(fullPath);
    }
  };
  walk(directory);
  return files;
}

export function findDesktopArtifact(artifactDir: string, expectedVersion: string): string {
  if (!NodeFS.existsSync(artifactDir) || !NodeFS.statSync(artifactDir).isDirectory()) {
    throw new Error(`The new artifact directory does not exist: ${artifactDir}`);
  }
  const files = listFilesRecursive(artifactDir);
  const candidates = files
    .map((file) => ({ file, version: parseDesktopArtifactVersion(NodePath.basename(file)) }))
    .filter(
      (candidate): candidate is { file: string; version: string } => candidate.version !== null,
    );
  if (candidates.length === 0) {
    throw new Error(
      `No 'T3-Code-<version>-x64.exe' installer in ${artifactDir}. Found: ${files.map((file) => NodePath.basename(file)).join(", ") || "(empty)"}`,
    );
  }
  const matches = candidates.filter((candidate) => candidate.version === expectedVersion);
  if (matches.length === 1) return matches[0]!.file;
  throw new Error(
    matches.length > 1
      ? `More than one installer reports version ${expectedVersion}: ${matches.map((match) => match.file).join(", ")}`
      : `The artifact's installers (${candidates.map((candidate) => candidate.version).join(", ")}) do not report the requested new version ${expectedVersion}.`,
  );
}

export function renderLatestYml(input: {
  readonly version: string;
  readonly fileName: string;
  readonly sha512: string;
  readonly size: number;
  readonly releaseDate: string;
}): string {
  return serializeUpdateManifest(
    {
      version: input.version,
      releaseDate: input.releaseDate,
      files: [{ url: input.fileName, sha512: input.sha512, size: input.size }],
      extras: { path: input.fileName, sha512: input.sha512 },
    },
    { platformLabel: "Windows" },
  );
}

export function validateLatestYml(
  raw: string,
  version: string,
  fileName: string,
  sha512: string,
  size: number,
): void {
  const manifest = parseUpdateManifest(raw, "latest.yml", "Windows");
  if (
    manifest.version !== version ||
    manifest.files.length !== 1 ||
    manifest.files[0]?.url !== fileName ||
    manifest.files[0]?.sha512 !== sha512 ||
    manifest.files[0]?.size !== size
  ) {
    throw new Error(
      "The Windows update manifest does not match the installer and requested version.",
    );
  }
}

const resolveOptions = (): AcceptanceOptions => {
  const { values } = NodeUtil.parseArgs({
    options: {
      "baseline-installer": { type: "string" },
      "new-artifact-dir": { type: "string" },
      "baseline-version": { type: "string", default: "0.1.7" },
      "new-version": { type: "string" },
      "install-dir": { type: "string", default: "C:\\t3code-update-acceptance\\app" },
      "artifacts-dir": { type: "string", default: "windows-update-acceptance" },
      "mock-server-port": { type: "string", default: "3399" },
    },
  });
  const baselineInstaller = values["baseline-installer"];
  const newArtifactDir = values["new-artifact-dir"];
  const newVersion = values["new-version"];
  if (!baselineInstaller || !newArtifactDir || !newVersion) {
    throw new Error(
      "Usage: windows-update-acceptance.ts --baseline-installer <exe> --new-artifact-dir <dir> " +
        "--new-version <x.y.z> [--baseline-version 0.1.7] [--install-dir <dir>] [--artifacts-dir <dir>] [--mock-server-port 3399]",
    );
  }

  const mockServerPort = Number(values["mock-server-port"]);
  if (!Number.isInteger(mockServerPort) || mockServerPort <= 0 || mockServerPort > 65_535) {
    throw new Error(`Invalid --mock-server-port: ${values["mock-server-port"]}`);
  }

  return {
    baselineInstaller: NodePath.resolve(baselineInstaller),
    newArtifactDir: NodePath.resolve(newArtifactDir),
    baselineVersion: values["baseline-version"] ?? "0.1.7",
    newVersion,
    installDir: NodePath.resolve(values["install-dir"] ?? "C:\\t3code-update-acceptance\\app"),
    artifactsDir: NodePath.resolve(values["artifacts-dir"] ?? "windows-update-acceptance"),
    mockServerPort,
  };
};

const sleep = (milliseconds: number) => NodeTimersPromises.setTimeout(milliseconds, undefined);

async function waitFor<T>(
  step: string,
  read: () => Promise<T> | T,
  predicate: (value: T) => boolean,
  timeoutMs: number,
  intervalMs = 1_000,
): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  let lastValue: T | undefined;
  let lastError: unknown;
  while (Date.now() < deadline) {
    try {
      lastValue = await read();
      if (predicate(lastValue)) return lastValue;
    } catch (error) {
      lastError = error;
    }
    await sleep(intervalMs);
  }
  throw new Error(
    `Timed out after ${Math.round(timeoutMs / 1_000)}s waiting for ${step}. Last value: ${JSON.stringify(lastValue)}${lastError === undefined ? "" : `; last error: ${String(lastError)}`}`,
  );
}

async function httpStatus(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const request = NodeHttp.get(url, { timeout: 3_000 }, (response) => {
      response.resume();
      resolve(response.statusCode ?? 0);
    });
    request.on("timeout", () => {
      request.destroy(new Error(`Timed out requesting ${url}`));
    });
    request.on("error", reject);
  });
}

function runPowerShell(script: string, env: Record<string, string> = {}): string {
  const result = NodeChildProcess.spawnSync(
    "powershell.exe",
    ["-NoLogo", "-NoProfile", "-NonInteractive", "-Command", script],
    {
      encoding: "utf8",
      env: { ...process.env, ...env },
      timeout: 120_000,
      windowsHide: true,
    },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `PowerShell failed with exit ${result.status}.\nScript: ${script}\nstdout: ${result.stdout}\nstderr: ${result.stderr}`,
    );
  }
  return result.stdout.trim();
}

const PROCESS_QUERY = `
$exe = $env:T3_ACCEPT_EXE
$since = $null
if ($env:T3_ACCEPT_SINCE_MS) {
  $since = [DateTimeOffset]::FromUnixTimeMilliseconds([int64]$env:T3_ACCEPT_SINCE_MS).LocalDateTime
}
$items = @(Get-CimInstance Win32_Process | Where-Object { $_.ExecutablePath -eq $exe -and ($null -eq $since -or $_.CreationDate -ge $since) } | ForEach-Object {
  $process = Get-Process -Id $_.ProcessId -ErrorAction SilentlyContinue
  $window = 0
  if ($process) { $window = [int64]$process.MainWindowHandle }
  [pscustomobject]@{ pid = [int]$_.ProcessId; window = $window }
})
ConvertTo-Json -InputObject $items -Compress
`;

function listAppProcesses(executable: string, sinceMs?: number): ReadonlyArray<AppProcess> {
  const output = runPowerShell(PROCESS_QUERY, {
    T3_ACCEPT_EXE: executable,
    ...(sinceMs === undefined ? {} : { T3_ACCEPT_SINCE_MS: String(sinceMs) }),
  });
  if (output.length === 0) return [];
  const parsed: unknown = JSON.parse(output);
  const items = Array.isArray(parsed) ? parsed : [parsed];
  return items.flatMap((item): AppProcess[] => {
    if (typeof item !== "object" || item === null) return [];
    const record = item as Record<string, unknown>;
    return typeof record.pid === "number" && typeof record.window === "number"
      ? [{ pid: record.pid, window: record.window }]
      : [];
  });
}

function closeRestartedWindows(executable: string, sinceMs: number): void {
  const pids = listAppProcesses(executable, sinceMs).map((process) => process.pid);
  if (pids.length === 0) return;
  runPowerShell(
    "$env:T3_ACCEPT_PIDS.Split(',') | ForEach-Object { $p = Get-Process -Id ([int]$_) -ErrorAction SilentlyContinue; if ($p -and $p.MainWindowHandle -ne 0) { [void]$p.CloseMainWindow() } }",
    { T3_ACCEPT_PIDS: pids.join(",") },
  );
}

function readExecutableProductVersion(executable: string): string {
  return runPowerShell(
    "$version = (Get-Item -LiteralPath $env:T3_ACCEPT_EXE).VersionInfo.ProductVersion\n[Console]::Out.Write($version)",
    { T3_ACCEPT_EXE: executable },
  );
}

function versionLabelMatches(label: string, expected: string): boolean {
  // electron-builder writes ProductVersion in its four-part Windows form (x.y.z.0).
  const trimmed = label.trim();
  const expectedLabel = expected.trim();
  return trimmed === expectedLabel || trimmed === `${expectedLabel}.0`;
}

function readInstalledAppVersion(installDir: string): string {
  const archive = NodePath.join(installDir, "resources", "app.asar");
  uncache(archive);
  const packageJson = extractFile(archive, "package.json");
  const data: unknown = JSON.parse(packageJson.toString());
  if (
    typeof data !== "object" ||
    data === null ||
    !("version" in data) ||
    typeof data.version !== "string"
  ) {
    throw new Error("Installed application package has no version.");
  }
  return data.version;
}

// Rebranding changes the executable name, so find the app by its version instead of its name.
function findInstalledExecutable(installDir: string, expectedVersion: string): string {
  if (!NodeFS.existsSync(installDir)) {
    throw new Error(`The install directory does not exist: ${installDir}`);
  }
  if (readInstalledAppVersion(installDir) !== expectedVersion) {
    throw new Error(`Installed app is not version ${expectedVersion}.`);
  }
  const executables = NodeFS.readdirSync(installDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".exe"))
    .filter((entry) => !entry.name.toLowerCase().startsWith("uninstall"))
    .map((entry) => NodePath.join(installDir, entry.name));
  for (const executable of executables) {
    try {
      if (
        versionLabelMatches(
          readExecutableProductVersion(executable),
          expectedVersion.split("-")[0]!,
        )
      ) {
        return executable;
      }
    } catch {
      // A partially written executable during an install is retried by the caller's wait.
    }
  }
  throw new Error(
    `No executable in ${installDir} reports version ${expectedVersion}. Candidates: ` +
      (executables.length === 0 ? "(none)" : executables.join(", ")),
  );
}

async function readUpdateState(page: Page): Promise<UpdateState> {
  return page.evaluate(() => {
    const target = globalThis as unknown as { desktopBridge: DesktopBridgeHandle };
    return target.desktopBridge.getUpdateState();
  });
}

async function launchApp(
  executable: string,
  options: AcceptanceOptions,
  t3Home: string,
): Promise<{ app: ElectronApplication; page: Page }> {
  const app = await _electron.launch({
    executablePath: executable,
    args: ["--no-sandbox"],
    env: {
      ...process.env,
      T3CODE_HOME: t3Home,
      T3CODE_TELEMETRY_ENABLED: "false",
      T3CODE_DESKTOP_MOCK_UPDATES: "true",
      T3CODE_DESKTOP_MOCK_UPDATE_SERVER_PORT: String(options.mockServerPort),
    },
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

async function stopApp(
  app: ElectronApplication | undefined,
  artifactsDir: string,
  label: string,
): Promise<void> {
  if (!app) return;
  const child = app.process();
  await Promise.race([app.close().catch(() => {}), sleep(10_000)]);
  NodeFS.writeFileSync(
    NodePath.join(artifactsDir, `${label}-exit.json`),
    `${JSON.stringify({ exitCode: child.exitCode, signalCode: child.signalCode })}\n`,
  );
  if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
}

function copyDirectory(from: string, to: string): void {
  if (!NodeFS.existsSync(from)) return;
  NodeFS.cpSync(from, to, { recursive: true });
}

function tail(text: string, lines: number): string {
  return text.split("\n").slice(-lines).join("\n");
}

const run = async (): Promise<void> => {
  if (process.platform !== "win32") {
    throw new Error(
      `This acceptance installs and updates the Windows desktop app; it cannot run on ${process.platform}. ` +
        "Run .github/workflows/fork-windows-update-test.yml through workflow_dispatch instead.",
    );
  }

  const options = resolveOptions();
  NodeFS.mkdirSync(options.artifactsDir, { recursive: true });
  assertAcceptanceVersions(options.baselineVersion, options.newVersion);

  const newInstaller = findDesktopArtifact(options.newArtifactDir, options.newVersion);
  if (!NodeFS.existsSync(options.baselineInstaller)) {
    throw new Error(`The baseline installer does not exist: ${options.baselineInstaller}`);
  }
  let executable = "";
  const eventsPath = NodePath.join(options.artifactsDir, "events.ndjson");
  const mockLog: string[] = [];
  let step = "validating inputs";
  let app: ElectronApplication | undefined;
  let page: Page | undefined;
  let mockServer: NodeChildProcess.ChildProcess | undefined;
  const home = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-windows-update-acceptance-"));
  const t3Home = NodePath.join(home, "t3");

  const record = (name: string, detail?: unknown): void => {
    const event = {
      at: new Date().toISOString(),
      step: name,
      ...(detail === undefined ? {} : { detail }),
    };
    step = name;
    console.log(
      `[windows-update-acceptance] ${name}${detail === undefined ? "" : ` ${JSON.stringify(detail)}`}`,
    );
    NodeFS.appendFileSync(eventsPath, `${JSON.stringify(event)}\n`);
  };

  const writeJson = (name: string, value: unknown): void => {
    NodeFS.writeFileSync(
      NodePath.join(options.artifactsDir, name),
      `${JSON.stringify(value, null, 2)}\n`,
    );
  };

  try {
    record("inputs validated", {
      baselineInstaller: options.baselineInstaller,
      baselineVersion: options.baselineVersion,
      newInstaller,
      newVersion: options.newVersion,
      installDir: options.installDir,
      mockServerPort: options.mockServerPort,
      t3Home,
    });

    step = "seeding an isolated T3 home";
    NodeFS.mkdirSync(NodePath.join(t3Home, "userdata"), { recursive: true });
    NodeFS.copyFileSync(FIXTURE_DB, NodePath.join(t3Home, "userdata/statev2.sqlite"));
    record("seeded isolated T3 home", { t3Home });

    step = "preparing the mock update feed";
    const feedDir = NodePath.join(home, "update-feed");
    NodeFS.mkdirSync(feedDir, { recursive: true });
    const newInstallerName = NodePath.basename(newInstaller);
    const feedInstaller = NodePath.join(feedDir, newInstallerName);
    NodeFS.copyFileSync(newInstaller, feedInstaller);
    const installerBytes = NodeFS.readFileSync(newInstaller);
    const sha512 = NodeCrypto.createHash("sha512").update(installerBytes).digest("base64");
    const latestYml = NodeFS.readFileSync(
      NodePath.join(NodePath.dirname(newInstaller), "latest.yml"),
      "utf8",
    );
    validateLatestYml(
      latestYml,
      options.newVersion,
      newInstallerName,
      sha512,
      installerBytes.byteLength,
    );
    NodeFS.writeFileSync(NodePath.join(feedDir, "latest.yml"), latestYml);
    NodeFS.writeFileSync(NodePath.join(options.artifactsDir, "latest.yml"), latestYml);
    record("prepared mock update feed", {
      fileName: newInstallerName,
      size: installerBytes.byteLength,
      sha512,
    });

    step = "starting the mock update server";
    mockServer = NodeChildProcess.spawn(
      process.execPath,
      [NodePath.join(import.meta.dirname, "mock-update-server.ts")],
      {
        env: {
          ...process.env,
          T3CODE_DESKTOP_MOCK_UPDATE_SERVER_PORT: String(options.mockServerPort),
          T3CODE_DESKTOP_MOCK_UPDATE_SERVER_ROOT: feedDir,
        },
        stdio: ["ignore", "pipe", "pipe"],
        windowsHide: true,
      },
    );
    mockServer.stdout?.on("data", (chunk: Buffer) => mockLog.push(chunk.toString()));
    mockServer.stderr?.on("data", (chunk: Buffer) => mockLog.push(chunk.toString()));
    await waitFor(
      "the mock update server to serve latest.yml",
      async () => httpStatus(`http://localhost:${options.mockServerPort}/latest.yml`),
      (status) => status === 200,
      60_000,
      500,
    );
    record("mock update server ready");

    step = "installing the baseline build";
    const installer = NodeChildProcess.spawnSync(
      options.baselineInstaller,
      ["/S", `/D=${options.installDir}`],
      { stdio: "inherit", timeout: INSTALL_APPLY_TIMEOUT_MS, windowsHide: true },
    );
    if (installer.error) throw installer.error;
    if (installer.status !== 0) {
      throw new Error(`The baseline installer exited with ${installer.status}.`);
    }
    if (!NodeFS.existsSync(options.installDir)) {
      throw new Error(`The baseline installer did not create ${options.installDir}.`);
    }
    executable = findInstalledExecutable(options.installDir, options.baselineVersion);
    const installedBaselineVersion = readExecutableProductVersion(executable);
    record("baseline installed", { executable, productVersion: installedBaselineVersion });

    step = "launching the baseline app";
    const baselineSession = await launchApp(executable, options, t3Home);
    app = baselineSession.app;
    page = baselineSession.page;
    const baselinePage = baselineSession.page;
    await baselinePage
      .locator("li[data-thread-item]", { hasText: THREAD_TITLE })
      .waitFor({ timeout: LAUNCH_TIMEOUT_MS });
    record("baseline app opened the seeded thread");
    await baselinePage.screenshot({
      path: NodePath.join(options.artifactsDir, "01-baseline.png"),
      timeout: 10_000,
    });

    const baselineAppVersion = await baselineSession.app.evaluate(({ app: electronApp }) =>
      electronApp.getVersion(),
    );
    if (baselineAppVersion !== options.baselineVersion) {
      throw new Error(
        `The baseline app reports version ${baselineAppVersion}, expected ${options.baselineVersion}.`,
      );
    }

    step = "waiting for the updater to be ready";
    const readyState = await waitFor(
      "the desktop updater to enable itself",
      () => readUpdateState(baselinePage),
      (state) => state.enabled || state.status === "disabled",
      60_000,
    );
    writeJson("01-baseline-update-state.json", readyState);
    if (!readyState.enabled) {
      throw new Error(
        `Updates are disabled before the check: ${readyState.message ?? readyState.status}`,
      );
    }
    if (readyState.channel !== "latest") {
      throw new Error(
        `The baseline app is on the '${readyState.channel}' update channel, expected 'latest'.`,
      );
    }
    if (readyState.currentVersion !== options.baselineVersion) {
      throw new Error(
        `The updater reports current version ${readyState.currentVersion}, expected ${options.baselineVersion}.`,
      );
    }

    step = "checking the mock feed for the new version";
    let checkResult: UpdateCheckResult | undefined;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      checkResult = (await baselinePage.evaluate(() => {
        const target = globalThis as unknown as { desktopBridge: DesktopBridgeHandle };
        return target.desktopBridge.checkForUpdate();
      })) as UpdateCheckResult;
      if (checkResult.checked) break;
      await sleep(2_000);
    }
    writeJson("02-check-result.json", checkResult);
    record("update check requested", { checked: checkResult?.checked });
    const availableState = await waitFor(
      `the app to offer version ${options.newVersion}`,
      () => readUpdateState(baselinePage),
      (state) => state.status === "available" && state.availableVersion === options.newVersion,
      120_000,
    );
    writeJson("02-update-available.json", availableState);
    record("update discovered", {
      availableVersion: availableState.availableVersion,
      status: availableState.status,
    });
    await baselinePage.screenshot({
      path: NodePath.join(options.artifactsDir, "02-update-available.png"),
      timeout: 10_000,
    });

    step = "downloading the update";
    let downloadResult: UpdateActionResult | undefined;
    for (let attempt = 0; attempt < 5; attempt += 1) {
      downloadResult = (await baselinePage.evaluate(() => {
        const target = globalThis as unknown as { desktopBridge: DesktopBridgeHandle };
        return target.desktopBridge.downloadUpdate();
      })) as UpdateActionResult;
      if (downloadResult.accepted) break;
      await sleep(2_000);
    }
    writeJson("03-download-result.json", downloadResult);
    if (!downloadResult?.accepted) {
      throw new Error(`The app refused to download the update: ${JSON.stringify(downloadResult)}`);
    }
    const downloadedState = await waitFor(
      `the app to download version ${options.newVersion}`,
      () => readUpdateState(baselinePage),
      (state) => state.status === "downloaded" && state.downloadedVersion === options.newVersion,
      DOWNLOAD_TIMEOUT_MS,
    );
    writeJson("03-update-downloaded.json", downloadedState);
    await waitFor(
      "the mock feed to log the manifest and installer requests",
      () => mockLog.join(""),
      (log) => log.includes("/latest.yml") && log.includes(`/${newInstallerName}`),
      15_000,
      500,
    );
    record("mock feed served the manifest and installer", {
      downloadedVersion: downloadedState.downloadedVersion,
    });
    await baselinePage.screenshot({
      path: NodePath.join(options.artifactsDir, "03-update-downloaded.png"),
      timeout: 10_000,
    });

    step = "installing the update";
    const installStartedAt = Date.now();
    const installAttempt = baselinePage
      .evaluate((expectedVersion) => {
        const target = globalThis as unknown as { desktopBridge: DesktopBridgeHandle };
        return target.desktopBridge.installUpdate(expectedVersion);
      }, options.newVersion)
      .then((result: UpdateActionResult) => {
        record("install action returned", result);
        return result;
      })
      .catch((error: unknown) => {
        record("install action ended with the app quitting", {
          error: error instanceof Error ? error.message : String(error),
        });
        return undefined;
      });
    const child = baselineSession.app.process();
    await waitFor(
      "the app to exit after the install action",
      () => child.exitCode !== null || child.signalCode !== null,
      (exited) => exited,
      INSTALL_APPLY_TIMEOUT_MS,
      500,
    );
    record("baseline app exited for the installer", {
      exitCode: child.exitCode,
      signalCode: child.signalCode,
      elapsedMs: Date.now() - installStartedAt,
    });
    await installAttempt;
    app = undefined;
    page = undefined;

    step = "waiting for the installer to replace the app";
    await waitFor(
      `the installed executable to report ${options.newVersion}`,
      () => {
        executable = findInstalledExecutable(options.installDir, options.newVersion);
        return readInstalledAppVersion(options.installDir);
      },
      (version) => version === options.newVersion,
      INSTALL_APPLY_TIMEOUT_MS,
      2_000,
    );
    const installedVersion = readExecutableProductVersion(executable);
    writeJson("04-installed-executable.json", { executable, productVersion: installedVersion });
    record("installer replaced the app", { productVersion: installedVersion });

    step = "waiting for the installer to restart the app";
    await waitFor(
      "the installer to restart the app",
      () => listAppProcesses(executable, installStartedAt),
      (processes) => processes.length > 0,
      RELAUNCH_TIMEOUT_MS,
      2_000,
    );
    record("installer restarted the app", {
      processes: listAppProcesses(executable, installStartedAt),
    });
    try {
      await waitFor(
        "the restarted app to show its window",
        () => listAppProcesses(executable, installStartedAt),
        (processes) => processes.some((process) => process.window !== 0),
        WINDOW_TIMEOUT_MS,
        2_000,
      );
      record("restarted app showed its window");
    } catch (error) {
      record("restarted app did not expose a window handle", {
        message: error instanceof Error ? error.message : String(error),
      });
    }

    step = "stopping the restarted app before the Playwright check";
    for (
      let attempt = 0;
      attempt < 3 && listAppProcesses(executable, installStartedAt).length > 0;
      attempt += 1
    ) {
      closeRestartedWindows(executable, installStartedAt);
      await sleep(2_000);
    }
    if (listAppProcesses(executable, installStartedAt).length > 0) {
      throw new Error(
        `Could not stop the restarted app at ${executable}: ${JSON.stringify(listAppProcesses(executable, installStartedAt))}`,
      );
    }
    record("restarted app stopped");

    step = "relaunching the updated app to check version and data";
    const updatedSession = await launchApp(executable, options, t3Home);
    app = updatedSession.app;
    page = updatedSession.page;
    const updatedPage = updatedSession.page;
    const updatedVersion = await updatedSession.app.evaluate(({ app: electronApp }) =>
      electronApp.getVersion(),
    );
    if (updatedVersion !== options.newVersion) {
      throw new Error(
        `The updated app reports version ${updatedVersion}, expected ${options.newVersion}.`,
      );
    }
    const thread = updatedPage.locator("li[data-thread-item]", { hasText: THREAD_TITLE });
    await thread.waitFor({ timeout: LAUNCH_TIMEOUT_MS });
    await thread.click();
    await updatedPage.getByText(THREAD_MESSAGE).waitFor({ timeout: LAUNCH_TIMEOUT_MS });
    record("updated app kept the seeded thread and message", { updatedVersion });
    await updatedPage.screenshot({
      path: NodePath.join(options.artifactsDir, "04-updated-app.png"),
      timeout: 10_000,
    });

    const updatedState = await waitFor(
      "the updated app's updater state",
      () => readUpdateState(updatedPage),
      (state) => state.enabled || state.status === "disabled",
      60_000,
    );
    writeJson("04-updated-update-state.json", updatedState);
    if (!updatedState.enabled) {
      throw new Error(
        `The updated app has updates disabled: ${updatedState.message ?? updatedState.status}`,
      );
    }
    if (updatedState.currentVersion !== options.newVersion) {
      throw new Error(
        `The updated app's updater reports current version ${updatedState.currentVersion}, expected ${options.newVersion}.`,
      );
    }
    if (updatedState.notAppliedVersion !== undefined) {
      throw new Error(
        `The updated app says the last install did not apply: ${updatedState.notAppliedVersion}.`,
      );
    }
    record("acceptance passed", {
      baselineVersion: options.baselineVersion,
      updatedVersion,
      channel: updatedState.channel,
    });
  } catch (error) {
    record("acceptance failed", {
      step,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    if (page) {
      await page
        .screenshot({ path: NodePath.join(options.artifactsDir, "failure.png"), timeout: 10_000 })
        .catch(() => {});
    }
    NodeFS.mkdirSync(options.artifactsDir, { recursive: true });
    NodeFS.writeFileSync(
      NodePath.join(options.artifactsDir, "mock-update-server.log"),
      mockLog.join(""),
    );
    copyDirectory(
      NodePath.join(t3Home, "userdata/logs"),
      NodePath.join(options.artifactsDir, "logs"),
    );
    const serverLog = NodePath.join(t3Home, "userdata/logs/server-child.log");
    if (NodeFS.existsSync(serverLog)) {
      console.error("\nLast backend output (server-child.log):");
      console.error(tail(NodeFS.readFileSync(serverLog, "utf8"), 40));
    }
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  } finally {
    await stopApp(app, options.artifactsDir, "app");
    copyDirectory(
      NodePath.join(t3Home, "userdata/logs"),
      NodePath.join(options.artifactsDir, "logs"),
    );
    if (mockServer) {
      mockServer.kill();
      await Promise.race([
        new Promise<void>((resolve) => mockServer?.once("exit", () => resolve())),
        sleep(5_000),
      ]);
      NodeFS.writeFileSync(
        NodePath.join(options.artifactsDir, "mock-update-server.log"),
        mockLog.join(""),
      );
    }
    try {
      // Only the isolated T3 home this run created; the installed app stays for the runner's lifetime.
      NodeFS.rmSync(home, { recursive: true, force: true, maxRetries: 5 });
    } catch (error) {
      console.error(`Could not remove the isolated home ${home}: ${String(error)}`);
    }
  }
};

if (import.meta.main) {
  await run();
}
