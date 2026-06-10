---
name: goalflow
description: >
  输入一个功能目标，从体验设计、HTML 原型、实现、验证、文档到发布准备，一次性完成全流程交付。
  当用户说"做一个 XX 功能"、"从设计到发布"、"帮我实现一个功能"、"build a feature end to end"、
  "from design to release"、"prototype then implement"，或明确调用 $goalflow 时触发。
  Impeccable 负责前端流程（UX/UI/原型），Taste-Skill 负责视觉质量（设计风格/保真度），
  GSD 负责工程流程（需求/执行/发布）。支持 --auto 自主模式、--brand 品牌文化建设、
  --multi-prototype 独立多设备原型，支持中英文和 Codex/Claude 运行时。
  不适用于独立编辑、单项打磨、代码审查或纯后端工作（除非用户明确要求 GoalFlow 级别编排）。
  Use when the user wants end-to-end feature delivery from a high-level goal — design, prototype,
  implementation, verification, documentation, and release — or explicitly invokes $goalflow.
metadata:
  short-description: 输入一个功能目标，完成从设计到发布的全流程交付 / Turn one feature goal into a release-ready delivery
---

# GoalFlow

一句话：输入 `$goalflow 做一个 XXX 功能`，GoalFlow 会先做体验设计和高保真 HTML 原型，再推进实现、验证、文档和发布准备。

GoalFlow turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow.

## 参数说明 Parameters

当用户调用 `$goalflow` 或 `/goalflow` 时，主动提示以下可选参数：

| 参数 | 说明 | Description |
|------|------|-------------|
| `--auto` | 跳过常规确认，自主推进。仍会执行设计质量评审，不跳过 blocker、破坏性操作、凭据决策和发布 gate。 | Skip routine confirmations. Still runs design review; never skips blockers, destructive actions, credentials, or release gates. |
| `--brand` | 完整品牌文化建设：命名、品牌叙事、Logo 方向、slogan、页面/icon 命名、文档语言统一。 | Full brand culture: naming, narrative, logo direction, slogan, page/icon naming, docs consistency. |
| `--multi-prototype` | 分别产出桌面端（键盘/鼠标）和移动端（触控）的独立 HTML 原型，而非单一响应式原型。当桌面和移动端交互模型差异显著时推荐使用。 | Produce separate desktop and mobile prototypes instead of one responsive prototype. Recommended when interaction models differ significantly. |

不传参数时，GoalFlow 会先做需求澄清、设计和原型，等待设计确认后再推进工程执行。

不带参数的常见调用方式：

```text
$goalflow 做一个团队成员邀请功能
$goalflow --auto 做一个订单筛选功能
$goalflow --brand 做一个新产品首页
$goalflow --multi-prototype 做一个响应式仪表盘
```

## First Action

Run the environment probe from the target project root before any project changes:

```bash
cd <PROJECT_ROOT>
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs
```

`<GOALFLOW_SKILL_DIR>` is the directory containing this `SKILL.md`. Common installs are `~/.codex/skills/goalflow`, `~/.claude/skills/goalflow`, or `~/.agents/skills/goalflow`. If running from another directory, pass `--project <PROJECT_ROOT>` and `--runtime codex|claude|shared`. Codex still recommends `~/.codex/skills/goalflow`, but its environment probe accepts both `.codex` and `.agents` as compatible dependency roots. Claude remains `.claude`-only, and explicit `shared` remains `.agents`-only. If the probe reports missing Impeccable, missing GSD, no git repository, or an invalid git author, stop and follow [environment.md](references/environment.md). Do not install dependencies automatically unless the user explicitly asks.

No other flags are part of GoalFlow. Route Chinese natural-language intents such as "继续推进", "重新设计", "评审", "修复", "下一步", and "准备发布" through [routing.md](references/routing.md). Follow-up intents can be natural Chinese, for example "继续推进", "重新设计", "评审", "修复", "下一步做什么", or "准备发布".

## Core Rules

1. Put frontend experience first. Use Impeccable to shape UX, UI, interaction, motion, visual system, and an interactive HTML prototype before backend/API contracts are finalized. Use Taste-Skill to elevate visual quality, apply design style direction, and enhance prototype fidelity. Consult [routing.md](references/routing.md) Frontend Skill Selection Matrix to choose the right skill combination for the scenario.
2. Make prototypes mandatory for meaningful features: new or changed user flows, visible UI, complex state, brand/landing work, or any interaction-heavy surface. Backend-only, docs-only, copy-only, or small config/admin changes with no new interaction may skip the prototype with the reason recorded. The prototype must be high-fidelity: include realistic content, complete interaction loops, purposeful motion, responsive adaptation for both desktop keyboard/mouse and mobile touch scenarios, and all key states. Commit the prototype to git.
3. Impeccable is the frontend flow authority — it decides when to shape, craft, review, and adapt. Taste-Skill is the visual quality authority — it decides the design style standard and elevates prototype fidelity. GSD is the engineering workflow authority — it handles requirements, planning, execution, verification, documentation, git, PR, and release. All frontend design, HTML prototype creation, and frontend quality control should use Impeccable and Taste-Skill professional capabilities.
4. Preserve native artifact locations. Do not invent a GoalFlow artifact directory. See [artifacts.md](references/artifacts.md).
5. Use the user's language for user-reviewed artifacts and gates; use Chinese when the user is Chinese-speaking or asks for Chinese. Use English for agent-only plans, subagent prompts, and internal execution notes.
6. Parallelize independent research, review, and audit work with subagents whenever the harness supports it. Fall back inline only when tooling is unavailable or unsafe.
7. Local commits may be autonomous only after a real-person author check. Remote branch push, remote PR creation/update, PR merge, tags, release publication, external artifact publication, and production or shared-environment deployment require a user gate.

## Workflow

Follow [workflow.md](references/workflow.md) end to end:

1. Environment and dependency probe.
2. Project context initialization.
3. Goal clarification or autonomous assumption log.
4. Impeccable-led UX, brand, frontend direction, and Taste-Skill-enhanced high-fidelity interactive HTML prototype with multi-device adaptation.
5. Autonomous design review (Impeccable critique/audit + Taste-Skill visual standards) and prototype iteration.
6. GSD-led requirements, phases, backend/API design, validation, and execution planning.
7. Implementation with continuous Impeccable/GSD quality gates.
8. Parallel final review and repair loop.
9. Documentation, git author check, PR preparation, and release gate.

## Routing References

Read these when the corresponding situation arises:

- [workflow.md](references/workflow.md): Full end-to-end delivery process with gate details beyond the 9-step summary above.
- [routing.md](references/routing.md): Choosing Impeccable vs GSD for a concrete step.
- [environment.md](references/environment.md): Environment probe fails, dependencies are missing, or runtime detection needs troubleshooting.
- [harnesses.md](references/harnesses.md): Using subagents, user-question tools, browser/live iteration, or fallback text mode.
- [artifacts.md](references/artifacts.md): Where Impeccable and GSD store durable artifacts.
- [release-gates.md](references/release-gates.md): PR, merge, tag, release, author validation, or any remote mutation.

## Important Constraints

- If `.planning/` is missing, initialize through GSD before engineering planning.
- If `PRODUCT.md` is missing, run Impeccable initialization before design work.
- If code exists but `DESIGN.md` is missing, run Impeccable document before major frontend implementation.
- If `--auto` is active, autonomous review replaces user confirmation, not design review.
- If the task is backend-only and has no user-facing surface, GoalFlow may use GSD-heavy routing, but still check whether docs, CLI output, errors, or admin screens need Impeccable UX copy or interaction review.
