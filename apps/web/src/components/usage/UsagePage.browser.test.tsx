import { expect, it } from "vite-plus/test";
import { page } from "vite-plus/test/browser";
import { render } from "../../../test/render";
import { UsagePage } from "./UsagePage";

it("opens the usage page with its period controls", async () => {
  await using _screen = await render(<UsagePage />, { router: "/usage" });
  await expect.element(page.getByRole("dialog", { name: "Usage" })).toBeVisible();
});
