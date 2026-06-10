<p align="center">
  <img src="assets/goalflow-logo.svg" alt="GoalFlow 字标，包含 G 形流程 gate、目标节点和发布边界" width="520">
</p>

<p align="center">
  <strong>一句目标，完整交付。</strong><br>
  Impeccable 主导设计和原型，GSD 主导工程、验证、持久产物和发布 gate。
</p>

<p align="center">
  <a href="README.md">English</a> | 简体中文
</p>

# GoalFlow

GoalFlow 是面向 AI 编程代理的全流程功能交付编排 Skill。用户只需要提出一个功能目标，它就会把这个目标推进成有设计、有原型、有实现、有验证、有文档、有持久产物，并具备明确发布边界的软件交付流程。

GoalFlow 不是 shell CLI，也不是应用运行时。`$goalflow ...` 示例是给 AI 编程代理或 skill 聊天界面使用的调用方式。只有 `bash` 代码块中的命令才是在终端执行的命令。

## 为什么需要 GoalFlow

AI 编程代理可以很快写代码，但完整功能交付并不只是写代码。高质量交付还需要需求澄清、体验设计、交互原型、工程拆解、实现验证、文档更新、git 管理、PR 准备和发布安全 gate。GoalFlow 把这些环节组织成一个有明确分工的工作流：

- Impeccable 负责 UX、UI、交互、动效、品牌方向、前端效果和交互 HTML 原型。
- GSD 负责需求、计划、后端/API、执行、验证、文档、git、PR 准备和发布 gate。
- GoalFlow 根据阶段和动作自动选择合适的能力，把设计、工程和发布安全串成闭环。

## 交付 Gate

```text
环境检测 | 目标澄清 | 体验设计 | HTML 原型 | 设计评审 | 工程计划 | 实现 | 验证 | 发布准备
```

每个 gate 都要留下证据：

- 环境检测：运行时范围、项目根目录、git 仓库和真人 git 作者。
- 目标澄清：用户确认的意图，或 `--auto` 模式记录的自主假设。
- 体验设计：Impeccable 主导 UX、视觉系统、交互模型、动效和品牌方向。
- HTML 原型：对有意义的用户可见功能产出交互原型。
- 设计评审：普通模式等待用户确认；`--auto` 模式开启自主子代理评审并至少迭代一版。
- 工程计划：GSD 根据原型反推需求、后端/API 边界、阶段计划、验证和 UAT。
- 实现：分阶段执行，并持续使用 Impeccable 和 GSD 把关。
- 验证：最终评审、修复 P0/P1、更新文档并记录剩余风险。
- 发布准备：准备 PR/release notes，并停在明确的发布 gate。

## 安装

推荐安装方式：使用 GitHub Release 附带的正式 skill-only 发布包。该发布包不包含仓库规划、治理和设计草稿文件，是最干净的可安装 skill 产物。

请把 `VERSION` 设置为你要安装的发行版本。当前最新发行版是 `v0.3.0`。

Codex：

```bash
VERSION=v0.3.0
INSTALL_ROOT="$HOME/.codex/skills"
tmpdir="$(mktemp -d)"
mkdir -p "$INSTALL_ROOT"
curl -fL "https://github.com/zulinliu/GoalFlow/releases/download/${VERSION}/goalflow-${VERSION}-skill.tar.gz" -o "$tmpdir/goalflow.tar.gz"
tar -xzf "$tmpdir/goalflow.tar.gz" -C "$tmpdir"
rm -rf "$INSTALL_ROOT/goalflow"
mv "$tmpdir/goalflow" "$INSTALL_ROOT/goalflow"
rm -rf "$tmpdir"
```

Codex 的主推荐安装根仍然是 `~/.codex/skills/goalflow`。但对环境检测来说，Codex 运行时也会接受 `.agents` 中的依赖，因此共享安装不再被当成“外部目录导致失败”的来源。

Claude Code：

```bash
VERSION=v0.3.0
INSTALL_ROOT="$HOME/.claude/skills"
tmpdir="$(mktemp -d)"
mkdir -p "$INSTALL_ROOT"
curl -fL "https://github.com/zulinliu/GoalFlow/releases/download/${VERSION}/goalflow-${VERSION}-skill.tar.gz" -o "$tmpdir/goalflow.tar.gz"
tar -xzf "$tmpdir/goalflow.tar.gz" -C "$tmpdir"
rm -rf "$INSTALL_ROOT/goalflow"
mv "$tmpdir/goalflow" "$INSTALL_ROOT/goalflow"
rm -rf "$tmpdir"
```

共享 agent skills 目录：

```bash
VERSION=v0.3.0
INSTALL_ROOT="$HOME/.agents/skills"
tmpdir="$(mktemp -d)"
mkdir -p "$INSTALL_ROOT"
curl -fL "https://github.com/zulinliu/GoalFlow/releases/download/${VERSION}/goalflow-${VERSION}-skill.tar.gz" -o "$tmpdir/goalflow.tar.gz"
tar -xzf "$tmpdir/goalflow.tar.gz" -C "$tmpdir"
rm -rf "$INSTALL_ROOT/goalflow"
mv "$tmpdir/goalflow" "$INSTALL_ROOT/goalflow"
rm -rf "$tmpdir"
```

安装或更新 skill 后，请重启 harness，再执行环境检测。

开发安装方式：如果需要 README、规划文档、设计草稿、issue 模板或贡献历史，请克隆完整仓库。

Codex：

```bash
git clone https://github.com/zulinliu/GoalFlow.git ~/.codex/skills/goalflow
```

Claude Code：

```bash
git clone https://github.com/zulinliu/GoalFlow.git ~/.claude/skills/goalflow
```

共享 agent skills 目录：

```bash
git clone https://github.com/zulinliu/GoalFlow.git ~/.agents/skills/goalflow
```

如果你的 harness 使用其他 skills 目录，请把发布包安装到对应目录，或把完整仓库克隆到对应目录并命名为 `goalflow`，然后重启 harness，再执行环境检测。

## 环境检测

GoalFlow 需要 Node.js、npm/npx、Git、Impeccable 和 GSD。开始项目变更前，先从目标项目根目录执行检测。

Codex 安装：

```bash
cd <PROJECT_ROOT>
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Claude Code 安装：

```bash
cd <PROJECT_ROOT>
node ~/.claude/skills/goalflow/scripts/check_env.mjs
```

共享 agent 安装：

```bash
cd <PROJECT_ROOT>
node ~/.agents/skills/goalflow/scripts/check_env.mjs
```

其他安装方式：

```bash
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime codex
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime claude
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime shared
```

检测脚本会检查 Node/npm、git 仓库状态、git 作者、Impeccable、GSD core、GSD skills 和常见产物。缺失时请按 [references/environment.md](references/environment.md) 处理。GoalFlow 不会自动安装依赖，除非用户明确要求。

运行时兼容规则如下：

- Codex 默认推荐使用 `~/.codex/skills`，但环境检测会同时接受 `.codex` 和 `.agents` 中的依赖。
- Claude Code 只接受 `.claude` 中的依赖。
- `shared` 仍然是显式的 `.agents` 运行时，不是 Claude 的别名。

当使用 `--runtime auto` 时，显式 `--runtime` 仍然优先；安装在 `.claude` 下时继续按 Claude 处理；如果存在 `CODEX_*` 这类 Codex 会话信号，即使 GoalFlow 自己安装在 `.agents/skills/goalflow`，也会优先按 `codex` 处理。

## 使用

以下示例是在 agent 聊天或 skill 调用界面使用，不是在终端执行：

```text
$goalflow 做一个团队成员邀请功能
$goalflow --auto 做一个订单筛选功能
$goalflow --brand 做一个新产品首页
```

常见中文意图也会被路由，例如：`继续推进`、`重新设计`、`评审`、`修复`、`下一步做什么`、`准备发布`。

## 模式

| 模式 | 适合场景 | 行为变化 |
| --- | --- | --- |
| `$goalflow <目标>` | 希望先讨论设计，再进入实现。 | GoalFlow 会先做需求澄清、设计和原型，等待设计确认后再推进工程执行。 |
| `$goalflow --auto <目标>` | 希望跳过常规确认并自主推进。 | GoalFlow 会记录假设，并跳过常规澄清与设计/产品用户确认；但不会跳过自主设计质量评审、blocker、破坏性操作、凭据决策、外部状态变更或发布 gate。 |
| `$goalflow --brand <目标>` | 功能需要完整品牌文化建设。 | GoalFlow 会推进命名、品牌叙事、Logo 方向、slogan、页面/icon 命名、README 和文档描述统一。 |

## 原型规则

对有意义的功能，交互 HTML 原型是强制产物。包括新建或改动用户流程、可见 UI、复杂状态、品牌/落地页、 onboarding、设置页、仪表盘、表单和交互重的界面。

只有纯后端、纯文档、纯文案、数据迁移，或没有新交互的小配置/管理改动，才可以记录原因后跳过原型。

## 产物位置

GoalFlow 不创建自己的抢占式产物目录，而是保留 Impeccable 和 GSD 的原生约定。

Impeccable 产物：

- `PRODUCT.md`
- `DESIGN.md`
- `.impeccable/design.json`
- `.impeccable/live/`
- `.impeccable/critique/`
- 源码路由、组件或独立 HTML 原型

GSD 产物：

- `.planning/PROJECT.md`
- `.planning/config.json`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/research/`
- `.planning/phases/`
- `.planning/sketches/`
- `.planning/debug/`
- `.planning/intel/`

详见 [references/artifacts.md](references/artifacts.md)。

## 安全 Gate

GoalFlow 只有在确认 git 作者是真实具体的人之后，才能准备本地 commit。作者不能是 agent、bot、自动化、服务账号、no-reply 身份或泛化 AI assistant。

以下动作必须得到用户明确确认：

- push branch 或 commit 到远程仓库
- 创建、更新、改目标分支、关闭或合并远程 PR
- 创建或推送 tag
- 创建、编辑、发布或删除 release
- 发布 package、镜像、app build 或 artifact
- 部署到生产或共享环境
- 修改会影响协作者、用户、自动化或通知的共享外部状态

发行版资产只能包含可安装的 skill 产物，具体范围见 [references/release-gates.md](references/release-gates.md)。GitHub 可能自动展示 tag 源码快照，但 GoalFlow 的正式发布包必须保持 skill-only。

详见 [references/release-gates.md](references/release-gates.md)。

## 仓库结构

```text
.
├── SKILL.md
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── README.zh-CN.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── PRODUCT.md
├── DESIGN.md
├── goalflow-design.md
├── goalflow-brand-culture.md
├── .planning/
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   ├── STATE.md
│   └── config.json
├── agents/
│   └── openai.yaml
├── references/
│   ├── artifacts.md
│   ├── environment.md
│   ├── harnesses.md
│   ├── release-gates.md
│   ├── routing.md
│   └── workflow.md
├── scripts/
│   └── check_env.mjs
├── assets/
│   ├── goalflow-logo.svg
│   ├── goalflow-mark.svg
│   └── goalflow-mark-mono.svg
└── .github/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

正式发行包遵守 [references/release-gates.md](references/release-gates.md) 中的 skill-only 白名单，因此仓库规划和治理文件不会进入 canonical release assets。

## 路线图

- v0.1.0：核心 GoalFlow skill、环境检测、路由参考、发布 gate、双语 README、品牌系统和轻量开源治理。
- v0.2.0：新增 canonical `DESIGN.md`、`.planning/` 种子、按运行时限定的环境检测、单色 Logo 标记、更强治理规则、中英双语 release notes 和中英双语 commit 规范。
- v0.3.0：新增 `AGENTS.md` 仓库级 agent 记忆、轻量 `CLAUDE.md` 导入文件，并强化后续 Codex 与 Claude Code 迭代的上下文连续性。
- 下一阶段：补充更多 harness 安装说明、更完整的使用示例、更多原型示例、自动化发布文档新鲜度检查和更多 agent runtime 兼容性检测。

## 贡献

提交 PR 前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。欢迎 AI 辅助贡献，但每个 commit 和 PR 都必须由具体的人负责。

社区沟通和协作要求见 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

## 版本记录

见 [CHANGELOG.md](CHANGELOG.md)。

## 安全

请不要在公开 issue 中披露可利用的安全细节。见 [SECURITY.md](SECURITY.md)。

## 许可证

Apache-2.0。见 [LICENSE](LICENSE)。
