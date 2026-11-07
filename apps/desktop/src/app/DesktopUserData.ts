import * as Effect from "effect/Effect";
import * as Path from "effect/Path";

/** The fork never adopts upstream Chromium profiles or their credential keys. */
export const resolveUserDataPath = Effect.fn("desktop.userData.resolveUserDataPath")(
  function* (input: {
    readonly appDataDirectory: string;
    readonly isDevelopment: boolean;
    readonly platform: NodeJS.Platform;
  }) {
    const path = yield* Path.Path;
    return path.join(input.appDataDirectory, input.isDevelopment ? "t3code-cn-dev" : "t3code-cn");
  },
);
