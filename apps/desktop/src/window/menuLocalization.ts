import type * as Electron from "electron";

const labels: Readonly<Record<string, string>> = {
  File: "文件",
  Edit: "编辑",
  View: "视图",
  Speech: "语音",
  "Check for Updates...": "检查更新…",
  "Settings...": "设置…",
  "Close Window": "关闭窗口",
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
  "Updates are turned off on this machine.": "此机器已停用更新。",
  "Automatic updates are not available because no update feed is configured.":
    "尚未配置更新源，无法自动更新。",
  "Automatic updates are only available in packaged production builds.":
    "只有打包的正式版本支持自动更新。",
  "Automatic updates are disabled by the T3CODE_DISABLE_AUTO_UPDATE setting.":
    "T3CODE_DISABLE_AUTO_UPDATE 设置已停用自动更新。",
  "Automatic updates on Linux require the AppImage or the .deb package.":
    "Linux 自动更新需要 AppImage 或 .deb 安装包。",
  OK: "确定",
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
        : Object.hasOwn(labels, item.label)
          ? labels[item.label]
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
