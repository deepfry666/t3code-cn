import { expect, it } from "vite-plus/test";
import { render } from "../../test/render";
import { setLocale } from "../../test/locale";
import { useTranslation } from "./useTranslation";

function Probe() {
  const t = useTranslation({ "New thread": "新建会话" });
  return (
    <button type="button" onClick={() => setLocale("zh-CN")}>
      {t("New thread")}
    </button>
  );
}
it("updates mounted fork text when the official runtime activates Chinese", async () => {
  using _locale = { [Symbol.dispose]: () => setLocale("en") };
  setLocale("en");
  // The probe exercises translations without application navigation.
  await using screen = await render(<Probe />, { router: false });
  await screen.getByRole("button", { name: "New thread" }).click();
  await expect.element(screen.getByRole("button", { name: "新建会话" })).toBeVisible();
});
