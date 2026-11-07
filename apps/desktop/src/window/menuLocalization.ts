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
};

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
