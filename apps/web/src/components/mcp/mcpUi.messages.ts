import type { Locale } from "../../i18n/locale";

export const mcpUiMessages = {
  "Use T3 Code in another app (MCP) · {name}": "在其他应用中使用 T3 Code（MCP）· {name}",
  "Connect to an environment first.": "请先连接一个环境。",
  "T3 Connect is not available in this build.": "此版本不支持 T3 Connect。",
  App: "应用",
  Access: "访问权限",
  Connect: "连接",
  "the app": "该应用",
  "What can {app} do?": "{app} 可以做什么？",
  "Runs commands and edits files without asking": "无需询问即可运行命令和编辑文件",
  Back: "返回",
  Done: "完成",
  "Next@@wizard": "下一步",
  "This device needs the Manage access permission on {environment}.":
    "此设备需要 {environment} 的“管理访问权限”权限。",
  "This device cannot grant this on {environment}.": "此设备无法在 {environment} 上授予此权限。",
  "Check again": "重新检查",
  "Checking T3 Connect…": "正在检查 T3 Connect…",
  "Sign in to T3 Connect": "登录 T3 Connect",
  "Apps like Poke and Claude run in the cloud. They need a public address to reach {name}.":
    "Poke、Claude 等应用运行在云端，需要一个公网地址才能访问 {name}。",
  "T3 Connect gives {name} that address. Each app still needs your approval.":
    "T3 Connect 会为 {name} 提供这个地址。每个应用仍需你的批准。",
  "Connect to {name} first.": "请先连接 {name}。",
  "{name}'s T3 Connect is offline": "{name} 的 T3 Connect 已离线",
  "Can't check T3 Connect on {name}": "无法检查 {name} 上的 T3 Connect",
  "Update T3 Code on {name}": "请更新 {name} 上的 T3 Code",
  "This device needs the View relay permission on {name}.": "此设备需要 {name} 的“查看中继”权限。",
  "Fix: {fix}": "解决方法：{fix}",
  "Turn on T3 Connect for {name}": "为 {name} 开启 T3 Connect",
  "{name} gets a public https address, with no router setup.":
    "{name} 会获得一个公网 https 地址，无需配置路由器。",
  "Only apps you approve can use it. You can turn it off in Settings.":
    "只有你批准的应用才能使用它。你可以在设置中关闭。",
  "Connecting…": "正在连接…",
  "Turn on": "启用",
  "Your T3 Connect account is out of tunnels.": "你的 T3 Connect 账号已没有可用隧道。",
  "Manage tunnels": "管理隧道",
  "Restart T3 Code on {name}.": "请重启 {name} 上的 T3 Code。",
  "Which app?": "哪个应用？",
  "Something else…": "其他应用…",
  URL: "URL",
  Message: "消息",
  "Apps that require their own client ID cannot connect.": "需要自有客户端 ID 的应用无法连接。",
  "{app} help": "{app} 帮助",
  "Back to commands": "返回命令",
  "Back to one click": "返回一键设置",
  "Set up another way": "用其他方式设置",
  "Could not open the link": "无法打开链接",
  "Run these where {app} runs.": "请在运行 {app} 的地方执行这些命令。",
  "Could not copy": "无法复制",
  "Use Set up another way.": "请改用“用其他方式设置”。",
  "Open {app}": "打开 {app}",
  "Open in {app}": "在 {app} 中打开",
  "Copy URL and open {app}": "复制 URL 并打开 {app}",
  "Copy message and open {app}": "复制消息并打开 {app}",
  "URL copied": "已复制 URL",
  "Message copied": "已复制消息",
  "Could not get a code from {name}. Try again.": "无法从 {name} 获取登录码。请重试。",
  "Code to approve {access}": "用于批准（{access}）的登录码",
  "Getting code…": "正在获取登录码…",
  "Get code": "获取登录码",
  "New code": "新登录码",
  "Code@@approval": "登录码",
  "Expires {time} · one use": "{time} 后过期 · 仅限一次",
  "The code expired.": "登录码已过期。",
  "Copy {label}": "复制{label}",
  Expired: "已过期",
  "Linked: {list}": "已关联：{list}",
  "Manage access": "管理访问权限",
  "Could not reach T3 Connect.": "无法访问 T3 Connect。",

  // App setup steps. Names of the other app's own menus and buttons stay in English.
  "Open poke.com/integrations/new.": "打开 poke.com/integrations/new。",
  "Paste the URL and add the integration.": "粘贴 URL 并添加集成。",
  "In Claude, open Customize, then Connectors.":
    "在 Claude 中打开 Customize，然后打开 Connectors。",
  "Choose Add custom connector and paste the URL.": "选择 Add custom connector 并粘贴 URL。",
  "The Free plan allows one custom connector.": "免费套餐只能添加一个自定义连接器。",
  "Open chatgpt.com/plugins on the web, then + and Add custom MCP server.":
    "在网页上打开 chatgpt.com/plugins，然后点 + 并选择 Add custom MCP server。",
  "Paste the URL. Choose OAuth.": "粘贴 URL，选择 OAuth。",
  "Create it as a plugin, then install it.": "将其创建为插件，然后安装。",
  "Send this message to any of your Grok Bots.": "将这条消息发送给你的任意一个 Grok Bot。",
  "Shared with all your Grok Bots.": "你的所有 Grok Bot 共享此连接。",
  "In Gemini, open Settings, then Connected apps.":
    "在 Gemini 中打开 Settings，然后打开 Connected apps。",
  "Choose Custom apps, then Add, and paste the URL.": "选择 Custom apps，再点 Add，然后粘贴 URL。",
  "Send this message to Muse.": "将这条消息发送给 Muse。",
  "In Instinct, open Settings, then MCP connections, if your account has it.":
    "在 Instinct 中打开 Settings，然后打开 MCP connections（如果你的账号有此选项）。",
  "Open the Control UI, then + and Plugins, and choose Add MCP server.":
    "打开 Control UI，点 + 和 Plugins，然后选择 Add MCP server。",
  "Paste the URL, and choose Streamable HTTP and OAuth.":
    "粘贴 URL，然后选择 Streamable HTTP 和 OAuth。",
  "Select Sign in for it under Settings → MCP.": "在 Settings → MCP 下为它选择 Sign in。",
  "Add t3code under mcp_servers in ~/.hermes/config.yaml, with the URL and auth: oauth.":
    "在 ~/.hermes/config.yaml 的 mcp_servers 下添加 t3code，填写 URL 和 auth: oauth。",
  "Run hermes mcp login t3code.": "运行 hermes mcp login t3code。",
  "On a remote host, paste the final URL back when asked.":
    "在远程主机上，按提示把最终的 URL 粘贴回去。",
  "Add a remote MCP server with OAuth.": "添加一个使用 OAuth 的远程 MCP 服务器。",
} as const;

/** Translate a setup step, note or message that mcpApps and mcpGate keep in English. */
export function translateMcpLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN" || !Object.hasOwn(mcpUiMessages, label)) return label;
  return mcpUiMessages[label as keyof typeof mcpUiMessages];
}
