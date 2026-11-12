# 翻译记录

[`zh-CN.json`](zh-CN.json) 汇总了本分支全部界面译文：按所在源文件分组，每一条都是“英文原文 → 中文”。它是汉化成果的完整快照，方便查阅、检索和对照，也能在官方大改某个界面后，从这里找回原来的译文。

真正生效的译文写在各界面旁边的 `*.messages.ts` 文件里（桌面原生菜单在 `apps/desktop/src/window/menuLocalization.ts`）。改了译文后运行：

```bash
vp run i18n:export
```

重新生成 `zh-CN.json`。`scripts/fork-i18n.test.ts` 会检查它与代码一致，`vp run check:changed` 在任何翻译文件变动时都会运行这项检查。

键名里 `@@` 之后的部分只用来区分语境，例如 `"Input@@thread-status"`，界面上显示的英文是 `Input`。`{count}` 这类占位符会在显示时替换成实际内容。

## 术语约定

同一英文在各处必须译法一致，下列术语有固定译名：

| 英文                | 中文                                          |
| ------------------- | --------------------------------------------- |
| thread              | 会话                                          |
| project             | 项目                                          |
| environment         | 环境                                          |
| provider            | 提供方                                        |
| worktree            | 工作树                                        |
| agent               | 智能体                                        |
| keybinding          | 快捷键                                        |
| archive             | 归档                                          |
| snooze              | 暂缓                                          |
| settle              | 收尾                                          |
| sidebar             | 侧边栏                                        |
| beta                | 测试版                                        |
| labs                | 实验功能                                      |
| checkout            | 工作副本                                      |
| machine             | 机器（指本机时写“本机”）                      |
| device              | 设备（手机、模拟器）                          |
| source control      | 版本控制                                      |
| review guide        | 审查导览                                      |
| Git stash           | 贮藏（恢复贮藏）；输入框提示词 stash 为暂存   |
| schedule            | 定时（定时方式、定时规则）                    |
| plan                | 智能体计划；订阅套餐                          |
| secret              | 凭据；key / API key / signing key 为密钥      |
| Open                | PR 状态为开放；动作为打开；设备折叠形态为展开 |
| issue               | issue（GitHub 议题）                          |
| host                | 代码托管平台为托管平台；运行机器为主机        |
| archive（文件预览） | 压缩包                                        |
| QR code             | 二维码                                        |

产品名、品牌和技术缩写保持英文，例如 Agent Platform、ACP Registry、Span、T3 Code、T3 Connect、GitHub、Codex、Claude、Cursor、CLI、MCP、SSH、API、URL、JSON、token、macOS、Windows、Finder。GitHub 的 issue 保留英文。导航、标签页、分区标题、按钮、菜单项和字段名等短标签中，pull request 用 PR，merge request 用 MR；描述、提示、错误和通知等完整句子保留 pull request / merge request，句首首字母大写，句中照原文小写。来自代码的 `{kind}` 占位符值及其译文保持原样。change request 保留英文。完整清单以 [`scripts/fork-i18n.test.ts`](../scripts/fork-i18n.test.ts) 为准。

## 同步策略

代码跟随官方，措辞沿用本分叉。官方已经使用 `gt()` / `<T>` 的文字保留官方包装，其余界面继续使用旁边的 `*.messages.ts`。语言统一由官方客户端 `language` 设置控制，旧版语言选择在升级时迁移。

同步时若 `apps/web/src/i18n/translations/zh.json` 冲突，先取官方版本，再运行 `vp run i18n:export`：脚本按 `en.json` 的英文匹配分叉目录，重写中文。官方独有文字默认保留；需要修正术语时，在分叉 `*.messages.ts` 增加对应英文和译文。测试同时检查生成结果和术语。

合并后运行 `vp run i18n:untranslated -- <合并前的提交>`（`--path <路径前缀>` 只看某个目录），并人工阅读新增文件及多行 JSX，扫描器会漏掉它们。和手机端共用的 `packages/client-runtime` 里的英文不能直接改成 `t()`，要在网页显示它的地方翻译。补译后再次导出。刻意保留的品牌、诊断和技术文字列在 `keep-english.txt`。
