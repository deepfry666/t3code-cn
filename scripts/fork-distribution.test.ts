import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";

import { requireForkDistributionReady } from "./build-desktop-artifact.ts";

it.effect("refuses desktop packaging while fork runtime isolation is incomplete", () =>
  Effect.gen(function* () {
    const error = yield* requireForkDistributionReady.pipe(Effect.flip);
    assert.equal(error._tag, "ForkDistributionNotReadyError");
    assert.include(error.message, "issues/8");
    assert.include(error.message, "Web builds and isolated development remain available");
  }),
);
