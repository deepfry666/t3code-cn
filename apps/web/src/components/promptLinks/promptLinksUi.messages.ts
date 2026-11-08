export const promptLinksUiMessages = {
  "This prompt had hidden characters, it may be malicious": "此提示词含有隐藏字符，可能是恶意内容",
  "T3 Code removed {count} hidden character. Read the prompt before you send it.":
    "T3 Code 已移除 {count} 个隐藏字符。发送前请先阅读提示词。",
  "T3 Code removed {count} hidden characters. Read the prompt before you send it.":
    "T3 Code 已移除 {count} 个隐藏字符。发送前请先阅读提示词。",
  "Prompt added from a link": "已从链接添加提示词",
  "Read it before you send.": "发送前请先阅读。",
  "Linked prompt ready": "链接中的提示词已就绪",
  "This thread already has a draft. Replace it with the linked prompt?":
    "此会话已有草稿。要用链接中的提示词替换它吗？",
  "Replace draft": "替换草稿",
  "Could not open the linked prompt": "无法打开链接中的提示词",
  "Prompt link copied": "已复制提示词链接",
  "Could not copy the prompt link": "无法复制提示词链接",
  "An error occurred.": "发生错误。",

  "Open this prompt": "打开此提示词",
  "It opens as a draft. Nothing runs until you press Send.":
    "它会以草稿形式打开。在你点击“发送”之前不会运行任何内容。",
  "Open this thread": "打开此会话",
  "It opens in T3 Code if you're connected to the machine it runs on.":
    "如果你已连接到运行它的机器，它会在 T3 Code 中打开。",
  "Opens one of your threads.": "打开你的一个会话。",
  "Pull request {pullRequest}": "拉取请求 {pullRequest}",
  "Repository {repository}": "仓库 {repository}",
  "No project": "无项目",
  "Model {model}": "模型 {model}",
  "Could not open the link": "无法打开链接",
  "Open in app": "在应用中打开",
  "Open in desktop app": "在桌面应用中打开",
  "Continue here": "在此继续",
  "Get T3 Code": "获取 T3 Code",
  "Remember my choice": "记住我的选择",

  "T3 Code could not open a new thread.": "T3 Code 无法打开新会话。",
  "The link asked for {provider}, which is not set up here, so your default model is used.":
    "链接要求使用 {provider}，但这里尚未设置，因此将使用你的默认模型。",
  "The link asked for {model}, which {provider} does not offer here, so its default model is used.":
    "链接要求使用 {model}，但 {provider} 在这里不提供该模型，因此将使用它的默认模型。",
  "None of your machines can start a thread without a project right now.":
    "你的机器目前都无法在没有项目的情况下启动会话。",
  "This machine cannot clone from a link. Update T3 Code on it, or clone the repository from the command palette.":
    "这台机器无法从链接克隆。请更新其上的 T3 Code，或从命令面板克隆仓库。",
  "Clone failed": "克隆失败",
  "The clone started, but its project did not appear.": "克隆已开始，但对应的项目没有出现。",
  "Cloning {repository}": "正在克隆 {repository}",
  "Open this link again when the clone finishes.": "克隆完成后，请再次打开此链接。",
  "Opening the link...": "正在打开链接…",
  "This link is open": "此链接已打开",
  "Open it again": "再次打开",
  "You don't have {repository}": "你还没有 {repository}",
  "Clone it to work on it here, or start without a project.":
    "克隆后即可在这里处理，或者不使用项目直接开始。",
  "Clone {repository}": "克隆 {repository}",
  "Use without project": "不使用项目",
  "Check out {pullRequest}?": "要检出 {pullRequest} 吗？",
  "This puts the pull request's code in a new worktree and runs your project's setup script on it.":
    "这会把该拉取请求的代码放到新的工作树中，并在其上运行你项目的设置脚本。",
  "Checking out...": "正在检出…",
  "Check out": "检出",
} as const;
