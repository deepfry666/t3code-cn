import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import { DesktopLegacyLocalStorage, layer } from "./DesktopLegacyLocalStorage.ts";

it.effect("never imports official profile data or requires filesystem access", () =>
  Effect.gen(function* () {
    const migration = yield* DesktopLegacyLocalStorage;
    yield* migration.load("/isolated/cn-profile");
    assert.isTrue(Option.isNone(yield* migration.take));
    yield* migration.complete;
    yield* migration.load("/isolated/cn-profile");
    assert.isTrue(Option.isNone(yield* migration.take));
  }).pipe(Effect.provide(layer)),
);
