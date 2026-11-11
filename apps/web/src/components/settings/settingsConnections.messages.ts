import { translateRuntimeError } from "../runtimeErrorLabels";
import { translate, type Locale } from "~/i18n/locale";

export const settingsConnectionsMessages = {
  "What agents here may do there": "这里的智能体在另一环境中的权限",
  "Read projects and threads. Cannot start, message or change anything.":
    "读取项目和会话，不能启动会话、发送消息或进行任何更改。",
  "Ask before commands and file changes.": "执行命令和修改文件前询问。",
  "Auto-approve edits, ask before other actions.": "自动批准编辑，其他操作前询问。",
  "Supported providers approve routine actions; others still ask.":
    "支持此模式的提供方会自动批准常规操作，其他提供方仍会询问。",
  "Allow commands and edits without prompts.": "允许执行命令和编辑，无需确认。",
  "An agent never gets more access there than its own mode here. Below full access, it can change only threads this link started, not that machine's own threads, projects or settings.":
    "智能体在另一环境中的权限不会高于它在这里的运行模式。未授予完全访问权限时，它只能更改通过此连接启动的会话，不能更改该机器自身的会话、项目或设置。",
  "Showing access for": "权限所属环境",
  Environment: "环境",
  Offline: "离线",
  "Failed to update network exposure.": "无法更新网络开放设置。",
  "Could not update network access": "无法更新网络访问权限",
  "Failed to configure Tailscale HTTPS.": "无法配置 Tailscale HTTPS。",
  "Could not set up Tailscale HTTPS": "无法设置 Tailscale HTTPS",
  "Failed to disable Tailscale HTTPS.": "无法停用 Tailscale HTTPS。",
  "Could not disable Tailscale HTTPS": "无法停用 Tailscale HTTPS",
  "Failed to revoke pairing link.": "无法撤销配对链接。",
  "Could not revoke pairing link": "无法撤销配对链接",
  "Failed to revoke client access.": "无法撤销客户端访问权限。",
  "Could not revoke client access": "无法撤销客户端访问权限",
  "Revoked 1 other client": "已撤销另外 1 个客户端的访问权限",
  "Other paired clients will need a new pairing link before reconnecting.":
    "其他已配对的客户端需要使用新的配对链接才能重新连接。",
  "Failed to revoke other clients.": "无法撤销其他客户端的访问权限。",
  "Could not revoke other clients": "无法撤销其他客户端的访问权限",
  "Failed to remove backend.": "无法移除后端。",
  "Could not remove backend": "无法移除后端",
  "Enable network access": "启用网络访问",
  "Failed to update WSL backend.": "无法更新 WSL 后端。",
  "Could not change WSL backend": "无法更改 WSL 后端",
  "Couldn't load the WSL backend state.": "无法加载 WSL 后端状态。",
  "Retrying…": "正在重试…",
  Retry: "重试",
  "WSL is unavailable, so Windows is running instead. Turn WSL off to clear this preference.":
    "WSL 不可用，当前改用 Windows。关闭 WSL 可清除此偏好设置。",
  "Switch to Windows": "切换到 Windows",
  Off: "关闭",
  "Default distro": "默认发行版",
  "Run the selected WSL distro alongside Windows. Projects remain on their current filesystem.":
    "同时运行所选 WSL 发行版和 Windows 后端。项目保留在原来的文件系统中。",
  "WSL backend": "WSL 后端",
  "WSL only": "仅 WSL",
  "Run only the WSL backend. T3 Code restarts when this changes.":
    "仅运行 WSL 后端。更改后 T3 Code 会重启。",
  "Run WSL only": "仅运行 WSL",
  "Use Tailscale Serve to expose this backend through a MagicDNS HTTPS URL.":
    "通过 Tailscale Serve，让其他设备使用 MagicDNS HTTPS URL 访问此后端。",
  "Enable Tailscale HTTPS": "启用 Tailscale HTTPS",
  "Exposed on all interfaces.": "已向所有网络接口开放。",
  "Limited to this machine.": "仅限本机访问。",
  "Loading…": "加载中",
  "This connection cannot view or change network exposure.": "此连接无法查看或更改网络开放设置。",
  "Remote access is already configured. Change network exposure where the server starts.":
    "已配置远程访问。请在启动服务器的位置更改网络开放设置。",
  "Only this machine can connect. Restart with a non-loopback host for remote pairing.":
    "仅本机可以连接。请使用非回环主机地址重启服务器，再远程配对。",
  "Network exposure information is unavailable.": "无法获取网络开放信息。",
  "Network exposure changes restart the backend and must be controlled where the server process is launched.":
    "更改网络开放设置会重启后端，必须在启动服务器进程的位置操作。",
  "This machine": "本机",
  "Primary environment": "主环境",
  "More actions for this machine": "此机器的更多操作",
  Version: "版本",
  "Retry update": "重试更新",
  Permissions: "权限",
  "Authorized clients": "已授权的客户端",
  "This connection can create access links but cannot view authorized clients.":
    "此连接可以创建访问链接，但无法查看已授权的客户端。",
  "Enable network access?": "启用网络访问？",
  "Disable network access?": "停用网络访问？",
  "Let your other devices connect to T3 Code over the network. Pair devices to give them access. T3 Code will restart.":
    "允许你的其他设备通过网络连接 T3 Code。设备配对后即可获得访问权限。T3 Code 将重启。",
  "Devices connected over your local network will disconnect. Existing tunnels, such as T3 Connect or Tailscale HTTPS, keep working. T3 Code will restart.":
    "通过本地网络连接的设备将断开连接。T3 Connect、Tailscale HTTPS 等现有隧道仍可使用。T3 Code 将重启。",
  Cancel: "取消",
  "Restarting…": "正在重启…",
  "Restart and enable": "重启并启用",
  "Restart and disable": "重启并停用",
  "Turn off WSL and switch back to Windows?": "关闭 WSL 并切回 Windows？",
  "Disable WSL backend?": "停用 WSL 后端？",
  "Switch WSL distro?": "切换 WSL 发行版？",
  "Start the WSL backend": "启动 WSL 后端",
  "Run only the WSL backend?": "仅运行 WSL 后端？",
  "Re-enable the Windows backend?": "重新启用 Windows 后端？",
  "T3 Code will restart on the Windows backend. Threads and projects opened against WSL stay safe inside the distro and become available again when you re-enable WSL.":
    "T3 Code 将重启并使用 Windows 后端。WSL 中的会话和项目会保留在发行版内，重新启用 WSL 后即可继续访问。",
  "The WSL backend will stop. Threads and projects opened against WSL stay safe inside the distro, but they'll be unavailable in T3 Code until you re-enable WSL.":
    "WSL 后端将停止。WSL 中的会话和项目会保留在发行版内，重新启用 WSL 前无法在 T3 Code 中访问。",
  "T3 Code will restart the WSL backend on the new distro. Sessions still running on the current distro will be interrupted.":
    "T3 Code 将在新发行版中重启 WSL 后端。当前发行版中仍在运行的会话会中断。",
  "Run the WSL backend alongside the Windows one, or stop the Windows backend and use only WSL? You can change this later from Settings.":
    "要同时运行 WSL 和 Windows 后端，还是停止 Windows 后端、仅使用 WSL？之后可以在设置中更改。",
  "T3 Code will restart and start only the WSL backend. Your Windows-side projects won't be accessible until you turn this off again.":
    "T3 Code 将重启并仅启动 WSL 后端。关闭此选项前，你将无法访问 Windows 中的项目。",
  "T3 Code will restart and bring the Windows backend back up alongside WSL.":
    "T3 Code 将重启，并在运行 WSL 的同时重新启动 Windows 后端。",
  "Applying…": "正在应用…",
  "Use only WSL": "仅使用 WSL",
  "Run both backends": "同时运行两个后端",
  "Disable WSL": "停用 WSL",
  "Switch distro": "切换发行版",
  "Disable Tailscale HTTPS?": "停用 Tailscale HTTPS？",
  "T3 Code will restart the local backend without Tailscale Serve.":
    "T3 Code 将重启本地后端，并停用 Tailscale Serve。",
  "Set up Tailscale HTTPS?": "设置 Tailscale HTTPS？",
  "T3 Code will restart the local backend with Tailscale Serve enabled and ask Tailscale to proxy HTTPS traffic to this backend.":
    "T3 Code 将重启本地后端并启用 Tailscale Serve，由 Tailscale 将 HTTPS 流量代理到此后端。",
  "HTTPS port": "HTTPS 端口",
  "Enter a port from 1 to 65535.": "请输入 1 到 65535 之间的端口。",
  "HTTPS endpoint": "HTTPS 端点",
  "Pending MagicDNS endpoint": "正在等待 MagicDNS 端点",
  Enable: "启用",
  "No environment selected": "未选择环境",
  "Connect an environment to view its settings and access.": "连接一个环境，查看其设置和访问权限。",
  "This app": "此应用",
  Environments: "环境",
  Connected: "已连接",
  Connecting: "正在连接",
  Reconnecting: "正在重新连接",
  "Client not supported": "不支持此客户端",
  "Connection failed": "连接失败",
  "Not connected": "未连接",
  "trace ID": "追踪 ID",
  "Trace ID copied": "已复制追踪 ID",
  "Could not copy trace ID": "无法复制追踪 ID",
  "MCP URL copied": "已复制 MCP URL",
  "Could not copy MCP URL": "无法复制 MCP URL",
  Restarting: "正在重启",
  "Switched off": "已停用",
  Routes: "线路",
  Update: "更新",
  "Switch off": "关闭",
  "Switch on": "开启",
  "Hide routes": "隐藏线路",
  "Copy MCP URL": "复制 MCP URL",
  "Copy trace ID": "复制追踪 ID",
  "Removing…": "正在移除…",
  "Remove from this device…": "从此设备移除…",
  "Enable T3 Connect": "启用 T3 Connect",
  "Get more tunnels": "获取更多隧道",
  "Manage tunnels": "管理隧道",
  "Run `t3 connect link` on the host, then restart T3 Code there.":
    "请在主机上运行 `t3 connect link`，然后在那里重启 T3 Code。",
  "Your session does not have permission to manage T3 Connect access.":
    "你的会话无权管理 T3 Connect 访问权限。",
  "Sign in": "登录",
  "More info": "更多信息",
  "T3 Connect linked": "已关联 T3 Connect",
  "T3 Connect tunnel disabled": "已停用 T3 Connect 隧道",
  "T3 Connect unlinked": "已取消关联 T3 Connect",
  "This environment is available through T3 Connect.": "可以通过 T3 Connect 访问此环境。",
  "The managed tunnel was removed. Agent activity publishing stays on.":
    "已移除托管隧道。仍会发布智能体活动。",
  "This environment is no longer available through T3 Connect.":
    "无法再通过 T3 Connect 访问此环境。",
  "Agent activity enabled": "已启用智能体活动",
  "Agent activity disabled": "已停用智能体活动",
  "This environment publishes agent activity to your mobile clients.":
    "此环境会向你的移动客户端发布智能体活动。",
  "This environment will stop publishing agent activity.": "此环境将停止发布智能体活动。",
  "Webhooks held while offline": "已开启离线保留 webhook 请求",
  "Webhooks no longer held": "已停止保留 webhook 请求",
  "T3 Connect keeps webhook requests for up to 24 hours while this environment is offline.":
    "此环境离线时，T3 Connect 最多保留 webhook 请求 24 小时。",
  "Requests to an offline environment now fail. Anything already held is still delivered.":
    "现在，发往离线环境的请求会失败。之前保留的请求仍会投递。",
  "Sign in to make this environment available to your other devices through T3 Connect.":
    "登录后，你的其他设备就能通过 T3 Connect 访问此环境。",
  "This environment was removed from T3 Connect. Turn it on to link it again.":
    "此环境已从 T3 Connect 移除。开启后可重新关联。",
  "T3 Connect is on, but other devices cannot reach this environment.":
    "T3 Connect 已开启，但其他设备无法访问此环境。",
  "This environment is available to your other devices through T3 Connect.":
    "你的其他设备可以通过 T3 Connect 访问此环境。",
  "T3 Connect is on. Reachability has not been checked yet.":
    "T3 Connect 已开启，尚未检查能否访问。",
  "T3 Connect is out of sync. This environment is linked only to publish agent activity, so other devices cannot connect. Turn T3 Connect on to repair it.":
    "T3 Connect 状态不同步。此环境的关联仅用于发布智能体活动，其他设备无法连接。请开启 T3 Connect 修复。",
  "Make this environment available to your other devices through T3 Connect.":
    "让你的其他设备通过 T3 Connect 访问此环境。",
  "This environment was removed from T3 Connect. Run `t3 connect link` on the host to link it again.":
    "此环境已从 T3 Connect 移除。请在主机上运行 `t3 connect link` 重新关联。",
  "Sign in to send activity to mobile notifications and Live Activities.":
    "登录后即可向手机通知和实时活动发送活动信息。",
  "Send activity to mobile notifications and Live Activities without T3 Connect.":
    "无需 T3 Connect，即可将活动发送到手机通知和实时活动。",
  "Publish agent activity to mobile clients": "向移动客户端发布智能体活动",
  "Keep webhook requests for up to 24 hours while this environment is offline, then deliver them. Off: T3 Connect only forwards requests and stores nothing.":
    "此环境离线时，最多保留 webhook 请求 24 小时，恢复后再投递。关闭时，T3 Connect 仅转发请求，不保存任何内容。",
  "Hold webhook requests while this environment is offline": "此环境离线时保留 webhook 请求",
  "To edit these settings, pair this connection with both View relay and Manage relay permissions.":
    "要编辑这些设置，请在配对此连接时同时授予“查看中继”和“管理中继”权限。",
  "No saved remote environments": "没有已保存的远程环境",
  "Click “Add environment” to pair another environment, or connect one from T3 Connect.":
    "点击“添加环境”配对其他环境，或从 T3 Connect 连接一个环境。",
  "Click “Add environment” to pair another environment.": "点击“添加环境”配对其他环境。",
  "Granted scopes": "已授予的权限范围",
  "Hosted app link copied": "已复制托管版应用链接",
  "Pairing URL copied": "已复制配对 URL",
  "Pairing code copied": "已复制配对码",
  "Open it in the browser on the device you want to connect.":
    "在要连接的设备上，用浏览器打开此链接。",
  "Open it in the client you want to pair to this environment.":
    "在要与此环境配对的客户端中打开此链接。",
  "Paste it into another client to finish pairing.": "粘贴到另一个客户端中完成配对。",
  "Could not copy hosted app link": "无法复制托管版应用链接",
  "Could not copy pairing URL": "无法复制配对 URL",
  "Could not copy pairing code": "无法复制配对码",
  "Clipboard copy unavailable": "无法复制到剪贴板",
  "Showing the full value instead.": "已显示完整内容，请手动复制。",
  "Pairing link": "配对链接",
  "Pairing link scopes": "配对链接权限范围",
  "Create a new link to share from this client.": "创建新链接，即可从此客户端分享。",
  "Copy the token and pair from another client using this backend's reachable host.":
    "复制 token，在另一个客户端中使用此后端可访问的主机地址配对。",
  Share: "分享",
  "Copy code@@pairing": "复制配对码",
  "Show link": "显示链接",
  "Show code": "显示配对码",
  "Hosted app pairing link": "托管版应用配对链接",
  "Pairing code": "配对码",
  "Clipboard copy is unavailable here. Open or manually copy this hosted app link on the device you want to connect.":
    "这里无法复制到剪贴板。请在要连接的设备上打开或手动复制此托管版应用链接。",
  "Clipboard copy is unavailable here. Open or manually copy this full pairing URL on the device you want to connect.":
    "这里无法复制到剪贴板。请在要连接的设备上打开或手动复制此完整配对 URL。",
  "Clipboard copy is unavailable here. Manually copy this code into another client.":
    "这里无法复制到剪贴板。请手动将此配对码复制到另一个客户端。",
  "Pairing link. Scan to open on another device": "配对链接。在其他设备上扫描即可打开",
  Done: "完成",
  "Revoking…": "正在撤销授权…",
  Revoke: "撤销授权",
  "Endpoint the pairing QR code and URL use": "配对二维码和 URL 使用的端点",
  "Reach this machine via": "访问本机的方式",
  "Copy link": "复制链接",
  "Copy code only": "仅复制配对码",
  "No QR for this endpoint. Another device scanning a loopback link would dial itself; copy the URL for use on this machine instead.":
    "此端点不提供二维码。其他设备扫描回环链接会连接到自身；请复制 URL，在本机上使用。",
  "Not connected yet.": "尚未连接。",
  "This device": "此设备",
  "Client scopes": "客户端权限范围",
  "Failed to create pairing URL.": "无法创建配对 URL。",
  "Could not create pairing URL": "无法创建配对 URL",
  "Revoke others": "撤销其他客户端的访问权限",
  "Create link": "创建链接",
  "Create pairing link": "创建配对链接",
  "Generate a one-time link that another device can use to pair with this backend as an authorized client.":
    "生成一次性链接，让其他设备与此后端配对，成为已授权的客户端。",
  "Client label (optional)": "客户端名称（可选）",
  "e.g. Living room iPad": "例如：客厅的 iPad",
  "Limit what the paired client can do.": "限制已配对客户端可以执行的操作。",
  "Read only": "只读",
  Standard: "标准",
  "Select at least one permission.": "请至少选择一项权限。",
  "This client can create or revoke access for other devices.":
    "此客户端可以为其他设备创建或撤销访问权限。",
  "Creating…": "正在创建…",
  "No pairing links or client sessions.": "没有配对链接或客户端会话。",
  "Setup required": "需要设置",
  Default: "默认",
  Setup: "设置",
  Disable: "停用",
  "Set as default": "设为默认",
  Hide: "隐藏",
  "Reachable at": "访问地址",
  "Route added": "已添加线路",
  "Environment connected": "环境已连接",
  "Failed to add backend.": "无法添加后端。",
  "Could not add backend": "无法添加后端",
  "Backend added": "已添加后端",
  "The environment is saved and will reconnect on app startup.":
    "已保存环境，应用启动时会自动重新连接。",
  Host: "主机",
  "Paste a full pairing URL here to fill both fields automatically.":
    "在这里粘贴完整的配对 URL，即可自动填写两个字段。",
  "Could not add the route.": "无法添加线路。",
  "This machine is on your T3 Connect account. Use it as a fallback route.":
    "此机器属于你的 T3 Connect 账户。可将其用作备用线路。",
  "Add T3 Connect": "添加 T3 Connect",
  "Adding…": "正在添加…",
  "Add route": "添加线路",
  "Add environment": "添加环境",
  "SSH host or alias": "SSH 主机或别名",
  "Search hosts or type devbox": "搜索主机或输入 devbox",
  "Loading hosts…": "正在加载主机…",
  Username: "用户名",
  Port: "端口",
  "Add Environment": "添加环境",
  "Pair this machine again over another address, such as its Tailscale name. It joins the existing routes instead of adding a second machine.":
    "使用其他地址（例如 Tailscale 名称）再次配对此机器。该地址将加入现有线路，不会重复添加机器。",
  "Pair another environment to this client.": "将其他环境与此客户端配对。",
  "Remote link": "远程连接",
  "Enter a backend host and pairing code.": "输入后端主机和配对码。",
  "Use local SSH config, agent, and tunnels for the backend.":
    "使用本地 SSH 配置、认证代理和隧道连接后端。",
  "Could not load linked environments": "无法加载已关联的环境",
  "Loading linked environments…": "正在加载已关联的环境…",
  "No linked environments": "没有已关联的环境",
  "Link another machine running T3 Code, such as a VPS, so agents here can launch and drive threads there.":
    "关联另一台运行 T3 Code 的机器（例如 VPS），让这里的智能体能够在那台机器上启动和操作会话。",
  "Could not forget the link": "无法移除关联",
  "Expired. Link it again with a new pairing code.": "已过期。请使用新的配对码重新关联。",
  "Not answering right now.": "暂时没有响应。",
  Reachable: "可访问",
  "Forgetting…": "正在移除…",
  Forget: "移除",
  "Could not link the environment": "无法关联环境",
  Link: "关联",
  "Link an environment": "关联环境",
  "Agents here can then launch, message and wait on threads there. It appears in that environment's Connections, where it can be revoked.":
    "这里的智能体随后可以在那边启动会话、发送消息并等待完成。关联会显示在该环境的“连接”设置中，可在那里撤销。",
  "Already linked. Linking again renews it with the access you pick.":
    "已关联。再次关联将使用你选择的访问权限续期。",
  Address: "地址",
  "From that environment's Connections, or t3 pair there":
    "从该环境的“连接”设置获取，或在那里运行 t3 pair",
  "Paste the code": "粘贴配对码",
  "Linking…": "正在关联…",
  Failed: "失败",
  "Not checked": "尚未检查",
  retrying: "正在重试",
  Details: "详情",
  "connection diagnostics": "连接诊断",
  "Diagnostics copied": "已复制诊断信息",
  "Could not copy diagnostics": "无法复制诊断信息",
  "What to try": "可以尝试",
  "Retry now": "立即重试",
  "Copy diagnostics": "复制诊断信息",
  "Add direct route": "添加直连线路",
  "Reorder routes": "调整线路顺序",
  "Remove route": "移除线路",
  "In use": "正在使用",
  Linked: "已关联",
  Machine: "机器",
  "Another address…": "其他地址…",
  "Choose a machine": "选择机器",
  "Connect to this environment to change its icon.": "连接此环境后即可更改图标。",
  "Your session on this environment cannot change its settings.":
    "你在此环境中的会话无法更改其设置。",
  Icon: "图标",
  detected: "已检测到",
  default: "默认",
  "Couldn't change this setting.": "无法更改此设置。",
  "Run agents on this computer. Turn off to use T3 Code only with remote environments.":
    "在本机上运行智能体。关闭后，T3 Code 将仅使用远程环境。",
  "Turned off. Agents only run in remote environments.": "已关闭。智能体仅在远程环境中运行。",
  "Local environment": "本地环境",
  "Turn off local environment?": "关闭本地环境？",
  "Turn on local environment?": "开启本地环境？",
  "T3 Code will restart without running a server on this computer. Any agents and terminals running here will stop, and other devices will no longer be able to connect to this computer. Your projects, history, and remote environments are unaffected.":
    "T3 Code 将重启，不再在本机上运行服务器。本机上运行的智能体和终端将停止，其他设备也将无法连接本机。你的项目、历史记录和远程环境不受影响。",
  "T3 Code will restart and start running a server on this computer again.":
    "T3 Code 将重启，并重新在本机上运行服务器。",
  "Restart and turn off": "重启并关闭",
  "Restart and turn on": "重启并开启",
  "These permissions apply to your active route. Other routes may have different permissions.":
    "这些权限适用于当前使用的线路。其他线路的权限可能不同。",
  "These permissions apply to this client’s current connection.":
    "这些权限适用于此客户端的当前连接。",
  Allowed: "已允许",
  "Not granted": "未授予",
  "Revoked {count} clients": "已撤销 {count} 个客户端的访问权限",
  "Failed to switch the backend on.": "无法开启后端。",
  "Failed to switch the backend off.": "无法关闭后端。",
  "Could not switch backend on": "无法开启后端",
  "Could not switch backend off": "无法关闭后端",
  "Remove {environment} from this device?\nThis forgets its pairing, credentials, and cached threads here. Switch it off instead to keep it saved.":
    "从此设备移除 {environment}？\n这会删除这里保存的配对信息、凭据和缓存的会话。若要保留这些内容，请关闭连接。",
  "WSL backend couldn't start: {error}": "WSL 后端无法启动：{error}",
  " (default)": "（默认）",
  "Reachable at {url}": "访问地址：{url}",
  "Exposed on all interfaces. Pairing links use {host}.":
    "已向所有网络接口开放。配对链接使用 {host}。",
  "{environment} server": "{environment} 服务器",
  server: "服务器",
  "Update to {version}": "更新到 {version}",
  "{count} client": "{count} 个客户端",
  "{count} clients": "{count} 个客户端",
  "{count} pairing link": "{count} 个配对链接",
  "{count} pairing links": "{count} 个配对链接",
  "{count} scope": "{count} 个权限范围",
  "{count} scopes": "{count} 个权限范围",
  "{label}: show {scopes}": "{label}：显示 {scopes}",
  "Link created at {time}": "链接创建于 {time}",
  "Connected for {duration}": "已连接 {duration}",
  "Last connected at {time}": "上次连接于 {time}",
  "{environment} can now be reached over SSH {alias}.":
    "现在可以通过 SSH {alias} 访问 {environment}。",
  "{alias} is ready over an SSH-managed tunnel.": "{alias} 的 SSH 托管隧道已就绪。",
  "{environment} now has another way to connect.": "{environment} 现在有了另一条连接线路。",
  "{environment} falls back to T3 Connect when its other routes are unreachable.":
    "当其他线路无法访问时，{environment} 会改用 T3 Connect。",
  'No hosts match "{query}".': "没有与“{query}”匹配的主机。",
  'Forget {environment}? Agents here stop working there. Revoke "T3 Code · …" in {environment}\'s Connections to end the session there too.':
    "移除 {environment} 的关联？这里的智能体将无法继续在那边工作。如需同时结束那边的会话，请在 {environment} 的“连接”设置中撤销“T3 Code · …”。",
  "Expires in {count} day. Link it again to renew.": "{count} 天后过期。重新关联即可续期。",
  "Expires in {count} days. Link it again to renew.": "{count} 天后过期。重新关联即可续期。",
  "Linked {environment}": "已关联 {environment}",
  "This app has no address for {machine} that another machine can reach. Enter its https or Tailscale address.":
    "此应用没有其他机器可用来访问 {machine} 的地址。请输入其 https 或 Tailscale 地址。",
  "Create a link on {machine}: Settings → Connections → Create link, then paste its code here.":
    "在 {machine} 上创建链接：设置 → 连接 → 创建链接，然后将配对码粘贴到这里。",
  "retrying in {seconds}s": "{seconds} 秒后重试",
  "attempt {attempt}": "第 {attempt} 次尝试",
  "Remove {label} route?{address}": "移除 {label} 线路？{address}",
  "Routes to {environment}, preferred first": "连接 {environment} 的线路，优先线路在前",
  "Reorder {label}, position {position}": "调整 {label} 的顺序，当前位置为 {position}",
  "Remove {label} route": "移除 {label} 线路",
  " · found automatically": " · 自动发现",
  "{count} routes": "{count} 条线路",
  "More actions for {environment}": "{environment} 的更多操作",
  "Switch off {environment}": "关闭 {environment}",
  "Switch on {environment}": "开启 {environment}",
  "Update available: {from} → {to}": "有可用更新：{from} → {to}",
  "Fix: {fix}": "解决方法：{fix}",
  "View environment": "查看环境",
  "Read threads, status, checkpoints, and configuration.": "查看会话、状态、检查点和配置。",
  "Operate tasks": "操作任务",
  "Start, update, and stop tasks.": "启动、更新和停止任务。",
  "Change environment settings": "更改环境设置",
  "Edit environment preferences and keybindings.": "编辑环境偏好设置和快捷键。",
  "Manage providers": "管理提供方",
  "Configure, install, sign in to, and update providers and usage sources.":
    "配置、安装、登录和更新提供方与用量来源。",
  "Maintain environment": "维护环境",
  "Update the server and control environment processes.": "更新服务器并控制环境进程。",
  "Control previews": "控制预览",
  "Open browser previews and host browser automation.":
    "打开浏览器预览，并在主机上运行浏览器自动化。",
  "View diagnostics and usage": "查看诊断和用量",
  "Read process diagnostics, resource history, and usage totals.":
    "查看进程诊断、资源历史记录和总用量。",
  "View terminals": "查看终端",
  "Read existing terminal output and status.": "查看现有终端的输出和状态。",
  "Use terminals": "使用终端",
  "Create terminals and send input to running shells.": "创建终端，并向运行中的 shell 发送输入。",
  "Change source control": "更改版本控制",
  "Commit, push, manage branches and repositories, and change pull requests.":
    "提交、推送、管理分支和仓库，以及修改 pull request。",
  "Read files": "读取文件",
  "Browse host files, search workspaces, and inspect local changes.":
    "浏览主机文件、搜索工作区和查看本地改动。",
  "Write files": "写入文件",
  "Edit workspace files and save plans to disk.": "编辑工作区文件，并将计划保存到磁盘。",
  "View access": "查看访问权限",
  "Inspect pairing links and authorized clients.": "查看配对链接和已授权的客户端。",
  "Manage access": "管理访问权限",
  "Issue and revoke credentials for other clients.": "为其他客户端发放和撤销凭据。",
  "View relay": "查看中继",
  "Inspect managed relay connectivity.": "查看托管中继的连接状态。",
  "Manage relay": "管理中继",
  "Change managed tunnel connectivity.": "更改托管隧道的连接状态。",
  "Connect to this environment to view this session’s permissions.":
    "连接此环境后即可查看此会话的权限。",
  "This environment did not accept your session. Reconnect to try again.":
    "此环境未接受你的会话。请重新连接后重试。",
  "Could not verify your permissions. Retrying automatically.": "无法验证你的权限。正在自动重试。",
  "Checking permissions…": "正在检查权限…",
  "Opens the hosted app, no install needed": "打开托管版应用，无需安装",
  "Devices on the same network": "同一网络中的设备",
  "Devices on your private network": "你的专用网络中的设备",
  "Reachable from anywhere": "可从任何位置访问",
  "Clients on this machine": "本机上的客户端",
  "Turn on Network access to detect Tailscale.": "开启网络访问后即可检测 Tailscale。",
  "Start Tailscale to set up HTTPS access through MagicDNS.":
    "启动 Tailscale，通过 MagicDNS 设置 HTTPS 访问。",
  "Up to date": "已是最新版本",
  "Downloading update": "正在下载更新",
  "Downloading update {version}": "正在下载更新 {version}",
  "Update downloaded": "已下载更新",
  "Update {version} downloaded": "已下载更新 {version}",
  "Update available": "有可用更新",
  "Update {version} available": "有可用更新 {version}",
  "Reconnecting: {error}": "正在重新连接：{error}",
  "Connection failed: {error}": "连接失败：{error}",
  Available: "可用",
  "Connecting...": "正在连接…",
  "Reconnecting...": "正在重新连接…",
  "Failed to connect. Reconnecting... Reason: {error}": "连接失败。正在重新连接…原因：{error}",
  "Connection failed. Reason: {error}": "连接失败。原因：{error}",
  Server: "服务器",
  "Cloud VM": "云虚拟机",
  Desktop: "桌面端",
  Laptop: "笔记本电脑",
  "Mini PC": "迷你电脑",
  Workstation: "工作站",
  Supervised: "需审批",
  "Auto-accept edits": "自动接受编辑",
  Auto: "自动",
  "Full access": "完全访问",
  "SSH host or alias is required.": "请输入 SSH 主机或别名。",
  "SSH port must be between 1 and 65535.": "SSH 端口必须在 1 到 65535 之间。",
  "Enter a backend host.": "请输入后端主机。",
  "Enter a pairing code.": "请输入配对码。",
  "Failed to connect SSH host.": "无法连接 SSH 主机。",
  "Could not answer the request. Try again.": "无法回复此请求。请重试。",
  Mobile: "移动端",
  Tablet: "平板电脑",
  Unknown: "未知",
  Expired: "已过期",
  "Expires in a moment": "即将过期",
  "Expires in {duration}": "{duration} 后过期",
  "just now": "刚刚",
  "{count}s": "{count} 秒",
  "{count}m": "{count} 分钟",
  "{count}h": "{count} 小时",
  "{count}d": "{count} 天",
  "via {route}": "通过 {route}",
  "This device is offline": "此设备离线",
  "This device is still loading its T3 Connect sign-in": "此设备仍在加载 T3 Connect 登录状态",
  "This device's clock is off": "此设备的时钟不准确",
  "T3 Connect returned an error": "T3 Connect 返回了错误",
  "This device could not prepare the connection": "此设备无法准备连接",
  "T3 Connect did not accept this device's sign-in": "T3 Connect 未接受此设备的登录",
  "This device can't reach T3 Connect": "此设备无法访问 T3 Connect",
  "Connect this device to the internet. T3 Code reconnects on its own.":
    "请将此设备连接到互联网。T3 Code 会自动重新连接。",
  "Wait a moment. T3 Code retries on its own.": "请稍等。T3 Code 会自动重试。",
  "If it keeps waiting, reload or restart T3 Code on this device.":
    "如果一直没有进展，请在此设备上重新加载或重启 T3 Code。",
  "Check that this device is signed in to the same T3 Connect account as the host.":
    "请确认此设备与主机登录了同一个 T3 Connect 账户。",
  "Wait a minute. T3 Code retries on its own.": "请稍等片刻。T3 Code 会自动重试。",
  "Wait a few minutes. T3 Code retries on its own.": "请等几分钟。T3 Code 会自动重试。",
  "If it keeps failing, copy the diagnostics and report it.":
    "如果仍然失败，请复制诊断信息并反馈。",
  "Restart T3 Code on this device.": "请在此设备上重启 T3 Code。",
  "Sign out of T3 Connect and sign in again.": "请退出 T3 Connect 后重新登录。",
  "Check this device's internet connection.": "请检查此设备的互联网连接。",
  "A VPN, firewall, or ad blocker on this device can block T3 Connect.":
    "此设备上的 VPN、防火墙或广告拦截器可能会阻止 T3 Connect 连接。",
  "A VPN, firewall, or DNS filter on this device can block the tunnel.":
    "此设备上的 VPN、防火墙或 DNS 过滤器可能会阻止隧道连接。",
  "Try another network, or add a direct route such as a Tailscale address.":
    "请尝试其他网络，或添加 Tailscale 地址等直连线路。",
  "Retry. If it keeps failing, copy the diagnostics.": "请重试。如果仍然失败，请复制诊断信息。",
  Cause: "原因",
  "HTTP status": "HTTP 状态",
  Attempts: "尝试次数",
  "Next retry": "下次重试",
  Route: "线路",
  "App version": "应用版本",
  "Host version": "主机版本",
  Error: "错误",
  "Trace ID": "追踪 ID",
  "Direct@@route": "直连",
  "{host} runs an older T3 Code": "{host} 运行的 T3 Code 版本较旧",
  "{host} is not linked to your T3 Connect account": "{host} 未关联到你的 T3 Connect 账户",
  "{host}'s tunnel is still being set up": "{host} 的隧道仍在设置中",
  "T3 Connect is not turned on for {host}": "{host} 尚未开启 T3 Connect",
  "{host}'s tunnel is offline": "{host} 的隧道离线",
  "Tunnel works, but T3 Code on {host} did not answer": "隧道正常，但 {host} 上的 T3 Code 没有响应",
  "T3 Code on {host} sent an unexpected answer": "{host} 上的 T3 Code 返回了异常响应",
  "{host}'s tunnel address did not resolve": "无法解析 {host} 的隧道地址",
  "Secure connection to {host}'s tunnel failed": "无法与 {host} 的隧道建立安全连接",
  "{host}'s tunnel refused the connection": "{host} 的隧道拒绝了连接",
  "{host} did not answer in time": "{host} 未及时响应",
  "This device can't reach {host}'s tunnel": "此设备无法访问 {host} 的隧道",
  "T3 Connect could not reach {host}'s tunnel": "T3 Connect 无法访问 {host} 的隧道",
  "T3 Code on {host} did not accept this device": "{host} 上的 T3 Code 未接受此设备",
  "T3 Code on {host} did not answer": "{host} 上的 T3 Code 没有响应",
  "On {host}, check Settings > Sharing & access or run `t3 connect status`.":
    "请在 {host} 上查看“设置 > 共享与访问”，或运行 `t3 connect status`。",
  "Update T3 Code on {host}.": "请更新 {host} 上的 T3 Code。",
  "Turn on automatic date and time on this device and on {host}, then retry.":
    "请在此设备和 {host} 上开启自动日期与时间，然后重试。",
  "On {host}, open Settings > Sharing & access and turn T3 Connect on.":
    "请在 {host} 上打开“设置 > 共享与访问”，并开启 T3 Connect。",
  "Make sure {host} is awake and T3 Code is running on it.":
    "请确认 {host} 未休眠，且 T3 Code 正在运行。",
  "A VPN or Tailscale exit node on {host} can block the tunnel (port 7844). Turn it off or allow the tunnel.":
    "{host} 上的 VPN 或 Tailscale 出口节点可能会阻止隧道连接（端口 7844）。请关闭它们或允许隧道连接。",
  "Open or restart T3 Code on {host}.": "请在 {host} 上打开或重启 T3 Code。",
  "Make sure {host} is awake and online.": "请确认 {host} 未休眠且已联网。",
  "If it keeps failing, remove {host} from this device and add it again.":
    "如果仍然失败，请从此设备移除 {host}，然后重新添加。",
  "Make sure T3 Code is running on {host}.": "请确认 {host} 上的 T3 Code 正在运行。",
  "{host} tunnel": "{host} 的隧道",
  "T3 Code on {host}": "{host} 上的 T3 Code",
  "Tunnel connected": "隧道已连接",
  "{count} connection": "{count} 个连接",
  "{count} connections": "{count} 个连接",
  "The server has not set up a T3 Connect tunnel.": "服务器尚未设置 T3 Connect 隧道。",
  "Run `t3 connect`, then restart T3 Code so it applies the link.":
    "请运行 `t3 connect`，然后重启 T3 Code 以应用关联。",
  "The tunnel client (cloudflared) is not running.": "隧道客户端（cloudflared）未运行。",
  "Restart T3 Code. If it stays down, check the server log for relay client errors.":
    "请重启 T3 Code。如果仍无法运行，请检查服务器日志中的中继客户端错误。",
  "A VPN, proxy, or firewall may block it.": "VPN、代理或防火墙可能会阻止连接。",
  "The tunnel is up, but it cannot reach the T3 server on this machine.":
    "隧道已运行，但无法访问本机上的 T3 服务器。",
  "Restart T3 Code so the tunnel uses the port the server listens on.":
    "请重启 T3 Code，让隧道使用服务器监听的端口。",
  "cloudflared has not connected to Cloudflare yet.": "cloudflared 尚未连接到 Cloudflare。",
  "Wait a minute. If it stays, check the network and the server log.":
    "请稍等片刻。如果仍然如此，请检查网络和服务器日志。",
  "Cloudflare has no live connection from this machine for the tunnel.":
    "Cloudflare 没有来自本机的可用隧道连接。",
  "Restart T3 Code. If it stays, run `t3 connect` again.":
    "请重启 T3 Code。如果仍然如此，请重新运行 `t3 connect`。",
  "The T3 Connect address does not resolve from this machine.": "本机无法解析 T3 Connect 地址。",
  "Check the DNS settings on this machine or its VPN.": "请检查本机或 VPN 的 DNS 设置。",
  "The T3 Connect address did not answer from this machine.":
    "本机访问 T3 Connect 地址时未收到响应。",
  "Check the network, VPN, or proxy on this machine.": "请检查本机的网络、VPN 或代理。",
  "Cloudflare's tunnel port ({port}) times out from this machine.":
    "本机连接 Cloudflare 隧道端口（{port}）时超时。",
  "Allow outbound TCP and UDP port {port}, or turn off the VPN or firewall that blocks it.":
    "请允许 TCP 和 UDP 端口 {port} 的出站连接，或关闭阻止连接的 VPN 或防火墙。",
  'Tailscale exit node "{name}" is on. Traffic to Cloudflare goes through it.':
    "Tailscale 出口节点“{name}”已开启。前往 Cloudflare 的流量会经过该节点。",
  "Tailscale exit node is on. Traffic to Cloudflare goes through it.":
    "Tailscale 出口节点已开启。前往 Cloudflare 的流量会经过该节点。",
  "The T3 Connect address answered with HTTP {status}.": "T3 Connect 地址返回了 HTTP {status}。",
  "The T3 Connect address answered with HTTP {status} (Cloudflare error {code}).":
    "T3 Connect 地址返回了 HTTP {status}（Cloudflare 错误 {code}）。",
  "Add a route to {environment}": "为 {environment} 添加线路",
  "Add it to an agent, e.g. claude mcp add --transport http t3 {url}":
    "将其添加到智能体，例如 claude mcp add --transport http t3 {url}",
  "Local network": "本地网络",
  "Custom HTTPS": "自定义 HTTPS",
  "Custom endpoint": "自定义端点",
  Manual: "手动",
  "unlink environment": "取消关联环境",
  "link environment": "关联环境",
  "{organization}'s policy does not allow connecting from other devices.":
    "{organization} 的策略不允许其他设备连接。",
  "{organization}'s policy does not allow T3 Connect.":
    "{organization} 的策略不允许使用 T3 Connect。",
  "Clipboard API is unavailable while copying {target}.": "复制 {target} 时无法使用剪贴板 API。",
  "Failed to copy {target} to the clipboard.": "无法将 {target} 复制到剪贴板。",
  Bot: "机器人",
  "tailscale set --exit-node=   (or allow outbound {port} on that network)":
    "tailscale set --exit-node=   （或允许该网络上端口 {port} 的出站连接）",
  "Loopback endpoint for this desktop app.": "此桌面应用的回环端点。",
  "Reachable from devices on the same network.": "同一网络中的设备可访问。",
  "User-configured HTTPS endpoint for this desktop backend.": "用户为此桌面后端配置的 HTTPS 端点。",
  "User-configured endpoint for this desktop backend.": "用户为此桌面后端配置的端点。",
  "Reachable from devices on the same Tailnet.": "同一 Tailnet 中的设备可访问。",
  "HTTPS endpoint served by Tailscale Serve.": "由 Tailscale Serve 提供的 HTTPS 端点。",
  "MagicDNS hostname. Configure Tailscale Serve for HTTPS access.":
    "MagicDNS 主机名。请配置 Tailscale Serve 以使用 HTTPS 访问。",
  "SSH authentication cancelled.": "SSH 身份验证已取消。",
  "Secure randomness is unavailable.": "无法获取安全随机数。",
  "T3 Code window is not available for SSH authentication.":
    "T3 Code 窗口不可用，无法进行 SSH 身份验证。",
  "SSH authentication timed out for {destination}.": "{destination} 的 SSH 身份验证超时。",
  "SSH authentication cancelled for {destination}.": "{destination} 的 SSH 身份验证已取消。",
  "SSH authentication was cancelled because the app window closed.":
    "应用窗口已关闭，SSH 身份验证已取消。",
  "SSH password prompt service stopped.": "SSH 密码提示服务已停止。",
  "Invalid SSH password prompt id.": "SSH 密码提示 ID 无效。",
  "SSH password prompt expired. Try connecting again.": "SSH 密码提示已过期。请重新连接。",
  "WSL is not available on this system": "此系统不支持 WSL",
  "Unable to list WSL distributions: {error}": "无法列出 WSL 发行版：{error}",
  "WSL distro is not installed: {distro}": "未安装 WSL 发行版：{distro}",
  "WSL has no installed distributions": "WSL 尚未安装任何发行版",
  "WSL has no default distribution": "WSL 尚未设置默认发行版",
  "WSL node-pty unavailable: {error}": "WSL node-pty 不可用：{error}",
  "WSL runtime unavailable: {error}": "WSL 运行时不可用：{error}",
  "WSL backend is still unavailable": "WSL 后端仍不可用",
  "WSL backend couldn't start": "WSL 后端无法启动",
  "The server started but did not become ready in time.": "服务器已启动，但未能及时就绪。",
  "The server could not start ({error}).": "服务器无法启动（{error}）。",
  "This T3 home is unavailable": "此 T3 主目录不可用",
  "Local backend is not configured.": "尚未配置本地后端。",
  "Failed to create the local desktop bearer session.": "无法创建桌面端本地 bearer 会话。",
  "WSL backend preflight could not start wsl.exe to probe for {subject}. Check that WSL is installed and the distro is accessible.":
    "WSL 后端预检无法启动 wsl.exe 以探测 {subject}。请确认已安装 WSL 且发行版可访问。",
  "WSL backend preflight lost communication with wsl.exe while probing for {subject}. Retry, or check that the distro is healthy.":
    "WSL 后端预检在探测 {subject} 时与 wsl.exe 失去连接。请重试，或检查发行版是否正常。",
  "WSL support is missing from this T3 Code build: the packaged Linux node-pty binary was not included. Install a build that includes WSL support.":
    "此 T3 Code 版本缺少 WSL 支持：未包含打包的 Linux node-pty 二进制文件。请安装支持 WSL 的版本。",
  "WSL distro is missing required tools: {tools}. Install {commands}, then retry.":
    "WSL 发行版缺少必要工具：{tools}。请运行 {commands} 安装后重试。",
  "WSL login-shell PATH could not be resolved during backend preflight.":
    "后端预检无法解析 WSL 登录 shell 的 PATH。",
  "Node.js was not found in the WSL distro. Install it (e.g. via nvm) and restart the desktop app.":
    "WSL 发行版中未找到 Node.js。请安装（例如通过 nvm）后重启桌面应用。",
  'WSL server dependencies could not be loaded (for example "node-pty"). The native packages the server needs are not unpacked where the WSL distro\'s Node can read them. This is a packaging problem with this build. Please report it.':
    "无法加载 WSL 服务器依赖（例如“node-pty”）。服务器所需的原生软件包未解压到 WSL 发行版的 Node 可读取的位置。这是此版本的打包问题，请报告。",
  "WSL Node.js {version} does not satisfy the server's required engine range ({range}). Install a compatible version, and restart the desktop app.":
    "WSL Node.js {version} 不符合服务器要求的版本范围（{range}）。请安装兼容版本后重启桌面应用。",
  "WSL runtime installation timed out. Check that the distro has free disk space, then retry.":
    "WSL 运行时安装超时。请确认发行版有可用磁盘空间后重试。",
  "WSL runtime installation lost communication with wsl.exe. Retry, or check that the distro is healthy.":
    "WSL 运行时安装过程中与 wsl.exe 失去连接。请重试，或检查发行版是否正常。",
  "WSL runtime installation failed (exit {code}): {error}":
    "WSL 运行时安装失败（退出码 {code}）：{error}",
  "WSL runtime installation completed without reporting its cache path.":
    "WSL 运行时安装已完成，但未报告缓存路径。",
  "Failed to run wsl.exe --list --verbose: {error}": "运行 wsl.exe --list --verbose 失败：{error}",
  "Another T3 Code server, such as the background service, is using this data directory, or an older background service is set up for it. Stop that server or try `t3 update`. If the older launcher cannot update, run `t3 service uninstall` and optionally reinstall with `t3 service install` from a current CLI. Use `npx t3@latest` if `t3` is missing or outdated, and pass `--base-dir` with the service's T3 home to each command. Then reopen T3 Code. You can also set a separate T3CODE_HOME and pair with the running server.":
    "另一个 T3 Code 服务器（例如后台服务）正在使用此数据目录，或此目录已配置旧版后台服务。请停止该服务器，或尝试 `t3 update`。如果旧版启动器无法更新，请运行 `t3 service uninstall`，并可使用当前 CLI 运行 `t3 service install` 重新安装。如果 `t3` 缺失或过旧，请使用 `npx t3@latest`，并在每条命令中通过 `--base-dir` 指定该服务的 T3 主目录。然后重新打开 T3 Code。你也可以设置单独的 T3CODE_HOME，并与正在运行的服务器配对。",
  "Another T3 Code server is using this distro's T3 home, or an older background service is set up for it. Stop that server or pair with it, or try `t3 update` in the distro. If the older launcher cannot update, run `t3 service uninstall` and optionally reinstall with `t3 service install` from a current CLI in the distro. Use `npx t3@latest` if `t3` is missing or outdated, and pass `--base-dir` with the service's T3 home to each command.":
    "另一个 T3 Code 服务器正在使用此发行版的 T3 主目录，或此目录已配置旧版后台服务。请停止该服务器或与其配对，或在发行版中尝试 `t3 update`。如果旧版启动器无法更新，请运行 `t3 service uninstall`，并可在发行版中使用当前 CLI 运行 `t3 service install` 重新安装。如果 `t3` 缺失或过旧，请使用 `npx t3@latest`，并在每条命令中通过 `--base-dir` 指定该服务的 T3 主目录。",
  "Check this address": "请核对此地址",
  "This app cannot confirm it is one of your machines. The pairing code you paste is sent there.":
    "此应用无法确认它是你的机器之一。你粘贴的配对码会发送到那里。",
} as const;

const dynamicLabels = [
  "SSH authentication timed out for {destination}.",
  "SSH authentication cancelled for {destination}.",
  "Unable to list WSL distributions: {error}",
  "WSL distro is not installed: {distro}",
  "WSL node-pty unavailable: {error}",
  "WSL runtime unavailable: {error}",
  "The server could not start ({error}).",
  "WSL backend preflight could not start wsl.exe to probe for {subject}. Check that WSL is installed and the distro is accessible.",
  "WSL backend preflight lost communication with wsl.exe while probing for {subject}. Retry, or check that the distro is healthy.",
  "WSL distro is missing required tools: {tools}. Install {commands}, then retry.",
  "WSL Node.js {version} does not satisfy the server's required engine range ({range}). Install a compatible version, and restart the desktop app.",
  "WSL runtime installation failed (exit {code}): {error}",
  "Failed to run wsl.exe --list --verbose: {error}",

  "tailscale set --exit-node=   (or allow outbound {port} on that network)",
  "{organization}'s policy does not allow connecting from other devices.",
  "{organization}'s policy does not allow T3 Connect.",
  "Clipboard API is unavailable while copying {target}.",
  "Failed to copy {target} to the clipboard.",

  "Downloading update {version}",
  "Update {version} downloaded",
  "Update {version} available",
  "Reconnecting: {error}",
  "Connection failed: {error}",
  "Failed to connect. Reconnecting... Reason: {error}",
  "Connection failed. Reason: {error}",
  "{count} client",
  "{count} clients",
  "{count} pairing link",
  "{count} pairing links",
  "{count} connection",
  "{count} connections",
  "Cloudflare's tunnel port ({port}) times out from this machine.",
  "Allow outbound TCP and UDP port {port}, or turn off the VPN or firewall that blocks it.",
  'Tailscale exit node "{name}" is on. Traffic to Cloudflare goes through it.',
  "The T3 Connect address answered with HTTP {status}.",
  "The T3 Connect address answered with HTTP {status} (Cloudflare error {code}).",
] as const satisfies ReadonlyArray<keyof typeof settingsConnectionsMessages>;

const labelPatterns = dynamicLabels.map((key) => {
  const parameters: string[] = [];
  const pattern = key
    .split(/(\{\w+\})/u)
    .map((part) => {
      if (/^\{\w+\}$/u.test(part)) {
        parameters.push(part.slice(1, -1));
        return ["count", "port", "status", "code"].includes(part.slice(1, -1)) ? "(\\d+)" : "(.+?)";
      }
      return part.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    })
    .join("");
  return { key, parameters, pattern: new RegExp(`^${pattern}$`, "u") };
});

export function translateConnectionLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  // Electron prefixes rejected IPC errors with the channel and error class.
  const ipcError =
    /^(?:Error invoking remote method 'desktop:[^']+':\s*(?:\w*Error:\s*)?|\w*Error:\s*)([\s\S]+)$/u.exec(
      label,
    );
  if (ipcError) {
    const message = ipcError[1]!;
    const translated = translateConnectionLabel(message, locale);
    if (translated !== message) return translated;
  }
  if (label === "Direct") return translate(locale, settingsConnectionsMessages, "Direct@@route");
  if (Object.hasOwn(settingsConnectionsMessages, label)) {
    return translate(
      locale,
      settingsConnectionsMessages,
      label as keyof typeof settingsConnectionsMessages,
    );
  }
  const duration = /^(\d+)([smhd])$/u.exec(label);
  if (duration) {
    const key = `{count}${duration[2]}` as "{count}s" | "{count}m" | "{count}h" | "{count}d";
    return translate(locale, settingsConnectionsMessages, key, { count: duration[1]! });
  }
  if (/^Expires in (?:\d+[smhd] ?)+$/u.test(label)) {
    return translate(locale, settingsConnectionsMessages, "Expires in {duration}", {
      duration: label
        .slice("Expires in ".length)
        .split(" ")
        .map((part) => translateConnectionLabel(part, locale))
        .join(" "),
    });
  }
  for (const { key, parameters, pattern } of labelPatterns) {
    const match = pattern.exec(label);
    if (!match) continue;
    return translate(
      locale,
      settingsConnectionsMessages,
      key,
      Object.fromEntries(
        parameters.map((parameter, index) => [
          parameter,
          parameter === "error"
            ? translateConnectionLabel(match[index + 1]!, locale)
            : match[index + 1]!,
        ]),
      ),
    );
  }
  if (
    /^\d+ clients?(?: · \d+ pairing links?)?$/u.test(label) ||
    label.startsWith("Tunnel connected · ")
  ) {
    return label
      .split(" · ")
      .map((part) => translateConnectionLabel(part, locale))
      .join(" · ");
  }
  return translateRuntimeError(label, locale);
}

const diagnosisHostLabels = (
  Object.keys(settingsConnectionsMessages) as Array<keyof typeof settingsConnectionsMessages>
).filter((key) => key.includes("{host}"));

export function translateConnectionDiagnosisLabel(
  label: string,
  host: string,
  locale: Locale,
): string {
  if (locale !== "zh-CN") return label;
  const key = diagnosisHostLabels.find(
    (candidate) => candidate.replaceAll("{host}", () => host) === label,
  );
  return key === undefined
    ? translateConnectionLabel(label, locale)
    : translate(locale, settingsConnectionsMessages, key, { host });
}
