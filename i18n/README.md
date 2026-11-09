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

| 英文        | 中文     |
| ----------- | -------- |
| thread      | 会话     |
| project     | 项目     |
| environment | 环境     |
| provider    | 提供方   |
| worktree    | 工作树   |
| agent       | 智能体   |
| keybinding  | 快捷键   |
| archive     | 归档     |
| snooze      | 暂缓     |
| settle      | 收尾     |
| sidebar     | 侧边栏   |
| beta        | 测试版   |
| labs        | 实验功能 |
| checkout    | 工作副本 |

产品名、品牌和技术缩写保持英文，例如 T3 Code、T3 Connect、GitHub、Codex、Claude、Cursor、CLI、MCP、SSH、API、URL、JSON、token、macOS、Windows、Finder。开发者日常直接说英文的词也保留英文：PR、pull request、merge request、change request，句首首字母大写，句中照原文小写。完整清单以 [`scripts/fork-i18n.test.ts`](../scripts/fork-i18n.test.ts) 为准。

## 同步官方后补翻译

合并官方更新后，列出新增的英文界面文字：

```bash
vp run i18n:untranslated -- <合并前的提交>
```

不带参数时检查网页端、桌面端，以及和手机端共用的 `packages/client-runtime`。共用代码里的英文不能直接改成 `t()`，要在网页显示它的地方翻译。`--path <路径前缀>` 只看某个目录。把需要翻译的文字用 `t()` 包起来，在同一区域的 `*.messages.ts` 里加上中文，再运行 `vp run i18n:export`。

发给智能体的指令、日志和报错诊断、品牌名、快捷键这类文字刻意保留英文。确认要保留英文的，写进 [`keep-english.txt`](keep-english.txt)，检查脚本就不会再报告。
