export const runtimeErrorsMessages = {
  "{host} froze for {seconds}s": "{host} 卡顿了 {seconds} 秒",
  "Could not create the websocket authorization proof.": "无法创建 WebSocket 授权证明。",
  "Your cloud sign-in changed. Sign in again to authorize the environment.":
    "你的云端登录已变化。请重新登录以授权环境。",
  "Waiting for the T3 Connect sign-in to load.": "正在等待 T3 Connect 登录状态加载。",
  "Could not create the environment authorization proof.": "无法创建环境授权证明。",
  "Could not load the environment authorization key.": "无法加载环境授权密钥。",
  "Timed out renewing the environment credential.": "续期环境凭据超时。",
  "This client is not supported by this server. Update your app or use a compatible release to connect to {host}.":
    "此服务器不支持这个客户端。请更新应用或使用兼容的版本以连接到 {host}。",
  "This client requires a newer server. Update T3 Code on {host} to connect.":
    "此客户端需要更新的服务器。请更新 {host} 上的 T3 Code 后再连接。",
  "Connection profile {id} is unavailable.": "连接配置 {id} 不可用。",
  "Connection credential {id} is unavailable.": "连接凭据 {id} 不可用。",
  "Connected environment {actual} does not match {expected}.":
    "已连接的环境 {actual} 与 {expected} 不一致。",
  "The environment credential is invalid.": "环境凭据无效。",
  "The environment credential does not grant the required access.":
    "环境凭据未授予所需的访问权限。",
  "The environment rejected the authentication request.": "环境拒绝了身份验证请求。",
  "The environment endpoint could not be found.": "找不到环境端点。",
  "The environment could not authorize the connection.": "环境无法授权此连接。",
  "Its CPU is overloaded (load {load} on {cores} cores).":
    "其 CPU 负载过高（{cores} 个核心的负载为 {load}）。",
  "T3 Code on {host} was too busy to answer.": "{host} 上的 T3 Code 太忙，未能响应。",
  "The pairing details are invalid.": "配对信息无效。",
  "That address reaches {host}, a different machine. Add it as its own environment instead.":
    "该地址指向另一台机器 {host}。请将其添加为独立环境。",
  "Only saved bearer environments can be edited.": "只能编辑已保存的 bearer 环境。",
  "The saved bearer credential is unavailable.": "已保存的 bearer 凭据不可用。",
  "Environment label cannot be empty.": "环境名称不能为空。",
  "The environment URL is invalid.": "环境 URL 无效。",
  "Pull request routing preferences are unavailable on this client.":
    "此客户端无法使用 pull request 路由偏好设置。",
  "This environment does not have a saved connection endpoint.": "此环境没有已保存的连接端点。",
  "That address claims to be {host}, which is already saved. Add it as a route from that environment's settings instead.":
    "该地址标识为已保存的 {host}。请在该环境的设置中将其添加为路由。",
  "The route order must list every saved route once.":
    "路由顺序必须包含每条已保存的路由，且不能重复。",
  "Connection profile {id} is not a bearer connection.": "连接配置 {id} 不是 bearer 连接。",
  "Connection profile {id} is not an SSH connection.": "连接配置 {id} 不是 SSH 连接。",
  "Your DNS or firewall may be blocking T3 Connect. Try another network, such as a different Wi-Fi or mobile data.":
    "你的 DNS 或防火墙可能阻止了 T3 Connect。请尝试其他网络，例如其他 Wi-Fi 或移动数据网络。",
  "It may be overloaded, asleep, or off the network.": "它可能负载过高、处于睡眠状态或已断网。",
  "Hint: Check that automatic date and time is enabled on both devices, then try again.":
    "提示：请确认两台设备都已开启自动设置日期和时间，然后重试。",
  "Hint: Try again. If the problem continues, copy the trace ID.":
    "提示：请重试。如果问题持续出现，请复制追踪 ID。",
  "Hint: Try again. If it still fails, clock skew may be the cause; check that automatic date and time is enabled on both devices.":
    "提示：请重试。如果仍然失败，可能是时钟偏差导致的；请确认两台设备都已开启自动设置日期和时间。",
  "Relay rejected the cloud session token.": "中继拒绝了云端会话 token。",
  "Relay rejected the DPoP proof.": "中继拒绝了 DPoP 证明。",
  "Relay rejected the authenticated request.": "中继拒绝了已验证身份的请求。",
  "Relay rejected an expired environment link proof.": "中继拒绝了已过期的环境关联证明。",
  "Relay rejected the environment link proof ({reason}).": "中继拒绝了环境关联证明（{reason}）。",
  "Relay has no active link for this environment. If it was deregistered from T3 Connect, link it again on that machine.":
    "中继没有此环境的有效关联。如果它已从 T3 Connect 注销，请在那台机器上重新关联。",
  "The environment's T3 Connect tunnel is still being set up.":
    "此环境的 T3 Connect 隧道仍在设置中。",
  "Relay rejected the environment connection request ({reason}).":
    "中继拒绝了环境连接请求（{reason}）。",
  "Relay rejected the environment connection request.": "中继拒绝了环境连接请求。",
  "Relay could not reach the environment endpoint ({reason}).":
    "中继无法访问环境端点（{reason}）。",
  "Relay timed out while contacting the environment endpoint.": "中继连接环境端点超时。",
  "Relay could not link the environment ({reason}).": "中继无法关联环境（{reason}）。",
  "Relay cannot provision the managed endpoint ({reason}).": "中继无法配置托管端点（{reason}）。",
  "Failed stage: {stage}.": "失败阶段：{stage}。",
  "Relay refused the link: this account already has its maximum of {max} managed tunnels. Unlink an environment, or link a paid T3 Chat account in your T3 Connect account settings on web or desktop. Pro raises the default limit to {pro} and Premier to {premier}.":
    "中继拒绝了关联：此账户已达到 {max} 条托管隧道的上限。请取消关联一个环境，或在网页端或桌面端的 T3 Connect 账户设置中关联付费 T3 Chat 账户。Pro 将默认上限提升至 {pro} 条，Premier 提升至 {premier} 条。",
  "Relay refused the link: this account already has its maximum of {max} managed tunnels. Unlink an environment to free one up.":
    "中继拒绝了关联：此账户已达到 {max} 条托管隧道的上限。请取消关联一个环境以释放名额。",
  "Relay rejected an expired agent activity publish proof.":
    "中继拒绝了已过期的智能体活动发布证明。",
  "Relay rejected the agent activity publish proof ({reason}).":
    "中继拒绝了智能体活动发布证明（{reason}）。",
  "Relay encountered an internal error ({reason}).": "中继发生了内部错误（{reason}）。",
  "Relay timed out before it finished the request (HTTP 504). Try again in a few minutes. If it keeps failing, copy the trace ID when you report it.":
    "中继未能及时完成请求（HTTP 504）。请稍后重试。如果持续失败，请在报告问题时附上复制的追踪 ID。",
  "Relay returned an unexpected HTTP {status}.": "中继返回了意外的 HTTP {status}。",
  "Could not load relay DPoP proof key.": "无法加载中继 DPoP 证明密钥。",
  "Relay URL must be a secure absolute HTTPS origin.": "中继 URL 必须是安全的绝对 HTTPS 源地址。",
  "Relay granted unexpected DPoP access token scopes.":
    "中继授予了意外的 DPoP 访问 token 权限范围。",
  "Could not create relay token DPoP proof.": "无法创建中继 token 的 DPoP 证明。",
  "Could not create relay request DPoP proof.": "无法创建中继请求的 DPoP 证明。",
  "Could not obtain the T3 Connect session token.": "无法获取 T3 Connect 会话 token。",
  "The T3 Connect session token is unavailable.": "T3 Connect 会话 token 不可用。",
  "Sign in to T3 Connect before loading relay data.": "请先登录 T3 Connect，再加载中继数据。",
  "Could not load T3 Connect data.": "无法加载 T3 Connect 数据。",
  "This connection requires {scope}.": "此连接需要 {scope} 权限。",
  "Failed to load archived threads.": "无法加载归档会话。",
  "This connection cannot read host files. Pair again with a new link to view it.":
    "此连接无法读取主机文件。请使用新链接重新配对后查看。",
  "No DPoP signer is available to authorize the environment request.":
    "没有可用于授权环境请求的 DPoP 签名器。",
  "Could not create the environment request authorization proof.": "无法创建环境请求授权证明。",
  "No relay authorization service is available for the environment request.":
    "没有可用于此环境请求的中继授权服务。",
  "Could not authorize the environment request.": "无法授权环境请求。",
  "The environment rejected the renewed session authorization.": "环境拒绝了续期后的会话授权。",
  "This environment is not connected.": "此环境未连接。",
  "The environment has no session.": "此环境没有会话。",
  "The source environment is not connected.": "来源环境未连接。",
  "Your session there cannot create pairing codes. Paste a code from there instead.":
    "你在那边的会话无法创建配对码。请粘贴在那边生成的配对码。",
  "Could not get a pairing code from there. Paste a code from there instead.":
    "无法获取那边的配对码。请粘贴在那边生成的配对码。",
  "The folder for threads without a project has not reached this device yet. Try again.":
    "无项目会话的文件夹尚未同步到此设备。请重试。",
  "This environment session is no longer valid (invalid_credential). Refresh the page or quit and reopen T3 Code.":
    "此环境会话已失效（invalid_credential）。请刷新页面，或退出并重新打开 T3 Code。",
  "The environment did not respond to the PR request.": "环境未响应 PR 请求。",
  "The environment was removed.": "环境已被移除。",
  "The environment HTTP connection is not ready.": "环境 HTTP 连接尚未就绪。",
  "This pull request cannot be merged.": "无法合并此 pull request。",
  "Open this pull request to merge its stack.": "请打开此 pull request 以合并其堆栈。",
  "Could not choose a merge method.": "无法选择合并方式。",
  "Diff no longer available. Refresh the comparison.": "差异已不可用。请刷新比较。",
  "The service launcher resumed without committing the requested server version.":
    "服务启动器已恢复，但未应用请求的服务器版本。",
  "The desktop app resumed without installing the prepared update.":
    "桌面应用已恢复，但未安装准备好的更新。",
  "Could not synchronize environment data.": "无法同步环境数据。",
  "Could not synchronize the thread.": "无法同步会话。",
  "Could not load earlier activity.": "无法加载更早的活动。",
  "Work history changed. Retry loading it.": "工作记录已变化。请重新加载。",
  "History did not advance.": "历史记录未推进。",
  "Work history did not advance.": "工作记录未推进。",
  "Could not check this connection's access to diagnostics and usage.":
    "无法检查此连接的诊断和用量访问权限。",
  "This connection does not have access to diagnostics and usage.":
    "此连接没有诊断和用量访问权限。",
  "Source control action failed.": "版本控制操作失败。",
  "Voice transcription was cancelled.": "语音转录已取消。",
  "The expanded archive exceeds the preview size or compression ratio limit.":
    "解压后的压缩包超出预览大小或压缩比限制。",
  "Remote environment endpoint returned an invalid response from {url}.":
    "远程环境端点从 {url} 返回了无效响应。",
  "Failed to fetch remote environment endpoint {url} ({reason}).":
    "无法访问远程环境端点 {url}（{reason}）。",
  "Relay returned status for a different environment.": "中继返回了其他环境的状态。",
  "Relay returned status for a different environment endpoint.": "中继返回了其他环境端点的状态。",
  "Relay returned a descriptor for a different environment.": "中继返回了其他环境的描述。",
  "Relay DPoP access token exchange timed out.": "中继交换 DPoP 访问 token超时。",
  "Relay environment listing timed out.": "中继列出环境超时。",
  "Relay client device listing timed out.": "中继列出客户端设备超时。",
  "Relay environment link challenge timed out.": "中继获取环境关联质询超时。",
  "Relay environment linking timed out.": "中继关联环境超时。",
  "Relay environment unlinking timed out.": "中继取消关联环境超时。",
  "Relay environment status request timed out.": "中继请求环境状态超时。",
  "Relay environment connection timed out.": "中继连接环境超时。",
  "Relay mobile device registration timed out.": "中继注册移动设备超时。",
  "Relay mobile device unregistration timed out.": "中继注销移动设备超时。",
  "Relay Live Activity registration timed out.": "中继注册实时活动超时。",
  "Relay agent activity snapshot timed out.": "中继获取智能体活动快照超时。",
  "Relay T3 Chat link lookup timed out.": "中继查询 T3 Chat 关联超时。",
  "Relay T3 Chat link request timed out.": "中继请求 T3 Chat 关联超时。",
  "Relay T3 Chat unlinking timed out.": "中继取消 T3 Chat 关联超时。",
  "Could not exchange relay DPoP access token.": "无法通过中继交换 DPoP 访问 token。",
  "Could not exchange relay DPoP access token: {error}":
    "无法通过中继交换 DPoP 访问 token：{error}",
  "Could not list relay-managed environments.": "无法通过中继列出环境。",
  "Could not list relay-managed environments: {error}": "无法通过中继列出环境：{error}",
  "Could not list relay client devices.": "无法通过中继列出客户端设备。",
  "Could not list relay client devices: {error}": "无法通过中继列出客户端设备：{error}",
  "Could not create relay environment link challenge.": "无法通过中继获取环境关联质询。",
  "Could not create relay environment link challenge: {error}":
    "无法通过中继获取环境关联质询：{error}",
  "Could not link relay environment.": "无法通过中继关联环境。",
  "Could not link relay environment: {error}": "无法通过中继关联环境：{error}",
  "Could not unlink relay environment.": "无法通过中继取消关联环境。",
  "Could not unlink relay environment: {error}": "无法通过中继取消关联环境：{error}",
  "Could not get relay environment status.": "无法通过中继请求环境状态。",
  "Could not get relay environment status: {error}": "无法通过中继请求环境状态：{error}",
  "Could not connect relay environment.": "无法通过中继连接环境。",
  "Could not connect relay environment: {error}": "无法通过中继连接环境：{error}",
  "Could not register relay mobile device.": "无法通过中继注册移动设备。",
  "Could not register relay mobile device: {error}": "无法通过中继注册移动设备：{error}",
  "Could not unregister relay mobile device.": "无法通过中继注销移动设备。",
  "Could not unregister relay mobile device: {error}": "无法通过中继注销移动设备：{error}",
  "Could not register relay live activity.": "无法通过中继注册实时活动。",
  "Could not register relay live activity: {error}": "无法通过中继注册实时活动：{error}",
  "Could not read relay agent activity snapshot.": "无法通过中继获取智能体活动快照。",
  "Could not read relay agent activity snapshot: {error}":
    "无法通过中继获取智能体活动快照：{error}",
  "Could not read linked T3 Chat account.": "无法通过中继查询 T3 Chat 关联。",
  "Could not read linked T3 Chat account: {error}": "无法通过中继查询 T3 Chat 关联：{error}",
  "Could not start T3 Chat linking.": "无法通过中继请求 T3 Chat 关联。",
  "Could not start T3 Chat linking: {error}": "无法通过中继请求 T3 Chat 关联：{error}",
  "Could not unlink T3 Chat account.": "无法通过中继取消 T3 Chat 关联。",
  "Could not unlink T3 Chat account: {error}": "无法通过中继取消 T3 Chat 关联：{error}",
  "Enter the full owner/repository name.": "请输入完整的所有者/仓库名称。",
  "Provider status unavailable. Open Source Control settings and rescan.":
    "无法获取提供方状态。请打开“版本控制”设置并重新扫描。",
  "Enter a project path.": "请输入项目路径。",
  "Windows-style paths are only supported on Windows environments.":
    "仅 Windows 环境支持 Windows 风格的路径。",
  "Relative paths require an active project in this environment.":
    "相对路径需要此环境中有活动项目。",
  "No project in this environment can read {host}/{repository}.":
    "此环境中没有项目能读取 {host}/{repository}。",
} as const;
