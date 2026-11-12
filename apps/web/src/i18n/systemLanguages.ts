let desktopLanguages:
  | { readonly bridge: object; readonly languages: readonly string[] }
  | undefined;

// Packaged desktop pins `navigator.languages` to en-US, so the OS's own list leads. Read once per
// bridge: this runs on every render and the bridge call is synchronous IPC.
export function systemLanguages(): readonly string[] {
  const bridge = typeof window === "undefined" ? undefined : window.desktopBridge;
  if (bridge?.getPreferredSystemLanguages) {
    if (desktopLanguages?.bridge !== bridge) {
      desktopLanguages = { bridge, languages: bridge.getPreferredSystemLanguages() };
    }
    if (desktopLanguages.languages.length > 0) return desktopLanguages.languages;
  }
  return typeof navigator === "undefined" ? [] : (navigator.languages ?? []);
}
