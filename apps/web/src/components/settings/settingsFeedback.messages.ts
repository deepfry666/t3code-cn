import { translate, type Locale } from "../../i18n/locale";

/**
 * Toasts, save failures and scope messages raised from settings hooks, which have no render
 * pass to translate in. Unknown text passes through, so server and third-party errors stay
 * as written.
 */
const settingsFeedbackMessages = {
  "Setting not saved": "设置未保存",
  "Setting saved on some environments": "部分环境已保存设置",
  "Could not save on {name}: {message}": "无法在{name}上保存：{message}",
  "Saved on {names}.": "已保存到{names}。",
  "This connection lacks permission to change these settings.": "此连接无权修改这些设置。",
  "This setting is environment-wide and cannot be overridden by a project.":
    "此设置是环境级设置，无法由项目覆盖。",
  "Connect the selected checkouts, or update their environments, to save a project override.":
    "请连接所选工作副本，或更新它们所在的环境，以保存项目覆盖设置。",
  "Connect the selected checkouts, or update their environments, to reset this override.":
    "请连接所选工作副本，或更新它们所在的环境，以重置此覆盖设置。",
  "Connect the environments to reset these overrides.": "请连接这些环境以重置覆盖设置。",
  "Connect {target} to save this setting.": "请连接{target}以保存此设置。",
  "an environment": "某个环境",
  "This environment does not support this setting. Update T3 Code on it.":
    "此环境不支持该设置，请更新该环境上的 T3 Code。",
  "The save failed. Try reconnecting and saving again.": "保存失败，请重新连接后再保存。",
  "Failed to save project actions": "项目操作保存失败",
  "Actions not saved": "操作未保存",
  "An error occurred.": "发生错误。",
  "No available machine, or another action change is saving.":
    "没有可用的机器，或另一处操作改动正在保存。",
  "This connection cannot change environment settings.": "此连接无法修改环境设置。",
  "This connection cannot test device hosts.": "此连接无法测试设备主机。",
  "This model is unavailable on {environment}. Select that environment to choose its model separately.":
    "此模型在{environment}上不可用。请选择该环境，以单独选择它的模型。",
  "a selected environment": "所选环境",
};

export function translateSettingsFeedback(
  label: string,
  locale: Locale,
  params?: Readonly<Record<string, string | number>>,
): string {
  return translate(
    locale,
    settingsFeedbackMessages,
    label as keyof typeof settingsFeedbackMessages,
    params,
  );
}
