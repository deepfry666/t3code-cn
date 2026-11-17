import { expect, it } from "vite-plus/test";

import { applyThemeCss } from "./themeCss";

it("keeps English theme selectors working on Chinese labels and after a language switch", () => {
  const probe = document.createElement("div");
  probe.dataset.themeCssLocaleProbe = "";
  probe.innerHTML = `<a aria-label="T3 Code 首页"></a><div class="shrink-0"><button aria-label="新建会话"></button><button aria-label="添加项目"></button></div>`;
  document.body.append(probe);
  using _probe = { [Symbol.dispose]: () => probe.remove() };
  using _css = { [Symbol.dispose]: () => applyThemeCss(undefined) };
  const button = probe.querySelector("button")!;
  const link = probe.querySelector("a")!;
  const css = `
    [data-theme-css-locale-probe]:has(>div.shrink-0>[aria-label="New thread"]) {
      display: flex;
      &>div>[aria-label="New thread"] { background-color: rgb(217, 119, 87); }
      &>div>:not([aria-label="New thread"],[aria-label="Add project"]) { display: none; }
    }
    @media (min-width: 0px) {
      [data-theme-css-locale-probe] a[aria-label='T3 Code home'] { padding-left: 17px; }
    }
    [data-theme-css-locale-probe] button::after { content: '[aria-label=Close]'; }
  `;
  applyThemeCss(css);

  expect(getComputedStyle(probe).display).toBe("flex");
  expect(getComputedStyle(button).backgroundColor).toBe("rgb(217, 119, 87)");
  expect(getComputedStyle(button).display).not.toBe("none");
  expect(getComputedStyle(link).paddingLeft).toBe("17px");
  expect(getComputedStyle(button, "::after").content).toContain("[aria-label=Close]");

  button.setAttribute("aria-label", "New thread");
  link.setAttribute("aria-label", "T3 Code home");
  applyThemeCss(css);
  expect(getComputedStyle(button).backgroundColor).toBe("rgb(217, 119, 87)");
  expect(getComputedStyle(link).paddingLeft).toBe("17px");

  applyThemeCss(undefined);
  expect(getComputedStyle(button).backgroundColor).not.toBe("rgb(217, 119, 87)");
});

it("applies theme CSS and drops every rule that would load a remote file", () => {
  const probe = document.createElement("div");
  probe.dataset.themeCssProbe = "";
  document.body.append(probe);
  using _probe = { [Symbol.dispose]: () => probe.remove() };
  using _css = { [Symbol.dispose]: () => applyThemeCss(undefined) };

  applyThemeCss(`
    @import url(https://example.com/sheet.css);
    @namespace svg url(http://www.w3.org/2000/svg);
    @property --registered { syntax: "<url>"; inherits: false; initial-value: url(https://example.com/d); }
    @counter-style leak { system: cyclic; symbols: url(https://example.com/f); }
    @keyframes leak { to { background-image: url(https://example.com/g); } }
    :root { --leak: u\\72l(https://example.com/a); }
    [data-theme-css-probe] {
      color: rgb(1, 2, 3);
      background-image: u\\72l(https://example.com/b);
      list-style-image: var(--leak);
      border-image-source: var(--registered);
      mask-image: v\\61r(--none, u\\72l(https://example.com/e));
      @media (min-width: 0px) { cursor: url(https://example.com/c), auto; }
    }
  `);

  const style = getComputedStyle(probe);
  expect(style.color).toBe("rgb(1, 2, 3)");
  expect(style.backgroundImage).toBe("none");
  expect(style.listStyleImage).toBe("none");
  expect(style.borderImageSource).toBe("none");
  expect(style.maskImage).toBe("none");
  const kept = document.adoptedStyleSheets.flatMap((sheet) =>
    Array.from(sheet.cssRules, (rule) => rule.cssText),
  );
  expect(kept.join("\n")).not.toContain("example.com");
  expect(style.cursor).toBe("auto");

  applyThemeCss(undefined);
  expect(getComputedStyle(probe).color).not.toBe("rgb(1, 2, 3)");
});

it("preserves literal attribute strings, Chinese selectors, unknown labels and specificity", () => {
  const probe = document.createElement("button");
  probe.dataset.themeCssLiteralProbe = "";
  probe.dataset.label = '[aria-label="New thread"]';
  probe.setAttribute("aria-label", "新建会话");
  document.body.append(probe);
  using _probe = { [Symbol.dispose]: () => probe.remove() };
  using _css = { [Symbol.dispose]: () => applyThemeCss(undefined) };

  applyThemeCss(`
    [data-theme-css-literal-probe][data-label='[aria-label="New thread"]'] { padding-left: 11px; }
    [data-theme-css-literal-probe][aria-label="新建会话"] { padding-right: 13px; }
    [data-theme-css-literal-probe][aria-label="New thread"] { margin-left: 17px; }
    [data-theme-css-literal-probe][aria-label] { margin-left: 19px; }
    [data-theme-css-literal-probe][aria-label="My custom tool"] { padding-top: 23px; }
    [data-theme-css-literal-probe][aria-label=Close] { padding-bottom: 29px; }
  `);
  expect(getComputedStyle(probe).paddingLeft).toBe("11px");
  expect(getComputedStyle(probe).paddingRight).toBe("13px");
  expect(getComputedStyle(probe).marginLeft).toBe("19px");
  probe.setAttribute("aria-label", "My custom tool");
  expect(getComputedStyle(probe).paddingTop).toBe("23px");
  probe.setAttribute("aria-label", "关闭");
  expect(getComputedStyle(probe).paddingBottom).toBe("29px");
});
