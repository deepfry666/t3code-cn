import { translate, type Locale } from "~/i18n/locale";

/**
 * Theme library, theme file and Open VSX failures reach the user as raw `Error.message` text,
 * so a value sits inside the sentence and no catalog key matches it. Each rule rebuilds the
 * sentence from a template, and text no rule owns, including server errors, passes through.
 */
const themeErrorMessages = {
  'The theme id "{id}" is reserved.': "主题 ID “{id}”为保留名称。",
  'A theme named "{name}" is already installed.': "已安装名为“{name}”的主题。",
  'The theme "{name}" is not installed.': "未安装主题“{name}”。",
  '"{role}" is not a supported theme color role.': "“{role}”不是受支持的主题颜色角色。",
  'The color for "{role}" must be a literal CSS color such as oklch(0.62 0.2 280).':
    "“{role}”的颜色必须是字面量 CSS 颜色，例如 oklch(0.62 0.2 280)。",
  "This theme file uses an unsupported version. Expected {version}.":
    "此主题文件使用了不受支持的版本，需要 {version}。",
  'Theme variants must not repeat the base appearance "{appearance}".':
    "主题变体不能重复基础外观“{appearance}”。",
  "Failed to read the theme library from {storageKey}.": "无法从 {storageKey} 读取主题库。",
  "Failed to write the theme library to {storageKey}.": "无法将主题库写入 {storageKey}。",
  "{source} is not valid JSON.": "{source} 不是有效的 JSON。",
  "{source} is missing from the extension package.": "扩展包中缺少 {source}。",
  "{source} has unreadable size metadata.": "{source} 的大小信息无法读取。",
  "{source} is too large.": "{source} 过大。",
} as const;

type ThemeErrorKey = keyof typeof themeErrorMessages;

const themeErrorRules: ReadonlyArray<{ readonly pattern: RegExp; readonly key: ThemeErrorKey }> = [
  {
    pattern: /^The theme id "(?<id>.+)" is reserved\.$/,
    key: 'The theme id "{id}" is reserved.',
  },
  {
    pattern: /^A theme named "(?<name>.+)" is already installed\.$/,
    key: 'A theme named "{name}" is already installed.',
  },
  {
    pattern: /^The theme "(?<name>.+)" is not installed\.$/,
    key: 'The theme "{name}" is not installed.',
  },
  {
    pattern: /^"(?<role>.+)" is not a supported theme color role\.$/,
    key: '"{role}" is not a supported theme color role.',
  },
  {
    pattern:
      /^The color for "(?<role>.+)" must be a literal CSS color such as oklch\(0\.62 0\.2 280\)\.$/,
    key: 'The color for "{role}" must be a literal CSS color such as oklch(0.62 0.2 280).',
  },
  {
    pattern: /^This theme file uses an unsupported version\. Expected (?<version>\d+)\.$/,
    key: "This theme file uses an unsupported version. Expected {version}.",
  },
  {
    pattern: /^Theme variants must not repeat the base appearance "(?<appearance>.+)"\.$/,
    key: 'Theme variants must not repeat the base appearance "{appearance}".',
  },
  {
    pattern: /^Failed to read the theme library from (?<storageKey>.+)\.$/,
    key: "Failed to read the theme library from {storageKey}.",
  },
  {
    pattern: /^Failed to write the theme library to (?<storageKey>.+)\.$/,
    key: "Failed to write the theme library to {storageKey}.",
  },
  {
    pattern: /^(?<source>.+) is not valid JSON\.$/,
    key: "{source} is not valid JSON.",
  },
  {
    pattern: /^(?<source>.+) is missing from the extension package\.$/,
    key: "{source} is missing from the extension package.",
  },
  {
    pattern: /^(?<source>.+) has unreadable size metadata\.$/,
    key: "{source} has unreadable size metadata.",
  },
  {
    pattern: /^(?<source>.+) is too large\.$/,
    key: "{source} is too large.",
  },
];

export function translateThemeErrorMessage(message: string, locale: Locale): string {
  if (locale !== "zh-CN") return message;
  if (Object.hasOwn(themeErrorMessages, message)) {
    return translate(locale, themeErrorMessages, message as ThemeErrorKey);
  }
  for (const { pattern, key } of themeErrorRules) {
    const groups = pattern.exec(message)?.groups;
    if (groups) return translate(locale, themeErrorMessages, key, groups as Record<string, string>);
  }
  return message;
}
