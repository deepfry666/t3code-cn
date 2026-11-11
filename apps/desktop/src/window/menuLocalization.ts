import type * as Electron from "electron";

const labels: Readonly<Record<string, string>> = {
  File: "文件",
  Edit: "编辑",
  View: "查看",
  "View@@macOS": "显示",
  Speech: "语音",
  "Check for Updates...": "检查更新…",
  "Settings...": "设置…",
  "Close Window": "关闭窗口",
  "Close Developer Tools": "关闭开发者工具",
  "Paste as Text": "粘贴为纯文本",
  Reload: "重新加载",
  "Force Reload": "强制重新加载",
  "Toggle Developer Tools": "切换开发者工具",
  "Actual Size": "实际大小",
  "Zoom In": "放大",
  "Zoom Out": "缩小",
  "No suggestions": "无建议",
  "Copy Link": "复制链接",
  "Copy Image": "复制图片",
  "You're up to date!": "已是最新版本！",
  "T3 Code {version} is currently the newest version available.":
    "T3 Code {version} 已是最新版本。",
  "Update check failed": "检查更新失败",
  "Could not check for updates.": "无法检查更新。",
  "An unknown error occurred. Please try again later.": "发生未知错误，请稍后重试。",
  "Updates unavailable": "更新不可用",
  "Automatic updates are not available right now.": "目前无法自动更新。",
  "Updates are turned off on this machine.": "本机已停用更新。",
  "Automatic updates are not available because no update feed is configured.":
    "尚未配置更新源，无法自动更新。",
  "Automatic updates are only available in packaged production builds.":
    "只有打包的正式版本支持自动更新。",
  "Automatic updates are disabled by the T3CODE_DISABLE_AUTO_UPDATE setting.":
    "T3CODE_DISABLE_AUTO_UPDATE 设置已停用自动更新。",
  "Automatic updates on Linux require the AppImage or the .deb package.":
    "Linux 自动更新需要 AppImage 或 .deb 安装包。",
  OK: "确定",
  Open: "打开",
  Cancel: "取消",
  Allow: "允许",
  Block: "阻止",
  "Open this {protocol} link?": "要打开此 {protocol} 链接吗？",
  "A page in the browser wants to open another application:\n\n{url}":
    "浏览器中的页面想打开另一个应用：\n\n{url}",
  "{origin} wants to see text and images copied to the clipboard":
    "{origin} 想查看复制到剪贴板的文字和图片",
  "Close permission helper": "关闭权限助手",
  "Drag T3 Code to System Settings, or click to reveal in Finder":
    "将 T3 Code 拖入系统设置，或点击在 Finder 中显示",
  "↑ Drag T3 Code into the list above": "↑ 将 T3 Code 拖入上方列表",
  "Set up {permission}": "设置{permission}",
  "Screen Recording": "屏幕录制",
  Accessibility: "辅助功能",
  "Full Disk Access": "完全磁盘访问权限",
  "Unnamed passkey": "未命名通行密钥",
  "Choose a passkey": "选择通行密钥",
  "Style value": "样式值",
  "Expand annotation editor": "展开标注编辑器",
  "Collapse annotation editor": "收起标注编辑器",
  "Describe the change…": "描述修改…",
  "Start voice input": "开始语音输入",
  "Cancel voice input": "取消语音输入",
  "Finish voice input": "完成语音输入",
  Skip: "跳过",
  "Skip transcript cleanup": "跳过转写文本整理",
  "Open voice settings": "打开语音设置",
  "Dismiss voice input error": "关闭语音输入错误提示",
  "Voice input": "语音输入",
  "Voice input is busy": "语音输入正忙",
  "Drag annotation editor": "拖动标注编辑器",
  Attach: "附加",
  "Attach annotation and screenshot (Enter)": "附加标注和截图（Enter）",
  "Attach annotation and screenshot (Enter). Send with Cmd/Ctrl+Enter.":
    "附加标注和截图（Enter）。按 Cmd/Ctrl+Enter 发送。",
  Font: "字体",
  "Font size": "字号",
  "Font weight": "字重",
  "Line height": "行高",
  "Text color": "文字颜色",
  Background: "背景",
  Opacity: "不透明度",
  Radius: "圆角",
  "Border color": "边框颜色",
  "Border width": "边框宽度",
  "Lock aspect ratio": "锁定宽高比",
  Padding: "内边距",
  Margin: "外边距",
  Gap: "间距",
  "{label} value": "{label} 的值",
  Select: "选择",
  Region: "区域",
  Draw: "绘制",
  Erase: "擦除",
  "Select elements (V)": "选择元素（V）",
  "Draw a region or marquee-select elements (R)": "绘制区域或框选元素（R）",
  "Draw freehand (D)": "自由绘制（D）",
  "Remove an annotation target (E)": "移除标注目标（E）",
  "Capturing…": "正在截图…",
  "Live browser preview": "实时浏览器预览",
  "Preview · {title}": "预览 · {title}",
  "Browser preview": "浏览器预览",
  "Capture a window": "截取窗口",
  "Copy Email Address": "复制邮箱地址",
};

export function localizeDesktopText(
  text: string,
  languages: readonly string[],
  params: Readonly<Record<string, string | number>> = {},
): string {
  const message =
    languages[0]?.toLowerCase().startsWith("zh") && Object.hasOwn(labels, text)
      ? (labels[text] ?? text)
      : text;
  return message.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    Object.hasOwn(params, name) ? String(params[name]) : placeholder,
  );
}

const roles: Partial<Record<NonNullable<Electron.MenuItemConstructorOptions["role"]>, string>> = {
  services: "服务",
  hideOthers: "隐藏其他应用",
  unhide: "全部显示",
  quit: "退出",
  undo: "撤销",
  redo: "重做",
  cut: "剪切",
  copy: "复制",
  paste: "粘贴",
  delete: "删除",
  selectAll: "全选",
  startSpeaking: "开始朗读",
  stopSpeaking: "停止朗读",
  togglefullscreen: "切换全屏",
  windowMenu: "窗口",
  minimize: "最小化",
  zoom: "缩放",
  front: "全部置于前面",
  help: "帮助",
};

/** Native menus follow the OS preference; renderer-local storage is not a desktop setting. */
export function localizeApplicationMenu(
  template: Electron.MenuItemConstructorOptions[],
  languages: readonly string[],
  displayName: string,
  platform?: NodeJS.Platform,
): Electron.MenuItemConstructorOptions[] {
  if (!languages[0]?.toLowerCase().startsWith("zh")) return template;
  const applicationLabels: Readonly<Record<string, string>> = {
    [`About ${displayName}`]: `关于 ${displayName}`,
    [`Hide ${displayName}`]: `隐藏 ${displayName}`,
    [`Quit ${displayName}`]: `退出 ${displayName}`,
  };
  const localize = (
    item: Electron.MenuItemConstructorOptions,
  ): Electron.MenuItemConstructorOptions => {
    const label =
      item.label === undefined
        ? item.role === undefined
          ? undefined
          : roles[item.role]
        : item.label === "View" && platform === "darwin"
          ? // macOS names this menu 显示; Windows and Linux apps say 查看.
            labels["View@@macOS"]
          : Object.hasOwn(labels, item.label)
            ? localizeDesktopText(item.label, languages)
            : Object.hasOwn(applicationLabels, item.label)
              ? applicationLabels[item.label]
              : item.label;
    return {
      ...item,
      ...(label === undefined ? {} : { label }),
      ...(Array.isArray(item.submenu) ? { submenu: item.submenu.map(localize) } : {}),
    };
  };
  return template.map(localize);
}
