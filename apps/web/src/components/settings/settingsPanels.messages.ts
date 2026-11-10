import { translate, type Locale } from "../../i18n/locale";

export const settingsPanelsMessages = {
  "Could not download update": "无法下载更新",
  "Download failed.": "下载失败。",
  "Could not confirm update": "无法确认更新",
  "Update confirmation failed.": "确认更新失败。",
  "Could not install update": "无法安装更新",
  "Install failed.": "安装失败。",
  "Could not check for updates": "无法检查更新",
  "Automatic updates are not available in this build.": "此版本不支持自动更新。",
  "Update check failed.": "检查更新失败。",
  Download: "下载",
  Install: "安装",
  "Checking…": "正在检查…",
  "Downloading…": "正在下载…",
  "Up to Date": "已是最新版本",
  "Check for Updates": "检查更新",
  "Update available.": "有可用更新。",
  "Current version of the application.": "应用的当前版本。",
  "Nightly builds are not available.": "无法使用 Nightly 版。",
  "Nightly builds are not available; switch to Stable to keep getting updates.":
    "无法使用 Nightly 版；请切换到稳定版以继续获取更新。",
  "1 machine still runs {channel}.": "仍有 1 台机器运行 {channel}。",
  "{count} machines still run {channel}.": "仍有 {count} 台机器运行 {channel}。",
  Review: "查看",
  "Switches this app and every connected machine whose database the target release supports.":
    "切换此应用，以及所有数据库受目标版本支持的已连接机器。",
  "Update track": "更新通道",
  Stable: "稳定版",
  Nightly: "Nightly 版",
  Latest: "最新版",
  "Switches the hosted app release channel.": "切换托管版应用的发布通道。",
  App: "应用",
  Organization: "组织",
  "This environment is managed by {organization}. Some settings and features follow its policy.":
    "此环境由 {organization} 管理，部分设置和功能遵循其策略。",
  "Get help": "获取帮助",
  Legal: "法律信息",
  "How we handle your data, including the anonymous usage data T3 Code collects.":
    "我们如何处理你的数据，包括 T3 Code 收集的匿名使用数据。",
  "How we handle your data.": "我们如何处理你的数据。",
  "View policy": "查看政策",
  "Notices for dependencies, assets, and optional tools used by T3 Code.":
    "T3 Code 使用的依赖项、素材和可选工具的声明。",
  "View licenses": "查看许可证",
  "Couldn’t restore theme settings": "无法恢复主题设置",
  "Try again.": "请重试。",
  "Restore default settings?": "恢复默认设置？",
  "This will reset: {labels}.": "将重置：{labels}。",
  Composer: "输入框",
  "Show formatted Markdown as you type.": "输入时显示 Markdown 格式效果。",
  "rich text composer": "富文本输入框",
  "Choose when Enter sends a prompt or inserts a new line": "选择 Enter 是发送提示词还是插入换行",
  "send shortcut": "发送快捷键",
  "{modifier} + Enter for multiline prompts": "多行提示词用 {modifier} + Enter 发送",
  "{modifier} + Enter always": "始终用 {modifier} + Enter 发送",
  "Also include skills in the / command menu. Skills always appear when you type $.":
    "在 / 命令菜单中也显示技能。输入 $ 时始终会显示技能。",
  "skills in slash menu": "在斜杠菜单中显示技能",
  "Follow-ups": "追加消息",
  "Queue follow-ups while the agent runs or steer the current run.":
    "智能体运行时，可以把追加消息加入队列，或用它引导当前执行。",
  "Press {modifier} + Enter for single-line prompts or {modifier} + Shift + Enter for multiline prompts to do the opposite for one message.":
    "单行提示词按 {modifier} + Enter、多行提示词按 {modifier} + Shift + Enter，可对单条消息使用相反的方式。",
  "Press {keys} + Enter to do the opposite for one message.":
    "按 {keys} + Enter，可对单条消息使用相反的方式。",
  "follow-up behavior": "追加消息行为",
  Queue: "加入队列",
  Steer: "引导当前执行",
  "Choose colors for additions and deletions, including change counts.":
    "选择新增和删除内容（包括改动计数）的颜色。",
  "diff colors": "差异颜色",
  "Blue & orange": "蓝色与橙色",
  "Red & green": "红色与绿色",
  "Red & green (default)": "红色与绿色（默认）",
  Diffs: "差异",
  "Show diffs stacked or side by side. The toggle in the diff toolbar changes this too.":
    "以上下堆叠或左右并排方式显示差异。差异工具栏中的切换按钮也会修改此设置。",
  "diff layout": "差异布局",
  Stacked: "堆叠",
  Split: "并排",
  "Set whether the diff panel ignores whitespace-only edits by default.":
    "设置差异面板是否默认忽略仅涉及空白字符的改动。",
  "diff whitespace changes": "差异空白字符改动",
  "Hide whitespace changes by default": "默认隐藏空白字符改动",
  "Start with files expanded or collapsed when opening diffs or a pull request's Code tab.":
    "打开差异或 pull request 的“代码”标签页时，文件默认展开还是折叠。",
  "default diff file state": "差异文件默认状态",
  Collapsed: "折叠",
  Expanded: "展开",
  "Pull requests@@short-label": "PR",
  "Open linked pull requests first. Otherwise, open Changes for edits to at least 3 files or 50 lines.":
    "优先打开关联的 pull request；否则在改动至少 3 个文件或 50 行时打开“改动”面板。",
  "proactive panels": "自动打开面板",
  "Open pull requests and changes panels proactively": "自动打开 PR 与改动面板",
  "When to compact an idle Claude thread over 200,000 tokens: after you return, just before its prompt cache expires, or never. Each Claude provider can override this.":
    "空闲且超过 200,000 token 的 Claude 会话何时压缩：在你回来后、提示缓存即将过期前，或从不压缩。每个 Claude 提供方都可以单独覆盖此设置。",
  "compact idle threads": "压缩空闲会话",
  Mixed: "各不相同",
  "When you return": "在你回来后",
  "Before the cache expires (beta)": "缓存过期前（测试版）",
  Never: "从不",
  "New projects": "新项目",
  'Leave empty to use "~/" when the Add Project browser opens.':
    "留空时，“添加项目”浏览器从“~/”打开。",
  "add project base directory": "添加项目的起始目录",
  "Clones go to github.com/owner/repo under the folder above, like ghq.":
    "克隆的仓库会放到上方文件夹下的 github.com/owner/repo 中，与 ghq 相同。",
  "clone into host folders": "克隆到主机文件夹",
  Snooze: "暂缓",
  "Usage limits": "用量限制",
  "Automatically resume threads when their usage limits reset. You can cancel auto-resume in each thread.":
    "用量限制重置后自动继续会话。你可以在每个会话中取消自动继续。",
  "Resume after usage limits": "用量限制解除后继续",
  "Snooze threads until their usage limits reset. Enable auto-resume to continue the agent after the reset.":
    "将会话暂缓到用量限制重置。开启自动继续后，智能体会在重置后接着工作。",
  "Snooze until limits reset": "暂缓到用量限制重置",
  "Auto-settle": "自动收尾",
  "auto-settle": "自动收尾",
  "Settle a thread when its pull request merges. Closed pull requests still settle automatically.":
    "Pull request 合并后收尾会话。已关闭的 pull request 仍会自动收尾。",
  "auto-settle on merge": "合并后自动收尾",
  "Auto-settle merged threads": "合并后自动收尾会话",
  "Sidebar threads with no activity for this long settle automatically.":
    "侧边栏中闲置达到此时长的会话会自动收尾。",
  "Auto-settle inactive threads": "自动收尾不活跃会话",
  "Days of inactivity before auto-settle": "自动收尾前的闲置天数",
  "Any new activity un-settles a thread automatically.": "会话有新活动时会自动取消收尾。",
  "Keep threads with a PR": "保留有关联 PR 的会话",
  "Inactivity does not settle threads with a pull request. Merge and close still do.":
    "闲置不会让有 pull request 的会话收尾，但合并和关闭仍会。",
  "Text generation": "文本生成",
  "Used for thread titles and other generated text on connected devices with this provider. Source control can override it.":
    "用于在使用此提供方的已连接设备上生成会话标题和其他文本。版本控制设置可以覆盖它。",
  "For thread titles and other generated text. Source control has its own setting. Text generators from Providers also appear here.":
    "用于生成会话标题和其他文本。版本控制有单独的设置。“提供方”中添加的文本生成器也会显示在这里。",
  "text generation model": "文本生成模型",
  "Connect an environment to choose its text generation model.":
    "请连接一个环境以选择其文本生成模型。",
  "No text generation providers available.": "没有可用的文本生成提供方。",
  "Text generation model not saved": "未保存文本生成模型",
  "The selected targets use different streaming modes.": "所选目标使用了不同的流式模式。",
  "Text appears once the agent finishes its turn.": "智能体完成本轮后一次性显示文本。",
  "Each paragraph or code block appears as soon as it is complete.":
    "每个段落或代码块完成后立即显示。",
  "response streaming": "流式响应",
  "Wait for the full response": "等待完整回复",
  "Show finished paragraphs": "显示已完成的段落",
  Updates: "更新",
  "Check installed provider CLIs for newer available versions and fetch model catalog updates. When off, new models may not appear.":
    "检查已安装的提供方 CLI 是否有新版本，并获取模型目录更新。关闭后，新模型可能不会出现。",
  "provider update checks": "提供方更新检查",
  "Check provider versions": "检查提供方版本",
  "Automatically resume interrupted threads after an update, crash, or machine restart on the selected environments.":
    "在所选环境中，更新、崩溃或机器重启后自动继续被中断的会话。",
  "All selected connected environments must support restart continuation.":
    "所有选中的已连接环境都必须支持重启后继续。",
  "continue threads after restarts": "重启后继续会话",
  "Background activity": "后台活动",
  Activity: "活动",
  Diagnostics: "诊断",
  "Inspect processes, resource use, and logs on this environment.":
    "查看此环境的进程、资源占用和日志。",
  "Inspect processes, resource use, and logs on one environment at a time.":
    "逐个查看各环境的进程、资源占用和日志。",
  "View diagnostics": "查看诊断",
  "Rich text composer": "富文本输入框",
  "Send shortcut": "发送快捷键",
  "Show skills in slash menu": "在斜杠菜单中显示技能",
  "Follow-up behavior": "追加消息行为",
  "Diff colors": "差异颜色",
  "Diff layout": "差异布局",
  "Default diff file state": "差异文件默认状态",
  "Compact idle threads": "压缩空闲会话",
  "Add project base directory": "添加项目的起始目录",
  "Clone into host folders": "克隆到主机文件夹",
  "Response streaming": "流式响应",
  "Continue threads after restarts": "重启后继续会话",
  "Update {version} did not apply. Click to retry.": "更新 {version} 未生效。点击重试。",
  "Update {version} ready to download": "更新 {version} 已可下载",
  "Downloading update": "正在下载更新",
  "Downloading update ({percent}%)": "正在下载更新（{percent}%）",
  "Update {version} downloaded. Click to restart and install.":
    "更新 {version} 已下载。点击重启并安装。",
  "Download failed for {version}. Click to retry.": "下载 {version} 失败。点击重试。",
  "Install failed for {version}. Click to retry.": "安装 {version} 失败。点击重试。",
  "Update failed": "更新失败",
  "Up to date": "已是最新版本",
  "Update available ready to download": "有可下载的更新",
  "Update ready downloaded. Click to restart and install.": "更新已下载。点击重启并安装。",
  "Install update and restart T3 Code?\n\nAny running tasks will be interrupted. Make sure you're ready before continuing.":
    "安装更新并重启 T3 Code？\n\n正在运行的任务会被中断。请确认已准备好再继续。",
  "Install update {version} and restart T3 Code?\n\nAny running tasks will be interrupted. Make sure you're ready before continuing.":
    "安装更新 {version} 并重启 T3 Code？\n\n正在运行的任务会被中断。请确认已准备好再继续。",
} as const;

const UPDATE_TEXT_TEMPLATES = [
  [
    /^Update (.+) did not apply\. Click to retry\.$/,
    "Update {version} did not apply. Click to retry.",
    "version",
  ],
  [/^Update (.+) ready to download$/, "Update {version} ready to download", "version"],
  [/^Downloading update \((.+)%\)$/, "Downloading update ({percent}%)", "percent"],
  [
    /^Update (.+) downloaded\. Click to restart and install\.$/,
    "Update {version} downloaded. Click to restart and install.",
    "version",
  ],
  [
    /^Download failed for (.+)\. Click to retry\.$/,
    "Download failed for {version}. Click to retry.",
    "version",
  ],
  [
    /^Install failed for (.+)\. Click to retry\.$/,
    "Install failed for {version}. Click to retry.",
    "version",
  ],
  [
    /^Install update (.+) and restart T3 Code\?\n\nAny running tasks will be interrupted\. Make sure you're ready before continuing\.$/,
    "Install update {version} and restart T3 Code?\n\nAny running tasks will be interrupted. Make sure you're ready before continuing.",
    "version",
  ],
] as const;

// Labels computed at run time (button states, option names) go through this lookup.
export function translatePanelLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  if (Object.hasOwn(settingsPanelsMessages, label))
    return settingsPanelsMessages[label as keyof typeof settingsPanelsMessages];
  for (const [pattern, key, parameter] of UPDATE_TEXT_TEMPLATES) {
    const match = pattern.exec(label);
    if (match)
      return translate(locale, settingsPanelsMessages, key, { [parameter]: match[1] ?? "" });
  }
  return label;
}
