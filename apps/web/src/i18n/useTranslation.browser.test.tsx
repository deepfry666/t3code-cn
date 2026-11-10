import { expect, it, vi } from "vite-plus/test";

import { act, render, stubGlobal } from "../../test/render";
import { LOCALE_STORAGE_KEY } from "./locale";
import { setLocale, useLocale, useTranslation } from "./useTranslation";

const messages = { "New thread": "新建会话" } as const;

function LocaleProbe() {
  const t = useTranslation(messages);
  const locale = useLocale();
  return (
    <button type="button" onClick={() => setLocale(locale === "en" ? "zh-CN" : "en")}>
      {t("New thread")}
    </button>
  );
}

it("updates mounted clients, persists the choice, and follows cross-tab changes", async () => {
  const previous = localStorage.getItem(LOCALE_STORAGE_KEY);
  try {
    setLocale("en");
    // This probe exercises the locale store without application navigation.
    await using screen = await render(<LocaleProbe />, { router: false });
    await screen.getByRole("button", { name: "New thread" }).click();
    await expect.element(screen.getByRole("button", { name: "新建会话" })).toBeVisible();
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("zh-CN");
    expect(document.documentElement.lang).toBe("zh-CN");
    await act(() => {
      localStorage.setItem(LOCALE_STORAGE_KEY, "en");
      window.dispatchEvent(
        new StorageEvent("storage", { key: LOCALE_STORAGE_KEY, newValue: "en" }),
      );
    });
    await expect.element(screen.getByRole("button", { name: "New thread" })).toBeVisible();
    expect(document.documentElement.lang).toBe("en");
    using _storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });
    await screen.getByRole("button", { name: "New thread" }).click();
    await expect.element(screen.getByRole("button", { name: "新建会话" })).toBeVisible();
  } finally {
    setLocale("en");
    if (previous === null) localStorage.removeItem(LOCALE_STORAGE_KEY);
    else localStorage.setItem(LOCALE_STORAGE_KEY, previous);
    window.dispatchEvent(new StorageEvent("storage", { key: LOCALE_STORAGE_KEY }));
  }
});

it("reads a changed persisted choice after all subscribers have unmounted", async () => {
  const previous = localStorage.getItem(LOCALE_STORAGE_KEY);
  try {
    setLocale("en");
    {
      // This probe has no routes.
      await using screen = await render(<LocaleProbe />, { router: false });
      await screen.getByRole("button", { name: "New thread" }).click();
      await expect.element(screen.getByRole("button", { name: "新建会话" })).toBeVisible();
    }
    localStorage.setItem(LOCALE_STORAGE_KEY, "en");
    // The other tab changed storage while this client had no subscribers.
    await using screen = await render(<LocaleProbe />, { router: false });
    await expect.element(screen.getByRole("button", { name: "New thread" })).toBeVisible();
  } finally {
    setLocale("en");
    if (previous === null) localStorage.removeItem(LOCALE_STORAGE_KEY);
    else localStorage.setItem(LOCALE_STORAGE_KEY, previous);
  }
});

it("follows the desktop OS language when packaged Electron reports only en-US", async () => {
  const previous = localStorage.getItem(LOCALE_STORAGE_KEY);
  try {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
    using _languages = vi.spyOn(navigator, "languages", "get").mockReturnValue(["en-US"]);
    using _bridge = stubGlobal("desktopBridge", {
      getPreferredSystemLanguages: () => ["zh-Hans-CN", "en-US"],
    });
    // This probe has no routes.
    await using screen = await render(<LocaleProbe />, { router: false });
    await expect.element(screen.getByRole("button", { name: "新建会话" })).toBeVisible();
  } finally {
    if (previous === null) localStorage.removeItem(LOCALE_STORAGE_KEY);
    else localStorage.setItem(LOCALE_STORAGE_KEY, previous);
  }
});
