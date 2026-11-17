# 中文版维护流程

本页只属于中文分支，写给维护 `deepfry666/t3code-cn` 的人。译文和术语的规则见 [`i18n/README.md`](../../i18n/README.md)。

## 版本号

中文版版本号写作 `x.y.z-cn.N`，`x.y.z` 是合并进来的官方版本，`N` 从 1 开始，同一官方版本上每发一次加 1。按 semver 规则它必须低于官方 `x.y.z`，`scripts/fork-validate-version.sh` 会拒绝不合规的版本号。

## 官方发新版时

一个 T3 Code 定时任务每天运行一次，按 `node scripts/fork-upstream-status.ts` 的输出决定下一步：

| 输出      | 含义                                    | 定时任务会做什么                                        |
| --------- | --------------------------------------- | ------------------------------------------------------- |
| `idle`    | 已跟上官方，当前版本已发布              | 什么都不做                                              |
| `sync`    | 官方有了新版本                          | 合并官方代码、补译、跑检查，开 `chore/sync-v<版本>` PR  |
| `wait`    | 同步 PR 还开着                          | 等人合并                                                |
| `release` | main 上的官方版本还没有对应的中文版发布 | 写发布说明，运行 `scripts/fork-release.sh` 发布 `-cn.1` |

维护者要做的只有一件事：读同步 PR 并合并。PR 被开成草稿，说明定时任务遇到了没把握的冲突、漏翻的文字或修不好的检查，正文开头会写明卡在哪里，需要人工接手。

手动同步的步骤和定时任务相同：

1. 在新工作树里从 `origin/main` 建分支，记下合并前的提交 `pre`。
2. 同步指定正式版时，先 `git fetch official tag v0.1.10`，再 `git merge v0.1.10`，不要把发布后 `official/main` 的提交一起带入。冲突以官方为准，只重新套用仍在使用的中文文案和指向 `deepfry666/t3code-cn` 的发布源。`apps/web/src/i18n/translations/zh.json` 直接取官方版本。
3. `vp run i18n:untranslated -- $pre` 找出新增英文，翻译进旁边的 `*.messages.ts`，再运行 `vp run i18n:export`。
4. `vp run check:changed` 全部通过后提交、开 PR。

官方在发布后才更新源码中的版本号，因此正式 tag 的 manifest 可能仍写着上一版。中文版的合并提交不能依赖官方“HEAD 正好位于稳定 tag”的版本推断；合并时把 `apps/server`、`apps/web`、`apps/desktop` 和 `packages/contracts` 的 `package.json` 版本对齐到此次正式版，再用 `scripts/fork-validate-version.sh` 校验对应的 `-cn.N` 版本。

## 发布

```bash
scripts/fork-release.sh 0.1.10-cn.4 <发布说明.md>
```

要在 `origin/main` 的干净工作副本里运行（也可以加 `--no-wait` 派发后直接退出，或直接在 GitHub Actions 的 `Fork release artifacts` 页面手动触发）。脚本先建一个草稿 Release，再触发 `fork-windows-desktop.yml` 在 GitHub 云端并行构建 Windows、Linux 和 macOS 全部桌面安装包与命令行程序（共 18 个产物，其中 macOS 使用同一张自签名证书签名）。云端任务生成并核对 `SHA256SUMS`、确认全部文件非空后，自动把草稿设为正式 Latest Release。用户的应用读取 `latest*.yml`，发布后就会收到更新。

两次官方版本之间修了翻译或加了功能，合并后照样运行这个脚本，把 `N` 加 1。

发布说明参考上一个 Release 的格式：下载安装、本版变化、已知限制。

### 签名证书与环境要求

- 运行发布脚本的机器只需安装 Node、`gh`、`jq`，并已登录 `gh` 能访问 `deepfry666/t3code-cn`（不再要求本机编译或上传大文件）。
- macOS 云端签名读取仓库的 GitHub Actions Secrets：`T3CODE_CN_MACOS_CERT_P12`（`t3code-cn-signing.p12` 的 Base64）和 `T3CODE_CN_MACOS_CERT_PASSWORD`（证书口令）。
- 本机 `~/.t3code-cn-signing` 目录保存着同一张证书的原件（`t3code-cn-signing.p12`、`signing.keychain-db` 和 `passphrase`）。每个版本都必须用同一张证书（SHA-1 `A839365945BD24B57F1D02A1FA403FC6FDE2E97A`）签名，否则已安装的 macOS 应用会拒绝更新。**不要重新生成它，并在别处保留一份离线备份。**

### 发布失败

云端构建中途失败时不会发布正式版，只会留下草稿 Release。看清报错并修好原因后，如果无需改代码可在 GitHub Actions 页面直接点击 **Re-run failed jobs**；如果要改代码重新发，先删掉草稿再重新运行：

```bash
gh release delete v0.1.10-cn.4 -R deepfry666/t3code-cn --yes
```

草稿还没有打 tag，删掉不会影响已发布的版本。
