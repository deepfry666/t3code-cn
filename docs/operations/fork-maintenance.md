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
2. `git fetch official main && git merge official/main`。冲突以官方为准，只重新套用中文分支的 `t()` 改动和指向 `deepfry666/t3code-cn` 的发布源。`apps/web/src/i18n/translations/zh.json` 直接取官方版本。
3. `vp run i18n:untranslated -- $pre` 找出新增英文，翻译进旁边的 `*.messages.ts`，再运行 `vp run i18n:export`。
4. `vp run check:changed` 全部通过后提交、开 PR。

## 发布

```bash
scripts/fork-release.sh 0.1.9-cn.3 <发布说明.md>
```

要在 `origin/main` 的干净工作副本里运行，大约一小时。脚本先建一个草稿 Release，触发 `fork-windows-desktop.yml` 在 GitHub 上构建 Windows、Linux 安装包和 Linux 命令行程序并直接传进草稿，同时在本机打包、签名 macOS 版。最后合并校验值、检查全部文件都在，才把草稿正式发布。用户的应用读取 `latest*.yml`，发布后就会收到更新。

两次官方版本之间修了翻译或加了功能，合并后照样运行这个脚本，把 `N` 加 1。

发布说明参考上一个 Release 的格式：下载安装、本版变化、已知限制。

### 运行发布的机器

- Apple 芯片的 Mac，已登录 `gh`，能推送 `deepfry666/t3code-cn`。
- `PATH` 最前面是 `package.json` 里 `engines.node` 指定的 Node 版本，脚本会先检查。
- `~/.t3code-cn-signing` 里有 `signing.keychain-db` 和 `passphrase`。这是自签名证书，每个版本都必须用同一张签名，否则已安装的 macOS 应用会拒绝更新。**不要重新生成它，并在别处保留一份备份。** 换电脑时把整个目录复制过去。

### 发布失败

脚本中途失败时会留下草稿 Release。看清报错并修好原因后，删掉草稿再重新运行：

```bash
gh release delete v0.1.9-cn.3 -R deepfry666/t3code-cn --yes
```

草稿还没有打 tag，删掉不会影响已发布的版本。
