import { translate, type Locale } from "../i18n/locale";

export const rightPanelTabsUiMessages = {
  Browser: "浏览器",
  Terminal: "终端",
  Files: "文件",
  Diff: "差异",
  "Pull request": "Pull request",
  "Pull requests": "Pull requests",
  "Linked pull requests": "已关联 pull request",
  Device: "设备",
  "Device host": "设备主机",
  "Side chat": "侧聊",
  "Watch an iOS Simulator or Android Emulator.": "查看 iOS 模拟器或 Android 模拟器。",
  "Ask a side question while this thread keeps working.": "在会话继续运行的同时追问一个旁支问题。",
  "Open a surface": "打开面板",
  "Open browser in a profile": "在指定配置中打开浏览器",
  "Unmute tab": "取消标签静音",
  "Mute tab": "将标签静音",
  "Unmute {title}": "取消 {title} 的静音",
  "Mute {title}": "将 {title} 静音",
  "Device tab name": "设备标签名",
  "Close {title}": "关闭 {title}",
  Rename: "重命名",
  "Copy path": "复制路径",
  Close: "关闭",
  "Close others": "关闭其他标签",
  "Close to the right": "关闭右侧标签",
  "Close all": "关闭全部标签",
  "Add panel surface": "添加面板",
  "Scroll panel tabs": "滚动面板标签",
  "Scroll tabs left": "向左滚动标签",
  "Scroll tabs right": "向右滚动标签",
  "Workspace panel: {title}": "工作区面板：{title}",
  "Workspace panel": "工作区面板",
  "needs approval": "待批准",
  "needs input": "待输入",
  running: "正在运行",
  "{title}, {state}": "{title}，{state}",

  // Why a surface cannot open
  "Only available in the desktop app.": "仅桌面应用可用。",
  "Available when a project is open.": "打开项目后可用。",
  "Available for Git repositories.": "仅适用于 Git 仓库。",
  "No pull request on this branch yet.": "此分支尚无 pull request。",
  "No linked pull requests available.": "没有可用的已关联 pull request。",
  "Available from a thread.": "在会话中可用。",
  "Available after the first message.": "发送第一条消息后可用。",
  "Browser previews are only available in the T3 Code desktop app.":
    "浏览器预览仅在 T3 Code 桌面应用中可用。",
  "Terminal surfaces are only available from a project thread.": "终端面板仅在项目会话中可用。",
  "Files are only available when a project is open.": "打开项目后才能使用文件面板。",
  "Diff is only available for server threads in Git repositories.":
    "差异仅在 Git 仓库的服务器会话中可用。",
  "This thread's branch has no pull request yet.": "此会话的分支尚无 pull request。",
  "No linked pull requests are available for this thread.": "此会话没有可用的已关联 pull request。",
  "Devices are only available from a thread.": "设备仅在会话中可用。",
  "Side chats start after the first message.": "发送第一条消息后才能开始侧聊。",
} as const;

const WORKSPACE_PANEL = /^Workspace panel: (.+)$/;

/** Translate a right panel label that another module built as a plain string. */
export function translateRightPanelLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  if (Object.hasOwn(rightPanelTabsUiMessages, label))
    return rightPanelTabsUiMessages[label as keyof typeof rightPanelTabsUiMessages];

  const panel = WORKSPACE_PANEL.exec(label);
  if (panel) {
    // The title is already a display name: a fixed label translated by kind, or user data.
    return translate(locale, rightPanelTabsUiMessages, "Workspace panel: {title}", {
      title: panel[1]!,
    });
  }
  return label;
}
