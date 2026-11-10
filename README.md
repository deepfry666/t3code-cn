# T3 Code 中文版（非官方）

[![最新版本](https://img.shields.io/github/v/release/deepfry666/t3code-cn?label=%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC)](https://github.com/deepfry666/t3code-cn/releases/latest)
[![许可证](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![官方项目](https://img.shields.io/badge/upstream-pingdotgg%2Ft3code-black)](https://github.com/pingdotgg/t3code)

这是 [T3 Code](https://github.com/pingdotgg/t3code) 的非官方简体中文分支。T3 Code 是一个开源的智能体控制台，可以在桌面、Web 和手机上操控你电脑上的 Claude Code、Codex、Cursor、OpenCode 等智能体，用的是你自己的订阅。

本分支只做一件事：给 T3 Code 加上可切换的简体中文界面，其余功能与官方保持一致，并持续合并官方更新。它不是官方发行版，也不代表原团队提供支持。

## 下载

| 系统                | 安装包                     | 说明                                                     |
| ------------------- | -------------------------- | -------------------------------------------------------- |
| Windows（x64）      | `T3-Code-<版本>-x64.exe`   | 未签名，若出现 SmartScreen 提示，点“更多信息”→“仍要运行” |
| macOS（Apple 芯片） | `T3-Code-<版本>-arm64.dmg` | 首次打开需手动放行，见 [macOS 安装](#macos-安装)         |
| Linux               | —                          | 暂无安装包，可[从源码构建](#从源码构建)                  |

到 [最新版本](https://github.com/deepfry666/t3code-cn/releases/latest) 下载。安装后，后续中文版会在应用内自动检查并更新。

注意：官方的安装命令（`t3.codes/install.sh`、winget、Homebrew 等）安装的是官方英文版，不是本分支。

### macOS 安装

macOS 安装包只支持 Apple 芯片（M 系列）的 Mac，文件名形如 `T3-Code-<版本>-arm64.dmg`。

1. 打开 dmg，把 **T3 Code (Beta)** 拖进“应用程序”文件夹。不要直接在 dmg 里运行，否则应用无法自动更新。
2. 首次打开会被系统拦下，提示无法验证开发者：安装包使用本分支的自签名证书，没有经过 Apple 公证。任选一种方式放行：
   - 在“应用程序”里双击打开一次并关闭提示，然后到 **系统设置 → 隐私与安全性**，在页面下方点 **仍要打开** 并输入密码确认。macOS 15 起，右键“打开”已不能跳过这一步。
   - 或在终端执行：`xattr -dr com.apple.quarantine "/Applications/T3 Code (Beta).app"`
3. 之后的中文版更新会在应用内下载并安装，不需要再次放行。

从官方版换成中文版后，屏幕录制、麦克风等系统权限需要重新授予一次，钥匙串也可能询问是否允许访问，选择“始终允许”即可。

## 安装前必读

本分支沿用官方的应用标识、`~/.t3` 数据目录和 `t3` 命令，因此登录、T3 Connect 和远程连接都按官方方式工作，并会直接读取官方版本已有的对话记录。

- 不能与官方桌面版同时安装：请先卸载官方桌面版，并备份 `~/.t3`。
- 不要在两个版本之间来回切换，版本不一致时数据库可能无法回退。
- 本分支没有官方签名，macOS 上的通行密钥（Passkey）登录可能不可用，可改用其他登录方式。
- 桌面更新源指向本仓库，不会被官方英文版覆盖。Windows 从 `0.1.7-cn.2`、macOS 从 `0.1.7-cn.4` 起支持应用内自动更新；更早的 macOS 预发布版请手动下载新版覆盖安装一次。
- 本仓库的 Releases 只有桌面安装包，没有 `t3` 命令行程序，因此 CLI 安装脚本、`t3 update` 和在桌面应用里添加 SSH 远程环境暂时不可用。

使用前还需至少安装并登录一个提供方：

- Codex：安装 [Codex CLI](https://developers.openai.com/codex/cli)，运行 `codex login`
- Claude：安装 [Claude Code](https://claude.com/product/claude-code)，运行 `claude auth login`
- Cursor：安装 [Cursor CLI](https://cursor.com/cli)，运行 `agent login`
- OpenCode：安装 [OpenCode](https://opencode.ai)，运行 `opencode auth login`

其他提供方和详细步骤见官方的 [安装与首次运行](docs/user/install.md)。

## 切换语言

打开 **设置 → 通用 → 语言 → 界面语言**（英文界面下为 **Settings → General → Language → Interface language**），选择 **简体中文**，无需重启。首次打开时自动选择：Web 版跟随浏览器语言，桌面应用跟随系统语言。

## 汉化内容

- Web 与桌面应用共用的界面：设置、侧边栏、会话、命令面板、Git 与拉取请求、文件预览、设备和用量等常用部分。
- 桌面应用的原生菜单（系统语言为中文时）。
- 尚未覆盖的页面继续显示英文；iOS / Android 原生客户端暂未汉化。
- 项目名、文件路径、代码、终端输出、模型回复和第三方错误信息不会被翻译。界面语言也不影响模型回答所用的语言。

完整的覆盖范围与已知限制见 [中文使用说明](docs/user/chinese.md)。

## 翻译记录

全部界面译文汇总在 [`i18n/zh-CN.json`](i18n/zh-CN.json)，按所在文件分组列出每一条英文原文和对应中文，是本分支汉化成果的完整记录。术语约定和更新方法见 [`i18n/README.md`](i18n/README.md)。

发现翻译不准确或漏翻，欢迎到 [Issues](https://github.com/deepfry666/t3code-cn/issues) 反馈，附上截图和所在页面即可。

## 从源码构建

先安装 [Vite+](https://viteplus.dev/guide/) 提供的 `vp` 命令：

```bash
# macOS / Linux
curl -fsSL https://vite.plus | bash
```

```powershell
# Windows（PowerShell）
irm https://vite.plus/ps1 | iex
```

然后克隆本仓库并安装依赖：

```bash
git clone https://github.com/deepfry666/t3code-cn.git
cd t3code-cn
vp i
```

- 本地运行服务端与 Web 界面：`vp run dev`
- 打包 macOS 桌面应用（未签名的 `.dmg`，输出到 `release/`）：`vp run dist:desktop:dmg`

更多架构说明见 [docs/internals/overview.md](docs/internals/overview.md)。

## 与官方的关系

- 本分支以官方代码为准，定期合并 [pingdotgg/t3code](https://github.com/pingdotgg/t3code) 的更新，只在其上叠加翻译和发布来源的改动。
- 中文翻译、汉化遗漏或本分支特有的问题，请在 [本仓库的 Issues](https://github.com/deepfry666/t3code-cn/issues) 反馈，不要提交到官方仓库。
- 与汉化无关的功能问题，请先确认官方版本是否也存在，再到官方仓库反馈。
- 官方文档位于 [docs/](docs)，大部分仍为英文。

## 许可证

沿用原项目的 [MIT 许可证](LICENSE)，保留原作者版权声明。
