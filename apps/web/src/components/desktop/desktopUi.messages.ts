import type { Locale } from "../../i18n/locale";
import { translateVoiceLabel } from "../settings/settingsVoice.messages";
import { translateConnectionLabel } from "../settings/settingsConnections.messages";

export const desktopUiMessages = {
  // Desktop links
  "Could not open the link": "无法打开链接",
  "Could not add backend": "无法添加后端",
  "Failed to add backend.": "无法添加后端。",
  "Add the backend at {origin}?": "要添加位于 {origin} 的后端吗？",
  "Backend added": "已添加后端",
  "The environment is saved and will reconnect on app startup.":
    "已保存环境，应用启动时会自动重新连接。",

  // Snapshots
  "Snapshot taken, but no project is available": "已截图，但没有可用的项目",
  "Add a project, then capture the window again.": "请先添加项目，再重新截取窗口。",
  "Snapshot failed": "截图失败",
  "Try the capture again.": "请重试截图。",

  // SSH verification
  "SSH verification prompt failed.": "SSH 验证提示失败。",
  "This SSH verification prompt expired. Try connecting again.":
    "此 SSH 验证提示已过期，请重新连接。",
  "SSH verification required": "需要 SSH 验证",
  "Enter the password or verification code required by {target}. T3 Code passes your response to the local SSH process and keeps it in memory to reuse for this host. T3 Code does not write it to disk.":
    "请输入 {target} 所需的密码或验证码。T3 Code 会把你的回复传给本地 SSH 进程，并保存在内存中，供连接此主机时复用。T3 Code 不会把它写入磁盘。",
  "SSH keys may replace a password, but your server can still require a verification code.":
    "SSH 密钥可以替代密码，但你的服务器仍可能要求输入验证码。",
  Expired: "已过期",
  Continue: "继续",
  Dismiss: "忽略",
  Cancel: "取消",

  // Root error page
  "Page not found": "页面不存在",
  "This link doesn't point to a page in {app}. Go home to choose a project or start a thread.":
    "此链接未指向 {app} 中的任何页面。返回首页选择项目或新建会话。",
  "Go home": "返回首页",
  "Something went wrong.": "出了点问题。",
  "Try again": "重试",
  "Reload app": "重新加载应用",
  "Error report": "错误报告",
  Copied: "已复制",
  "Copy error": "复制错误信息",
} as const;

export function translateDesktopLabel(label: string, locale: Locale): string {
  if (locale === "zh-CN" && Object.hasOwn(desktopUiMessages, label))
    return desktopUiMessages[label as keyof typeof desktopUiMessages];
  return translateConnectionLabel(translateVoiceLabel(label, locale), locale);
}
