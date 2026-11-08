import type { Locale } from "../../i18n/locale";

export const settingsContentMessages = {
  "Colors & themes": "颜色与主题",
  Interface: "界面",
  Artwork: "背景图",
  "Nightly artwork": "Nightly 背景图",
  "Dev artwork": "开发版背景图",
  "Version pill": "版本标签",
  None: "无",
  Comfortable: "适中",
  Wide: "宽",
  Full: "全宽",
  Word: "文字",
  Bars: "条形",
  "Comfortable (default)": "适中（默认）",
  "Word (default)": "文字（默认）",
  "Only built-in themes show artwork, so this theme shows the version pill.":
    "仅内置主题支持背景图，因此当前主题显示版本标签。",
  "Only built-in themes show artwork.": "仅内置主题支持背景图。",
  "Choose how Dev and Nightly environments are identified.":
    "选择开发版与 Nightly 环境的标识方式。",
  "Show Dev or Nightly artwork in the sidebar header.": "在侧边栏顶部显示开发版或 Nightly 背景图。",
  "Adjust the contrast of colors and borders across the interface.": "调整界面颜色和边框的对比度。",
  contrast: "对比度",
  Contrast: "对比度",
  "Higher values make menus, dialogs, and the composer more solid.":
    "数值越高，菜单、对话框和输入框越不透明。",
  "glass opacity": "毛玻璃不透明度",
  "Glass opacity": "毛玻璃不透明度",
  "Set how wide messages and the composer can grow on large screens.":
    "设置大屏幕上消息和输入框的最大宽度。",
  "chat width": "聊天宽度",
  "Chat width": "聊天宽度",
  "Show reasoning effort in the composer as its name, such as High, or as bars.":
    "在输入框中用名称（如 High）或条形显示推理强度。",
  "effort display": "推理强度显示",
  "Effort display": "推理强度显示",
  "Typeset LaTeX math, such as $x^2$ or \\[x^2\\], in messages and Markdown previews. The composer keeps TeX source editable.":
    "在消息和 Markdown 预览中排版 LaTeX 公式，如 $x^2$ 或 \\[x^2\\]。输入框中仍可编辑 TeX 源码。",
  "math rendering": "数学公式渲染",
  "Render math": "渲染数学公式",
  "Set how fast panels open and close.": "设置面板展开与收起的速度。",
  "Panel animation duration": "面板动画时长",
  "panel animations": "面板动画",
  "environment identification": "环境标识",
  "Environment identification": "环境标识",
  "Keep branch and worktree controls below the composer after a thread starts.":
    "会话开始后，仍在输入框下方显示分支和工作树控件。",
  "composer context": "输入框上下文",
  "Keep composer context visible in active threads": "在活跃会话中保持输入框上下文可见",
  "System alerts when a thread finishes, fails, or needs input or approval. Applies to this device while T3 Code is open.":
    "会话完成、失败或需要输入或批准时发送系统提醒。仅在此设备上打开 T3 Code 时生效。",
  "Notifications need a supported browser over HTTPS, or the desktop app. Sound only is still available.":
    "通知功能需要通过 HTTPS 访问的受支持浏览器，或使用桌面应用。仍可使用仅声音提醒。",
  "Notifications are unavailable in this browser. Sound only is still available.":
    "此浏览器不支持通知。仍可使用仅声音提醒。",
  "Allow notifications in your browser or system settings, then choose this option again. Sound only is still available.":
    "请在浏览器或系统设置中允许通知，然后重新选择此选项。仍可使用仅声音提醒。",
  "Thread notifications": "会话通知",
  Off: "关闭",
  "Notifications only": "仅通知",
  "Sound only": "仅声音",
  "Notifications with sound": "通知与声音",
  "Search keybindings": "搜索快捷键",
  "T3 Code does not recognize this condition yet. It can still be saved, but it may not match unless the runtime provides it.":
    "T3 Code 尚不识别此条件。仍可保存，但只有运行时提供该条件时才可能匹配。",
  "The most recent matching binding wins when both conditions can apply.":
    "当两个条件都适用时，最近添加的匹配绑定优先。",
  "Unknown condition: {conditions}": "未知条件：{conditions}",
  "Unknown conditions: {conditions}": "未知条件：{conditions}",
  "Conflicts with {labels}.": "与 {labels} 冲突。",
  "Conflicts with {labels}, and more.": "与 {labels} 等快捷键冲突。",
  Condition: "条件",
  "Negate {condition}": "对 {condition} 取反",
  Not: "非",
  "Negate group": "对条件组取反",
  and: "且",
  or: "或",
  Group: "条件组",
  When: "生效条件",
  Always: "始终",
  "When expression": "生效条件表达式",
  "Fix the expression above to continue editing visually.":
    "请先修正上方表达式，再继续可视化编辑。",
  "Clear all conditions": "清除所有条件",
  "Remove condition": "移除条件",
  "Remove group and its conditions": "移除条件组及其条件",
  "Use variables with !, &&, ||, and parentheses.": "请使用变量、!、&&、|| 和括号编写表达式。",
  Saving: "正在保存",
  Save: "保存",
  "Edit shortcut for {command}: {shortcut}": "编辑 {command} 的快捷键：{shortcut}",
  "Keybinding for {command}": "{command} 的快捷键",
  "Press shortcut": "按下快捷键",
  Unassigned: "未分配",
  "Edit when clause for {command}": "编辑 {command} 的生效条件",
  "Actions for {command}": "{command} 的操作",
  "Reset to default": "恢复默认值",
  Remove: "移除",
  Custom: "自定义",
  Project: "项目",
  "new keybinding": "新快捷键",
  Command: "命令",
  "Cancel new keybinding": "取消新快捷键",
  Cancel: "取消",
  "New keybinding": "新快捷键",
  Navigation: "导航",
  Threads: "会话",
  Composer: "输入框",
  Terminal: "终端",
  "Preview & diff": "预览与差异",
  Appearance: "外观",
  "Project scripts": "项目脚本",
  Other: "其他",
  "The browser may claim some shortcuts first. The desktop app receives them all.":
    "浏览器可能优先拦截部分快捷键。桌面应用可以接收所有快捷键。",
  "Unable to open keybindings file": "无法打开快捷键文件",
  "The keybindings file was not opened.": "未能打开快捷键文件。",
  "Unable to save keybinding": "无法保存快捷键",
  "The keybinding was not saved.": "未能保存快捷键。",
  "Unable to remove keybinding": "无法移除快捷键",
  "The keybinding was not removed.": "未能移除快捷键。",
  "Add keybinding": "添加快捷键",
  "Open keybindings.json": "打开 keybindings.json",
  "Connect an environment to change keybindings.": "请连接一个环境以修改快捷键。",
  "This connection can view keybindings but cannot change them.":
    "此连接可查看快捷键，但无权修改。",
  "No keybindings match your search.": "没有匹配的快捷键。",
} as const;

// Only use this for application-owned labels; user content must remain unchanged.
export function translateSettingsContent(label: string, locale: Locale): string {
  return locale === "zh-CN" && Object.hasOwn(settingsContentMessages, label)
    ? settingsContentMessages[label as keyof typeof settingsContentMessages]
    : label;
}
