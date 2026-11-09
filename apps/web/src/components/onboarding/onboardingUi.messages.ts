import { translate, type Locale } from "../../i18n/locale";

export const onboardingUiMessages = {
  // Stage headers
  Connect: "连接",
  Agents: "智能体",
  Projects: "项目",

  // Connection step
  "Set up T3 Code": "设置 T3 Code",
  "Connect your computers": "连接你的电脑",
  "Choose one or more computers. We’ll set up agents and projects on each.":
    "选择一台或多台电脑，我们会在每台电脑上配置智能体和项目。",
  "Computers to set up": "要设置的电脑",
  Off: "关闭",
  "Loading sign-in…": "正在加载登录…",
  "Sign in": "登录",
  "Loading computers…": "正在加载电脑…",
  "Run this on each computer you want to connect.": "在每台要连接的电脑上运行此命令。",
  "Keep T3 Code running. Select the computers you want to set up above.":
    "保持 T3 Code 运行，并在上方选择要设置的电脑。",
  "Pairing failed.": "配对失败。",
  "Pairing link": "配对链接",
  "Need a pairing link?": "需要配对链接？",
  "Pairing...": "正在配对…",
  Pair: "配对",
  "Not connected, so setup skips {names}.": "由于未连接，设置会跳过 {names}。",
  "You can set it up later from Settings.": "稍后可以在设置中配置。",

  // Agents step
  "Connect your agents": "连接你的智能体",
  "Choose an agent to start coding. You can add more later.":
    "选择一个智能体开始写代码，之后还可以再添加。",
  Computer: "电脑",
  "This connection cannot control terminals.": "此连接无法控制终端。",
  "Connect another ChatGPT account": "连接另一个 ChatGPT 账号",
  "Ready to code.": "可以开始写代码了。",
  Install: "安装",
  "Review the command, then press Enter to run it.": "检查命令后按 Enter 运行。",
  "Could not open the setup terminal.": "无法打开设置终端。",
  "Preparing command...": "正在准备命令…",
  "Install {driver}": "安装 {driver}",

  // Import step
  "This connection cannot import projects or thread history.": "此连接无法导入项目或会话历史。",
  "Some history was not imported": "部分历史记录未能导入",
  "Imported {count} thread": "已导入 {count} 个会话",
  "Imported {count} threads": "已导入 {count} 个会话",
  "Imported {count} thread.": "已导入 {count} 个会话。",
  "Imported {count} threads.": "已导入 {count} 个会话。",
  "{count} thread could not be imported.": "{count} 个会话无法导入。",
  "{count} threads could not be imported.": "{count} 个会话无法导入。",
  "Some thread history could not be imported.": "部分会话历史无法导入。",
  "Could not import thread history.": "无法导入会话历史。",
  "Could not finish setup": "无法完成设置",
  "Your settings could not be saved. Try again.": "无法保存你的设置，请重试。",
  "Scan limit reached. Some projects or conversations may be missing.":
    "已达扫描上限，部分项目或对话可能缺失。",
  "Import your projects": "导入你的项目",
  "Import projects and conversations from Claude Code and Codex on your selected computers.":
    "从所选电脑上的 Claude Code 和 Codex 导入项目和对话。",
  "Do not import projects": "不导入项目",
  "Select all": "全选",
  "Select none": "全不选",
  "No existing Claude Code or Codex projects found.": "未找到现有的 Claude Code 或 Codex 项目。",
  "Importing…": "正在导入…",
  "Import {count} project": "导入 {count} 个项目",
  "Import {count} projects": "导入 {count} 个项目",
  "Could not read settings": "无法读取设置",
  "Still connecting": "仍在连接",
  "Your saved settings could not be loaded.": "无法加载你保存的设置。",
  "T3 Code could not confirm this workspace.": "T3 Code 无法确认此工作区。",
  Retry: "重试",
  Reload: "重新加载",
  "Codex setup settings": "Codex 设置项",
  "T3 Code collects anonymous usage data to help us improve it.":
    "T3 Code 会收集匿名使用数据，帮助我们改进产品。",
  " To read more about how your data is used{optOut}, see our ":
    "要了解你的数据如何被使用{optOut}，请参阅我们的",
  " and how to opt out": "以及如何退出",
  "privacy policy": "隐私政策",
} as const;

/**
 * The warning after an import that could not bring every thread across. The import does
 * not fail, so the toast keeps its counts in one sentence per count.
 */
export function threadImportWarning(
  locale: Locale,
  counts: { readonly imported: number; readonly skipped: number },
): string {
  const tr = (
    key: keyof typeof onboardingUiMessages,
    params?: Readonly<Record<string, string | number>>,
  ) => translate(locale, onboardingUiMessages, key, params);
  const sentences: string[] = [];
  if (counts.imported > 0) {
    sentences.push(
      tr(counts.imported === 1 ? "Imported {count} thread." : "Imported {count} threads.", {
        count: counts.imported,
      }),
    );
  }
  if (counts.skipped > 0) {
    sentences.push(
      tr(
        counts.skipped === 1
          ? "{count} thread could not be imported."
          : "{count} threads could not be imported.",
        { count: counts.skipped },
      ),
    );
  } else if (counts.imported > 0) {
    sentences.push(tr("Some thread history could not be imported."));
  }
  if (sentences.length === 0) return tr("Could not import thread history.");
  // Chinese sentences carry their own full stop; English needs a space between them.
  return sentences.join(locale === "zh-CN" ? "" : " ");
}

const SKIPPED_SETUP =
  /^Not connected, so setup skips (.+)\. You can set (?:it|them) up later from Settings\.$/;

/** Translate an onboarding label another module composed in English. */
export function translateOnboardingLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  if (Object.hasOwn(onboardingUiMessages, label))
    return onboardingUiMessages[label as keyof typeof onboardingUiMessages];

  const skipped = SKIPPED_SETUP.exec(label);
  if (skipped) {
    return [
      translate(locale, onboardingUiMessages, "Not connected, so setup skips {names}.", {
        names: skipped[1]!,
      }),
      translate(locale, onboardingUiMessages, "You can set it up later from Settings."),
    ].join("");
  }
  return label;
}
