import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it } from "@effect/vitest";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

import { deriveServerPaths } from "./config.ts";
import { resolveBaseDir } from "./os-jank.ts";

it.effect(
  "resolves a fork WSL bootstrap home inside the distro without touching official data",
  () =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const home = yield* fs.makeTempDirectoryScoped({ prefix: "fork-wsl-home-" });
      const officialDir = path.join(home, ".t3", "userdata");
      const officialDb = path.join(officialDir, "statev2.sqlite");
      yield* fs.makeDirectory(officialDir, { recursive: true });
      yield* fs.writeFileString(officialDb, "official fixture, not a live database");

      const baseDir = yield* resolveBaseDir("~/.t3code-cn").pipe(
        Effect.provideService(HostProcess.HomeDirectory, home),
      );
      assert.equal(baseDir, path.join(home, ".t3code-cn"));
      const production = yield* deriveServerPaths(baseDir, undefined);
      const development = yield* deriveServerPaths(baseDir, new URL("http://localhost:5173"));
      assert.equal(production.dbPath, path.join(baseDir, "userdata", "statev2.sqlite"));
      assert.equal(development.dbPath, path.join(baseDir, "dev", "statev2.sqlite"));
      assert.equal(yield* fs.readFileString(officialDb), "official fixture, not a live database");
      assert.isFalse(yield* fs.exists(baseDir));
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer)),
);
