import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it } from "@effect/vitest";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Sink from "effect/Sink";
import * as Stream from "effect/Stream";
import { Command } from "effect/cli";
import { ChildProcessSpawner } from "effect/process";

import { browserCommand } from "./browser.ts";

it.effect("sudo browser setup looks for Chrome in the invoking user's fork home", () =>
  Effect.gen(function* () {
    const scanned: string[] = [];
    const spawner = ChildProcessSpawner.make((command) => {
      const output =
        command._tag === "StandardCommand" && command.command === "getent"
          ? "test:x:1000:1000::/home/test:/bin/sh\n"
          : "/fonts/sans.ttf";
      const stdout = Stream.make(new TextEncoder().encode(output));
      return Effect.succeed(
        ChildProcessSpawner.makeHandle({
          pid: ChildProcessSpawner.ProcessId(123),
          stdout,
          stderr: Stream.empty,
          all: stdout,
          exitCode: Effect.succeed(ChildProcessSpawner.ExitCode(0)),
          isRunning: Effect.succeed(false),
          kill: () => Effect.void,
          stdin: Sink.drain,
          getInputFd: () => Sink.drain,
          getOutputFd: () => Stream.empty,
          unref: Effect.succeed(Effect.void),
        }),
      );
    });
    yield* Command.runWith(browserCommand, { version: "0.0.0" })(["setup"]).pipe(
      Effect.provideService(HostProcess.Platform, "linux"),
      Effect.provideService(HostProcess.UserId, 1000),
      Effect.provideService(HostProcess.Environment, { SUDO_USER: "test" }),
      Effect.provideService(ChildProcessSpawner.ChildProcessSpawner, spawner),
      Effect.provide([
        ConfigProvider.layer(ConfigProvider.fromEnv({ env: {} })),
        FileSystem.layerNoop({
          readFileString: () => Effect.succeed("0"),
          readDirectory: (directory) =>
            Effect.sync(() => {
              scanned.push(directory);
              return [];
            }),
        }),
      ]),
    );
    assert.deepEqual(scanned, ["/home/test/.t3code-cn/tools/chrome-headless-shell"]);
  }).pipe(Effect.provide(NodeServices.layer)),
);
