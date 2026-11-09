/**
 * Stream and Duo status details come from `@t3tools/client-runtime` as English sentences.
 * Web maps the ones it knows onto its catalog; device, network and decoder text it does not
 * know stays as written.
 */
export const deviceDetailMessages = {
  "No video received from the device. Reconnect to try again.":
    "未收到来自设备的视频，请重新连接后重试。",
  "Could not receive the device stream. Reconnect to try again.":
    "无法接收设备画面，请重新连接后重试。",
  "Could not display the device stream. Reconnect to try again.":
    "无法显示设备画面，请重新连接后重试。",
  "This browser cannot play this device's WebRTC stream.": "此浏览器无法播放该设备的 WebRTC 画面。",
  "This browser cannot receive the device's WebRTC stream.":
    "此浏览器无法接收该设备的 WebRTC 画面。",
  "This Device Hub does not provide fixed Duo display feeds.":
    "此 Device Hub 不提供固定的 Duo 显示画面。",
  "This browser cannot decode the Android stream (WebCodecs unavailable).":
    "此浏览器无法解码 Android 画面（WebCodecs 不可用）。",
  "This browser cannot decode this device's stream (WebCodecs unavailable).":
    "此浏览器无法解码该设备的画面（WebCodecs 不可用）。",
  "Device stream stopped receiving video. Reconnecting…": "已无法接收设备画面，正在重新连接…",
  "Device stream stalled. Reconnecting…": "设备画面已卡住，正在重新连接…",
  "Device stream connection failed. Reconnecting…": "设备画面连接失败，正在重新连接…",
  "Device stream found no network candidates yet. Retrying…":
    "设备画面尚未找到可用的网络候选，正在重试…",
  "Device stream returned an invalid answer. Retrying…": "设备画面返回了无效应答，正在重试…",
  "Video decoder fell behind. Reconnecting…": "视频解码速度不足，正在重新连接…",
  "Video decoder restarted.": "视频解码器已重启。",
  "Switching to WebRTC.": "正在切换到 WebRTC。",
  "Simulator input is unavailable": "模拟器输入不可用",
  "Device control timed out. Its position is unknown.": "设备控制超时，位置未知。",
  "Device control failed. Its position is unknown.": "设备控制失败，位置未知。",
  "Device is disconnected.": "设备已断开连接。",
  "The device returned an empty screenshot. Try again.": "设备返回了空白截图，请重试。",
} as const;
