import { translate, type Locale } from "~/i18n/locale";

export const settingsCodeMessages = {
  "No actions configured.": "尚未配置操作。",
  "setup@@projectAction": "初始化",
  "on settle": "收尾时",
  "preview · desktop only": "预览 · 仅限桌面端",
  "Edit {name}": "编辑 {name}",
  "Show all environments": "显示所有环境",
  "Choose a project to manage its name, icon, checkouts and actions.":
    "选择一个项目，管理其名称、图标、工作副本和操作。",
  System: "跟随系统",
  Light: "浅色",
  Dark: "深色",
  "Fill panel": "填满面板",
  Responsive: "响应式",
  "Tab size for you and agents. Fill fits the panel; other sizes show the device toolbar.":
    "你和智能体使用的标签页尺寸。“填满面板”会适应面板大小；其他尺寸会显示设备工具栏。",
  "default browser viewport": "默认浏览器视口",
  "Default browser viewport": "默认浏览器视口",
  Standard: "标准",
  "Default viewport width": "默认视口宽度",
  "Default viewport height": "默认视口高度",
  "Rotate@@viewport": "旋转",
  "Page zoom applied to new browser tabs.": "新浏览器标签页的页面缩放比例。",
  "default browser zoom": "默认浏览器缩放",
  "Default browser zoom": "默认浏览器缩放",
  "The color scheme pages are told to prefer. System follows your OS setting.":
    "网页优先使用的配色方案。“跟随系统”使用操作系统的设置。",
  "default browser appearance": "默认浏览器外观",
  "Default browser appearance": "默认浏览器外观",
  "Show pressed keys and shortcuts in new recordings. Password fields are excluded.":
    "在新录制的视频中显示按键和快捷键，密码输入框除外。",
  "Show key presses in recordings": "在录屏中显示按键",
  "Highlight mouse presses and held buttons in new recordings.":
    "在新录制的视频中高亮显示鼠标点击和长按。",
  "Show mouse presses in recordings": "在录屏中显示鼠标点击",
  "Maximum recording rate. 30 fps saves CPU and storage; 60 fps is smoother.":
    "最高录制帧率。30 fps 节省 CPU 和存储空间；60 fps 更流畅。",
  "browser recording frame rate": "浏览器录屏帧率",
  "Browser recording frame rate": "浏览器录屏帧率",
  "Your default browser": "你的默认浏览器",
  "Where links in the chat and terminal open. Hold ⌘ or Ctrl while clicking a link to open it in your default browser either way.":
    "聊天和终端中的链接打开位置。按住 ⌘ 或 Ctrl 点击链接，始终使用默认浏览器打开。",
  "link target": "链接打开位置",
  "Open links in": "链接打开方式",
  Custom: "自定义…",
  "What the address bar searches when you type something that isn't a URL.":
    "地址栏输入的内容不是 URL 时，使用的搜索引擎。",
  "search engine": "搜索引擎",
  "Search engine": "搜索引擎",
  "Custom search URL": "自定义搜索 URL",
  "Use %s where the search terms go.": "用 %s 代表搜索词。",
  "Enter an http or https URL containing %s. Searches use DuckDuckGo until then.":
    "请输入包含 %s 的 http 或 https URL。在此之前，搜索将使用 DuckDuckGo。",
  "Clicking a pull request link opens it in T3 Code. Turn off to open pull request links like any other link, on your git host.":
    "点击 pull request 链接时在 T3 Code 中打开。关闭后会像其他链接一样，在 Git 托管平台上打开。",
  "open pull requests in T3 Code": "在 T3 Code 中打开 PR",
  "Open pull requests in T3 Code": "在 T3 Code 中打开 PR",
  Devices: "设备",
  "Environment disconnected": "环境已断开",
  "This connection cannot change device settings.": "此连接无法更改设备设置。",
  "Device settings not saved on all environments": "部分环境未保存设备设置",
  "Updating…": "正在更新…",
  Update: "更新",
  "Checking…": "正在检查…",
  "Check versions": "检查版本",
  "Open simulators and emulators in the Device panel. Hub:": "在设备面板中打开模拟器。Hub：",
  "Device hub": "设备中心",
  "New agent sessions can open and drive these devices. agent-device:":
    "新的智能体会话可以打开并操作这些设备。agent-device：",
  "Agent device access": "智能体设备访问",
  "Allow agents in this project to use the shared browser. Applies when the agent session next starts.":
    "允许此项目中的智能体使用共享浏览器。下次启动智能体会话时生效。",
  "Allow agents to use the shared browser. Projects can override it.":
    "允许智能体使用共享浏览器。项目可以覆盖此设置。",
  "default browser access": "默认浏览器访问权限",
  "Agent browser access": "智能体浏览器访问",
  "Show the floating preview when an agent opens a browser or device unless the agent says otherwise.":
    "智能体打开浏览器或设备时显示浮动预览，除非智能体另有要求。",
  "auto-show floating preview": "自动显示浮动预览",
  "Auto-show floating preview": "自动显示浮动预览",
  "You're not connected to a server yet.": "你还没有连接到服务器。",
  "Connect to an environment before removing this profile.":
    "请先连接一个环境，再移除此浏览器配置。",
  "Profile data could not be deleted. Try again.": "无法删除浏览器配置数据，请重试。",
  "Profiles separate cookies and logins. Incognito data is cleared when the app closes.":
    "浏览器配置分别保存 Cookie 和登录状态。应用关闭时会清除无痕浏览数据。",
  "Add profile": "添加浏览器配置",
  "Blank profile": "空白浏览器配置",
  "You've reached the profile limit": "浏览器配置数量已达上限",
  "Import from": "导入来源",
  "Looking for browsers…": "正在查找浏览器…",
  "No supported browsers found": "未找到支持的浏览器",
  "Connect to an environment to import cookies": "连接一个环境以导入 Cookie",
  Default: "默认",
  "Set as default": "设为默认",
  "Clear cookies and cache": "清除 Cookie 和缓存",
  "Remove profile and data": "移除浏览器配置和数据",
  "Connect to an environment to clear profile data": "连接一个环境以清除浏览器配置数据",
  "Checking environments…": "正在检查环境…",
  "Its cookies and logins are deleted. Desktop tabs already open in this profile stay open until you close them; server browser tabs close now.":
    "将删除此浏览器配置的 Cookie 和登录状态。已打开的桌面标签页会保留，直到你将其关闭；服务器上的浏览器标签页会立即关闭。",
  "Connect to an environment to remove this profile and its data.":
    "连接一个环境以移除此浏览器配置及其数据。",
  Cancel: "取消",
  "Removing…": "正在移除…",
  "Remove profile": "移除浏览器配置",
  "You are signed out of its sites. Server browser tabs open in this profile close now.":
    "你将退出此浏览器配置中各网站的登录。服务器上使用此配置的浏览器标签页会立即关闭。",
  "Clear data": "清除数据",
  "Could not open System Settings": "无法打开系统设置",
  "Open Privacy & Security → Full Disk Access manually.":
    "请手动打开“隐私与安全性”→“完全磁盘访问权限”。",
  "Only available in the desktop app.": "仅桌面应用可用。",
  "Agent access": "智能体访问权限",
  Browsing: "浏览",
  Recordings: "录制",
  "Repository conventions": "仓库规范",
  "Conventional Commits": "约定式提交",
  "In each project, matches recent change descriptions and change request titles.":
    "在每个项目中，沿用近期变更说明和 change request 标题的风格。",
  "Use Conventional Commit prefixes and keep change request text concise.":
    "使用约定式提交前缀，保持 change request 文案简洁。",
  "Custom instructions": "自定义指令",
  "Use your instructions for change descriptions and change requests in every project.":
    "所有项目的变更说明和 change request 都使用你的指令。",
  "Writing & review": "文案与审查",
  "source control writing style": "版本控制文案风格",
  "Source control writing style": "版本控制文案风格",
  Mixed: "各不相同",
  "Custom source control instructions for all selected environments":
    "所有所选环境共用的自定义版本控制指令",
  "Write the instructions each selected environment should use.": "输入每个所选环境应使用的指令。",
  "Apply instructions to all": "将指令应用到全部环境",
  "Write custom instructions for all": "为全部环境编写自定义指令",
  "Keep titles concise. Use short bullet points in descriptions.":
    "标题保持简洁，说明使用简短的列表。",
  "Custom source control writing instructions": "自定义版本控制文案指令",
  "Add a Guide tab to pull requests. An agent explains the changes and points out decisions that need review.":
    "为 pull request 添加“导览”标签页。智能体会解释改动，并指出需要审查的决策。",
  "Review guides": "审查导览",
  "Model that reads a pull request to write its review guide. It reads the change itself over many steps, so a stronger model helps. Off uses the source control writer model.":
    "阅读 pull request 并编写审查导览的模型。它会分多步阅读改动，能力更强的模型效果更好。关闭时使用版本控制文案模型。",
  "Connect an environment to choose its review guide model.": "连接一个环境以选择其审查导览模型。",
  "Review guide model": "审查导览模型",
  "Review guide model not saved": "未保存审查导览模型",
  "Use a separate review guide model": "使用单独的审查导览模型",
  "Your preferences for review guides: what to show first, dwell on, or skip. The guide's format and coverage stay the same.":
    "你的审查导览偏好：先展示什么、重点解释什么、跳过什么。导览的格式和覆盖范围保持不变。",
  "review guide instructions": "审查导览说明",
  "Review guide instructions": "审查导览说明",
  "Mixed. Enter instructions to apply to all selected targets.":
    "各不相同。输入指令后将应用到所有所选目标。",
  "Show service interfaces before implementations. Skip test files unless they change behavior. Keep summaries to two sentences.":
    "先展示服务接口，再展示实现。跳过不影响行为的测试文件。摘要不超过两句话。",
  "Use the repository's template for change request descriptions when available.":
    "有仓库模板时，使用模板编写 change request 说明。",
  "change request templates": "change request 模板",
  "Follow change request templates": "遵循 change request 模板",
  "Model for source control text and branch or bookmark names. When disabled, use the text generation model configured for this environment.":
    "生成版本控制文案、分支或书签名称的模型。关闭时使用此环境配置的文本生成模型。",
  "Connect an environment to choose its source control writer model.":
    "连接一个环境以选择其版本控制文案模型。",
  "No text generation providers available.": "没有可用的文本生成提供方。",
  "Source control writer model": "版本控制文案模型",
  "Source control writer model not saved": "未保存版本控制文案模型",
  "Use a separate source control writer model": "使用单独的版本控制文案模型",
  "Commit messages and pull request titles and descriptions match each project's history.":
    "提交信息以及 pull request 的标题和说明沿用各项目的历史风格。",
  "Conventional Commit prefixes, with short pull request titles and descriptions.":
    "使用约定式提交前缀，pull request 标题和说明保持简短。",
  "Your instructions shape commit messages and pull request titles and descriptions.":
    "按你的指令编写提交信息以及 pull request 的标题和说明。",
  "Commits & pull requests": "提交与 PR",
  "commit and pull request writing": "提交与 PR 文案",
  "Commit and pull request writing": "提交与 PR 文案",
  "Custom commit and pull request instructions for all selected environments":
    "所有所选环境共用的自定义提交与 pull request 指令",
  "Keep commit subjects under 60 characters. Keep pull request descriptions short and plain.":
    "提交标题不超过 60 个字符，pull request 说明保持简短直白。",
  "Custom commit and pull request instructions": "自定义提交与 pull request 指令",
  "Must be a coding agent: it reads the pull request over many steps. Off uses the writer model, or Codex or Claude if that model is a text generator.":
    "必须是编程智能体：它会分多步阅读 pull request。关闭时使用文案模型；若文案模型是文本生成器，则改用 Codex 或 Claude。",
  "Use the repository's pull request template when it has one.":
    "仓库有 pull request 模板时使用该模板。",
  "pull request templates": "PR 模板",
  "Follow pull request templates": "遵循 PR 模板",
  "Model for commit messages, pull request text, and branch or bookmark names. When disabled, use the text generation model configured for this environment.":
    "生成提交信息、pull request 文案以及分支或书签名称的模型。关闭时使用此环境配置的文本生成模型。",
  Authenticated: "已认证",
  "Not authenticated": "未认证",
  "Status unknown": "状态未知",
  "Toggle source control account visibility": "显示或隐藏版本控制账户",
  "Click to reveal account": "点击显示账户",
  "Click to hide account": "点击隐藏账户",
  Available: "可用",
  "Coming Soon": "即将推出",
  "Server environment": "服务器环境",
  "Could not scan the server environment": "无法扫描服务器环境",
  "Nothing detected yet": "尚未检测到任何内容",
  "Install Git on the server, add optional hosting integrations or credentials your workspace needs, then rescan.":
    "在服务器上安装 Git，添加工作区所需的可选托管集成或凭据，然后重新扫描。",
  Scan: "扫描",
  "Or use your own credentials": "或使用你自己的凭据",
  "Rescan server environment": "重新扫描服务器环境",
  "Rescan Git and hosting integrations": "重新扫描 Git 和托管集成",
  "Connect an environment to inspect its version control tools and hosting integrations.":
    "连接一个环境以查看其版本控制工具和托管集成。",
  "Source control providers": "版本控制提供方",
  "Static prefix": "固定前缀",
  "Semantic prefix": "语义前缀",
  "Choose how new worktree branches are named from your first message.":
    "选择如何根据你的第一条消息为新工作树分支命名。",
  "The model chooses a prefix that describes the work, such as feat/add-search, fix/login-timeout, or refactor/auth.":
    "模型会选择描述任务的前缀，例如 feat/add-search、fix/login-timeout 或 refactor/auth。",
  "branch naming": "分支命名",
  "Worktree branch naming": "工作树分支命名",
  "Branch prefix": "分支前缀",
  "For example, t3 or t3/ produces t3/add-search. Leave empty for no prefix.":
    "例如，t3 或 t3/ 会生成 t3/add-search。留空则不添加前缀。",
  "branch prefix": "分支前缀",
  "No prefix": "无前缀",
  "Branch naming instructions": "分支命名指令",
  "Appended to the naming prompt. The model returns the complete branch name; no prefix or suffix is added.":
    "追加到命名提示词中。模型返回完整的分支名，不再添加前缀或后缀。",
  "branch naming instructions": "分支命名指令",
  "Use julius/ followed by the issue ID and a short description.":
    "使用 julius/，后接 issue ID 和简短说明。",
  "sign-in code": "登录验证码",
  "Signed in as": "已登录账户",
  "Signed-in GitHub account": "已登录的 GitHub 账户",
  "Show account": "显示账户",
  "Hide account": "隐藏账户",
  "Signed in, but the token saved below is used while it can be read.":
    "已登录，但只要下方保存的 token 可读取，就会优先使用该 token。",
  "Signed in": "已登录",
  "Sign out": "退出登录",
  "Approve the app on GitHub to finish signing in.": "在 GitHub 上授权此应用以完成登录。",
  "A far higher GitHub API rate limit than a personal token or gh login.":
    "GitHub API 请求额度远高于个人 token 或 gh 登录。",
  "Try again": "重试",
  "Sign in with GitHub": "使用 GitHub 登录",
  "Copy code": "复制验证码",
  "Copy code & open GitHub": "复制验证码并打开 GitHub",
  "Reaches repositories in accounts and organizations that installed the app.":
    "可访问已安装此应用的账户和组织中的仓库。",
  "Install on an organization": "为组织安装",
  "Manage on GitHub": "在 GitHub 上管理",
  "Hidden account": "已隐藏的账户",
  Account: "账户",
  "Use active login": "使用当前登录账户",
  "Create a token": "创建 token",
  "Host@@code-hosting": "托管平台",
  Token: "token",
  Remove: "移除",
  Save: "保存",
  Off: "关闭",
  "Read PRs": "读取 PR",
  "Read and act": "读取并操作",
  "read and act": "读取并操作",
  "read PRs": "读取 PR",
  "Machines you trust here can read PR data through each other's source control access. Enable both machines. Read and act may use broader permissions than the machine that owns them. This applies only to this device.":
    "此处信任的机器可借助彼此的版本控制访问权限读取 PR 数据。需要在两台机器上都启用。“读取并操作”可能使用比权限所属机器更广的权限。此设置仅适用于当前设备。",
  "Could not save pull request routing permission": "无法保存 pull request 路由权限",
  "Uses the latest commit of the base branch’s tracked remote branch, even if its name differs. Otherwise uses the same-named branch on origin. Uses your local branch if that remote branch is missing.":
    "使用基准分支所跟踪的远程分支的最新提交，即使名称不同。未跟踪远程分支时，使用 origin 上的同名分支。远程分支不存在时，使用本地分支。",
  "new worktrees start from remote": "新工作树从远程分支开始",
  "Start new worktrees from remote by default": "默认从远程分支创建新工作树",
  Creation: "创建",
  Branches: "分支",
  "Could not save grouping rule": "无法保存分组规则",
  "An error occurred.": "发生错误。",
  "Use global default": "使用全局默认值",
  "Add a project from the sidebar to configure it here.": "从侧边栏添加项目后，即可在此配置。",
  "This project is no longer available.": "此项目已不可用。",
  "This checkout is no longer available in the selected project and environment.":
    "此工作副本在所选项目和环境中已不可用。",
  "Project title cannot be empty": "项目名称不能为空",
  "Failed to rename project": "无法重命名项目",
  "Failed to update project icon": "无法更新项目图标",
  "Failed to remove project": "无法移除项目",
  Checkouts: "工作副本",
  "Grouping rule decides how each checkout joins project groups in the sidebar. Changing it can move a checkout to a different project.":
    "分组规则决定每个工作副本如何加入侧边栏中的项目组。修改规则可能会将工作副本移到其他项目。",
  Environment: "环境",
  "Can't find a setting? Keep this project picked above and hop to any other settings page.":
    "找不到某项设置？在上方保持选中此项目，然后前往其他设置页面。",
  Project: "项目",
  "Shared settings require permission to change every checkout in this group.":
    "修改共享设置需要对本组中的每个工作副本都有修改权限。",
  "This connection cannot change this project.": "此连接无法更改此项目。",
  Name: "名称",
  "The shared name for this project group in the sidebar and thread lists.":
    "此项目组在侧边栏和会话列表中共用的名称。",
  "project name": "项目名称",
  "Project name": "项目名称",
  "Project icon": "项目图标",
  Automatic: "自动",
  "project icon": "项目图标",
  "Choose a project icon": "选择项目图标",
  "Choose icon": "选择图标",
  "Choose a project icon file": "选择项目图标文件",
  "Choose file": "选择文件",
  Pin: "置顶",
  "Pinned projects come first in project pickers.": "置顶项目会优先显示在项目选择器中。",
  "Failed to pin project": "无法置顶项目",
  "Failed to unpin project": "无法取消置顶项目",
  "Pin project": "置顶项目",
  Archive: "归档",
  "Hidden from project pickers. Threads and files are kept.":
    "已在项目选择器中隐藏。会话和文件会保留。",
  "Hides the project from project pickers. Threads and files are kept.":
    "在项目选择器中隐藏项目。会话和文件会保留。",
  "Failed to unarchive project": "无法取消归档项目",
  "Failed to archive project": "无法归档项目",
  Unarchive: "取消归档",
  Danger: "危险操作",
  "Remove checkout": "移除工作副本",
  "Remove this project everywhere": "从所有位置移除此项目",
  "Remove project": "移除项目",
  "Deletes the selected machine's checkout entries and their threads. Other machines and files on disk are not touched.":
    "删除所选机器上的工作副本条目及其会话。其他机器和磁盘上的文件不受影响。",
  "Deletes the project entry and its threads. Files on disk are not touched.":
    "删除项目条目及其会话。磁盘上的文件不受影响。",
  "Remove all entries": "移除所有条目",
  "Default model not saved": "未保存默认模型",
  Model: "模型",
  "Model for new threads in this project.": "此项目新会话使用的模型。",
  "Default model for new threads, selected automatically. Projects can override it.":
    "自动选择的新会话默认模型。项目可以覆盖此设置。",
  "Default model for new threads. Projects can override it.":
    "新会话的默认模型。项目可以覆盖此设置。",
  "default model": "默认模型",
  "Automatic (mixed)": "自动（各不相同）",
  "No providers available": "没有可用的提供方",
  Workspace: "工作区",
  "Where new threads in this project start.": "此项目新会话的起始工作区。",
  "Where new threads start. Projects and their t3.json can override it.":
    "新会话的起始工作区。项目及其 t3.json 可以覆盖此设置。",
  "default workspace": "默认工作区",
  "Default workspace": "默认工作区",
  Unavailable: "不可用",
  "Used for new threads when the default model's provider is out of usage.":
    "默认模型的提供方额度耗尽时，新会话使用此模型。",
  "fallback model": "备用模型",
  "Fallback model": "备用模型",
  None: "无",
  "Fallback model not saved": "未保存备用模型",
  Repositories: "仓库",
  "New threads": "新会话",
  "Permissions for new threads in this project.": "此项目新会话的权限。",
  "Default permissions for new threads. Projects can override them.":
    "新会话的默认权限。项目可以覆盖此设置。",
  "default permissions": "默认权限",
  "Default permissions": "默认权限",
  "Automatically pull": "自动拉取",
  "Keeps this project's default branch current when the checkout has no local changes or commits.":
    "工作副本没有本地改动或未推送的提交时，自动更新此项目的默认分支。",
  "Keeps the default branch current when the checkout has no local changes or commits. Projects can override it.":
    "工作副本没有本地改动或未推送的提交时，自动更新默认分支。项目可以覆盖此设置。",
  "default automatic pull": "默认自动拉取",
  "Reset automatic pull to off": "将自动拉取重置为关闭",
  "Default automatic pull": "默认自动拉取",
  "Remove recognized agent credit lines from merge and squash messages on hosts that support it, keeping human co-authors. Includes auto-merge. Excludes merge queues, stack merges, and existing commits.":
    "在支持的托管平台上，从合并和压缩提交说明中移除可识别的智能体署名，保留人类共同作者。包括自动合并，不包括合并队列、堆叠合并和已有提交。",
  "agent credit removal": "移除智能体署名",
  "Keep agent credits": "保留智能体署名",
  "Remove agent credits when merging": "合并时移除智能体署名",
  "Pull requests in this project start with this method.":
    "此项目的 pull request 默认使用此合并方式。",
  "Pull requests start with this method. Last selected reuses whatever you chose most recently on this device.":
    "Pull request 默认使用此合并方式。“上次选择”会沿用你在此设备上最近选择的方式。",
  "default merge method": "默认合并方式",
  "Reset to last selected": "重置为上次选择",
  "Default pull request merge method": "默认 PR 合并方式",
  "Last selected": "上次选择",
  "How new worktrees in this project populate git submodules.":
    "此项目的新工作树如何初始化 Git 子模块。",
  "How new worktrees populate git submodules. Projects and their t3.json can override it.":
    "新工作树如何初始化 Git 子模块。项目及其 t3.json 可以覆盖此设置。",
  "worktree submodules": "工作树子模块",
  "Worktree submodules": "工作树子模块",
  "Failed to import action.": "无法导入操作。",
  Actions: "操作",
  "Commands that run in this project's checkout or its worktree, with optional shortcuts.":
    "在此项目的工作副本或工作树中运行的命令，可设置快捷键。",
  "Import scripts": "导入脚本",
  "Import from t3.json": "从 t3.json 导入",
  "Add actions declared by this checkout without editing them first.":
    "直接添加此工作副本声明的操作，无需先编辑。",
  "Add action": "添加操作",
  "Different actions across environments": "各环境的操作不同",
  "Choose one environment to edit its list. Adding an action here adds it on every selected environment.":
    "选择一个环境以编辑其列表。在此添加操作会添加到所有所选环境。",
  "t3.json is invalid": "t3.json 无效",
  "A t3.json exists in this checkout but fails to parse, so every action and icon it declares is ignored. Check the JSON syntax and icon values.":
    "此工作副本的 t3.json 无法解析，其中声明的所有操作和图标都会忽略。请检查 JSON 语法和图标值。",
  "Choose project icon": "选择项目图标",
  "Choose an icon, emoji, or monogram.": "选择图标、表情或字母图标。",
  "Icon type": "图标类型",
  Icons: "图标",
  Emoji: "表情",
  Monogram: "字母图标",
  Color: "颜色",
  "Icon color": "图标颜色",
  "Search Lucide icons": "搜索 Lucide 图标",
  "Search all Lucide icons": "搜索所有 Lucide 图标",
  "No icons found.": "未找到图标。",
  Letters: "字母",
  "One or two letters or numbers.": "一个或两个字母或数字。",
  "Or paste any emoji": "或粘贴任意表情",
  "Custom emoji": "自定义表情",
  "Paste an emoji": "粘贴表情",
  "Save icon": "保存图标",
  "Searching project files…": "正在搜索项目文件…",
  "Indexing project files…": "正在索引项目文件…",
  "No matching image files.": "没有匹配的图片文件。",
  "No image files found.": "未找到图片文件。",
  Close: "关闭",
  "Select icon": "选择图标",
  "Could not open image picker": "无法打开图片选择器",
  "Search image files…": "搜索图片文件…",
  "That profile is no longer available. Choose where to import these cookies.":
    "此浏览器配置已不可用，请重新选择 Cookie 的导入位置。",
  "I’ve quit it": "我已退出",
  "no cookies": "没有 Cookie",
  "Could not open System Settings. Try Allow again.": "无法打开系统设置，请再次点击“允许”。",
  "Full Disk Access": "完全磁盘访问权限",
  "Access is still required. Quit and reopen T3 Code if you just allowed it, then retry the import.":
    "仍需要访问权限。如果你刚刚授权，请退出并重新打开 T3 Code，然后重试导入。",
  "If access doesn't update after you allow it, quit and reopen T3 Code, then retry the import.":
    "如果授权后权限状态未更新，请退出并重新打开 T3 Code，然后重试导入。",
  Continue: "继续",
  "You've reached the profile limit. Choose an existing profile to import into.":
    "浏览器配置数量已达上限，请选择已有配置作为导入目标。",
  From: "来源",
  Into: "目标",
  "New profile": "新浏览器配置",
  "Created for these cookies": "为这些 Cookie 创建",
  "Existing profile": "已有浏览器配置",
  Import: "导入",
  "Importing cookies": "正在导入 Cookie",
  "This may take a moment.": "可能需要一点时间。",
  "Importing…": "正在导入…",
  "Checking Full Disk Access.": "正在检查完全磁盘访问权限。",
  "Checking whether the browser has closed.": "正在检查浏览器是否已关闭。",
  "Checking access…": "正在检查访问权限…",
  "No cookies found": "未找到 Cookie",
  Skipped: "已跳过",
  Done: "完成",
  "Rotate to landscape": "旋转为横向",
  "Rotate to portrait": "旋转为纵向",
  "Could not update {environments}.": "无法更新 {environments}。",
  "Could not clear {name}'s data": "无法清除 {name} 的数据",
  "Cleared {name}'s cookies and cache": "已清除 {name} 的 Cookie 和缓存",
  "Rename {name}": "重命名 {name}",
  "{name} options": "{name} 的选项",
  "Remove “{name}”?": "移除“{name}”？",
  "Clear “{name}”’s cookies and cache?": "清除“{name}”的 Cookie 和缓存？",
  "Support for {label} is coming soon.": "即将支持 {label}。",
  "Not available on this server: {hint}": "此服务器上不可用：{hint}",
  as: "账户",
  "Available. {hint}": "可用。{hint}",
  "Every {label} host is turned off.": "所有 {label} 托管平台均已关闭。",
  "{label} is not authenticated on this server. Sign in or configure credentials using the {executable} tool on the server host to enable change request features.":
    "{label} 尚未在此服务器上认证。请在服务器上使用 {executable} 工具登录或配置凭据，以启用 change request 功能。",
  "Could not verify {label}. {detail}": "无法验证 {label}。{detail}",
  "Toggle {label} details": "展开或收起 {label} 详情",
  "{label} availability": "{label} 可用性",
  "Version Control{environmentSuffix}": "版本控制{environmentSuffix}",
  "Source control providers{environmentSuffix}": "版本控制提供方{environmentSuffix}",
  "sign out of {appName}": "退出 {appName} 登录",
  "Waiting for approval · code expires at {time}": "等待授权 · 验证码将在 {time} 过期",
  "save {label} account settings": "保存 {label} 账户设置",
  "Sign in with {command} on the server host, then rescan to choose accounts here.":
    "在服务器上使用 {command} 登录，然后重新扫描，即可在此选择账户。",
  "Choose which {cliName} login each {label} host uses, or turn a host off.":
    "选择每个 {label} 托管平台使用的 {cliName} 登录账户，或关闭某个托管平台。",
  "Hide {label} accounts": "隐藏 {label} 账户",
  "Reveal {label} accounts": "显示 {label} 账户",
  "Use {label} on {host}": "在 {host} 上使用 {label}",
  "{label} account for {host}": "{host} 的 {label} 账户",
  "Active {cliName} account": "当前 {cliName} 账户",
  "Account {index}": "账户 {index}",
  "The chosen login is no longer signed in, so the active {cliName} login is used.":
    "所选账户已退出登录，将使用当前 {cliName} 登录账户。",
  "can't be used: {error}": "无法使用：{error}",
  "{cliName} reports this login as invalid.": "{cliName} 报告此登录账户无效。",
  "{variable} is set on the server, so it overrides the account chosen here until it is unset.":
    "服务器已设置 {variable}，会覆盖此处选择的账户，直到取消设置。",
  "save {label} token": "保存 {label} token",
  "A token saved here is used before {tokenEnvVar} and the {cliName} login, so {label} works without the {cliLabel}. Give it {tokenAccess}.":
    "此处保存的 token 优先于 {tokenEnvVar} 和 {cliName} 登录账户，因此无需 {cliLabel} 也能使用 {label}。请授予此 token {tokenAccess}。",
  "{label} token": "{label} token",
  "No token saved; the server uses {tokenEnvVar} or the {cliName} login.":
    "尚未保存 token；服务器将使用 {tokenEnvVar} 或 {cliName} 登录账户。",
  "Saved for {hosts}.": "已为 {hosts} 保存。",
  "Automatic defaults differ. Select one environment or choose a shared model to edit effort.":
    "自动默认值各不相同。选择一个环境或共用模型后，即可调整思考强度。",
  "Defaults differ. Select one environment or choose a shared model to edit effort.":
    "默认值各不相同。选择一个环境或共用模型后，即可调整思考强度。",
  "Grouping rule for {path} on {environment}": "{environment} 上 {path} 的分组规则",
  "Default ({mode})": "默认（{mode}）",
  'Failed to remove "{title}"': "无法移除“{title}”",
  "Remove checkout {path}": "移除工作副本 {path}",
  "Deletes all {count} checkout entries and their threads on every machine. Files on disk are not touched.":
    "删除所有机器上的全部 {count} 个工作副本条目及其会话。磁盘上的文件不受影响。",
  "Open in {fileManager}": "在 {fileManager} 中打开",
  "{environment} pull request routing": "{environment} 的 PR 路由",
  "{environments} {permission}": "{environments} {permission}",
  "Quit {source} to import": "退出 {source} 以导入",
  "{source} is open, so its cookies can’t be read yet. Quit it, then continue.":
    "{source} 正在运行，暂时无法读取其 Cookie。退出后再继续。",
  "{count} cookie": "{count} 个 Cookie",
  "{count} cookies": "{count} 个 Cookie",
  "Let T3 Code read {source}’s cookies": "允许 T3 Code 读取 {source} 的 Cookie",
  "To import cookies from {source}, T3 Code needs Full Disk Access. Turn it on in System Settings, then come back to finish the import. You can revoke it again once the import is done.":
    "从 {source} 导入 Cookie 需要授予 T3 Code 完全磁盘访问权限。请在系统设置中开启，然后返回完成导入。导入完成后可以撤销此权限。",
  "Read {source}'s cookies for this import.": "读取 {source} 的 Cookie 以完成此次导入。",
  "Import from {source}": "从 {source} 导入",
  "Choose which cookies to import for {environment}.": "选择要为 {environment} 导入的 Cookie。",
  "Checking {source}": "正在检查 {source}",
  "Imported {count} cookie": "已导入 {count} 个 Cookie",
  "Imported {count} cookies": "已导入 {count} 个 Cookie",
  "Skipped {count} cookie": "已跳过 {count} 个 Cookie",
  "Skipped {count} cookies": "已跳过 {count} 个 Cookie",
  "Added to {target} for {environment}. {count} cookie skipped.":
    "已添加到 {environment} 的 {target}。已跳过 {count} 个 Cookie。",
  "Added to {target} for {environment}. {count} cookies skipped.":
    "已添加到 {environment} 的 {target}。已跳过 {count} 个 Cookie。",
  "Added to {target} for {environment}.": "已添加到 {environment} 的 {target}。",
  "No cookies were imported for {environment}.": "未为 {environment} 导入任何 Cookie。",
  "There were no cookies to import for {environment}.": "没有可为 {environment} 导入的 Cookie。",
  "Couldn’t import from {source}": "无法从 {source} 导入",
  "New worktree": "新工作树",
  "Current checkout": "当前工作副本",
  Recursive: "递归",
  "Top level only": "仅顶层",
  Skip: "跳过",
  Merge: "合并",
  "Squash and merge": "压缩并合并",
  "Rebase and merge": "变基并合并",
  Supervised: "需审批",
  "Auto-accept edits": "自动接受编辑",
  Auto: "自动",
  "Full access": "完全访问",
  "Ask before commands and file changes.": "执行命令和修改文件前询问。",
  "Auto-approve edits, ask before other actions.": "自动批准编辑，其他操作前询问。",
  "Supported providers approve routine actions; others still ask.":
    "支持此模式的提供方会自动批准常规操作，其他提供方仍会询问。",
  "Allow commands and edits without prompts.": "允许执行命令和编辑，无需确认。",
  "Group by repository": "按仓库分组",
  "Group by repository path": "按仓库路径分组",
  "Keep separate": "保持独立",
  Gray: "灰色",
  Red: "红色",
  Orange: "橙色",
  Amber: "琥珀色",
  Yellow: "黄色",
  Lime: "青柠色",
  Green: "绿色",
  Emerald: "翠绿色",
  Teal: "蓝绿色",
  Cyan: "青色",
  Sky: "天蓝色",
  Blue: "蓝色",
  Indigo: "靛蓝色",
  Violet: "紫罗兰色",
  Purple: "紫色",
  Fuchsia: "紫红色",
  Pink: "粉色",
  Rose: "玫红色",
  Computer: "电脑",
  Tools: "工具",
  Rocket: "火箭",
  Robot: "机器人",
  Sparkles: "闪光",
  Lightning: "闪电",
  Web: "网页",
  Mobile: "移动端",
  Desktop: "桌面端",
  Keyboard: "键盘",
  Gear: "齿轮",
  Database: "数据库",
  Cloud: "云",
  Package: "包裹",
  Books: "书籍",
  "Test tube": "试管",
  Lock: "锁",
  Game: "游戏",
  Music: "音乐",
  Movie: "电影",
  Picture: "图片",
  Shopping: "购物",
  Fire: "火焰",
  Idea: "想法",
  Puzzle: "拼图",
  Chart: "图表",
  Brain: "大脑",
  Unicorn: "独角兽",
  Octopus: "章鱼",
  Seedling: "幼苗",
  Incognito: "无痕浏览",
  "read and write access to pull requests and contents": "PR 和内容的读写权限",
  "Not installed on this machine.": "此机器尚未安装。",
  "Needs Keychain access to read its cookies.": "需要钥匙串访问权限才能读取 Cookie。",
  "No encryption key in your Keychain. Sign in to that browser once, then retry.":
    "钥匙串中没有加密密钥。请先在该浏览器中登录一次，再重试。",
  "Give T3 Code Full Disk Access in System Settings → Privacy & Security, then retry.":
    "请在“系统设置”→“隐私与安全性”中授予 T3 Code 完全磁盘访问权限，然后重试。",
  "Quit the browser first so its cookie database can be read.":
    "请先退出浏览器，才能读取其 Cookie 数据库。",
  "Importing from this browser isn't possible on this platform.": "此平台不支持从这个浏览器导入。",
  "The system keyring could not be accessed. Make sure your desktop keyring is running and unlocked, then retry.":
    "无法访问系统密钥环。请确认桌面密钥环正在运行且已解锁，然后重试。",
  "That browser is no longer available to import from.": "此浏览器已不可用，无法从中导入。",
  "That browser profile no longer exists.": "此浏览器配置已不存在。",
  "The target profile could not be opened.": "无法打开目标浏览器配置。",
  "The cookies were imported, but the new profile couldn't be saved. Try again.":
    "Cookie 已导入，但无法保存新的浏览器配置。请重试。",
  "You've reached the profile limit. Delete a profile or import into an existing one.":
    "浏览器配置数量已达上限。请删除一个配置，或导入到已有配置。",
  "The browser's cookie database could not be read.": "无法读取浏览器的 Cookie 数据库。",
  "Browser profile data is not available to clear.": "无法清除浏览器配置数据。",
  'Remove checkout "{title}" and delete its {count} thread?':
    "移除工作副本“{title}”并删除其中的 {count} 个会话？",
  'Remove checkout "{title}" and delete its {count} threads?':
    "移除工作副本“{title}”并删除其中的 {count} 个会话？",
  'Remove project "{title}" and delete its {count} thread?':
    "移除项目“{title}”并删除其中的 {count} 个会话？",
  'Remove project "{title}" and delete its {count} threads?':
    "移除项目“{title}”并删除其中的 {count} 个会话？",
  'Remove checkout "{title}"?': "移除工作副本“{title}”？",
  'Remove project "{title}"?': "移除项目“{title}”？",
  "Path: {path}": "路径：{path}",
  "Environment: {environment}": "环境：{environment}",
  "This removes {count} grouped project entries.": "将移除 {count} 个已分组的项目条目。",
  "Those threads and any archived threads are deleted from T3 Code. Provider sessions are kept.":
    "这些会话及所有已归档会话将从 T3 Code 中删除。提供方会话会保留。",
  "Any archived threads are deleted from T3 Code. Provider sessions are kept.":
    "所有已归档会话将从 T3 Code 中删除。提供方会话会保留。",
  "This removes only the project entries, not the files on disk.":
    "仅移除项目条目，磁盘上的文件会保留。",
  "Other entries in this grouped project are unaffected.": "此项目组中的其他条目不受影响。",
  "This action cannot be undone.": "此操作无法撤销。",
  "The managed policy at {path} importing browser cookies is not allowed.":
    "{path} 中的托管策略不允许导入浏览器 Cookie。",
  "{organization}'s policy does not allow importing browser cookies.":
    "{organization} 的策略不允许导入浏览器 Cookie。",
  "Install Git from https://git-scm.com/downloads or with your package manager.":
    "从 https://git-scm.com/downloads 或通过包管理器安装 Git。",
  "Install Jujutsu with `brew install jj` or from https://github.com/jj-vcs/jj.":
    "通过 `brew install jj` 或从 https://github.com/jj-vcs/jj 安装 Jujutsu。",
  "Add a Bitbucket token in Settings → Source Control.":
    "在“设置”→“版本控制”中添加 Bitbucket token。",
  "Install the GitHub command-line tool (`gh`) via https://cli.github.com/ or your package manager (for example `brew install gh`).":
    "通过 https://cli.github.com/ 或包管理器（如 `brew install gh`）安装 GitHub 命令行工具（`gh`）。",
  "Install the GitLab command-line tool (`glab`) from https://gitlab.com/gitlab-org/cli or your package manager (for example `brew install glab`).":
    "从 https://gitlab.com/gitlab-org/cli 或通过包管理器（如 `brew install glab`）安装 GitLab 命令行工具（`glab`）。",
  "Install `fj` 0.6 or later from https://codeberg.org/forgejo-contrib/forgejo-cli and run `fj --host <server-url> auth add-token`, or install `tea` 0.16 or later from https://gitea.com/gitea/tea and run `tea login add` for each Forgejo or Gitea server.":
    "从 https://codeberg.org/forgejo-contrib/forgejo-cli 安装 `fj` 0.6 或更新版本并运行 `fj --host <server-url> auth add-token`，或从 https://gitea.com/gitea/tea 安装 `tea` 0.16 或更新版本，并为每个 Forgejo 或 Gitea 服务器运行 `tea login add`。",
  "Install the Azure command-line tools (`az`), then enable Azure DevOps support with `az extension add --name azure-devops`.":
    "安装 Azure 命令行工具（`az`），然后通过 `az extension add --name azure-devops` 启用 Azure DevOps 支持。",
  "Install the GitCafe CLI with `bun install -g @gitcafe/cli`, then run `cafe auth login --host https://git.cafe/api`, save a token in Settings, or set CAFE_TOKEN on the server.":
    "通过 `bun install -g @gitcafe/cli` 安装 GitCafe CLI，然后运行 `cafe auth login --host https://git.cafe/api`、在设置中保存 token，或在服务器上设置 CAFE_TOKEN。",
  "{domains} and {count} more": "{domains}，以及其他 {count} 个域名",
  "{domains} and {lastDomain}": "{domains} 和 {lastDomain}",
  "{organization} limits threads to Supervised.": "{organization} 将会话权限限制为需审批。",
  "{organization} limits threads to Auto-accept edits.":
    "{organization} 将会话权限限制为自动接受编辑。",
  "{organization} limits threads to Auto.": "{organization} 将会话权限限制为自动。",
  "{organization} limits threads to Full access.": "{organization} 将会话权限限制为完全访问。",
  gray: "灰色",
  red: "红色",
  orange: "橙色",
  amber: "琥珀色",
  yellow: "黄色",
  lime: "青柠色",
  green: "绿色",
  emerald: "翠绿色",
  teal: "蓝绿色",
  cyan: "青色",
  sky: "天蓝色",
  blue: "蓝色",
  indigo: "靛蓝色",
  violet: "紫罗兰色",
  purple: "紫色",
  fuchsia: "紫红色",
  pink: "粉色",
  rose: "玫红色",
  "This device": "此设备",
  "This provider is not available on this environment.": "此环境上没有这个提供方。",
  "{provider} is turned off.": "{provider} 已关闭。",
  "{provider} is unavailable.": "{provider} 不可用。",
} as const;

const dynamicMessages = [
  "{organization} limits threads to Supervised.",
  "{organization} limits threads to Auto-accept edits.",
  "{organization} limits threads to Auto.",
  "{organization} limits threads to Full access.",

  'Remove checkout "{title}" and delete its {count} thread?',
  'Remove checkout "{title}" and delete its {count} threads?',
  'Remove project "{title}" and delete its {count} thread?',
  'Remove project "{title}" and delete its {count} threads?',
  'Remove checkout "{title}"?',
  'Remove project "{title}"?',
  "Path: {path}",
  "Environment: {environment}",
  "This removes {count} grouped project entries.",
  "The managed policy at {path} importing browser cookies is not allowed.",
  "{organization}'s policy does not allow importing browser cookies.",
] as const;

const messagePatterns = dynamicMessages.map((key) => {
  const fields: string[] = [];
  const pattern = key
    .split(/(\{\w+\})/)
    .map((part) => {
      if (/^\{\w+\}$/.test(part)) {
        fields.push(part.slice(1, -1));
        return "(.*?)";
      }
      return part.replace(/[.*+?^{}()|[\]\\$]/g, "\\$&");
    })
    .join("");
  return { key, fields, pattern: new RegExp("^" + pattern + "$") };
});

export function translateCodeLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  if (Object.hasOwn(settingsCodeMessages, label))
    return settingsCodeMessages[label as keyof typeof settingsCodeMessages];
  for (const { key, fields, pattern } of messagePatterns) {
    const match = pattern.exec(label);
    if (match)
      return translate(
        locale,
        settingsCodeMessages,
        key,
        Object.fromEntries(fields.map((field, index) => [field, match[index + 1] ?? ""])),
      );
  }
  return label;
}
