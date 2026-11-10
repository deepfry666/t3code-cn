import { translateMaintenanceLabel } from "../settings/settingsMaintenance.messages";
import { translate, type Locale } from "../../i18n/locale";

export const sidebarUiMessages = {
  "now@@sidebar time": "刚刚",
  // Sidebar chrome and layout
  "Toggle main sidebar": "切换主侧边栏",
  Threads: "会话",
  Sidebar: "侧边栏",
  "Displays the mobile sidebar.": "显示移动端侧边栏。",
  "Toggle Sidebar": "切换侧边栏",
  "Resize Sidebar": "调整侧边栏宽度",
  "Drag to resize sidebar": "拖动以调整侧边栏宽度",

  // Thread rows
  "You're currently checked out on another branch.": "你当前检出的是另一个分支。",
  "Handed off from {names}": "由 {names} 交接而来",
  "{count} terminal process running": "{count} 个终端进程正在运行",
  "{count} terminal processes running": "{count} 个终端进程正在运行",
  "Usage limit reached": "已达到用量上限",
  "Error occurred": "发生错误",
  "Snooze thread": "暂缓会话",
  "Custom…": "自定义…",
  Pin: "置顶",
  Unpin: "取消置顶",
  Settle: "收尾",
  "Un-settle": "取消收尾",
  Wake: "唤醒",
  "Thread title": "会话标题",
  "Setting up": "正在设置",
  Goal: "目标",
  Working: "运行中",
  Waiting: "等待中",
  Approval: "待批准",
  "Input@@thread-status": "待输入",
  Request: "待响应",
  "Limited@@thread-status": "受限",
  Failed: "失败",
  Woke: "已唤醒",
  Done: "完成",
  "Unsent draft": "未发送的草稿",
  "Discard draft": "丢弃草稿",
  "Unpin thread": "取消置顶会话",
  Pinned: "已置顶",
  "Regenerating title": "正在重新生成标题",
  "Dismiss Woke notification": "忽略已唤醒通知",
  "Wake thread now": "立即唤醒会话",
  "Un-settle thread": "取消会话收尾",
  "Settle thread": "收尾会话",
  "{count} attachment": "{count} 个附件",
  "{count} attachments": "{count} 个附件",

  // Project folders
  "New thread in {project}": "在 {project} 中新建会话",
  ", needs you": "，需要你处理",
  ", failed": "，失败",
  ", done": "，已完成",
  ", working": "，运行中",

  // Undo notice
  Undo: "撤销",
  Settled: "已收尾",
  Snoozed: "已暂缓",
  Unpinned: "已取消置顶",
  Archived: "已归档",
  Discarded: "已丢弃",
  "{shortcut} to undo": "按 {shortcut} 撤销",
  "Settled {count} thread": "已收尾 {count} 个会话",
  "Settled {count} threads": "已收尾 {count} 个会话",
  "Snoozed {count} thread": "已暂缓 {count} 个会话",
  "Snoozed {count} threads": "已暂缓 {count} 个会话",
  "Unpinned {count} thread": "已取消置顶 {count} 个会话",
  "Unpinned {count} threads": "已取消置顶 {count} 个会话",
  "Archived {count} thread": "已归档 {count} 个会话",
  "Archived {count} threads": "已归档 {count} 个会话",
  "Discarded {count} draft": "已丢弃 {count} 份草稿",
  "Discarded {count} drafts": "已丢弃 {count} 份草稿",

  // Update capsule and dialog
  Later: "稍后",
  Retry: "重试",
  Dismiss: "忽略",
  "This app": "此应用",
  "this app": "此应用",
  Server: "服务器",
  "Desktop app": "桌面应用",
  Machine: "机器",
  Providers: "智能体提供方",
  Skipped: "已跳过",
  Update: "更新",
  Cancel: "取消",
  "restarts last": "最后重启",
  "Restart to update": "重启以更新",
  "restarts in {seconds}s": "{seconds} 秒后重启",
  "restarts after the servers": "在所有服务器之后重启",
  "Restart in {seconds}s": "{seconds} 秒后重启",
  "Restarting…": "正在重启…",
  restarting: "正在重启",
  Downloading: "正在下载",
  downloading: "正在下载",
  "Downloading {percent}%": "正在下载 {percent}%",
  "downloading {percent}%": "正在下载 {percent}%",
  waiting: "等待中",
  done: "完成",
  failed: "失败",
  "updating providers": "正在更新智能体提供方",
  "{done} of {total} updated": "已更新 {done}/{total}",
  "{label} failed": "{label} 失败",
  "{count} failed": "{count} 项失败",
  "Update {count} machine?": "更新 {count} 台机器？",
  "Update {count} machines?": "更新 {count} 台机器？",
  "{count} provider update": "{count} 个提供方更新",
  "{count} provider updates": "{count} 个提供方更新",
  "{count} skipped": "已跳过 {count} 项",
  "{count} running thread": "{count} 个会话正在运行",
  "{count} running threads": "{count} 个会话正在运行",
  "{count} running": "{count} 个运行中",
  "{count} running thread will be interrupted.": "{count} 个运行中的会话将被中断。",
  "{count} running threads will be interrupted.": "{count} 个运行中的会话将被中断。",
  "{count} running thread will be interrupted and can resume after the restart.":
    "{count} 个运行中的会话将被中断，重启后可继续。",
  "{count} running threads will be interrupted and can resume after the restart.":
    "{count} 个运行中的会话将被中断，重启后可继续。",
  "{count} running thread can resume after the restart.": "{count} 个运行中的会话可在重启后继续。",
  "{count} running threads can resume after the restart.": "{count} 个运行中的会话可在重启后继续。",
  "Update {targets}": "更新 {targets}",
  "Updated {targets}": "已更新 {targets}",
  "{count} server": "{count} 台服务器",
  "{count} servers": "{count} 台服务器",
  "{count} provider": "{count} 个提供方",
  "{count} providers": "{count} 个提供方",
  "{names} is still restarting.": "{names} 仍在重启。",
  "{names} are still restarting.": "{names} 仍在重启。",
  "Update failed": "更新失败",
  "Update did not apply": "更新未生效",
  "T3 Code is still on {version}. Install {next} again from the update button.":
    "T3 Code 仍停留在 {version}。请从更新按钮重新安装 {next}。",
  "Not back after {minutes} minutes": "{minutes} 分钟后仍未恢复",
  "Could not start the update": "无法开始更新",
  "Could not update everything": "无法全部更新",
  "not connected": "未连接",
  "no permission": "没有权限",
  "already updating": "正在更新",
  "needs a manual update": "需要手动更新",
  "needs a newer desktop app": "需要更高版本的桌面应用",
  "runs a preview build": "运行的是预览版",
  "switch the Mac app on that Mac": "需要在那台 Mac 上切换 Mac 应用",
  "on the {channel} channel": "使用 {channel} 通道",
  Stable: "稳定版",
  Nightly: "Nightly 版",
  ", @@list-separator": "、",
  " and @@list-separator": " 和 ",
  ", and @@list-separator": " 和 ",

  // Release notes
  "Update ready to download": "更新已可下载",
  "What's changed": "更新内容",
  "Changes in {version}": "{version} 的变更",
  "View release on GitHub": "在 GitHub 上查看发行说明",
  "{count} more change on GitHub": "GitHub 上还有 {count} 项变更",
  "{count} more changes on GitHub": "GitHub 上还有 {count} 项变更",
  "{count} older release on GitHub": "GitHub 上还有 {count} 个更早的版本",
  "{count} older releases on GitHub": "GitHub 上还有 {count} 个更早的版本",
  today: "今天",
  "{days}d ago": "{days} 天前",

  // Desktop update pill
  "Intel build on Apple Silicon": "Apple Silicon 上的 Intel 版本",
  "This install is using the correct architecture.": "当前安装使用了正确的架构。",
  "This Mac has Apple Silicon, but T3 Code is still running the Intel build under Rosetta. Download the available update to switch to the native Apple Silicon build.":
    "这台 Mac 使用 Apple Silicon，但 T3 Code 仍以 Rosetta 运行 Intel 版本。下载可用更新即可切换到原生的 Apple Silicon 版本。",
  "This Mac has Apple Silicon, but T3 Code is still running the Intel build under Rosetta. Restart to install the downloaded Apple Silicon build.":
    "这台 Mac 使用 Apple Silicon，但 T3 Code 仍以 Rosetta 运行 Intel 版本。重启即可安装已下载的 Apple Silicon 版本。",
  "This Mac has Apple Silicon, but T3 Code is still running the Intel build under Rosetta. The next app update will replace it with the native Apple Silicon build.":
    "这台 Mac 使用 Apple Silicon，但 T3 Code 仍以 Rosetta 运行 Intel 版本。下次应用更新会将其替换为原生的 Apple Silicon 版本。",
  "Up to date": "已是最新版本",
  "Automatic updates are not available in this build.": "此版本不支持自动更新。",
  "Updates unavailable": "更新不可用",
  "Check for updates": "检查更新",
  "Checking for updates…": "正在检查更新…",
  "Update available": "有可用更新",
  "Update release notes": "更新说明",
  "Could not download update": "无法下载更新",
  "Could not start update download": "无法开始下载更新",
  "Could not install update": "无法安装更新",
  "Could not confirm update": "无法确认更新",
  "Update confirmation failed.": "确认更新失败。",
  "Could not check for updates": "无法检查更新",
  "Could not check provider updates": "无法检查提供方更新",
  "Refresh failed.": "刷新失败。",
  "Update check failed.": "检查更新失败。",
  "An unexpected error occurred.": "发生了意外错误。",
  "An error occurred.": "发生错误。",
  "Unable to open release notes": "无法打开发行说明",
  "Read more": "了解更多",
  "Update downloaded": "已下载更新",
  "Restart the app from the update button to install it.": "从更新按钮重启应用即可安装。",
  "Dismiss provider update notice": "忽略提供方更新提示",
  "Dismiss until provider status changes": "忽略直到提供方状态变化",

  // Thread actions
  "Cannot archive while the provider is active.": "提供方仍在运行时无法归档。",
  "This environment's server does not support settling yet. Update the server to use Settle.":
    "此环境的服务器尚不支持收尾。请更新服务器后再使用“收尾”。",
  "This environment's server does not support snoozing yet. Update the server to use Snooze.":
    "此环境的服务器尚不支持暂缓。请更新服务器后再使用“暂缓”。",
  "This thread is waiting on you. Respond to the pending request before snoozing it.":
    "此会话正在等你处理。请先回复待处理的请求，再暂缓它。",
  "This environment's server does not support turning auto-settle off per thread yet. Update the server to use it.":
    "此环境的服务器尚不支持按会话关闭自动收尾。请更新服务器后再使用该功能。",
  "This environment's server does not support pinning yet. Update the server to use Pin.":
    "此环境的服务器尚不支持置顶。请更新服务器后再使用“置顶”。",
  "This environment's server does not support reordering pinned threads yet. Update the server to reorder pins.":
    "此环境的服务器尚不支持重新排列置顶会话。请更新服务器后再调整置顶顺序。",
  "Update this environment's server to reorder active threads.":
    "请更新此环境的服务器，以重新排列活动会话。",
  'Unpin thread "{title}"?': "取消置顶会话“{title}”？",
  "This will move the thread out of your pinned section.": "这会将会话移出置顶区域。",
  "Thread deleted, but navigation failed": "会话已删除，但跳转失败",
  "Failed to undo archive": "无法撤销归档",
  "This thread is the only one linked to this worktree:": "此会话是唯一关联到该工作树的会话：",
  "Delete the worktree too?": "同时删除工作树？",
  "This connection can no longer remove worktrees.": "此连接已无法移除工作树。",
  "Failed to delete worktree": "无法删除工作树",
  "Worktree deleted, but Git status refresh failed": "工作树已删除，但刷新 Git 状态失败",
  "Could not remove {path}. {message}": "无法移除 {path}。{message}",
  "Failed to undo unpin": "无法撤销取消置顶",
  "This app: {failure}": "此应用：{failure}",
  "Provider update interrupted": "提供方更新已中断",
  "Downloading update{progress}": "正在下载更新{progress}",

  // Provider updates
  "Provider updated": "提供方已更新",
  "Provider update failed": "提供方更新失败",
  "Provider updates failed": "提供方更新失败",
  "{count} providers updated": "已更新 {count} 个提供方",
  "{failed} of {total} provider updates failed": "{total} 个提供方中有 {failed} 个更新失败",
  "{name} updated: {version}": "{name} 已更新：{version}",
  "{name} update failed": "{name} 更新失败",
  "Updating {targets}": "正在更新 {targets}",
  "Updating {count} providers": "正在更新 {count} 个提供方",
  "{names} updates are in progress.": "{names} 正在更新。",
  "New sessions will use the updated provider.": "新会话将使用更新后的提供方。",
  "New sessions will use the updated providers.": "新会话将使用更新后的提供方。",
  "Failed to undo settle": "无法撤销收尾",
  "That snooze time has passed. Choose another time.": "该暂缓时间已过，请选择其他时间。",
  "Pending Approval": "待批准",
  "Awaiting Input": "待输入",
  "Plan Ready": "计划已就绪",
} as const;

export type SidebarTranslator = (
  key: Extract<keyof typeof sidebarUiMessages, string>,
  params?: Readonly<Record<string, string | number>>,
) => string;

function sidebarTranslator(locale: Locale): SidebarTranslator {
  return (key, params) => translate(locale, sidebarUiMessages, key, params);
}

const VERB_KEYS = {
  Settled: ["Settled {count} thread", "Settled {count} threads"],
  Snoozed: ["Snoozed {count} thread", "Snoozed {count} threads"],
  Unpinned: ["Unpinned {count} thread", "Unpinned {count} threads"],
  Archived: ["Archived {count} thread", "Archived {count} threads"],
  Discarded: ["Discarded {count} draft", "Discarded {count} drafts"],
} as const satisfies Record<string, readonly [string, string]>;

const UNDO_NOTICE_NUMBER = /^(Settled|Snoozed|Unpinned|Archived) (\d+) threads?$/;
const UNDO_NOTICE_DRAFTS = /^Discarded (\d+) drafts?$/;
const ELAPSED_DAYS = /^(\d+)d ago$/;

const translateChannel = (value: string, locale: Locale): string =>
  value === "Stable" || value === "Nightly" ? translate(locale, sidebarUiMessages, value) : value;

/** Splits the English list `joinList` produces so each item can be translated on its own. */
function translateList(value: string, locale: Locale): string {
  const items = value.split(/, and |, | and /).filter((item) => item !== "");
  if (items.length <= 1) return translateSidebarLabel(value, locale);
  return joinSidebarList(
    sidebarTranslator(locale),
    items.map((item) => translateSidebarLabel(item, locale)),
  );
}

/**
 * Translates a label another module composed in English, such as update-run summaries,
 * and leaves anything it does not recognise as written.
 */
export function translateSidebarLabel(label: string, locale: Locale): string {
  if (locale !== "zh-CN") return label;
  const desktopUpdate = translateMaintenanceLabel(label, locale);
  if (desktopUpdate !== label) return desktopUpdate;
  if (Object.hasOwn(sidebarUiMessages, label))
    return sidebarUiMessages[label as keyof typeof sidebarUiMessages];

  const notice = UNDO_NOTICE_NUMBER.exec(label);
  if (notice) {
    const count = Number(notice[2]);
    const [one, other] = VERB_KEYS[notice[1] as keyof typeof VERB_KEYS];
    return translate(locale, sidebarUiMessages, count === 1 ? one : other, { count });
  }
  const drafts = UNDO_NOTICE_DRAFTS.exec(label);
  if (drafts) {
    const count = Number(drafts[1]);
    const [one, other] = VERB_KEYS.Discarded;
    return translate(locale, sidebarUiMessages, count === 1 ? one : other, { count });
  }
  const days = ELAPSED_DAYS.exec(label);
  if (days) return translate(locale, sidebarUiMessages, "{days}d ago", { days: days[1]! });

  const downloadingUpdate = /^Downloading update(?: \((\d+)%\))?$/.exec(label);
  if (downloadingUpdate) {
    const percent = downloadingUpdate[1];
    return translate(locale, sidebarUiMessages, "Downloading update{progress}", {
      progress: percent === undefined ? "" : `（${percent}%）`,
    });
  }
  const downloading = /^[Dd]ownloading (\d+)%$/.exec(label);
  if (downloading) {
    return translate(
      locale,
      sidebarUiMessages,
      label.startsWith("D") ? "Downloading {percent}%" : "downloading {percent}%",
      { percent: downloading[1]! },
    );
  }
  const restartIn = /^([Rr]estarts in|Restart in) (\d+)s$/.exec(label);
  if (restartIn) {
    return translate(
      locale,
      sidebarUiMessages,
      restartIn[1] === "Restart in" ? "Restart in {seconds}s" : "restarts in {seconds}s",
      { seconds: restartIn[2]! },
    );
  }
  const updated = /^(\d+) of (\d+) updated$/.exec(label);
  if (updated) {
    return translate(locale, sidebarUiMessages, "{done} of {total} updated", {
      done: updated[1]!,
      total: updated[2]!,
    });
  }
  const failedSingle = /^(\d+) failed$/.exec(label);
  if (failedSingle) {
    return translate(locale, sidebarUiMessages, "{count} failed", { count: failedSingle[1]! });
  }
  const providerVersionUpdated = /^(.+) updated: (v\S+)$/.exec(label);
  if (providerVersionUpdated) {
    return translate(locale, sidebarUiMessages, "{name} updated: {version}", {
      name: providerVersionUpdated[1]!,
      version: providerVersionUpdated[2]!,
    });
  }
  const providerUpdateFailed = /^(.+) update failed$/.exec(label);
  if (providerUpdateFailed) {
    return translate(locale, sidebarUiMessages, "{name} update failed", {
      name: providerUpdateFailed[1]!,
    });
  }
  const providerUpdatesFailedCount = /^(\d+) of (\d+) provider updates failed$/.exec(label);
  if (providerUpdatesFailedCount) {
    return translate(locale, sidebarUiMessages, "{failed} of {total} provider updates failed", {
      failed: providerUpdatesFailedCount[1]!,
      total: providerUpdatesFailedCount[2]!,
    });
  }
  const providersUpdated = /^(\d+) providers updated$/.exec(label);
  if (providersUpdated) {
    return translate(locale, sidebarUiMessages, "{count} providers updated", {
      count: providersUpdated[1]!,
    });
  }
  const updatingProviders = /^Updating (\d+) providers$/.exec(label);
  if (updatingProviders) {
    return translate(locale, sidebarUiMessages, "Updating {count} providers", {
      count: updatingProviders[1]!,
    });
  }
  const updating = /^Updating (.+)$/.exec(label);
  if (updating) {
    return translate(locale, sidebarUiMessages, "Updating {targets}", {
      targets: translateList(updating[1]!, locale),
    });
  }
  const updateInProgress = /^(.+) updates? (?:is|are) in progress\.$/.exec(label);
  if (updateInProgress) {
    return translate(locale, sidebarUiMessages, "{names} updates are in progress.", {
      names: translateList(updateInProgress[1]!, locale),
    });
  }
  const failedNamed = /^(.+) failed$/.exec(label);
  if (failedNamed) {
    return translate(locale, sidebarUiMessages, "{label} failed", { label: failedNamed[1]! });
  }
  const channel = /^on the (.+) channel$/.exec(label);
  if (channel) {
    return translate(locale, sidebarUiMessages, "on the {channel} channel", {
      channel: translateChannel(channel[1]!, locale),
    });
  }
  const machines = /^Update (\d+) machines?\?$/.exec(label);
  if (machines) {
    return translate(locale, sidebarUiMessages, "Update {count} machines?", {
      count: machines[1]!,
    });
  }
  const providerUpdates = /^(\d+) provider updates?$/.exec(label);
  if (providerUpdates) {
    return translate(locale, sidebarUiMessages, "{count} provider updates", {
      count: providerUpdates[1]!,
    });
  }
  const skipped = /^(\d+) skipped$/.exec(label);
  if (skipped) {
    return translate(locale, sidebarUiMessages, "{count} skipped", { count: skipped[1]! });
  }
  const moreChanges = /^(\d+) more changes? on GitHub$/.exec(label);
  if (moreChanges) {
    return translate(locale, sidebarUiMessages, "{count} more changes on GitHub", {
      count: moreChanges[1]!,
    });
  }
  const olderReleases = /^(\d+) older releases? on GitHub$/.exec(label);
  if (olderReleases) {
    return translate(locale, sidebarUiMessages, "{count} older releases on GitHub", {
      count: olderReleases[1]!,
    });
  }
  const changesIn = /^Changes in (.+)$/.exec(label);
  if (changesIn) {
    return translate(locale, sidebarUiMessages, "Changes in {version}", { version: changesIn[1]! });
  }
  const attachments = /^(\d+) attachments?$/.exec(label);
  if (attachments) {
    return translate(locale, sidebarUiMessages, "{count} attachments", {
      count: attachments[1]!,
    });
  }
  const terminals = /^(\d+) terminal processes? running$/.exec(label);
  if (terminals) {
    return translate(locale, sidebarUiMessages, "{count} terminal processes running", {
      count: terminals[1]!,
    });
  }
  const runningThreads = /^(\d+) running threads?$/.exec(label);
  if (runningThreads) {
    return translate(locale, sidebarUiMessages, "{count} running threads", {
      count: runningThreads[1]!,
    });
  }
  const runningOnly = /^(\d+) running$/.exec(label);
  if (runningOnly) {
    return translate(locale, sidebarUiMessages, "{count} running", { count: runningOnly[1]! });
  }
  const undoShortcut = /^(.+) to undo$/.exec(label);
  if (undoShortcut) {
    return translate(locale, sidebarUiMessages, "{shortcut} to undo", {
      shortcut: undoShortcut[1]!,
    });
  }
  const notBack = /^Not back after (\d+) minutes$/.exec(label);
  if (notBack) {
    return translate(locale, sidebarUiMessages, "Not back after {minutes} minutes", {
      minutes: notBack[1]!,
    });
  }
  const notApplied =
    /^T3 Code is still on (.+)\. Install (.+) again from the update button\.$/.exec(label);
  if (notApplied) {
    return translate(
      locale,
      sidebarUiMessages,
      "T3 Code is still on {version}. Install {next} again from the update button.",
      {
        version: notApplied[1]!,
        next: notApplied[2]!,
      },
    );
  }
  const stillRestarting = /^(.+) (?:is|are) still restarting\.$/.exec(label);
  if (stillRestarting) {
    return translate(locale, sidebarUiMessages, "{names} are still restarting.", {
      names: stillRestarting[1]!,
    });
  }
  const updatedTargets = /^Updated (.+)$/.exec(label);
  if (updatedTargets) {
    return translate(locale, sidebarUiMessages, "Updated {targets}", {
      targets: translateList(updatedTargets[1]!, locale),
    });
  }
  const updateTargets = /^Update (.+)$/.exec(label);
  if (updateTargets) {
    return translate(locale, sidebarUiMessages, "Update {targets}", {
      targets: translateList(updateTargets[1]!, locale),
    });
  }
  const serverCount = /^(\d+) servers?$/.exec(label);
  if (serverCount) {
    return translate(locale, sidebarUiMessages, "{count} servers", { count: serverCount[1]! });
  }
  const providerCount = /^(\d+) providers?$/.exec(label);
  if (providerCount) {
    return translate(locale, sidebarUiMessages, "{count} providers", { count: providerCount[1]! });
  }
  return label;
}

/** "a", "a and b", "a, b, and c" — with one separator set per locale. */
function joinSidebarList(t: SidebarTranslator, parts: ReadonlyArray<string>): string {
  const items = parts.filter((part) => part !== "");
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]}${t(" and @@list-separator")}${items[1]}`;
  return `${items.slice(0, -1).join(t(", @@list-separator"))}${t(", and @@list-separator")}${items.at(-1)}`;
}
