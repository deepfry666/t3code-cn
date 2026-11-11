export const settingsDetailUiMessages = {
  Beta: "测试版",
  "Boring sidebar (group by project)": "简洁侧边栏（按项目分组）",
  "Two-line folder rows": "双行文件夹列表",
  "Tool calls in chat": "聊天中的工具调用",
  "Guest links": "访客链接",
  "Linked environments": "关联环境",
  "Simlock device hosts (alpha)": "Simlock 设备主机（早期测试）",
  "Simlock device hosts": "Simlock 设备主机",
  "Suggest next prompt": "建议下一条提示词",
  "Show a predicted next message in the empty composer after a Claude or Codex turn. Tab uses it. Each is an extra cached request on your plan. Needs Codex 0.165+. Claude threads update on restart.":
    "Claude 或 Codex 完成一轮回复后，在空输入框中预测下一条消息。按 Tab 使用它。每次预测都会在你的套餐上产生一次额外的缓存请求。需要 Codex 0.165+。Claude 会话在重启后更新。",
  "Fast worktree checkout": "快速创建工作树",
  "On a Mac, clone new worktrees from a checkout cached in the T3 home folder instead of writing every file. Uses Git’s normal checkout when it can’t. Turning it off deletes the cache.":
    "在 Mac 上，从缓存在 T3 主目录中的工作副本克隆新的工作树，无需逐个写入每个文件。无法使用时改为 Git 的常规检出。关闭后会删除缓存。",
  "tool calls in chat": "聊天中的工具调用",
  "Show all": "全部显示",
  "Hide successful": "隐藏成功的调用",
  "Hide all": "全部隐藏",
  Zen: "专注模式",
  "Sign in": "登录",
  "Sharing & access": "共享与访问",
  Connections: "连接",
  Devices: "设备",
  "Group sidebar threads into project folders. Pinned threads stay on top, and Snoozed and Settled stay below the folders.":
    "将侧边栏会话按项目文件夹分组。置顶会话保留在顶部，已暂缓和已收尾会话显示在文件夹下方。",
  "Show folder threads on two lines: the title, then the branch, pull request, and agent.":
    "分两行显示文件夹内的会话：第一行显示标题，第二行显示分支、pull request 和智能体。",
  "Hide the commands, edits, and searches agents run. Hide successful keeps failures. Zen shows only final answers. Approvals, questions, and errors always show.":
    "隐藏智能体执行的命令、编辑和搜索。“隐藏成功的调用”仍保留失败项；“专注模式”仅显示最终回答。审批、提问和错误始终显示。",
  "Share a thread with a guest who watches it live in a browser and sends messages you approve. Sign in to T3 Connect to use guest links.":
    "与访客共享会话，访客可在浏览器中实时查看，并发送需要你批准的消息。登录 T3 Connect 后即可使用访客链接。",
  "Share a thread with a guest who watches it live in a browser and sends messages you approve. Needs T3 Connect: sign in and link this machine in ":
    "与访客共享会话，访客可在浏览器中实时查看，并发送需要你批准的消息。需要 T3 Connect：请登录，并在以下页面关联此机器：",
  ". Turning it off stops every guest link.": "。关闭后，所有访客链接都将停止工作。",
  "Let agents here work on your other machines, and theirs here. Turn it on for each machine, then link them in ":
    "允许此机器上的智能体在你的其他机器上工作，也允许其他机器上的智能体在此工作。请在各机器上启用此功能，然后在以下页面关联机器：",
  ". While off, nothing new starts over a link; running tasks finish.":
    "。关闭后，不会通过关联启动新任务；正在运行的任务会继续完成。",
  "Let the Device panel lease simulators and emulators from your own ":
    "允许“设备”面板从你自己的以下模拟器池租用模拟器：",
  "pool, added in ": "，在以下页面添加该池：",
  ". An alpha that may change or break. T3 Code never installs Simlock.":
    "。此功能处于早期测试阶段，可能变更或失效。T3 Code 不会安装 Simlock。",
  Unarchive: "取消归档",
  Delete: "删除",
  "Failed to unarchive thread": "取消归档会话失败",
  "Failed to delete thread": "删除会话失败",
  "An error occurred.": "发生错误。",
  "Loading archived threads": "正在加载已归档会话",
  "Could not load archived threads": "无法加载已归档会话",
  "No archived threads": "没有已归档会话",
  "Checking connected environments.": "正在检查已连接的环境。",
  "Archived threads will appear here.": "已归档会话将显示在这里。",
  "Archived thread action failed": "已归档会话操作失败",
  Archive: "归档",
  "Archived {archivedAt} · Created {createdAt}": "归档于 {archivedAt} · 创建于 {createdAt}",
  "What a screen reader hears from the open thread: a turn starting, needing you, and ending. Status and messages adds what the agent writes before its last message. Everything adds each step.":
    "屏幕阅读器会从当前会话中播报：一轮开始、需要你处理以及结束。“状态和消息”还会播报智能体在最后一条消息之前写下的内容。“全部”会播报每一步。",
  "screen reader announcements": "屏幕阅读器播报",
  "Screen reader announcements": "屏幕阅读器播报",
  "Status only": "仅状态",
  "Status and messages": "状态和消息",
  Everything: "全部",
} as const;
