import { FORK_IDENTITY } from "@t3tools/shared/forkIdentity";
import { ORCHESTRATION_PROTOCOL_HEADER } from "@t3tools/contracts";

export const browserApiCorsAllowedMethods = ["GET", "POST", "OPTIONS"] as const;
export const browserApiCorsAllowedHeaders = [
  "authorization",
  "b3",
  "traceparent",
  "content-type",
  "dpop",
  ORCHESTRATION_PROTOCOL_HEADER,
] as const;

export const DESKTOP_RENDERER_ORIGINS = [
  `${FORK_IDENTITY.urlScheme}://app`,
  `${FORK_IDENTITY.devUrlScheme}://app`,
] as const;
