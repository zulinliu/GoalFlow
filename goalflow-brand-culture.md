# GoalFlow 品牌文化建设方案

## 品牌定位

GoalFlow 是面向 AI 编程代理的全流程功能交付编排 Skill。它不是普通 CLI，不是项目管理看板，也不是单一的代码生成 prompt，而是把一句功能目标推进到设计、原型、实现、验证、文档和发布准备的交付工作流。

核心差异：

1. 前端体验先行：由 Impeccable 先把 UX、UI、交互、动效、品牌和 HTML 原型打磨好。
2. 工程闭环推进：由 GSD 负责需求、计划、后端/API、执行、验证、文档、git、PR 和发布 gate。
3. 自主但有边界：`--auto` 可以减少常规确认，但不能绕过设计评审、破坏性操作、外部状态变更和发布 gate。
4. 双语友好：默认面向开源国际传播，同时为中文用户提供完整中文 README、中文调用示例和中文 gate 文案。

## 品牌名称

正式名称：GoalFlow

Skill 名称：`goalflow`

命名理由：

- `Goal` 表达用户只需要给出一个目标。
- `Flow` 表达从目标到交付的阶段化流动。
- 名称短、易记、适合开源传播，也便于在 agent skill 中输入。

## 中英文简介

中文简介：

GoalFlow：从一句功能目标，到设计、原型、实现、验证、文档和发布的 AI Agent 全流程交付编排器。

English intro:

GoalFlow turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow for AI coding agents.

## 品牌语和 Slogan

主 slogan：

One goal. Full delivery.

中文对应：

一句目标，完整交付。

支持文案：

Impeccable-led design and prototype, GSD-led engineering and release.

中文支持文案：

Impeccable 主导设计和原型，GSD 主导工程和发布。

使用原则：

- README、仓库描述和首屏传播使用主 slogan。
- 在 slogan 后必须紧跟支持文案，避免 GoalFlow 被理解成泛化自动化工具。
- 不反复堆叠 slogan，重点讲清楚输入、流程、产物和安全边界。

## 品牌文化支柱

1. Design frames the work
   设计先定义用户体验、状态和交互，再反推后端/API。

2. Flow preserves context
   从目标、设计、原型、计划、实现到发布准备，关键决策要落档，而不是只留在聊天历史。

3. Autonomy moves through gates
   自主推进可以提高效率，但必须通过设计评审、验证、真人作者和发布 gate。

4. Release-ready is done
   功能完成不等于代码写完。文档、测试、评审、PR 说明、风险和回滚也属于交付。

## Logo 创意方案

### 方向 A：Flow Gate（主推）

创意：一个目标点进入 `G` 形路径，穿过 gate 后到达发布节点。
含义：GoalFlow 的核心不是无边界自动化，而是有节奏、有 gate 的交付流。
适用：README、仓库头像、社交分享、文档首页。
风险：需要避免像普通循环箭头或单纯 checkmark。

### 方向 B：Goalmark（小尺寸）

创意：将目标点、路径和出口节点压缩成更简洁的 mark。
含义：从目标到结果。
适用：favicon、GitHub avatar、小尺寸图标。
风险：太抽象时需要通过 README 文案解释。

### 方向 C：Gate Monogram（探索）

创意：把 `G` 和 `F` 变成打开的 gate。
含义：GoalFlow 是让目标进入可交付通道的入口。
适用：未来品牌升级或更强识别度版本。
风险：复杂度更高，需经过 16px、24px、单色测试。

### 暂不主推：Dual Current

创意：两条流线代表 Impeccable 和 GSD 汇合。
原因：逻辑准确，但视觉上容易落入通用集成工具或 SaaS 自动化标识。

## 当前 Logo 落地

v0.1.0 先落地 Flow Gate 系列：

- `assets/goalflow-logo.svg`：README 和开源传播使用的横向标识。
- `assets/goalflow-mark.svg`：小尺寸标识和未来 favicon/avatar 基础。

视觉元素含义：

- 深钴蓝路径：稳定、工程化、可验证的流程。
- 铜色目标点：用户给出的功能目标和最终发布节点。
- `G` 形路径：GoalFlow 的名称识别。
- gate 开口：自主推进必须通过安全边界。

## 视觉方向

主色：deep cobalt。
辅助色：copper/ochre。
整体气质：实用、清晰、工程可信，同时比普通 agent 工具更有设计感。

避免：

- 紫蓝渐变堆叠。
- 泛化 checkmark。
- 大量 pipeline 节点。
- 装饰性 sparkles。
- 过度营销的 AI 生产力视觉。

## README 传播结构

英文默认 `README.md`：

1. Logo + slogan。
2. 说明 GoalFlow 是 agent skill，不是 shell CLI。
3. Why GoalFlow。
4. How it works。
5. Install。
6. Environment check。
7. Usage。
8. Modes。
9. Prototype rule。
10. Artifacts。
11. Safety gates。
12. Repository structure。
13. Roadmap、Contributing、Changelog、Security、License。

中文完整镜像 `README.zh-CN.md`：

- 保持同等信息密度，不做摘要版。
- 默认解释中文用户最容易混淆的点：`$goalflow` 是 agent 调用，不是终端命令。
- 保留中文 follow-up 意图示例。

## 开源治理设计

v0.1.0 使用轻量治理，不引入复杂委员会或 RFC 流程。

必须有：

- `CHANGELOG.md`：记录 v0.1.0 初始发布内容。
- `CONTRIBUTING.md`：说明贡献流程、AI 辅助贡献、真人作者要求、测试和文档要求。
- `SECURITY.md`：说明不要公开披露安全细节。
- `CODE_OF_CONDUCT.md`：基础行为准则。
- `.github/pull_request_template.md`：加入 agent skill、真人作者、安全 gate 和文档检查。
- `.github/ISSUE_TEMPLATE/bug_report.yml`：收集 harness、agent、版本、预期和实际结果。
- `.github/ISSUE_TEMPLATE/feature_request.yml`：收集功能目标、工作流影响和产物需求。

## 文案边界

必须说清：

- GoalFlow 是 AI coding-agent skill。
- `$goalflow ...` 是 agent-chat invocation，不是 shell command。
- `--auto` 不跳过发布 gate。
- 本地 commit 也需要真人作者。
- 远程 push、PR、merge、tag、release、deploy、外部 artifact 发布必须用户确认。

避免：

- "magic automation"。
- "fully autonomous release"。
- "CLI usage" 这类会让用户误以为 GoalFlow 是终端程序的表达。

## v0.1.0 实施清单

1. 新增 `PRODUCT.md`，为 Impeccable 提供品牌上下文。
2. 新增本文件，记录品牌文化建设方案。
3. 新增 `assets/goalflow-logo.svg` 和 `assets/goalflow-mark.svg`。
4. 重写英文 `README.md`。
5. 新增完整中文 `README.zh-CN.md`。
6. 新增 `CHANGELOG.md`、`CONTRIBUTING.md`、`SECURITY.md`、`CODE_OF_CONDUCT.md`。
7. 新增 GitHub issue 和 PR 模板。
8. 校验所有文档中的 safety gate、agent skill 调用和 install/probe 表达一致。
