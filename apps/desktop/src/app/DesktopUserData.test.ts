import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";

import { resolveUserDataPath } from "./DesktopUserData.ts";

it.effect.each([false, true])(
  "does not reuse or import upstream profiles (development=%s)",
  (isDevelopment) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;
      const directory = yield* fs.makeTempDirectoryScoped({ prefix: "t3-cn-profile-" });
      const names = ["t3code", "t3code-v2", "t3code-dev", "T3 Code (Alpha)", "T3 Code (Dev)"];
      for (const name of names) {
        yield* fs.makeDirectory(path.join(directory, name), { recursive: true });
        yield* fs.writeFileString(path.join(directory, name, "Local State"), `upstream:${name}`);
      }
      for (const platform of ["win32", "darwin", "linux"] as const) {
        const destination = yield* resolveUserDataPath({
          appDataDirectory: directory,
          isDevelopment,
          platform,
        });
        assert.equal(
          destination,
          path.join(directory, isDevelopment ? "t3code-cn-dev" : "t3code-cn"),
        );
        assert.isFalse(yield* fs.exists(destination));
      }
      for (const name of names) {
        assert.equal(
          yield* fs.readFileString(path.join(directory, name, "Local State")),
          `upstream:${name}`,
        );
      }
    }).pipe(Effect.scoped, Effect.provide(NodeServices.layer)),
);
