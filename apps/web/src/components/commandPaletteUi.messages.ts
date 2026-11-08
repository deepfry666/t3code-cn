import { translate, type Locale } from "../i18n/locale";

export const commandPaletteUiMessages = {
  // Groups, placeholders and empty states
  Suggestions: "建议",
  Threads: "会话",
  Projects: "项目",
  Settings: "设置",
  "In messages": "消息内容",
  Directories: "目录",
  Actions: "操作",
  "Recent Threads": "最近会话",
  "Search commands, projects, and threads...": "搜索命令、项目和会话…",
  "Project name": "项目名称",
  "Enter project path (e.g. ~/projects/my-app)": "输入项目路径（例如 ~/projects/my-app）",
  "Search...": "搜索…",
  "Enter path (e.g. ~/projects/my-app)": "输入项目路径（例如 ~/projects/my-app）",
  "Enter Git clone URL": "输入 Git 克隆 URL",
  "No matching actions.": "没有匹配的操作。",
  "No matching commands, projects, or threads.": "没有匹配的命令、项目或会话。",
  "Loading folders...": "正在加载文件夹…",
  "Command palette": "命令面板",
  "File picker": "文件选择器",
  Back: "返回",
  Close: "关闭",
  Navigate: "移动",
  "Search project contents": "搜索项目内容",
  "Search project contents…": "搜索项目内容…",
  "Search file contents in {project}": "在 {project} 中搜索文件内容",
  "Open a project to search its files.": "打开一个项目以搜索其中的文件。",
  "Search in {project}": "在 {project} 中搜索",
  "Searching…": "正在搜索…",
  "{matches} results in {files} files": "{files} 个文件中有 {matches} 处结果",
  "Open file": "打开文件",
  "Match case": "区分大小写",
  "Match whole word": "全词匹配",
  "Use regular expression": "使用正则表达式",
  "Invalid regular expression": "正则表达式无效",
  "Checking file access…": "正在检查文件访问权限…",
  "No results found.": "未找到结果。",
  "Type to search across your project.": "输入内容以在项目中搜索。",

  // Item titles
  "Untitled thread": "未命名会话",
  "Linked thread": "已关联的会话",
  "Archived thread": "已归档的会话",
  "Current thread": "当前会话",
  Remote: "远程",
  Sources: "来源",
  "Setup Required": "需要设置",
  "Open Settings -> Source control to configure this provider.":
    "打开 设置 -> 源代码管理 以配置此提供方。",
  Create: "创建",
  Toggle: "开关",
  Select: "选择",
  Continue: "继续",
  "Open in {app}": "在 {app} 中打开",
  "Searching messages…": "正在搜索消息…",
  "No project": "无项目",
  "Local folder": "本地文件夹",
  "Browse a folder on disk": "浏览磁盘上的文件夹",
  "New project": "新建项目",
  "Start a new Git repository from a name": "按名称新建 Git 仓库",
  "Environment unavailable": "环境不可用",
  Environments: "环境",
  "Connect an environment": "连接环境",
  "No connected environment can add a project": "没有可添加项目的已连接环境",
  "New thread in...": "在以下位置新建会话…",
  "New thread without a project": "不关联项目新建会话",
  "Triage an issue": "排查问题",
  "An agent investigates a T3 Code problem and helps file an issue":
    "由智能体排查 T3 Code 的问题并协助提交工单",
  "Find in current thread": "在当前会话中查找",
  "Copy prompt link": "复制提示词链接",
  "Copy prompt link with repo and model": "复制包含仓库与模型的提示链接",
  "Link pull request to thread": "为会话关联拉取请求",
  "Show linked pull requests": "显示已关联的拉取请求",
  "Share with guest": "与访客共享",
  "Restart agent session": "重启智能体会话",
  "Agent session will restart": "智能体会话将重启",
  "Your next message starts a fresh session.": "你的下一条消息将以全新上下文开始。",
  "Go to file": "转到文件",
  "Add project": "添加项目",
  "Open WSL folder": "打开 WSL 文件夹",
  "Open pull requests": "打开拉取请求",
  "Open usage": "打开用量",
  "Open settings": "打开设置",
  "Project settings": "项目设置",
  "Add existing project": "添加现有项目",
  "Open a folder or clone a repository": "打开文件夹或克隆仓库",
  Options: "选项",
  Repository: "仓库",
  "Host for the new repository": "新仓库的主机",
  "Select where to clone": "选择克隆位置",
  "New thread in {project}": "在 {project} 中新建会话",
  "{prefix}: {name}": "{prefix}：{name}",

  // Theme and appearance
  "Change theme": "切换主题",
  "Change appearance": "切换外观",
  "Toggle theme editor": "开关主题编辑器",
  Current: "当前",
  System: "跟随系统",
  Light: "浅色",
  Dark: "深色",
  "For {mode} mode": "用于{mode}模式",
  "For light mode": "用于浅色模式",
  "For dark mode": "用于深色模式",
  "Couldn't save theme selection": "无法保存主题选择",
  "Try again.": "请重试。",

  // Errors
  "Failed to add project": "添加项目失败",
  "Windows-style paths are only supported on Windows.": "仅 Windows 支持 Windows 风格路径。",
  "Relative paths require an active project.": "相对路径需要先有活动项目。",
  "Failed to open project": "打开项目失败",
  "Cannot add project": "无法添加项目",
  "This connection cannot add projects.": "此连接无法添加项目。",
  "Repository name incomplete": "仓库名称不完整",
  "Repository lookup failed": "仓库查询失败",
  "Clone unavailable": "无法克隆",
  "This connection needs permission to write source control and add projects.":
    "此连接需要写入源代码管理和添加项目的权限。",
  "Clone failed": "克隆失败",
  "Thread search is unavailable on this server.": "此服务器不支持会话搜索。",
  "Update the server to enable it.": "更新服务器即可启用。",
  "Unable to run command": "无法运行命令",
  "An unexpected error occurred.": "发生了意外错误。",
  "An error occurred.": "发生错误。",
  "Could not add WSL project": "无法添加 WSL 项目",
  "Start the matching WSL backend, then choose the folder again.":
    "请先启动对应的 WSL 后端，然后重新选择文件夹。",
  "Open source control settings": "打开源代码管理设置",
  "Open Settings -> Source control": "打开 设置 -> 源代码管理",
} as const;

const NESTED = /^(.+?)(: |：)(.+)$/;
const SETTINGS_CRUMB = /^Settings · (.+)$/;
const NEW_THREAD_IN = /^(New thread in)(?:\.\.\.|…)?$/;
const NEW_THREAD_NAMED = /^New thread in (.+)$/;

/**
 * Translates a palette label, including the nested "Parent: child" rows the palette
 * composes, and leaves user data such as project and thread names as written.
 */
export function translateCommandPaletteLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  const tr = (key: keyof typeof commandPaletteUiMessages, params?: Record<string, string>) =>
    translate(locale, commandPaletteUiMessages, key, params);

  if (Object.hasOwn(commandPaletteUiMessages, label))
    return commandPaletteUiMessages[label as keyof typeof commandPaletteUiMessages];

  const settingsCrumb = SETTINGS_CRUMB.exec(label);
  if (settingsCrumb)
    return `${tr("Settings")} · ${translateCommandPaletteLabel(settingsCrumb[1]!, locale)}`;

  if (NEW_THREAD_IN.test(label)) return tr("New thread in...");

  const namedThread = NEW_THREAD_NAMED.exec(label);
  if (namedThread) return tr("New thread in {project}", { project: namedThread[1]! });

  const nested = NESTED.exec(label);
  if (nested) {
    const parent = translateCommandPaletteLabel(nested[1]!, locale);
    return parent === nested[1]
      ? label
      : tr("{prefix}: {name}", { prefix: parent, name: nested[3]! });
  }
  return label;
}
