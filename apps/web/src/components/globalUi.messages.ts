export const globalUiMessages = {
  // Confirm dialog
  "Confirm action": "确认操作",
  "This action requires your confirmation.": "此操作需要你的确认。",
  Cancel: "取消",
  "Terminal process running": "终端进程正在运行",
  Remote: "远程",
  Confirm: "确认",

  // Thread notifications
  "Thread completed": "会话已完成",
  "Approval needed": "需要批准",
  "Usage limit reached": "已达到用量上限",
  "Thread failed": "会话失败",
  "Guest request": "访客请求",
  "Input needed": "需要输入",
  "Open thread": "打开会话",

  // Desktop update toast
  "Unable to open release notes": "无法打开发行说明",
  "Read more": "了解更多",
  "Update downloaded": "已下载更新",
  "Restart the app from the update button to install it.": "从更新按钮重启应用即可安装。",

  // Keybindings
  "Keybindings updated": "快捷键已更新",
  "Keybindings configuration reloaded successfully.": "快捷键配置已成功重新加载。",
  "Invalid keybindings configuration": "快捷键配置无效",
  "Unable to open keybindings file": "无法打开快捷键文件",
  "Unknown error opening file.": "打开文件时发生未知错误。",
  "Open keybindings.json": "打开 keybindings.json",

  // Slow requests
  "Some requests are slow": "部分请求响应较慢",
  "{count} request waiting longer than {seconds}s.": "{count} 个请求已等待超过 {seconds} 秒。",
  "{count} requests waiting longer than {seconds}s.": "{count} 个请求已等待超过 {seconds} 秒。",
  "Hide requests": "隐藏请求",
  "Show requests": "显示请求",
  "Started {time}": "开始于 {time}",

  // Project clone toasts
  "Cloning {name}": "正在克隆 {name}",
  "Cloned {name}": "已克隆 {name}",
  "Cancelled cloning {name}": "已取消克隆 {name}",
  "Failed to clone {name}": "克隆 {name} 失败",
  "The clone failed.": "克隆失败。",
  "Failed to cancel clone": "无法取消克隆",
  "Failed to retry clone": "无法重试克隆",
  "Open project": "打开项目",
  "Remove project": "移除项目",
  Retry: "重试",
  "An error occurred.": "发生错误。",
  "An unexpected error occurred.": "发生了意外错误。",

  // Reopen closed view
  "Could not reopen view": "无法重新打开视图",

  // Managed policy
  "This environment is managed by {organization}.": "此环境由{organization}管理。",
  "Get help": "获取帮助",

  // GitHub star prompt
  "Enjoying T3 Code?": "喜欢 T3 Code 吗？",
  "Give us a star on GitHub to let us know!": "在 GitHub 上给我们一颗星，让我们知道！",
  "Star on GitHub": "在 GitHub 上加星",
  "Starring…": "正在加星…",
  "Open GitHub": "打开 GitHub",
  "Thanks for the star!": "感谢你的加星！",
  "It really helps T3 Code grow.": "这对 T3 Code 的发展很有帮助。",
  Dismiss: "忽略",

  // Custom snooze dialog
  "Choose a valid date and time in the future.": "请选择将来的有效日期和时间。",
  "Enter a positive duration.": "请输入大于零的时长。",
  "Custom snooze": "自定义暂缓",
  "Choose when snoozed threads return to your inbox.": "选择暂缓的会话何时回到收件箱。",
  "Schedule type": "定时方式",
  "Date and time": "日期和时间",
  "Duration@@snooze-mode": "时长",
  Date: "日期",
  Time: "时间",
  "Choose snooze date": "选择暂缓日期",
  "Snooze for": "暂缓时长",
  "Decrease duration": "减少时长",
  "Increase duration": "增加时长",
  Unit: "单位",
  Minutes: "分钟",
  Hours: "小时",
  Days: "天",
  "Edit snooze options": "编辑暂缓选项",
  Snooze: "暂缓",

  // Add project to another machine
  "Choose a folder on the other machine.": "请选择另一台机器上的文件夹。",
  "Could not start the clone.": "无法开始克隆。",
  "Add to another machine": "添加到另一台机器",
  "This machine": "本机",
  "Machine to add the project to": "要添加项目的目标机器",
  "No machine available": "没有可用的机器",
  "Clone over": "克隆方式",
  "Clone protocol": "克隆协议",
  "Folder on {machine}": "{machine} 上的文件夹",
  "the other machine": "另一台机器",
  "Copy ignored files": "复制被忽略的文件",
  None: "无",
  All: "全部",
  "No ignored files to copy.": "没有被忽略的文件可复制。",
  "Finding ignored files…": "正在查找被忽略的文件…",
  "Starting…": "正在启动…",
  "Clone to {machine}": "克隆到 {machine}",
  machine: "机器",
  "Over 1 MB": "超过 1 MB",
  "Clone {name} and bring the local files git does not track.":
    "克隆 {name}，并带上 Git 未跟踪的本地文件。",
  "no files": "无文件",
  "+ {count} file": "+{count} 个文件",
  "+ {count} files": "+{count} 个文件",
  "{selected} of {total}": "已选 {selected} / 共 {total}",
  "Showing the first {count} files.": "仅显示前 {count} 个文件。",
  "Files are copied after the clone finishes. Folders git ignores whole, like node_modules, are left out.":
    "克隆完成后会复制这些文件。Git 整体忽略的文件夹（如 node_modules）不会被复制。",

  // Files, folders and editors
  "Open with": "打开方式",
  "Could not open file": "无法打开文件",
  "Could not open in {editor}": "无法在 {editor} 中打开",
  "Unsupported diff format. Showing raw patch.": "不支持的差异格式，正在显示原始补丁。",
  "Failed to parse patch. Showing raw patch.": "无法解析补丁，正在显示原始补丁。",
  "Recorded content before": "记录的内容（之前）",
  "Recorded content after": "记录的内容（之后）",
  "This commit is not in the thread's workspace": "此提交不在该会话的工作区中",
  "Open link": "打开链接",
  "Unable to open pull request link": "无法打开 pull request 链接",

  // Projects and machines
  "Could not create the {provider} repository": "无法创建 {provider} 仓库",
  "{message} Use Publish Repository in the Git menu to try again.":
    "{message} 请使用 Git 菜单中的“发布仓库”重试。",
  "Published to {provider}": "已发布到 {provider}",
  "Could not create the project": "无法创建项目",
  "Created {name}": "已创建 {name}",
  "Created {name} without a first commit": "已创建 {name}，但还没有首个提交",
  "{error} The project is in {path}.": "{error} 项目位于 {path}。",
  "Connect {environment} and try again.": "请先连接 {environment} 再重试。",
  "the selected environment": "所选环境",
  "This connection cannot change projects in {environment}.":
    "此连接无法更改 {environment} 中的项目。",
  "this environment": "此环境",
  "Could not start without a project": "无法在没有项目的情况下开始",
  "T3 Code could not open a new thread.": "T3 Code 无法打开新会话。",
  "This machine cannot start threads without a project.": "本机没有项目就无法启动会话。",
  "Read file to copy": "读取待复制的文件",
  "Too large to copy.": "文件太大，无法复制。",
  "Add project to machine": "将项目添加到机器",
  "Copy file to machine": "将文件复制到机器",
  "Could not copy {count} files to {machine}": "无法将 {count} 个文件复制到 {machine}",

  // Triage
  "Could not copy. Type {command} instead.": "无法复制。请改为输入 {command}。",
  "Could not start triage": "无法开始问题排查",
  "{message} Run {command} in a terminal on that machine instead.":
    "{message} 请改为在那台机器的终端中运行 {command}。",
  "Starting triage…": "正在开始问题排查…",

  // Drafts and announcements
  "Failed to restore draft": "无法恢复草稿",
  "Invalid keybinding.": "无效的快捷键。",
  "Sidebar shown": "侧边栏已显示",
  "Sidebar hidden": "侧边栏已隐藏",

  // Thread activity announcements
  "Needs approval": "待批准",
  "Needs your input": "需要你的输入",
  Done: "完成",
  Working: "运行中",
  Failed: "失败",
  Stopped: "已停止",
  "{label}: {title}": "{label}：{title}",

  // Composer context chips
  "Open {kind} {label}: {title}": "打开{kind}{label}：{title}",
  "Image attachment, {name}, {size}": "图片附件，{name}，{size}",
  "Unavailable context, {label}": "不可用的上下文：{label}",
  "Machine, {label}": "机器，{label}",
  "T3 Code environment": "T3 Code 环境",
  "Machine not in this app": "此应用中没有的机器",
  "Thread, {title}": "会话，{title}",
  "On another machine, so this machine's agent can't read it. Remove it or switch back to send.":
    "它在另一台机器上，本机的智能体读不到它。请移除它，或切回那台机器再发送。",

  // Permissions and app access
  "Permissions have changed for {label}": "{label} 的权限已变更",
  "This connection still uses the old permissions, so some actions may no longer be available. Pair again using a new link with the permissions you need.":
    "此连接仍在使用旧权限，部分操作可能已不可用。请使用包含所需权限的新链接重新配对。",
  "Open Sharing & access": "打开共享与访问",
  "Give {app} access to {owner}": "让 {app} 访问 {owner}",
  "It isn't installed there, so GitHub requests for {repository} use your own login and its lower rate limit.":
    "该处尚未安装此应用，因此对 {repository} 的 GitHub 请求会使用你自己的登录身份，受较低的速率限制。",
  "Failed to copy": "复制失败",

  // Thread migration and loading
  "Restoring your threads…": "正在恢复你的会话…",
  "Migrating {count} threads from the previous version. You can keep working while this finishes.":
    "正在从旧版本迁移 {count} 个会话，完成前你可以继续工作。",
  "Failed to load refs.": "无法加载引用。",
  "This connection cannot search host files.": "此连接无法搜索主机文件。",
  "The environment request failed.": "环境请求失败。",
  "Invalid terminal launch input": "无效的终端启动参数",
  "This environment could not report usage.": "此环境无法报告用量。",
  "This connection cannot change threads or projects.": "此连接无法更改会话或项目。",

  // Desktop bridges
  "The t3 command is unavailable.": "t3 命令不可用。",
  "Failed to load the t3 command state.": "无法加载 t3 命令状态。",
  "Desktop network access is unavailable.": "桌面网络访问不可用。",
  "Failed to load desktop server exposure state.": "无法加载桌面服务器开放状态。",
  "Failed to load advertised desktop endpoints.": "无法加载桌面应用公布的端点。",
  "Desktop SSH host discovery is unavailable.": "桌面 SSH 主机发现不可用。",
  "Failed to discover SSH hosts.": "无法发现 SSH 主机。",
  "Desktop WSL state is unavailable.": "桌面 WSL 状态不可用。",
  "Failed to load WSL state.": "无法加载 WSL 状态。",
  "Desktop secure storage is unavailable in this system context.":
    "此系统环境下无法使用桌面安全存储。",
  "This environment does not have a saved connection endpoint.": "此环境没有已保存的连接端点。",

  // Connecting environments
  "Could not prepare the SSH environment: {error}": "无法准备 SSH 环境：{error}",
  "The SSH environment did not issue a pairing credential.": "SSH 环境没有签发配对凭据。",
  "That host reaches {machine}, a different machine. Add it as its own environment instead.":
    "该主机连接的是 {machine}，属于另一台机器。请改为将其添加为独立的环境。",
  "Sign in to T3 Connect to connect this environment.": "请登录 T3 Connect 以连接此环境。",
  "The T3 Connect session is unavailable.": "T3 Connect 会话不可用。",
  "Could not load the desktop primary credential: {error}": "无法加载桌面主凭据：{error}",
  "SSH environments are only available in the desktop app.": "SSH 环境仅在桌面应用中可用。",
  "Could not disconnect the SSH environment: {error}": "无法断开 SSH 环境：{error}",
  "Desktop-local backend {id} is not ready yet.": "本机桌面后端 {id} 尚未就绪。",
  "The desktop app's primary local environment is not connected.": "桌面应用的主本地环境未连接。",
  "The command path is for {request}, but the desktop app's primary environment uses {target}. Cross-platform path mapping is not supported.":
    "该命令路径适用于 {request}，但桌面应用的主环境是 {target}。不支持跨平台路径映射。",
  "T3 Code could not add the project.": "T3 Code 无法添加该项目。",
  "T3 Code could not open a new thread for the project.": "T3 Code 无法为该项目打开新会话。",
  "This connection cannot open an editor on this environment.": "此连接无法在此环境中打开编辑器。",
  "Invalid pairing token. Check the token and try again.": "配对 token 无效。请检查后重试。",
  "Enter a pairing token to continue.": "请输入配对 token 以继续。",
  "The local environment is disabled.": "本地环境已禁用。",

  // Desktop-only and sign-in prompts
  "Preview is desktop-only": "预览仅在桌面应用中可用",
  "Open T3 Code in the desktop app to use the in-app preview.":
    "请在桌面应用中打开 T3 Code 以使用内置预览。",
  "ChatGPT sign-in couldn't finish": "ChatGPT 登录未能完成",
  "Return to the provider and try again.": "请回到提供方并重试。",
  "Plan preview unavailable.": "计划预览不可用。",
  "Context menu": "上下文菜单",
  "Version mismatch. Try syncing the client and server to the same T3 Code version.":
    "版本不一致。请让客户端和服务器使用相同的 T3 Code 版本。",
  "VS Code theme": "VS Code 主题",
  "Terminal input": "终端输入",
  "Terminal scrollback": "终端回滚缓冲",

  // Closing a browser the agent is using
  "Close browser while the agent is using it?": "关闭智能体正在使用的浏览器？",
  "The agent is actively controlling this browser. Closing it may interrupt the current browser action.":
    "智能体正在操作这个浏览器，关闭它可能会中断当前操作。",
  "Close {count} browsers while the agent is using them?":
    "关闭智能体正在使用的 {count} 个浏览器？",
  "The agent is actively controlling these browsers. Closing them may interrupt the current browser actions.":
    "智能体正在操作这些浏览器，关闭它们可能会中断当前操作。",

  // Quit hint overlay
  "Hold {shortcut} or press twice to quit": "按住 {shortcut} 或连按两次退出",
  "Press {shortcut} again to quit": "再按一次 {shortcut} 退出",

  // Server updates
  "Downloading…": "正在下载…",
  "Restarting…": "正在重启…",
  "Switch tracks in About → Update track": "在“关于 → 更新通道”中切换通道",
  "Server update failed.": "服务器更新失败。",
  "Update all": "全部更新",
  Update: "更新",
  "Desktop app relaunched on {version}.": "桌面应用已重新启动，版本为 {version}。",
  "Reconnected on t3@{version}.": "已重新连接到 t3@{version}。",
  "Update command copied": "已复制更新命令",
  "Relaunch command copied": "已复制重启命令",
  "Could not copy update command": "无法复制更新命令",
  "Copy update command": "复制更新命令",
  "Copy relaunch command": "复制重启命令",
  "Run `{command}` on {server}, then restart t3 with your usual options.":
    "在 {server} 上运行 `{command}`，然后按你常用的选项重启 t3。",
  "Stop t3 on {server}, then relaunch with `{command}` using the same subcommand and options. This does not update an installed t3 command.":
    "先停止 {server} 上的 t3，再用相同的子命令和选项通过 `{command}` 重新启动。这不会更新已安装的 t3 命令。",
  "Update the T3 Code desktop apps on {servers}? They will close and relaunch on those machines.":
    "要更新 {servers} 上的 T3 Code 桌面应用吗？它们会在那些机器上关闭并重新启动。",
  "Update the desktop app on that machine to update this server.":
    "请在那台机器上更新桌面应用以更新此服务器。",
  "{server} update failed": "{server} 更新失败",
  "{server} updated": "{server} 已更新",
  "Update the T3 Code desktop app that runs the {server}? It will close and relaunch on that machine.":
    "要更新运行 {server} 的 T3 Code 桌面应用吗？它会在那台机器上关闭并重新启动。",
} as const;
