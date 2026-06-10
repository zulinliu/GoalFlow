---
name: goalflow
description: >
  Use when the user wants to build a complete feature from a high-level goal — design, HTML
  prototype, implementation, verification, documentation, PR, and release — or explicitly invokes
  $goalflow. Use when the user says "build a feature end to end", "from design to release",
  "prototype then implement", "ship a feature with design review, tests, and a PR",
  "做一个 XX 功能", "从设计到发布", or wants end-to-end feature delivery orchestration.
  Routes each step through Impeccable (UX/UI/prototype flow) and Taste-Skill (visual quality/style)
  and GSD (requirements/execution/release).
  Supports --auto autonomous mode, --brand identity work, Chinese and English, and Codex/Claude
  runtimes. Do not use for isolated edits, single-skill polish, code review, or backend-only work
  unless the user asks for GoalFlow-level orchestration.
metadata:
  short-description: Turn one feature goal into a release-ready delivery
---

# GoalFlow

GoalFlow turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow.

一句话：输入 `$goalflow 做一个 XXX 功能`，GoalFlow 会先做体验设计和 HTML 原型，再推进实现、验证、文档和发布准备。

## First Action

Run the environment probe from the target project root before any project changes:

```bash
cd <PROJECT_ROOT>
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs
```

`<GOALFLOW_SKILL_DIR>` is the directory containing this `SKILL.md`. Common installs are `~/.codex/skills/goalflow`, `~/.claude/skills/goalflow`, or `~/.agents/skills/goalflow`. If running from another directory, pass `--project <PROJECT_ROOT>` and `--runtime codex|claude|shared`. Codex still recommends `~/.codex/skills/goalflow`, but its environment probe accepts both `.codex` and `.agents` as compatible dependency roots. Claude remains `.claude`-only, and explicit `shared` remains `.agents`-only. If the probe reports missing Impeccable, missing GSD, no git repository, or an invalid git author, stop and follow [environment.md](references/environment.md). Do not install dependencies automatically unless the user explicitly asks.

## Modes

Parse only these flags:

- `--auto`: Skip clarification and design/product user confirmations, but do not skip autonomous design review, blockers, destructive actions, credential decisions, external-state changes, or release gates. Run autonomous design review with subagents when available, iterate at least once, then continue.
- `--brand`: Run the full feature brand culture path: naming, narrative, logo direction, slogan, icon/page naming, README and docs language.
- `--multi-prototype`: Produce separate HTML prototypes for desktop (keyboard/mouse optimized) and mobile (touch optimized) instead of a single responsive prototype. Use this when the user explicitly asks for distinct device-specific prototypes or when the interaction models differ significantly between device classes.

No other flags are part of GoalFlow. Route Chinese natural-language intents such as "继续推进", "重新设计", "评审", "修复", "下一步", and "准备发布" through [routing.md](references/routing.md).

Common Chinese invocations:

```text
$goalflow 做一个团队成员邀请功能
$goalflow --auto 做一个订单筛选功能
$goalflow --brand 做一个新产品首页
```

Follow-up intents can be natural Chinese, for example "继续推进", "重新设计", "评审", "修复", "下一步做什么", or "准备发布".

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
