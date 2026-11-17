import { coreUiMessages } from "../components/coreUi.messages";
import { sourceText } from "./locale";

const labels = new Map(
  Object.entries(coreUiMessages).map(([key, value]) => [sourceText(key), value]),
);

/** Expand selectors, never declarations or strings inside another attribute selector. */
export function localizeThemeSelector(selector: string): string {
  return selector.replace(
    /\\.|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\[(?:\\.|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[^\]"'\\])*\]/gu,
    (token) => {
      const match =
        /^\[\s*aria-label\s*=\s*(?:"([^"\\]*)"|'([^'\\]*)'|([\w-]+))\s*([is])?\s*\]$/iu.exec(token);
      if (!match) return token;
      const english = match[1] ?? match[2] ?? match[3] ?? "";
      const translated = labels.get(english);
      if (!translated || translated === english || translated.includes("{")) return token;
      const flag = match[4] ? ` ${match[4]}` : "";
      return `:is(${token},[aria-label="${CSS.escape(translated)}"${flag}])`;
    },
  );
}
