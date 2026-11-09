import { translate, type Locale } from "../../i18n/locale";

export const settingsDevicesMessages = {
  "Stored secret, enter a new value to replace": "已保存凭据，输入新值可替换",
  "Not set": "未设置",
  Value: "值",
  "{label} source": "{label} 来源",
  Secret: "凭据",
  "{label} reference": "{label} 引用",
  "Enter a valid secret reference.": "请输入有效的凭据引用。",
  "Use a 1Password reference like op://vault/item/field.":
    "请使用 1Password 引用，例如 op://vault/item/field。",
  "Edit {name}": "编辑 {name}",
  "Add a 1Password provider": "添加 1Password 提供方",
  "Provider variables on {environment} can read values from it by name. Values are read with the op CLI on that server when a provider starts.":
    "{environment} 上的提供方变量可以按名称从中读取值。提供方启动时，会通过该服务器上的 op CLI 读取值。",
  Name: "名称",
  Account: "账户",
  Cancel: "取消",
  Personal: "个人",
  "Save changes": "保存更改",
  "Add provider": "添加提供方",
  "The account shorthand, sign-in address without https://, or ID that op account list shows.":
    "填写 op account list 显示的账户简称、登录地址（不含 https://）或 ID。",
  "Expected a value with a length of at most 64": "长度不能超过 64 个字符",
  "Expected a value with a length of at most 253": "长度不能超过 253 个字符",
  "Enter a name.": "请输入名称。",
  "Enter the 1Password account.": "请输入 1Password 账户。",
  "The name needs at least one letter or digit.": "名称至少需要一个英文字母或数字。",
  "A secret provider with this name exists.": "已有同名凭据提供方。",
  "1Password account must be a shorthand, sign-in address, or ID with no spaces.":
    "1Password 账户必须是简称、登录地址或 ID，且不能包含空格。",
  "Update T3 Code on {environment} to manage its secret providers.":
    "更新 {environment} 上的 T3 Code 后，即可管理其凭据提供方。",
  "Connect an environment to manage the secret providers its provider variables read from.":
    "连接一个环境，即可管理其提供方变量使用的凭据提供方。",
  Edit: "编辑",
  Remove: "移除",
  "Remove provider": "移除提供方",
  "Environment-wide setting. Select an environment to change it.":
    "这是环境级设置，请先选择一个环境再修改。",
  "No secret providers configured.": "尚未配置凭据提供方。",
  "Add a 1Password account, then pick it as the source of a provider variable.":
    "添加一个 1Password 账户，然后将它选为提供方变量的来源。",
  "Toggle account visibility": "切换账户可见性",
  "Click to reveal account": "点击显示账户",
  "Click to hide account": "点击隐藏账户",
  "Unsupported provider ({kind})": "不支持的提供方（{kind}）",
  "Remove {label}?": "移除 {label}？",
  "Nothing reads from {label}. The secrets themselves are untouched.":
    "没有设置从 {label} 读取凭据。凭据本身不会改变。",
  "These read from {label} and will be unset. The secrets themselves are untouched.":
    "以下设置从 {label} 读取凭据，移除后会清空这些设置。凭据本身不会改变。",
  "Voice · {provider}": "语音 · {provider}",
  "Access Token": "访问 token",
  "Management Key": "管理密钥",
  "API key": "API 密钥",
  "Checking environments…": "正在检查环境…",
  "Connection checks passed": "连接检查通过",
  "Check access before saving": "保存前请检查连接权限",
  "Add device host": "添加设备主机",
  "Edit device host": "编辑设备主机",
  "{failed} of {count} failed": "{count} 个中有 {failed} 个失败",
  "Connect from {environment}.": "从 {environment} 连接。",
  "Connect from {count} selected environments.": "从 {count} 个选中的环境连接。",
  "Hosts on the same machine are skipped.": "会跳过同一机器上的主机。",
  "SSH target": "SSH 目标",
  "SSH options": "SSH 选项",
  "Identity file": "身份文件",
  Port: "端口",
  "Optional. Resolved separately on each environment.": "可选。每个环境分别解析。",
  "Test connection": "测试连接",
  "Checking…": "正在检查…",
  "Already available locally": "本机已可用",
  Failed: "失败",
  Connected: "已连接",
  "Show error": "显示错误",
  "Environment disconnected": "环境已断开",
  "This connection cannot test device hosts.": "此连接无法测试设备主机。",
  "Save host": "保存主机",
  "user@host or SSH alias": "user@host 或 SSH 别名",
  "SSH config default": "SSH 配置默认值",
  Default: "默认",
  "{summary}. Per-machine results": "{summary}。各机器的结果",
  "Add EAS host": "添加 EAS 主机",
  "Edit EAS host": "编辑 EAS 主机",
  "Checking the Expo account…": "正在检查 Expo 账户…",
  "Check the Expo account before choosing a project.": "选择项目前请先检查 Expo 账户。",
  "The environment's server signs in to Expo and starts the sessions. Without a token here it uses EXPO_TOKEN, then its eas login.":
    "环境的服务器会登录 Expo 并启动会话。未在此填写 token 时，先使用 EXPO_TOKEN，再尝试 eas login。",
  "Expo access token": "Expo 访问 token",
  Optional: "可选",
  "Clear access token": "清空访问 token",
  "Signed in as {account} with {source}.": "已使用 {source} 登录为 {account}。",
  "the access token saved here": "此处保存的访问 token",
  "EXPO_TOKEN on the server": "服务器上的 EXPO_TOKEN",
  "the server's eas login": "服务器上的 eas login",
  "Check account": "检查账户",
  "EAS project": "EAS 项目",
  "From the thread's project": "来自会话的项目",
  "Sessions bill the project's Expo account. \"From the thread's project\" reads extra.eas.projectId from the project's app config.":
    "会话费用计入项目的 Expo 账户。“来自会话的项目”会读取项目应用配置中的 extra.eas.projectId。",
  "Sessions at once": "同时运行的会话数",
  "Session minutes": "会话时长（分钟）",
  "Idle minutes": "空闲时长（分钟）",
  "Expo allows sessions of up to 40 minutes on free accounts and 115 on paid ones, and ends one after the idle minutes without activity, so idle minutes must be smaller than session minutes.":
    "Expo 免费账户的会话最长为 40 分钟，付费账户最长为 115 分钟。达到空闲时长后会话会结束，因此空闲时长必须小于会话时长。",
  " Saving restarts this host, which stops its running sessions.":
    "保存后会重启此主机，结束正在运行的会话。",
  "Idle minutes must be smaller than session minutes.": "空闲时长必须小于会话时长。",
  "Give the host a label and limits within the ranges shown.":
    "请填写主机名称，并将限制设在显示的范围内。",
  "Add Simlock host": "添加 Simlock 主机",
  "Edit Simlock host": "编辑 Simlock 主机",
  "Each selected environment's server leases devices from your Simlock gateway with its own agent token, and releases them when they close.":
    "每个选中环境的服务器使用自己的智能体 token，从你的 Simlock 网关租用设备，并在关闭设备时释放。",
  "The environment's server leases devices from your Simlock gateway and releases them when they close.":
    "环境的服务器从你的 Simlock 网关租用设备，并在关闭设备时释放。",
  "Gateway URL": "网关 URL",
  "A lease ends after the lease minutes even while in use.":
    "达到租用时长后，设备即使仍在使用也会结束租用。",
  "Agent token · {environment}": "智能体 token · {environment}",
  "Agent token": "智能体 token",
  "Leases, drives, and streams devices. Create one per environment with {command}, or leave it blank to add it later. A blank token uses the machine's {authToken} when its {baseUrl} is this gateway.":
    "用于租用、操控和传输设备画面。使用 {command} 为每个环境创建一个 token，也可以留空稍后添加。如果该机器的 {baseUrl} 指向此网关，留空时会使用它的 {authToken}。",
  "Leases, drives, and streams devices. Create one with {command}, or leave it blank to add it later. A blank token uses the machine's {authToken} when its {baseUrl} is this gateway.":
    "用于租用、操控和传输设备画面。使用 {command} 创建一个 token，也可以留空稍后添加。如果该机器的 {baseUrl} 指向此网关，留空时会使用它的 {authToken}。",
  "Devices at once": "同时租用的设备数",
  "Lease minutes": "租用时长（分钟）",
  " Saving restarts this host, which releases its devices.": "保存后会重启此主机，释放其设备。",
  "Give the host a label.": "请填写主机名称。",
  "Enter the gateway's origin, such as https://gateway.example.ts.net:4700.":
    "请输入网关源地址，例如 https://gateway.example.ts.net:4700。",
  "Keep the limits within the ranges shown.": "请将限制设在显示的范围内。",
  "Using this machine's agent-device token ({account}).":
    "正在使用本机的 agent-device token（{account}）。",
  "Accepted as {account}.": "已验证为 {account}。",
  "Clear agent token": "清空智能体 token",
  "This connection cannot change settings on {environments}.":
    "此连接无法修改以下环境的设置：{environments}。",
  "Device host not removed everywhere": "未能从所有环境移除设备主机",
  "Device host not saved everywhere": "未能在所有环境保存设备主机",
  "Device host not saved": "未保存设备主机",
  "EAS host not removed everywhere": "未能从所有环境移除 EAS 主机",
  "EAS host not saved everywhere": "未能在所有环境保存 EAS 主机",
  "Simlock host not saved everywhere": "未能在所有环境保存 Simlock 主机",
  "Simlock host not removed everywhere": "未能从所有环境移除 Simlock 主机",
  "{host}: {failed} of {count} environments failed": "{host}：{count} 个环境中有 {failed} 个失败",
  "{host}: connection checks passed": "{host}：连接检查通过",
  "Connected or already available locally on each selected environment.":
    "在每个选中的环境中均已连接或本机已可用。",
  "{environment}: {error}": "{environment}：{error}",
  failed: "失败",
  "Add source": "添加来源",
  "Machine over SSH": "通过 SSH 连接的机器",
  "EAS Simulator": "EAS 模拟器",
  "Simlock pool (alpha)": "Simlock 池（早期测试）",
  Details: "详情",
  More: "更多",
  "Device sources": "设备来源",
  "Local simulators": "本地模拟器",
  "Simulators and emulators installed on each environment's own machine.":
    "各环境所在机器上安装的模拟器。",
  "Simulators and emulators installed on this environment's machine.":
    "此环境所在机器上安装的模拟器。",
  "Up to 1 session at once, each stopped after {minutes} min or {idle} idle min":
    "最多同时运行 1 个会话，每个会话在 {minutes} 分钟后或空闲 {idle} 分钟后结束",
  "Up to {count} sessions at once, each stopped after {minutes} min or {idle} idle min":
    "最多同时运行 {count} 个会话，每个会话在 {minutes} 分钟后或空闲 {idle} 分钟后结束",
  "Up to 1 device at once, each released after {minutes} min":
    "最多同时租用 1 台设备，每台在 {minutes} 分钟后释放",
  "Up to {count} devices at once, each released after {minutes} min":
    "最多同时租用 {count} 台设备，每台在 {minutes} 分钟后释放",
  Loading: "加载中",
  Starting: "正在启动",
  Refresh: "刷新",
  "Testing connection": "正在测试连接",
  "Can't connect": "无法连接",
  Retry: "重试",
  "Device list may be incomplete": "设备列表可能不完整",
  "iOS list may be incomplete": "iOS 列表可能不完整",
  "Android list may be incomplete": "Android 列表可能不完整",
  "{source}: {platform} available": "{source}：{platform} 可用",
  "{source}: {platform} not available": "{source}：{platform} 不可用",
  "{platform} available on some": "{platform} 在部分环境可用",
  "{platform} available": "{platform} 可用",
  "{platform} not available": "{platform} 不可用",
  Available: "可用",
  "Not available": "不可用",
  "Not added": "未添加",
  "Not set up on this machine.": "此机器尚未配置。",
  "iOS Simulators need macOS with Xcode.": "iOS 模拟器需要装有 Xcode 的 macOS。",
  "Xcode command line tools were not found.": "未找到 Xcode 命令行工具。",
  "Android SDK was not found. Install it with Android Studio or set ANDROID_HOME to your SDK directory.":
    "未找到 Android SDK。请通过 Android Studio 安装，或将 ANDROID_HOME 设为 SDK 目录。",
  "iOS needs macOS with Xcode and working xcrun simctl.":
    "iOS 需要装有 Xcode 的 macOS，且 xcrun simctl 能正常运行。",
  "Android SDK missing. Set ANDROID_HOME or put adb on the SSH PATH.":
    "缺少 Android SDK。请设置 ANDROID_HOME，或将 adb 加入 SSH PATH。",
  "Cannot reach device host. Test its SSH connection in Settings.":
    "无法连接设备主机。请在设置中测试其 SSH 连接。",
  "The pool has no iOS devices.": "池中没有 iOS 设备。",
  "The pool has no Android devices.": "池中没有 Android 设备。",
} as const;

export function translateDevicesLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  if (Object.hasOwn(settingsDevicesMessages, label))
    return settingsDevicesMessages[label as keyof typeof settingsDevicesMessages];

  const sessions =
    /^Up to (\d+) (session|sessions) at once, each stopped after (\d+) min or (\d+) idle min$/.exec(
      label,
    );
  if (sessions)
    return translate(
      locale,
      settingsDevicesMessages,
      sessions[2] === "session"
        ? "Up to 1 session at once, each stopped after {minutes} min or {idle} idle min"
        : "Up to {count} sessions at once, each stopped after {minutes} min or {idle} idle min",
      { count: sessions[1]!, minutes: sessions[3]!, idle: sessions[4]! },
    );

  const devices = /^Up to (\d+) (device|devices) at once, each released after (\d+) min$/.exec(
    label,
  );
  if (devices)
    return translate(
      locale,
      settingsDevicesMessages,
      devices[2] === "device"
        ? "Up to 1 device at once, each released after {minutes} min"
        : "Up to {count} devices at once, each released after {minutes} min",
      { count: devices[1]!, minutes: devices[3]! },
    );
  return label;
}
