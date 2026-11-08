export const globalUiMessages = {
  // Confirm dialog
  "Confirm action": "确认操作",
  "This action requires your confirmation.": "此操作需要你的确认。",
  Cancel: "取消",
  "Terminal process running": "终端进程正在运行",
  Remote: "远程",
  Confirm: "确认",

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
  "Some requests are slow": "部分请求较慢",
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
  "It really helps T3 Code grow.": "这真的能帮助 T3 Code 成长。",
  Dismiss: "忽略",

  // Custom snooze dialog
  "Choose a valid date and time in the future.": "请选择将来的有效日期和时间。",
  "Enter a positive duration.": "请输入大于零的时长。",
  "Custom snooze": "自定义暂缓",
  "Choose when snoozed threads return to your inbox.": "选择暂缓的会话何时回到收件箱。",
  "Schedule type": "计划类型",
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
  machine: "设备",
  "Over 1 MB": "超过 1 MB",
  "Clone {name} and bring the local files git does not track.":
    "克隆 {name}，并带上 Git 未跟踪的本地文件。",
  "no files": "无文件",
  "+ {count} file": "+{count} 个文件",
  "+ {count} files": "+{count} 个文件",
  "{selected} of {total}": "{selected}/{total}",
  "Showing the first {count} files.": "仅显示前 {count} 个文件。",
  "Files are copied after the clone finishes. Folders git ignores whole, like node_modules, are left out.":
    "克隆完成后会复制这些文件。Git 整体忽略的文件夹（如 node_modules）不会被复制。",

  // Server updates
  "Downloading…": "正在下载…",
  "Restarting…": "正在重启…",
  "Switch tracks in About → Update track": "在“关于” → “更新渠道”中切换渠道",
  "Server update failed.": "服务器更新失败。",
  "Update all": "全部更新",
  Update: "更新",
  "Desktop app relaunched on {version}.": "桌面应用已在 {version} 上重启。",
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
