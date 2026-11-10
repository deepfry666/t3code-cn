export const authUiMessages = {
  "Could not reach this environment. Try again.": "无法访问此环境。请重试。",
  "The sign-in could not continue.": "无法继续登录。",
  "Agent sign-in": "智能体登录",
  "Checking the sign-in request": "正在检查登录请求",
  "One moment while this environment verifies the agent's request.":
    "请稍候，此环境正在验证智能体的请求。",
  "This sign-in cannot continue": "无法继续此次登录",
  "Close this page and start the sign-in again from your agent.":
    "请关闭此页面，然后从你的智能体重新发起登录。",
  "Connect {client}": "连接 {client}",
  "This agent wants to use the threads in every project on {host}.":
    "此智能体想要使用 {host} 上所有项目中的会话。",
  App: "应用",
  "· name set by the app": "· 名称由应用设定",
  "Access goes to": "授权给",
  "on the computer that opened this page": "（位于打开此页面的电脑上）",
  "Only approve a sign-in you just started.": "请只批准你刚刚发起的登录。",
  "What it may do": "允许它做什么",
  "Beyond read only, it can start, message and stop threads, and none of them can run with more than the mode you pick.":
    "除只读外，它还可以启动会话、向会话发消息和停止会话，且任何会话的权限都不会超过你选择的模式。",
  "Or paste a sign-in code": "或粘贴登录码",
  "Sign-in code": "登录码",
  "Paste a code": "粘贴登录码",
  "Get one from Use T3 Code in another app (MCP), Settings → Sharing & access, or {command} on this machine.":
    "可在“在其他应用中使用 T3 Code（MCP）”或“设置 → 共享与访问”中获取，也可在本机运行 {command}。",
  Access: "访问权限",
  "Approve {access} with T3 Connect": "通过 T3 Connect 批准（{access}）",
  "Approve {access}": "批准（{access}）",
  "Approving…": "正在批准…",
  Approve: "批准",
  "Denying…": "正在拒绝…",
  Deny: "拒绝",
  "{organization} limits threads to {mode}.": "{organization} 将会话权限限制为{mode}。",

  "Pairing with this environment": "正在与此环境配对",
  "Validating the pairing link and preparing your session.": "正在验证配对链接并准备登录状态。",
  "Pair with this environment": "与此环境配对",
  "Pairing token": "配对 token",
  "Paste a one-time token or pairing secret": "粘贴一次性 token 或配对凭据",
  "Pairing...": "正在配对…",
  Continue: "继续",
  "Reload app": "重新加载应用",
  "Connecting to this backend.": "正在连接此后端。",
  "This pairing link is missing its backend host or token.": "此配对链接缺少后端主机或 token。",
  "This one-time pairing token was already submitted. Request a new pairing link.":
    "此一次性配对 token 已提交过。请申请新的配对链接。",
  "{environment} is saved in this browser.": "{environment} 已保存在此浏览器中。",
  "The environment": "此环境",
  "{error} If the backend accepted this one-time token, request a new pairing link before retrying.":
    "{error} 如果后端已接受此一次性 token，请先申请新的配对链接再重试。",
  "Backend paired": "后端已配对",
  "Pairing failed": "配对失败",
  "Pairing backend": "正在配对后端",
  "Host: {host}": "主机：{host}",
  "Verify the backend is reachable from this browser, supports CORS for hosted clients, and is served over HTTPS when opening this page from HTTPS.":
    "请确认此浏览器能访问该后端、后端为托管客户端启用了 CORS，并且在通过 HTTPS 打开此页面时后端也使用 HTTPS。",
  "Try again": "重试",
  "Open app": "打开应用",
  "Authentication failed.": "身份验证失败。",
  "This environment expects a trusted pairing credential before the app can connect.":
    "此环境需要可信的配对凭据，应用才能连接。",
  "Enter a pairing token to start a session with this environment.":
    "输入配对 token，即可开始与此环境的连接。",
  "Desktop-managed pairing and one-time pairing tokens are both accepted for this environment.":
    "此环境同时接受桌面版托管配对和一次性配对 token。",
  "This environment is desktop-managed. Open it from the desktop app or paste a bootstrap credential if one was issued explicitly.":
    "此环境由桌面版托管。请从桌面应用打开；如果另外签发了引导凭据，也可以粘贴在这里。",
  "This environment accepts one-time pairing tokens. Pairing links can open this page directly, or you can paste the token here.":
    "此环境接受一次性配对 token。配对链接可以直接打开此页面，你也可以在这里粘贴 token。",
} as const;
