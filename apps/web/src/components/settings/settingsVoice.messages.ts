import { translate, type Locale } from "../../i18n/locale";

export const settingsVoiceMessages = {
  "Auto: press to toggle, hold to record": "自动：点按切换，按住录音",
  "Hold: record while held": "按住：按住时录音",
  "Toggle: press to start, press again to stop": "切换：点按开始，再次点按停止",
  Never: "从不",
  Immediately: "立即",
  "After 2 minutes": "2 分钟后",
  "After 5 minutes": "5 分钟后",
  "After 10 minutes": "10 分钟后",
  "After 15 minutes": "15 分钟后",
  "After 1 hour": "1 小时后",
  Recommended: "推荐",
  "A good default pick for the languages it covers.": "转写其支持的语言时，推荐优先选用此模型。",
  "Live preview": "实时预览",
  "Shows words in your draft as you speak, before the recording finishes.":
    "说话时就会在草稿中显示文字，无需等到录音结束。",
  Translate: "翻译",
  "Can write English text from speech in another language. Turn on Translate to English to use it.":
    "可将其他语言的语音转为英文。开启“翻译为英文”即可使用。",
  "{count} languages": "{count} 种语言",
  "({percent}% error)": "（错误率 {percent}%）",
  "not benchmarked": "未做基准测试",
  "Speed:": "速度：",
  "{model} download progress": "{model} 下载进度",
  "Verifying download…": "正在校验下载内容…",
  "{progress}% downloaded": "已下载 {progress}%",
  "Cancel {model} download": "取消下载 {model}",
  Download: "下载",
  Selected: "已选择",
  "Use model": "使用模型",
  "Delete {model}": "删除 {model}",
  "Add words or phrases, separated by commas or line breaks": "添加词语或短语，用逗号或换行分隔",
  "Add a word or phrase to the {label}": "向 {label} 添加词语或短语",
  Add: "添加",
  "{label} entries": "{label} 条目",
  "Alias for {term}": "{term} 的别名",
  Misspelling: "错误拼写",
  "Add an alias for {term}": "为 {term} 添加别名",
  Alias: "别名",
  "Remove {term}": "移除 {term}",
  "Project dictionary": "项目词典",
  "Shared dictionary": "共享词典",
  "Saved with {project} on its environment. Everyone who dictates in this project gets these spellings, along with their own dictionary. Project spellings win when the two overlap.":
    "保存在 {project} 所在的环境中。在此项目中听写的所有人都会使用这些拼写和个人词典；如有重复，以项目词典为准。",
  "Saved on the environment and used in every project there, along with each person’s own dictionary. Pick a project above to limit these words to one project.":
    "保存在环境中，与每个人的个人词典一起用于该环境中的所有项目。在上方选择项目，可让这些词语仅用于该项目。",
  "{count} entry": "{count} 个条目",
  "{count} entries": "{count} 个条目",
  "project dictionary": "项目词典",
  "shared dictionary": "共享词典",
  "Cleanup model not saved": "未保存文本整理模型",
  "Cleanup model": "文本整理模型",
  "Drafts on {environment} use this model for cleanup instead of the environment’s text generation model.":
    "{environment} 中的草稿使用此模型整理文本，替代该环境的文本生成模型。",
  "Cleanup currently uses the text generation model on {environment}. Pick another model if you want a cheaper or faster one.":
    "文本整理目前使用 {environment} 的文本生成模型。可选择其他模型来降低费用或加快速度。",
  "this environment": "此环境",
  "cleanup model": "文本整理模型",
  "Model for transcript cleanup, such as a cheaper or faster one. When disabled, use the text generation model configured for this environment.":
    "整理转写文本所用的模型，例如更便宜或更快的模型。关闭时使用此环境配置的文本生成模型。",
  "No text generation providers available.": "没有可用的文本生成提供方。",
  "Use a separate cleanup model": "使用单独的文本整理模型",
  "update server": "请更新服务器",
  "Connect an environment first.": "请先连接一个环境。",
  "No providers available.": "没有可用的提供方。",
  "Could not load transcription models": "无法加载转写模型",
  Hardware: "硬件",
  "Auto uses the environment’s GPU when it has one.": "选择“自动”时，环境有 GPU 就会使用 GPU。",
  "Could not change transcription hardware": "无法更改转写硬件",
  "Transcription hardware": "转写硬件",
  Auto: "自动",
  "Selected GPU": "已选择的 GPU",
  "Unload model": "从内存卸载模型",
  "Release the model’s memory on the environment after it sits idle.":
    "模型闲置达到指定时长后，释放它在环境中占用的内存。",
  "Could not change when the model unloads": "无法更改模型从内存卸载的时机",
  "Smallest download": "下载体积最小",
  "Best {language} accuracy": "{language} 准确率最高",
  "Fastest transcription": "转写速度最快",
  "This environment can’t transcribe audio: {reason}.": "此环境无法转写音频：{reason}。",
  "Pick languages to see models that support all of them. Accuracy is word or character error rate: lower is better. Speed is the time to transcribe 30 seconds of audio on Handy’s benchmark GPU.":
    "选择语言后可查看同时支持这些语言的模型。准确率以词或字符错误率表示，越低越好。速度是在 Handy 基准测试 GPU 上转写 30 秒音频所需的时间。",
  "Pick languages to see models that support all of them. Accuracy is word or character error rate: lower is better. Speed is the time to transcribe 30 seconds of audio on Handy’s benchmark {device}.":
    "选择语言后可查看同时支持这些语言的模型。准确率以词或字符错误率表示，越低越好。速度是在 Handy 基准测试 {device} 上转写 30 秒音频所需的时间。",
  Languages: "语言",
  "Search languages": "搜索语言",
  "Browse models by language": "按语言浏览模型",
  "All languages": "所有语言",
  "No languages match.": "没有匹配的语言。",
  "Models for {languages}": "支持 {languages} 的模型",
  "All models": "所有模型",
  "Search transcription models": "搜索转写模型",
  "Search models": "搜索模型",
  "Sort and filter models: {sort}": "排序和筛选模型：{sort}",
  "Sort and filter models: {sort}, downloaded only": "排序和筛选模型：{sort}，仅已下载",
  "Sort by": "排序方式",
  "Downloaded only": "仅已下载",
  "Transcription models": "转写模型",
  "No models match.": "没有匹配的模型。",
  "Could not download the model": "无法下载模型",
  "Could not select the model": "无法选择模型",
  "Could not cancel the download": "无法取消下载",
  "Could not delete the model": "无法删除模型",
  "Test model": "测试模型",
  "Waiting for the environment to connect": "正在等待环境连接",
  "Say a sentence in the language above. Cleanup is skipped, so you see exactly what the model heard. The transcript stays on this page.":
    "用上方的语言说一句话。测试会跳过文本整理，直接显示模型识别的内容。转写文本只保留在此页面。",
  "Close model test": "关闭模型测试",
  "Test transcript": "测试转写文本",
  "No speech recognized. Try again.": "未识别到语音，请重试。",
  "Selected microphone (unavailable)": "所选麦克风（不可用）",
  "System default": "系统默认",
  "Manage OpenRouter": "管理 OpenRouter",
  "Manage key": "管理密钥",
  "Input@@voice": "输入",
  Microphone: "麦克风",
  "System default follows your operating system. Record a ten-second test and play it back here. Test audio stays on this device and is never transcribed.":
    "系统默认会跟随操作系统设置。可录制 10 秒测试音频并在此回放。测试音频只保存在此设备上，不会转写。",
  "Refresh microphones": "刷新麦克风",
  "Dictation shortcut": "听写快捷键",
  "How the dictation shortcut starts and stops recording.": "听写快捷键开始和停止录音的方式。",
  "Dictation shortcut mode": "听写快捷键模式",
  Transcription: "转写",
  "Transcribe with": "转写方式",
  Use: "使用",
  "Chosen environment (unavailable)": "已选择的环境（不可用）",
  Off: "关闭",
  " via {environment}": " 经由 {environment}",
  "unavailable environment": "环境不可用",
  "On an environment": "在环境中",
  "Cloud via {environment}": "经由 {environment} 使用云端服务",
  "{provider} via {environment}": "{provider}（经由 {environment}）",
  "{environment} can’t transcribe audio locally. Choose a different destination.":
    "{environment} 无法在本地转写音频，请选择其他转写位置。",
  Language: "语言",
  "The cloud provider can detect your language automatically.": "云端提供方可以自动检测你的语言。",
  "{model} detects the language automatically.": "{model} 会自动检测语言。",
  "{model} uses one fixed language.": "{model} 使用固定语言。",
  "Choose an environment above to see the languages its transcription model supports.":
    "在上方选择环境，查看其转写模型支持的语言。",
  "Translate to English": "翻译为英文",
  "Speak any language and get English text.": "用任意语言说话，生成英文文本。",
  "Transcription options": "转写选项",
  "Silence filtering": "静音过滤",
  "OpenAI handles silence automatically.": "OpenAI 会自动处理静音。",
  "Skip silence and other non-speech audio before transcription, keeping a short buffer so words aren’t cut off.":
    "转写前跳过静音和其他非语音音频，并保留短暂缓冲，避免截断词语。",
  "Remove filler words": "移除语气词",
  "Remove filler words like “um” and “uh” from transcripts.": "从转写文本中移除“嗯”“呃”等语气词。",
  Dictionary: "词典",
  "Names and terms transcription should spell your way, saved on this device. Add an alias when it keeps hearing a term wrong. The name of the project you dictate in is also sent as a hint.":
    "在此设备上保存姓名和术语的首选拼写。如果某个词总是识别错误，可添加别名。听写所在的项目名称也会作为提示发送。",
  dictionary: "词典",
  "Cleanup@@transcript": "文本整理",
  "Clean up transcripts": "整理转写文本",
  "Fixes punctuation, numbers, and spoken corrections with the cleanup model on the draft’s environment. Sends the transcript and nearby draft text, never audio.":
    "使用草稿所在环境的文本整理模型修正标点、数字和口头纠正。只发送转写文本及其附近的草稿文字，不会发送音频。",
  "Clean up transcripts with a provider": "使用提供方整理转写文本",
  "Sends the transcript and nearby draft text to the text generation provider on the draft’s environment to fix punctuation, numbers, and spoken corrections. Sends text only; off by default.":
    "将转写文本及其附近的草稿文字发送给草稿所在环境的文本生成提供方，修正标点、数字和口头纠正。只发送文本，默认关闭。",
  "Cleanup instructions": "文本整理指令",
  "Use the built-in instructions or write your own.": "使用内置指令或编写自己的指令。",
  Custom: "自定义",
  "Built-in": "内置",
  "Custom cleanup instructions": "自定义文本整理指令",
  "Correction cue": "纠正提示词",
  "The word or phrase you say to flag a correction, like “sorry” or “scratch that”. Cleanup applies the correction only where one is meant, and hears the cue as a hint.":
    "用来表达纠正的词语或短语，例如“不对”或“刚才说错了”。整理文本时，会将其作为提示，只修正确实需要纠正的内容。",
  sorry: "不对",
  "OpenRouter model": "OpenRouter 模型",
  "No transcription model matches.": "没有匹配的转写模型。",
  "OpenRouter no longer lists {model}. Dictation stays off until you choose another model.":
    "OpenRouter 已下架 {model}。选择其他模型后才能启用听写。",
  "Couldn’t save this change. Check your connection and try again.":
    "无法保存此更改，请检查连接后重试。",
  "Replace API key": "替换 API 密钥",
  "API key": "API 密钥",
  "{company} API key": "{company} API 密钥",
  "{company} API key reference": "{company} API 密钥引用",
  "Enter API key": "输入 API 密钥",
  "Enter an API key, not a URL or secret reference.": "请输入 API 凭据，不要输入 URL 或凭据引用。",
  "Updating the key keeps dictation enabled.": "更新密钥后听写会保持启用。",
  "Leave blank to keep the saved key.": "留空可保留已保存的密钥。",
  "Anyone with dictation access to {environment} can bill this key.":
    "有权在 {environment} 使用听写的人都可以使用此密钥产生费用。",
  "Remove the {company} key?": "移除 {company} 密钥？",
  "Manage OpenRouter dictation": "管理 OpenRouter 听写",
  "Manage {company} key": "管理 {company} 密钥",
  "Use {name} for dictation?": "使用 {name} 听写？",
  "Everyone using {name} for dictation on {environment} will lose access.":
    "在 {environment} 上使用 {name} 听写的所有人都将无法继续使用。",
  "Anyone with dictation access to {environment} can use this API key.":
    "有权在 {environment} 使用听写的人都可以使用此 API 密钥。",
  "After you stop, {environment} sends the recording to OpenRouter. OpenRouter chooses who runs your model. T3 requests zero data retention; your OpenRouter account may allow safety retention.":
    "停止录音后，{environment} 会将录音发送至 OpenRouter。OpenRouter 决定由谁运行模型。T3 会请求不保留数据；你的 OpenRouter 账户可能允许出于安全目的保留数据。",
  "After you stop, {environment} sends your recording and vocabulary hints, including project names, to {company}.":
    "停止录音后，{environment} 会将录音和词汇提示（包括项目名称）发送至 {company}。",
  "Connect to {environment} with dictation access to continue.":
    "请连接 {environment} 并取得听写权限后继续。",
  "Retry loading API key": "重新加载 API 密钥",
  "Update {environment} to use OpenRouter dictation.":
    "请更新 {environment} 后使用 OpenRouter 听写。",
  "Checking for an API key…": "正在检查 API 密钥…",
  Model: "模型",
  "Retry loading models": "重新加载模型",
  "Loading transcription models…": "正在加载转写模型…",
  "Ask an administrator on {environment} to add an API key.":
    "请 {environment} 的管理员添加 API 密钥。",
  "Uses the API key saved on {environment}. This choice applies only to this device.":
    "使用保存在 {environment} 上的 API 密钥。此选择仅适用于此设备。",
  "This choice applies only to this device. Choose Off to stop sharing.":
    "此选择仅适用于此设备。选择“关闭”即可停止共享。",
  "Remove key…": "移除密钥…",
  Cancel: "取消",
  "Remove key": "移除密钥",
  Save: "保存",
  "Save and enable": "保存并启用",
  "Save key": "保存密钥",
  "Use {name}": "使用 {name}",
  "Use a 1Password reference like op://vault/item/field.":
    "请使用 1Password 引用，例如 op://vault/item/field。",
  "Microphone testing is unavailable in this browser. Use HTTPS or the desktop app.":
    "此浏览器无法测试麦克风。请使用 HTTPS 或桌面应用。",
  "No audio was recorded. Try again.": "未录到音频，请重试。",
  "Could not record microphone audio. Try again.": "无法录制麦克风音频，请重试。",
  "The microphone disconnected.": "麦克风已断开连接。",
  "Could not access the microphone.": "无法访问麦克风。",
  "Microphone access is required for voice input. Allow access in your browser or system settings and try again.":
    "语音输入需要麦克风权限。请在浏览器或系统设置中允许访问后重试。",
  "Test microphone": "测试麦克风",
  "Cancel microphone test": "取消麦克风测试",
  "Recording time": "录音时长",
  "Microphone input level": "输入音量",
  "Opening microphone…": "正在打开麦克风…",
  "Stop recording": "停止录音",
  "Pause recording": "暂停回放",
  "Play recording": "播放录音",
  "Recording playback position": "录音回放位置",
  "Record again": "重新录音",
  Done: "完成",
  "Could not play this recording. Try recording again.": "无法播放此录音，请重新录音。",
  "Auto-detect": "自动检测",
  "{language} unavailable": "{language} 不可用",
  "{language} ({unavailable})": "{language}（{unavailable}）",
  "Auto ({language})": "自动（{language}）",
  "Transcription language": "转写语言",
  Access: "访问权限",
  Shortcut: "快捷键",
  "Install the extension": "安装扩展",
  "The T3 Code GNOME extension lets you capture other windows and bring them into your draft. Sign out once after installing.":
    "T3 Code 的 GNOME 扩展可截取其他窗口并将截图添加到草稿。安装后需退出系统并重新登录一次。",
  "Extension installed": "扩展已安装",
  "Save your work, then sign out and back in. Your setup will be waiting here.":
    "保存工作后，退出系统并重新登录。回来后可在此继续设置。",
  "Update the extension": "更新扩展",
  "Install the update, then sign out and back in.": "安装更新后，退出系统并重新登录。",
  "Allow GNOME extensions": "允许 GNOME 扩展",
  "Open GNOME Extensions and turn on extensions, then check again.":
    "打开 GNOME 扩展应用并开启扩展，然后重新检查。",
  "Enable the extension": "启用扩展",
  "Enable T3 Code SnapShots to start capturing windows.":
    "启用 T3 Code SnapShots 扩展，即可开始截取窗口。",
  "Capture is ready": "截图已就绪",
  "Next, choose your shortcut.": "接下来，选择快捷键。",
  "Automatic capture isn't available": "无法自动截图",
  "Use Take snapshot from the command palette to choose a window.":
    "在命令面板中选择“拍摄快照”，然后选择窗口。",
  "Couldn't set up the extension": "无法设置扩展",
  "Check T3 Code SnapShots in GNOME Extensions, then try again.":
    "在 GNOME 扩展应用中检查 T3 Code SnapShots 扩展，然后重试。",
  "Let's try that again": "再试一次",
  "Couldn't check snapshots. Try again to continue.": "无法检查快照，请重试后继续。",
  "Check capture access": "检查截图权限",
  "The extension isn't ready yet. Try again in a moment.": "扩展尚未就绪，请稍后重试。",
  "Let's fix capture access": "修复截图权限",
  "Try reinstalling the capture helper, then check again.":
    "请重新安装截图辅助程序，然后重新检查。",
  "Update the capture helper": "更新截图辅助程序",
  "Allow snapshots": "允许快照",
  "T3 Code's capture helper lets you capture other apps and return to your draft. It's included with T3 Code.":
    "T3 Code 的截图辅助程序可截取其他应用的窗口，再返回草稿。辅助程序已随 T3 Code 提供。",
  "Choose a window each time": "每次选择窗口",
  "Your desktop doesn't support automatic capture. You'll choose the window to capture instead.":
    "你的桌面不支持自动截图，需要手动选择要截图的窗口。",
  "Your desktop may ask for permission when you first capture.": "首次截图时，桌面可能会请求权限。",
  "Test a snapshot of the current window. If macOS asks to bypass its window picker, choose Allow. The test image is discarded.":
    "测试当前窗口的快照。如果 macOS 询问是否绕过窗口选择器，请选择“允许”。测试图片会丢弃。",
  "Allow each permission, then continue.": "允许各项权限后继续。",
  "Allow access when prompted to start capturing windows.":
    "收到提示时允许访问，即可开始截取窗口。",
  "Choose your shortcut": "选择快捷键",
  "Click the shortcut, then press the keys you want.": "点击快捷键，然后按下你想使用的按键。",
  "Choose your keys, then approve the permission prompt if asked.":
    "选择按键，出现权限提示时允许访问。",
  "Use both Shift keys, or record a different shortcut.":
    "使用左右两个 Shift 键，或录制其他快捷键。",
  "Set up snapshots for {desktop}": "为 {desktop} 设置快照",
  "Set up snapshots": "设置快照",
  "Screen Recording": "屏幕录制",
  "Capture the window you're using.": "截取当前使用的窗口。",
  Accessibility: "辅助功能",
  "Include text and controls from the captured app.": "包含所截取应用中的文本和控件。",
  "Optional. Include text and controls from the captured app.":
    "可选。包含所截取应用中的文本和控件。",
  "Reinstall helper": "重新安装辅助程序",
  "Shortcut permissions": "快捷键权限",
  "Try again": "重试",
  "Capture needs attention. Go back to check access.": "截图需要处理，请返回检查权限。",
  "Couldn't finish this step. Try again or check Advanced for help.":
    "无法完成此步骤。请重试，或展开“高级”查看帮助。",
  Advanced: "高级",
  "Included with T3 Code. No download needed.": "已随 T3 Code 提供，无需下载。",
  "Disable extension": "停用扩展",
  "Remove capture helper": "移除截图辅助程序",
  Back: "返回",
  Close: "关闭",
  "Finish later": "稍后完成",
  "Checking…": "正在检查…",
  "Installing…": "正在安装…",
  "Check again": "重新检查",
  "Update helper": "更新辅助程序",
  "Install helper": "安装辅助程序",
  "Enabling…": "正在启用…",
  "Working…": "运行中…",
  "Update extension": "更新扩展",
  "Install extension": "安装扩展",
  "Enable extension": "启用扩展",
  "Test capture and continue": "测试截图并继续",
  "Allow capture": "允许截图",
  Continue: "继续",
  "Saving…": "正在保存…",
  "Save and finish": "保存并完成",
  "Couldn't check capture setup": "无法检查截图设置",
  "Whoosh (Default)": "呼啸声（默认）",
  Click: "快门声",
  "Couldn't open shortcut permissions": "无法打开快捷键权限设置",
  "Couldn't complete capture setup": "无法完成截图设置",
  "Couldn't save capture settings": "无法保存截图设置",
  "Couldn't allow app text capture": "无法允许获取应用文本",
  "Could not check this shortcut.": "无法检查此快捷键。",
  "Press your shortcut. Esc cancels.": "请按下快捷键，按 Esc 取消。",
  'T3 Code already uses this for "{command}".': "T3 Code 已将此快捷键用于“{command}”。",
  "Checking shortcut…": "正在检查快捷键…",
  "Ready to save.": "可以保存。",
  "Try a shortcut such as Ctrl+Shift+2.": "请尝试 Ctrl+Shift+2 等快捷键。",
  "Couldn't verify capture access": "无法验证截图权限",
  "Couldn't close capture setup": "无法关闭截图设置",
  SnapShots: "快照",
  "Updating capture settings…": "正在更新截图设置…",
  "{title}. {message}": "{title}。{message}",
  "Enable snapshots": "启用快照",
  "Include text and controls when the app makes them available.": "包含应用提供的文本和控件。",
  "Include app text in snapshots": "在快照中包含应用文本",
  "Choose a window to capture from any app.": "从任意应用中选择要截图的窗口。",
  "Capture the window you're using without switching apps.": "截取当前使用的窗口，无需切换应用。",
  "Change shortcut": "更改快捷键",
  "Choose the sound played when capture starts.": "选择开始截图时播放的声音。",
  "Snapshot sound: {sound}": "快照音效：{sound}",
  Whoosh: "呼啸声",
  "Play Whoosh": "播放呼啸声",
  "Play Click": "播放快门声",
  "Show a gentle cue on the captured window.": "在所截取的窗口上显示柔和的视觉提示。",
  "Flash captured window": "让所截取的窗口闪烁",
  "Animate captured windows into your draft.": "以动画将窗口截图添加到草稿。",
  "Animate snapshots": "快照动画",
  "Checking snapshots…": "正在检查快照…",
  "Not supported on this platform.": "此平台不支持。",
  "Turn this on to set up snapshots.": "开启后设置快照。",
  "Capture needs attention": "截图需要处理",
  "Check capture access in setup": "在设置向导中检查截图权限",
  "Install the capture helper to continue": "安装截图辅助程序后继续",
  "Set up active-window snapshots": "设置当前窗口快照",
  "Manual capture only. You'll choose a window each time": "仅支持手动截图，每次都需要选择窗口",
  "Enable capture to continue": "启用截图后继续",
  "Connecting your shortcut…": "正在连接快捷键…",
  "Waiting for shortcut permission": "正在等待快捷键权限",
  "Ready to capture": "可以截图",
  "Use your shortcut from another app": "在其他应用中使用快捷键",
  "Shortcut saved": "快捷键已保存",
  "Finish shortcut setup": "完成快捷键设置",
  "Approve the shortcut permission prompt to continue.": "允许快捷键权限请求后继续。",
  "Shortcut saved.": "快捷键已保存。",
  "Continue setup": "继续设置",
  "Manage capture": "管理截图",
  "Set up {desktop} capture": "设置 {desktop} 截图",
  "Capture effects aren't available on this desktop.": "此桌面不支持截图效果。",
  "Install or update the capture helper to enable effects.": "安装或更新截图辅助程序后启用效果。",
  "Capture effects aren't available on Niri.": "Niri 不支持截图效果。",
  "Update the GNOME extension, then sign out and back in to enable effects.":
    "更新 GNOME 扩展后，退出系统并重新登录即可启用效果。",
  "Finish extension setup to enable effects.": "完成扩展设置后启用效果。",
  "Automatic capture isn't available here. Choose a window instead.":
    "此处不支持自动截图，请手动选择窗口。",
  "Capture a window and attach it to your current draft.": "截取窗口并将截图添加到当前草稿。",
  "This desktop only provides a screenshot.": "此桌面仅提供截图。",
  "Update the desktop app to use snapshots.": "请更新桌面应用后使用快照。",
  "Only available in the desktop app.": "仅桌面应用可用。",
  "Still unable to check access. See Advanced for help.": "仍无法检查权限，请展开“高级”查看帮助。",
  "Ready. You'll choose a window each time.": "已就绪，每次都需要选择窗口。",
  "Still waiting for you to sign out and back in.": "仍在等待你退出系统并重新登录。",
  "Ready. Continue to choose your shortcut.": "已就绪，继续选择快捷键。",
  "Not ready yet. Finish the step above.": "尚未就绪，请完成上方步骤。",
  "Couldn't prepare the changes. Check Advanced for help.": "无法准备更改，请展开“高级”查看帮助。",
  "Use {shortcut} from another app.": "在其他应用中使用 {shortcut}。",
  "Couldn't save your shortcut. Review the changes and try again.":
    "无法保存快捷键，请检查更改后重试。",
  "Saved, but the shortcut needs attention. Check Advanced for help.":
    "已保存，但快捷键仍需处理。请展开“高级”查看帮助。",
  "Shortcut removed.": "快捷键已移除。",
  "Use {shortcut} from another app to capture a window.": "在其他应用中使用 {shortcut} 截取窗口。",
  "Review the change below to remove your shortcut.": "检查下方更改，移除快捷键。",
  "Review the change below, then save your shortcut.": "检查下方更改后保存快捷键。",
  "There's no capture shortcut to remove.": "没有可移除的截图快捷键。",
  "This shortcut is already set up.": "此快捷键已设置。",
  "Shortcut changes": "快捷键更改",
  "Only these changes will be saved. We'll keep a backup.": "只会保存这些更改，并保留备份。",
  "Save shortcut": "保存快捷键",
  "Remove shortcut": "移除快捷键",
  "Allow T3 Code to read your desktop settings. You'll review any changes here before saving.":
    "允许 T3 Code 读取桌面设置。保存前，你可以在此检查所有更改。",
  "Preparing changes…": "正在准备更改…",
  "Review changes": "查看更改",
  "Connecting to your desktop…": "正在连接桌面…",
  "Restart T3 Code to finish connecting your shortcut.": "重启 T3 Code 以完成快捷键连接。",
  Troubleshooting: "故障排查",
  "Settings file": "设置文件",
  "T3 Code also reads any files included by this file.": "T3 Code 还会读取此文件引用的其他文件。",
  "Linked to {path}. The link will be kept.": "链接到 {path}。此链接会保留。",
  "Choose a different file…": "选择其他文件…",
  "Remove shortcut…": "移除快捷键…",
  "Backup: {path}": "备份：{path}",
  "Manual setup": "手动设置",
  Copied: "已复制",
  "Copy shortcut": "复制快捷键",
  "Turn capture off in T3 Code to stop it. Remove the shortcut from {desktop} to free up the keys.":
    "在 T3 Code 中关闭截图即可停止。若要释放按键，请从 {desktop} 中移除该快捷键。",
  "I've added the shortcut": "我已添加快捷键",
  "Could not start shortcut recording.": "无法开始录制快捷键。",
  "Add a letter, number, or function key to your shortcut.": "请在快捷键中添加字母、数字或功能键。",
  "Record snapshot shortcut, currently {shortcut}": "录制快照快捷键，当前为 {shortcut}",
  "Change snapshot shortcut": "更改快照快捷键",
  "Press shortcut…": "按下快捷键…",
  "Choose shortcut": "选择快捷键",
  "Use your desktop's shortcut settings file. A custom --config or NIRI_CONFIG can change its location.":
    "使用桌面的快捷键设置文件。自定义 --config 或 NIRI_CONFIG 可以更改其位置。",
  "Use your desktop's shortcut settings file. On Omarchy, use your own bindings file, not its defaults.":
    "使用桌面的快捷键设置文件。在 Omarchy 上，请使用自己的快捷键配置文件，不要使用默认配置。",
  "Paste this inside binds { … } in your Niri config, then save. Change the keys if needed.":
    "将此内容粘贴到 Niri 配置的 binds { … } 内，然后保存。按需更改按键。",
  "Add this binding to your Hyprland config, then save. Change the keys if needed.":
    "将此快捷键添加到 Hyprland 配置，然后保存。按需更改按键。",
  " (Default)": "（默认）",
  "Could not check permissions. We'll try again automatically.": "无法检查权限，稍后会自动重试。",
  "Permission status unavailable": "无法获取权限状态",
  "Try again.": "请重试。",
  "Best all-around choice for English dictation": "英语听写的综合首选",
  "Fast and accurate transcription in many European languages": "快速、准确地转写多种欧洲语言",
  "Tiny, fast, and runs well on any hardware": "体积小、速度快，适合各种硬件",
  "Consistently strong in many languages, best for Greek and Polish":
    "多语言表现稳定，尤其适合希腊语和波兰语",
  "Broadest language support, but may run a bit slow": "语言支持最广，但速度可能稍慢",
  "Multilingual, very accurate in Italian and Spanish. Best on Apple Silicon or discrete GPUs":
    "支持多语言，意大利语和西班牙语非常准确，适合 Apple Silicon 或独立 GPU",
  "Best accuracy across 25 European languages": "在 25 种欧洲语言中准确率最高",
  "Fast and accurate, great overall multilingual pick": "速度快、准确率高，适合多语言场景",
  "Excellent English only model, runs on any hardware": "出色的英语模型，仅支持英语，适合各种硬件",
  "Best for Chinese, Cantonese, and Asian languages with English":
    "适合中文、粤语，以及混合英语的亚洲语言",
  "Best for Japanese, good at Thai, Indonesian, Malay":
    "最适合日语，泰语、印尼语和马来语表现也不错",
  "Most accurate small model for European languages": "欧洲语言准确率最高的小型模型",
  "Very accurate English. Slow without a GPU.": "英语非常准确，没有 GPU 时速度较慢。",
  "Best for Arabic and Arabic/English speakers": "适合阿拉伯语及阿拉伯语与英语混合输入",
  "Good for Mandarin, English, Japanese": "适合普通话、英语和日语",
  "Russian only.": "仅支持俄语。",
  "Best for Russian dictation. English may be unreliable.": "适合俄语听写，英语识别可能不可靠。",
  "Extremely fast English transcription, best on GPU": "英语转写速度极快，适合 GPU",
  "Accurate with translation support. Best with GPU": "识别准确，支持翻译，适合 GPU",
  "For clinicians dictating notes. Poor on general speech":
    "适合临床医生听写笔记，普通语音表现较差",
  "Tiny English model, virtually instant even on CPU": "小型英语模型，即使用 CPU 也几乎即时完成",
  "For overlapping speakers in meetings, not for solo dictation":
    "适合会议中多人同时说话的场景，不适合单人听写",
  "Top accuracy across languages. Best on Apple Silicon or a GPU":
    "多语言准确率出色，适合 Apple Silicon 或 GPU",
  "Instant Mandarin, Japanese, Korean on any machine. Weak Cantonese":
    "可在任意机器上即时识别普通话、日语和韩语，粤语表现较弱",
  "Accurate with translation support. Best on Apple Silicon or a GPU.":
    "识别准确，支持翻译，适合 Apple Silicon 或 GPU。",
  "Wide language support in a relatively small model.": "模型体积较小，支持多种语言。",
  "Accurate in many languages. Slow without a GPU": "多语言识别准确，没有 GPU 时速度较慢",
  "Taiwan Mandarin with English mixed in. Traditional script, no punctuation":
    "适合混合英语的台湾普通话，输出繁体字，不含标点",
  "Most languages at usable accuracy. Best on Apple Silicon or a GPU.":
    "大多数语言的准确率可用，适合 Apple Silicon 或 GPU。",
  "Canary 1B Flash speech-to-text.": "Canary 1B Flash 语音转文本模型。",
  "GigaAM v3 CTC speech-to-text.": "GigaAM v3 CTC 语音转文本模型。",
  "GigaAM v3 RNN-T speech-to-text.": "GigaAM v3 RNN-T 语音转文本模型。",
  "Granite Speech 4.0 1B speech-to-text.": "Granite Speech 4.0 1B 语音转文本模型。",
  "Granite Speech 4.1 2B NAR speech-to-text.": "Granite Speech 4.1 2B NAR 语音转文本模型。",
  "Granite Speech 4.1 2B Plus speech-to-text.": "Granite Speech 4.1 2B Plus 语音转文本模型。",
  "Moonshine Base speech-to-text.": "Moonshine Base 语音转文本模型。",
  "Moonshine Streaming Medium speech-to-text.": "Moonshine Streaming Medium 语音转文本模型。",
  "Moonshine Streaming Small speech-to-text.": "Moonshine Streaming Small 语音转文本模型。",
  "Moonshine Streaming Tiny speech-to-text.": "Moonshine Streaming Tiny 语音转文本模型。",
  "Moonshine Tiny speech-to-text.": "Moonshine Tiny 语音转文本模型。",
  "MOSS Transcribe Diarize speech-to-text.": "MOSS Transcribe Diarize 语音转文本模型。",
  "Nemotron Speech Streaming English 0.6B speech-to-text.":
    "Nemotron Speech Streaming English 0.6B 语音转文本模型。",
  "Orukeet speech-to-text.": "Orukeet 语音转文本模型。",
  "Parakeet CTC 0.6B speech-to-text.": "Parakeet CTC 0.6B 语音转文本模型。",
  "Parakeet CTC 1.1B speech-to-text.": "Parakeet CTC 1.1B 语音转文本模型。",
  "Parakeet Primeline speech-to-text.": "Parakeet Primeline 语音转文本模型。",
  "Parakeet RNN-T 0.6B speech-to-text.": "Parakeet RNN-T 0.6B 语音转文本模型。",
  "Parakeet RNN-T 1.1B speech-to-text.": "Parakeet RNN-T 1.1B 语音转文本模型。",
  "Parakeet TDT-CTC 1.1B speech-to-text.": "Parakeet TDT-CTC 1.1B 语音转文本模型。",
  "Parakeet TDT 1.1B speech-to-text.": "Parakeet TDT 1.1B 语音转文本模型。",
  "Voxtral Small 24B speech-to-text.": "Voxtral Small 24B 语音转文本模型。",
  "Whisper Base speech-to-text.": "Whisper Base 语音转文本模型。",
  "Whisper Base English speech-to-text.": "Whisper Base English 语音转文本模型。",
  "Whisper Large v1 speech-to-text.": "Whisper Large v1 语音转文本模型。",
  "Whisper Large v2 speech-to-text.": "Whisper Large v2 语音转文本模型。",
  "Whisper Medium English speech-to-text.": "Whisper Medium English 语音转文本模型。",
  "Whisper Small English speech-to-text.": "Whisper Small English 语音转文本模型。",
  "Whisper Tiny speech-to-text.": "Whisper Tiny 语音转文本模型。",
  "Whisper Tiny English speech-to-text.": "Whisper Tiny English 语音转文本模型。",
  "Set up GNOME capture": "设置 GNOME 截图",
  "Set up KDE Plasma capture": "设置 KDE Plasma 截图",
  "Set up Niri capture": "设置 Niri 截图",
  "Set up Hyprland capture": "设置 Hyprland 截图",
  "Snapshot request was rejected.": "截图请求被拒绝。",
  "Desktop config": "桌面配置",
  "Niri couldn't validate the proposed config. Nothing was changed. Check your config in Advanced.":
    "Niri 无法验证待保存的配置，未做任何更改。请在“高级”中检查配置。",
  "Couldn't check Hyprland's current shortcuts. Try again from your Hyprland session.":
    "无法检查 Hyprland 当前的快捷键。请在 Hyprland 桌面会话中重试。",
  "Couldn't read an included Niri config. Check its location in Advanced.":
    "无法读取引用的 Niri 配置。请在“高级”中检查其位置。",
  "Your config changed since this preview. Review changes again before saving.":
    "配置在预览后发生了变化。请重新审查更改后再保存。",
  "Your config changed since this preview. Nothing was saved. Review changes again before saving.":
    "配置在预览后发生了变化，未保存任何内容。请重新审查更改后再保存。",
  "Config saved, but Hyprland couldn't reload it cleanly. Check hyprctl configerrors, then run hyprctl reload.":
    "配置已保存，但 Hyprland 无法正常重新加载。请检查 hyprctl configerrors，然后运行 hyprctl reload。",
  "Modifier-pair shortcuts aren't available in this Wayland session. Choose another shortcut or use Take snapshot from the command palette.":
    "此 Wayland 桌面会话不支持双修饰键快捷键。请选择其他快捷键，或使用命令面板中的“拍摄快照”。",
  "Allow Screen Recording in System Settings, then restart T3 Code.":
    "请在系统设置中允许屏幕录制，然后重启 T3 Code。",
  "Allow Accessibility in System Settings, then restart T3 Code.":
    "请在系统设置中允许辅助功能，然后重启 T3 Code。",
  "Allow Accessibility and Screen Recording in System Settings, then restart T3 Code.":
    "请在系统设置中允许辅助功能和屏幕录制，然后重启 T3 Code。",
  "Could not list pending snapshots.": "无法列出待处理的截图。",
  "Could not read the snapshot.": "无法读取截图。",
  "Could not remove the snapshot.": "无法移除截图。",
  "SnapShots are not supported here.": "此处不支持快照。",
  "Enable SnapShots in Settings first.": "请先在设置中启用快照。",
  "No window was selected.": "未选择窗口。",
  "The active window is not available for capture.": "无法截取当前活动窗口。",
  "Finish SnapShot setup in Settings → SnapShots.": "请在“设置 → 快照”中完成快照设置。",
  "Could not capture the active window.": "无法截取当前活动窗口。",
  "Could not register the SnapShot shortcut.": "无法注册快照快捷键。",
  "Test capture requires macOS.": "测试截图需要 macOS。",
  "Could not capture a test snapshot.": "无法截取测试截图。",
  "Finding the front window": "正在查找前台窗口",
  "Capturing the window": "正在截取窗口",
  "Config setup requires a Niri or Hyprland session.": "配置设置需要 Niri 或 Hyprland 桌面会话。",
  "Couldn't prepare your capture shortcut changes.": "无法准备截图快捷键更改。",
  "Couldn't save your capture shortcut.": "无法保存截图快捷键。",
  "Helper setup requires a Hyprland Wayland session outside a sandbox.":
    "辅助程序设置需要在沙盒外的 Hyprland Wayland 桌面会话中进行。",
  "Helper setup requires a KDE Plasma Wayland session outside a sandbox.":
    "辅助程序设置需要在沙盒外的 KDE Plasma Wayland 桌面会话中进行。",
  "Extension setup requires a GNOME Wayland session outside a sandbox.":
    "扩展设置需要在沙盒外的 GNOME Wayland 桌面会话中进行。",
  "Could not open shortcut permissions.": "无法打开快捷键权限设置。",
  "Could not set up Hyprland capture.": "无法设置 Hyprland 截图。",
  "Could not set up KDE capture.": "无法设置 KDE 截图。",
  "Could not set up the GNOME extension.": "无法设置 GNOME 扩展。",
  "Active window": "活动窗口",
  "This shortcut is already used by the system or another app.": "此快捷键已被系统或其他应用占用。",
  "The system could not register this shortcut.": "系统无法注册此快捷键。",
  "SnapShots are not supported on this platform.": "此平台不支持快照。",
  "Configure the capture shortcut in your Niri config, not in T3 Code.":
    "请在 Niri 配置中设置截图快捷键，而非在 T3 Code 中设置。",
  "Change the capture binding in your Hyprland config, then save it.":
    "请在 Hyprland 配置中更改截图快捷键，然后保存。",
  "Your desktop will confirm this shortcut when you save it.":
    "保存时，桌面系统会请求确认此快捷键。",
  "Unsupported shortcut.": "不支持此快捷键。",
  "SnapShots require a Wayland session. X11 capture is not supported.":
    "快照需要 Wayland 桌面会话，不支持 X11 截图。",
  "The Niri capture endpoint disconnected. Restart T3 Code.":
    "Niri 截图端点已断开。请重启 T3 Code。",
  "Set up the shortcut to add it to your Niri config.": "设置快捷键，将其添加到 Niri 配置。",
  "Could not start the Niri capture endpoint. Another T3 Code instance may be using it.":
    "无法启动 Niri 截图端点，可能被另一个 T3 Code 实例占用。",
  "Could not connect to your desktop's shortcut service.": "无法连接桌面系统的快捷键服务。",
  "Could not check desktop capture support. Check your desktop session and try again.":
    "无法检查桌面截图支持情况。请检查桌面会话后重试。",
  "The extension installation is not a regular directory. Manage it in GNOME Extensions instead.":
    "扩展安装位置不是普通目录。请在 GNOME 扩展应用中管理。",
  "GNOME did not respond. Sign in to a GNOME Wayland session and try again.":
    "GNOME 未响应。请登录 GNOME Wayland 桌面会话后重试。",
  "The bundled extension supports GNOME {versions}. This session runs GNOME {major}.":
    "内置扩展支持 GNOME {versions}，当前桌面会话运行 GNOME {major}。",
  "Install the bundled extension to capture the active window without a picker. No download or administrator password is needed.":
    "安装内置扩展，即可直接截取活动窗口，无需选择窗口、下载或输入管理员密码。",
  "Installed. Save your work, sign out of GNOME and sign back in, then return here to enable the extension. Restarting T3 Code alone is not enough.":
    "已安装。请保存工作，退出 GNOME 后重新登录，再返回此处启用扩展。仅重启 T3 Code 无法生效。",
  "A newer extension is bundled with this app. Install it, then sign out and back in to load the update.":
    "此应用内置了更新版本的扩展。请安装后退出并重新登录，以加载更新。",
  "GNOME has disabled user extensions. Turn on Extensions in the GNOME Extensions app, then check again. T3 Code will not enable your other extensions for you.":
    "GNOME 已停用用户扩展。请在 GNOME 扩展应用中开启扩展，然后重新检查。T3 Code 不会替你启用其他扩展。",
  "The T3 Code extension is running. Active-window snapshots are available.":
    "T3 Code 扩展正在运行，可以截取活动窗口。",
  "GNOME could not load the extension. Check GNOME Extensions for details, or sign out and back in.":
    "GNOME 无法加载扩展。请在 GNOME 扩展应用中查看详情，或退出后重新登录。",
  "Enable the T3 Code extension to allow active-window snapshots. You can disable it here at any time.":
    "启用 T3 Code 扩展以截取活动窗口。你可以随时在此停用。",
  "Could not check GNOME extension setup.": "无法检查 GNOME 扩展设置。",
  "Hyprland capture did not respond. Check capture setup and try again.":
    "Hyprland 截图未响应。请检查截图设置后重试。",
  "Install the bundled helper to capture the window you're using.":
    "安装内置辅助程序，以截取当前使用的窗口。",
  "The Hyprland capture helper is missing from this build. Update or reinstall T3 Code.":
    "此版本缺少 Hyprland 截图辅助程序。请更新或重新安装 T3 Code。",
  "Update the bundled capture helper to continue.": "请更新内置截图辅助程序以继续。",
  "Helper ready. Hyprland may ask for screen-sharing permission on your first capture.":
    "辅助程序已就绪。首次截图时，Hyprland 可能会请求屏幕共享权限。",
  "Couldn't check Hyprland capture access.": "无法检查 Hyprland 截图权限。",
  "KDE couldn't register the capture helper. Make sure KDE's service tools (kbuildsycoca6) are installed, then reinstall the helper.":
    "KDE 无法注册截图辅助程序。请确认已安装 KDE 服务工具（kbuildsycoca6），然后重新安装辅助程序。",
  "KDE hasn't granted capture access. Reinstall the capture helper in setup, then try again.":
    "KDE 尚未授予截图权限。请在设置中重新安装截图辅助程序后重试。",
  "The KDE capture helper did not respond. Reopen capture setup and check access.":
    "KDE 截图辅助程序未响应。请重新打开截图设置并检查权限。",
  "Capture helper files must be regular files. Remove the conflicting link before trying again.":
    "截图辅助程序文件必须是普通文件。请移除冲突的链接后重试。",
  "Install the bundled helper to capture the window you're using without a picker.":
    "安装内置辅助程序，即可直接截取当前使用的窗口，无需选择窗口。",
  "The capture helper is missing from this build. Update or reinstall T3 Code.":
    "此版本缺少截图辅助程序。请更新或重新安装 T3 Code。",
  "KDE capture access is ready. Next, choose your shortcut.":
    "KDE 截图权限已就绪。接下来请选择快捷键。",
  "Couldn't check KDE capture access.": "无法检查 KDE 截图权限。",
  "Another desktop entry uses the capture helper's name. Rename it before continuing.":
    "另一个桌面条目使用了截图辅助程序的名称。请先将其重命名再继续。",
  "Waiting for shortcut permission. Approve the desktop prompt if one appears.":
    "正在等待快捷键权限。如果桌面弹出提示，请批准。",
  "Connecting to Hyprland shortcuts…": "正在连接 Hyprland 快捷键…",
  "Open your desktop's shortcut settings and allow T3 Code's capture shortcut.":
    "请打开桌面系统的快捷键设置，允许 T3 Code 的截图快捷键。",
  "Couldn't connect to Hyprland shortcuts. Make sure xdg-desktop-portal-hyprland is running, then restart T3 Code.":
    "无法连接 Hyprland 快捷键。请确认 xdg-desktop-portal-hyprland 正在运行，然后重启 T3 Code。",
  "Could not register the capture shortcut.": "无法注册截图快捷键。",
  "Shortcut permission wasn't granted. Open shortcut permissions to allow it.":
    "未获得快捷键权限。请打开快捷键权限设置并授予权限。",
  "Shortcut permission wasn't granted. Allow T3 Code in your desktop's shortcut settings.":
    "未获得快捷键权限。请在桌面系统的快捷键设置中允许 T3 Code。",
  "Managed by Hyprland. Add the binding to your config and save it.":
    "由 Hyprland 管理。请将快捷键添加到配置并保存。",
  "Hyprland did not register the capture action. Check that xdg-desktop-portal-hyprland is running, then restart T3 Code.":
    "Hyprland 未注册截图操作。请确认 xdg-desktop-portal-hyprland 正在运行，然后重启 T3 Code。",
  "Desktop shortcut: {label}": "桌面快捷键：{label}",
  "No shortcut is assigned. Open shortcut permissions to choose one.":
    "尚未分配快捷键。请打开快捷键权限设置进行选择。",
  "No shortcut is assigned. Choose one in your desktop's shortcut settings.":
    "尚未分配快捷键。请在桌面系统的快捷键设置中选择。",
  "This Lua config needs a manual edit. Choose your bindings file or use manual setup in Advanced.":
    "此 Lua 配置需要手动编辑。请选择快捷键配置文件，或使用“高级”中的手动设置。",
  "Shift combinations are used for typing and text selection. Add another modifier.":
    "Shift 组合键用于输入和文本选择。请添加另一个修饰键。",
  "This shortcut is {action} in most apps.": "此快捷键在大多数应用中用于“{action}”。",
  "This shortcut controls running commands in terminals.": "此快捷键用于控制终端中运行的命令。",
  "The system uses Alt+Tab to switch apps.": "系统使用 Alt+Tab 切换应用。",
  "The system already uses this shortcut.": "系统已使用此快捷键。",
  "{shortcut} is not available on this system.": "此系统不支持 {shortcut}。",
  "Select All": "全选",
  Copy: "复制",
  Find: "查找",
  New: "新建",
  Open: "打开",
  Print: "打印",
  Quit: "退出",
  "New Tab": "新标签页",
  Paste: "粘贴",
  "Close Window": "关闭窗口",
  Cut: "剪切",
  Undo: "撤销",
  "Could not show the permission helper.": "无法显示权限助手。",
  "Could not capture a test snapshot. No window is available to capture.":
    "无法截取测试截图，没有可截图的窗口。",
  "{task} timed out.": "{task} 超时。",
  "{task} failed: {command} exited with code {exitCode}.":
    "{task} 失败：{command} 已退出，退出码为 {exitCode}。",
  "{task} failed.": "{task} 失败。",
  'Could not capture a test snapshot. {failure} macOS grants Screen Recording and Accessibility to each app separately. In System Settings, open Privacy & Security and check that "{appName}" is allowed for both.':
    "无法截取测试截图。{failure} macOS 会分别为每个应用授予屏幕录制和辅助功能权限。请在系统设置中打开“隐私与安全性”，确认“{appName}”已获得这两项权限。",
} as const;

const desktopMessagePatterns = (
  Object.keys(settingsVoiceMessages) as Array<keyof typeof settingsVoiceMessages>
)
  .filter((key) => key.includes("{"))
  .sort((a, b) => b.length - a.length)
  .map((key) => {
    const parameters: string[] = [];
    const pattern = key
      .split(/(\{\w+\})/u)
      .map((part) => {
        if (/^\{\w+\}$/u.test(part)) {
          parameters.push(part.slice(1, -1));
          return "([\\s\\S]+?)";
        }
        return part.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
      })
      .join("");
    return { key, parameters, pattern: new RegExp(`^${pattern}$`, "u") };
  });

export function translateVoiceLabel(label: string, locale: Locale): string;
export function translateVoiceLabel(label: string | null, locale: Locale): string | null;
export function translateVoiceLabel(label: string | undefined, locale: Locale): string | undefined;
export function translateVoiceLabel(
  label: string | null | undefined,
  locale: Locale,
): string | null | undefined;
export function translateVoiceLabel(
  label: string | null | undefined,
  locale: Locale,
): string | null | undefined {
  if (label == null || locale !== "zh-CN") return label;
  // Electron prefixes rejected IPC errors with the channel and error class.
  const ipcError =
    /^(?:Error invoking remote method 'desktop:[^']+':\s*(?:\w*Error:\s*)?|\w*Error:\s*)([\s\S]+)$/u.exec(
      label,
    );
  if (ipcError) {
    const message = ipcError[1]!;
    const translated = translateVoiceLabel(message, locale);
    if (translated !== message) return translated;
  }
  if (Object.hasOwn(settingsVoiceMessages, label))
    return settingsVoiceMessages[label as keyof typeof settingsVoiceMessages];
  for (const { key, pattern, parameters } of desktopMessagePatterns) {
    const match = pattern.exec(label);
    if (!match) continue;
    return translate(
      locale,
      settingsVoiceMessages,
      key,
      Object.fromEntries(
        parameters.map((name, index) => [
          name,
          ["action", "task", "summary", "failure"].includes(name)
            ? translateVoiceLabel(match[index + 1]!, locale)
            : match[index + 1]!,
        ]),
      ),
    );
  }
  const testFailure = /^(Could not capture a test snapshot\.) (.+)$/.exec(label);
  if (testFailure)
    return `${translateVoiceLabel(testFailure[1]!, locale)} ${translateVoiceLabel(testFailure[2]!, locale)}`;
  return label;
}
