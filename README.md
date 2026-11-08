> **非官方简体中文分支（开发中）**：语言设置、覆盖范围及限制见 [中文使用说明](docs/user/chinese.md)。以下官方安装命令不会安装此分支。

# T3 Code

T3 Code 是一个“智能体运行环境控制台”。你可以通过一流的移动应用（[iOS](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824)、[Android](https://play.google.com/store/apps/details?id=com.t3tools.t3code)）、[Web 应用](https://app.t3.codes)和[基于 Electron 的桌面应用](https://t3.codes)控制你电脑上的智能体。

支持使用你在 Claude Code、Codex、Cursor、Grok Build、OpenCode、Google Antigravity 和 fx 上的订阅。只要它们已在你的电脑上配置好，T3 Code 就能控制它们。

## “等等，你想卖我什么？”

什么都不卖。我们做 T3 Code，是因为想要与智能体协作时最好的开发体验。Codex 桌面应用、Conductor、Claude Desktop 和 Cursor Glass 等现有方案给了我们启发，但都没有达到我们的标准。

我们想要的是高性能、支持远程、真正开放的工具。如果我们哪天走错了方向，希望你手里有一切所需，能够自行分叉并打造你想要的编辑器。

## 安装

> [!WARNING]
> T3 Code 目前支持 Codex、Claude、Cursor、Grok Build、OpenCode、Antigravity 和 fx。使用前请至少安装并登录一个提供方：
>
> - Codex：安装 [Codex CLI](https://developers.openai.com/codex/cli)，然后运行 `codex login`
> - Claude：安装 [Claude Code](https://claude.com/product/claude-code)，然后运行 `claude auth login`
> - Cursor：安装 [Cursor CLI](https://cursor.com/cli)，然后运行 `agent login`
> - Grok Build：安装 [Grok Build CLI](https://x.ai/cli)，然后运行 `grok login`
> - OpenCode：安装 [OpenCode](https://opencode.ai)，然后运行 `opencode auth login`
> - Antigravity：在设置中启用，然后使用 **安装 Antigravity** 和 **Sign in with Google**。无需 CLI。
> - fx：安装 [fx](https://fx.sh)，并在运行 T3 Code 服务端的机器上运行 `fx login`（[配置指南](./docs/user/providers-fx.md)）

### 命令行

```bash
curl -fsSL https://t3.codes/install.sh | sh
```

Windows 上在 PowerShell 中运行：

```powershell
irm https://t3.codes/install.ps1 | iex
```

然后运行 `t3` 启动服务端并打开本地 Web 应用。`t3 service install` 让它在后台持续运行，`t3 update` 升级到新版本，`t3 --help` 查看完整说明。

不想安装、只想试用一次，可以改为运行 `npx t3@latest`。

### 桌面应用

从 [GitHub Releases](https://github.com/pingdotgg/t3code/releases) 安装最新版桌面应用，或使用你常用的包管理器：

#### Windows（`winget`）

```bash
winget install T3Tools.T3Code
```

#### Windows（`scoop`）

```bash
scoop install extras/t3code
```

#### macOS（Homebrew）

```bash
brew install --cask t3-code
```

#### Debian、Ubuntu（`.deb`）

从 [GitHub Releases](https://github.com/pingdotgg/t3code/releases) 下载 `.deb`，然后：

```bash
sudo apt install ./T3-Code-*.deb
```

#### Arch Linux（AUR）

稳定版：

```bash
yay -S t3code-bin
```

每夜版：

```bash
yay -S t3code-nightly-bin
```

AUR 打包文件维护在本仓库的 [`packaging/aur`](./packaging/aur) 下。

#### Nix（nixpkgs）

```bash
nix profile add github:NixOS/nixpkgs/nixos-unstable#t3code
```

该软件包维护在 [nixpkgs](https://github.com/NixOS/nixpkgs/tree/nixos-unstable/pkgs/by-name/t3/t3code) 中，
包含桌面应用（`t3code-desktop`）和 `t3` 命令。
NixOS 配置与更新方式见 [Nix 安装](./docs/user/install.md#nix-nixpkgs)。

## 一些说明

这个项目还处于非常非常早期的阶段，难免有 bug。

我们（基本上）暂不接受贡献。小修复可能会考虑，大功能不会。

## 文档

完整文档位于 [docs/](./docs)，目前还没有文档站点。

- [常见问题](./docs/user/faq.md)
- [安装与首次运行](./docs/user/install.md)
- [权限模式](./docs/user/permission-modes.md)
- [快捷键](./docs/user/keybindings.md)
- [项目设置](./docs/user/project-settings.md)
- [外观偏好](./docs/user/appearance.md)
- [从手机或其他机器远程访问](./docs/user/remote-access.md)
- [通过 MCP 连接 Claude Code、Codex、ChatGPT 等智能体](./docs/user/outside-agents.md)
- [保持应用与服务端同步](./docs/user/updating.md)
- [源代码管理集成](./docs/user/source-control.md)
- 多账号：[Codex](./docs/user/providers-codex.md) · [Claude](./docs/user/providers-claude.md)
- [将 T3 Code 作为后台服务运行](./docs/user/background-service.md)

想从源码构建？请从 [docs/internals/overview.md](./docs/internals/overview.md) 开始。

## 如果你仍然真的想贡献……请先读这里

### 安装 `vp`

T3 Code 使用 Vite+，因此需要安装全局 `vp` 命令行工具。

#### macOS / Linux

```bash
curl -fsSL https://vite.plus | bash
```

#### Windows

```bash
irm https://vite.plus/ps1 | iex
```

更多信息请查看其入门指南：https://viteplus.dev/guide/

### 安装依赖

```bash
vp i
```

报告 bug 或提交 PR 前，请先阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)。

有功能建议？请发起一个 [Ideas 讨论](https://github.com/pingdotgg/t3code/discussions/categories/ideas)。

需要帮助？加入 [Discord](https://discord.gg/jn4EGJjrvv)。
