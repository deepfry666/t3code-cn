import { settingsVoiceMessages } from "./settingsVoice.messages";

export const microphoneTestMessages = {
  ...settingsVoiceMessages,
  "No microphone found.": "未找到麦克风。",
  Stop: "停止",
  Record: "录音",
  "Record again": "重新录音",
  "Opening microphone…": "正在打开麦克风…",
  "Recording time": "录音时长",
  "Microphone input level": "输入音量",
  "Test microphone": "测试麦克风",
  "Record ten seconds and play it back. The audio stays on this device.":
    "录制十秒后回放，音频只保存在此设备上。",
  "Discard recording": "丢弃录音",
  "Cancel microphone test": "取消麦克风测试",
} as const;
