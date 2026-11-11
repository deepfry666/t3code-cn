import { describe, expect, it } from "vite-plus/test";

import { translate } from "../i18n/locale";
import { translateRuntimeError } from "./runtimeErrorLabels";
import { translateTimelineLabel } from "./chat/timelineLabels";
import { timelineUiMessages } from "./chat/timelineUi.messages";
import { translateThreadRuntimeLabel } from "./chat/threadRuntimeLabels";
import { translateDeviceStreamLabel } from "./device/deviceUi.messages";
import { translateUsageProgressLabel } from "./usage/usageUi.messages";
import { translateProjectRuntimeLabel } from "./projectRuntimeLabels";

const timeline = (label: string, locale: "en" | "zh-CN") =>
  translateTimelineLabel(label, (key, params) =>
    translate(locale, timelineUiMessages, key, params),
  );

describe("shared runtime labels at web display boundaries", () => {
  it.each([
    [
      translateRuntimeError,
      "Connection profile route-1 is unavailable.",
      "连接配置 route-1 不可用。",
    ],
    [
      translateRuntimeError,
      "Connected environment actual does not match expected.",
      "已连接的环境 actual 与 expected 不一致。",
    ],
    [
      translateRuntimeError,
      "Its CPU is overloaded (load 12 on 8 cores).",
      "其 CPU 负载过高（8 个核心的负载为 12）。",
    ],
    [
      translateRuntimeError,
      "Relay rejected the DPoP proof. Hint: Check that automatic date and time is enabled on both devices, then try again.",
      "中继拒绝了 DPoP 证明。 提示：请确认两台设备都已开启自动设置日期和时间，然后重试。",
    ],
    [
      translateRuntimeError,
      "Could not list relay-managed environments: Relay rejected the cloud session token.",
      "无法列出中继托管的环境：中继拒绝了云端会话 token。",
    ],
    [
      translateRuntimeError,
      "Relay environment listing timed out. Your DNS or firewall may be blocking T3 Connect. Try another network, such as a different Wi-Fi or mobile data.",
      "中继列出环境超时。 你的 DNS 或防火墙可能阻止了 T3 Connect。请尝试其他网络，例如其他 Wi-Fi 或移动数据网络。",
    ],
    [
      translateRuntimeError,
      "Relay cannot provision the managed endpoint (capacity). Failed stage: allocate.",
      "中继无法配置托管端点（capacity）。 失败阶段：allocate。",
    ],
    [
      translateRuntimeError,
      "The environment credential is invalid. Trace ID: abc-123",
      "环境凭据无效。 Trace ID: abc-123",
    ],
    [timeline, "Context compacted 8k → 2k tokens", "上下文已压缩：8k → 2k token"],
    [timeline, "Read 2 files and changed 1 file", "已读取 2 个文件，已修改 1 个文件"],
    [timeline, "Requested cancellation of 2 tasks", "已请求取消 2 个任务"],
    [timeline, "Tried to hand off to 1 worktree", "尝试交接到 1 个工作树"],
    [timeline, "Started 2 review guides, 1 failed", "已启动 2 个审查导览，1 个失败"],
    [timeline, "Failed to read a T3 thread", "读取 T3 会话失败"],
    [timeline, "Declined to link PR #34", "已拒绝关联 PR #34"],
    [timeline, "Requested thread creation 2 times", "已请求创建会话 2 次"],
    [translateThreadRuntimeLabel, "Thread on Mac mini", "Mac mini 上的会话"],
    [translateThreadRuntimeLabel, "Goal reached its token budget", "目标已达到 token 预算"],
    [
      translateThreadRuntimeLabel,
      "Waiting on 2 commands and 1 monitor",
      "正在等待2 条命令、1 个监控",
    ],
    [translateThreadRuntimeLabel, "Running · npm run dev", "运行中 · npm run dev"],
    [
      translateThreadRuntimeLabel,
      "Update Codex to 1.2 or newer to use Luna.",
      "请将 Codex 更新到 1.2 或更高版本，以使用 Luna。",
    ],
    [
      translateDeviceStreamLabel,
      "This browser cannot decode the Duo panel's avc1.640028 stream.",
      "此浏览器无法解码 Duo 面板的 avc1.640028 视频流。",
    ],
    [
      translateDeviceStreamLabel,
      "Device stream offer failed (409). Retrying…",
      "设备流协商失败（409）。正在重试…",
    ],
    [translateUsageProgressLabel, "Updating 3 providers…", "正在更新 3 个提供方…"],
    [translateUsageProgressLabel, "Updating Codex…", "正在更新 Codex…"],
    [
      translateProjectRuntimeLabel,
      "No project in this environment can read github.com/owner/repo.",
      "此环境中没有项目能读取 github.com/owner/repo。",
    ],
    [translateThreadRuntimeLabel, "Waiting on a background task", "正在等待后台任务"],
    [
      timeline,
      "Used Foo and Bar integrations and read 2 files",
      "已使用 Foo and Bar 集成，已读取 2 个文件",
    ],
    [timeline, "Read thread", "已读取会话"],
    [translateRuntimeError, "My Mac froze for 3s", "My Mac 卡顿了 3 秒"],
  ] as const)(
    "translates shared label %# and preserves English",
    (renderLabel, source, chinese) => {
      expect(renderLabel(source, "zh-CN")).toBe(chinese);
      expect(renderLabel(source, "en")).toBe(source);
      expect(renderLabel("user text / path: unchanged", "zh-CN")).toBe(
        "user text / path: unchanged",
      );
    },
  );
});
