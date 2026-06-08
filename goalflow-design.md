# GoalFlow 设计方案

## 项目定位

GoalFlow 是一个面向 AI 编程代理的全流程功能交付编排 Skill。用户只需要提出“做一个 XXX 功能”，GoalFlow 就按前端体验优先的方式，先用 Impeccable 打磨功能设计、品牌体验、交互动效和 HTML 原型，再用 GSD 反推需求、API、后端、任务拆解、验证、文档、PR 和发布闭环。

## 名称与简介

Skill 名称：`goalflow`

显示名：GoalFlow

中文简介：

GoalFlow：从一句功能目标，到设计、原型、实现、验证、文档和发布的 AI Agent 全流程交付编排器。

English intro:

GoalFlow turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready software delivery flow for AI coding agents.

## 核心分工

Impeccable 是视觉和前端体验最高裁决层，负责品牌、UX、UI、交互、动效、HTML 原型、前端实现、设计审查和反 AI 模板化质量把关。

GSD 是工程流程和交付闭环最高裁决层，负责需求、规划、后端/API、任务拆解、执行、验证、文档、git、PR 和发布。

## 关键原则

1. 前端体验优先：先用 Impeccable 锁定用户体验、交互、状态和原型，再由 GSD 反推 API、数据模型和后端边界。
2. 原型强制：大功能必须产出完整交互 HTML 原型，包含真实内容、状态切换、响应式、hover/focus/loading/error/success、动效和 reduced motion。
3. 原型进 git：无论原型落在源代码、独立 `index.html`，还是 `.planning/sketches/`，都必须纳入 git 管理。
4. 原生落档：GoalFlow 不新增自己的抢占式产物目录，严格遵守 Impeccable 和 GSD 的落档规范。
5. 并行优先：凡是可以并行的调研、竞品分析、代码扫描、UI 审查、后端审查、测试缺口审查、发布前检查，都优先用子代理并行。
6. 中文审查：需要用户审查的文档使用中文，主要给 agent 消费的内部执行文档使用英文。
7. 发布 gate：本地 commit 可自动，PR 合并、tag、release 必须由用户在发布 gate 确认。

## 参数设计

只保留两个参数：

```text
$goalflow 做一个 XXX 功能
$goalflow --auto 做一个 XXX 功能
$goalflow --brand 做一个 XXX 功能
```

中文用户通过自然语言表达阶段意图，例如“继续推进”“重新设计”“做品牌”“评审”“修复”“准备发布”“下一步做什么”。GoalFlow 自动路由。

## 阶段流程

1. 环境检测：检查 Impeccable、GSD、Node/npm、git 仓库、git author、GSD skills、Impeccable scripts。缺失时给详细安装命令和步骤，不自动安装，除非用户明确要求。
2. 项目初始化：缺 `.planning/` 时自动走 GSD 初始化。缺 `PRODUCT.md` 时必须走 Impeccable init。已有代码但缺 `DESIGN.md` 时优先 Impeccable document。
3. 目标理解与澄清：默认中文澄清。`--auto` 跳过用户确认，但不跳过设计评审。
4. 前端体验优先设计：使用 Impeccable 确定 UX、UI、交互、动效、状态、视觉方向和品牌表达。
5. 交互 HTML 原型：由 Impeccable 主控美感与体验；需要多方案归档时，可用 GSD sketch 存到 `.planning/sketches/`。
6. 工程设计与计划：用 GSD 生成或更新需求、phase、context、PLAN、VALIDATION、UAT。
7. 自主执行：GSD 负责阶段拆解、执行、测试、状态更新和 git 管理；Impeccable 在前端实现处把关。
8. 自主设计评审：`--auto` 模式必须自主开启子代理深度评审设计，基于评审至少迭代一版，再继续工程执行。
9. 品牌文化：`--brand` 进入完整品牌文化工程，包括功能命名、品牌叙事、logo 方向、slogan、页面名称、icon、README 叙事和文档描述统一更新。
10. 收尾评审与优化：多代理评审 UI、交互、性能、a11y、代码、测试、安全、文档、生产可用性。所有 P0/P1 必须修复并复审。
11. 发布准备：检查 git author 必须是具体人，不能是 Codex、Claude、Hapi 等 agent。自动准备本地 commit、PR 内容和 release notes。PR 合并、tag、release 必须进入发布 gate。

## 产物规则

Impeccable 原生产物：

- `PRODUCT.md`
- `DESIGN.md`
- `.impeccable/design.json`
- `.impeccable/live/`
- `.impeccable/critique/`
- 源代码或 HTML 原型

GSD 原生产物：

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/`
- `.planning/sketches/`
- `.planning/research/`

## 主要路由表

- 设计澄清：Impeccable `shape` + GSD `spec-phase` / `discuss-phase`
- 原型与视觉：Impeccable `craft` / `live` / `animate` / `layout` / `typeset` / `colorize`
- 多方案 HTML 原型归档：GSD `sketch`
- 项目规划：GSD `new-project` / `plan-phase`
- 执行：GSD `execute-phase` / `autonomous` / `quick`
- 前端审查：Impeccable `critique` / `audit` / `polish` / `harden`
- 工程审查：GSD `code-review` / `audit-fix` / `validate-phase` / `verify-work`
- 文档：GSD `docs-update` + Impeccable `document`
- 发布：GSD `ship` / `complete-milestone` / `pr-branch`

## 跨 Harness 策略

Codex 优先使用 `request_user_input`、可用多代理工具、Playwright 或本地浏览器检查；Claude 优先使用 `AskUserQuestion` 和 `Task()`；其他 harness 不支持时回退为纯文本问答和 inline 执行，并记录降级原因。

## 评审后强化约束

1. 远程 gate 加硬：任何远程 branch push、PR 创建/更新、merge、tag、release、外部包/镜像/构建产物发布、生产或共享环境变更，都必须用户确认。
2. Commit 作者检查前移：本地自主 commit 前也必须检查真实个人作者，并检查 `GIT_AUTHOR_*`、`GIT_COMMITTER_*` 环境变量覆盖。
3. `--auto` 可跳过用户确认，但必须留下假设、评审、迭代、降级和剩余风险记录，不能只依赖聊天历史。
4. 原型触发阈值明确：涉及新/改用户流、可见 UI、复杂状态、品牌/落地页、表单、仪表盘、交互重的功能必须出 HTML 原型；纯后端、文档、文案、迁移或无交互的小配置改动可记录原因后跳过。
5. 品牌模式边界明确：普通模式只检查产品语气、UX 命名和视觉一致性；`--brand` 才进入完整品牌文化工程。
6. 开源入口补强：仓库根目录提供中英文 README，Skill 主体提供中文用法示例。

## 外部参考

- https://github.com/pbakaus/impeccable
- https://www.skills.sh/pbakaus/impeccable/impeccable
- https://opengsd.net/
- https://opengsd.net/docs/v1/commands
