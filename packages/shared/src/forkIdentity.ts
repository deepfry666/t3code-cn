// Names this fork owns so it can be installed beside official T3 Code without sharing
// data, credentials, services, links, policies or updates. Upstream literals that would
// collide with an official install read from here instead.
export const FORK_IDENTITY = {
  displayName: "T3 Code CN",
  // Directory, package, service, executable and cache namespace.
  slug: "t3code-cn",
  homeDirName: ".t3code-cn",
  cliName: "t3-cn",
  npmPackageName: "t3-cn",
  appId: "io.github.deepfry666.t3codecn",
  urlScheme: "t3code-cn",
  devUrlScheme: "t3code-cn-dev",
  releaseRepository: "deepfry666/t3code-cn",
  // Managed-policy folder (macOS, Windows) and registry key segment.
  policyName: "T3CodeCN",
} as const;
