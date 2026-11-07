import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

/** Compatibility boundary: this fork does not import official V1 browser storage. */
export class DesktopLegacyLocalStorage extends Context.Service<
  DesktopLegacyLocalStorage,
  {
    readonly load: (userDataPath: string) => Effect.Effect<void>;
    readonly take: Effect.Effect<Option.Option<Readonly<Record<string, string>>>>;
    readonly complete: Effect.Effect<void>;
  }
>()("@t3tools/desktop/app/DesktopLegacyLocalStorage") {}

// Importing official profiles would also import sessions and personal configuration.
// Keep the lifecycle interface for its callers, but never inspect or write a profile.
export const layer = Layer.succeed(DesktopLegacyLocalStorage, {
  load: Effect.fn("DesktopLegacyLocalStorage.load")((_userDataPath: string) => Effect.void),
  take: Effect.succeed(Option.none<Readonly<Record<string, string>>>()),
  complete: Effect.void,
});
