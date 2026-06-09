---
name: goalflow
description: End-to-end feature delivery orchestration for AI coding agents. Use when the user explicitly invokes $goalflow or asks to turn one high-level feature goal into a production-ready delivery flow across design, interactive HTML prototype, implementation, verification, documentation, git, PR, and release gates through Impeccable-led UX/frontend craft and GSD-led engineering workflow. Do not use for isolated code review, small edits, single-skill frontend polish, or backend-only work unless the user asks for GoalFlow-level orchestration. Supports the user's language, Codex and Claude optimized workflows, optional --auto autonomous mode, and optional --brand full brand culture work.
---

# GoalFlow

GoalFlow turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow.

一句话：输入 `$goalflow 做一个 XXX 功能`，GoalFlow 会先做体验设计和 HTML 原型，再推进实现、验证、文档和发布准备。

## First Action

Run the environment probe before any project changes:

```bash
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs
```

`<GOALFLOW_SKILL_DIR>` is the directory containing this `SKILL.md`. Common installs are `~/.codex/skills/goalflow`, `~/.claude/skills/goalflow`, or `~/.agents/skills/goalflow`. If the probe reports missing Impeccable, missing GSD, no git repository, or an invalid git author, stop and follow [environment.md](references/environment.md). Do not install dependencies automatically unless the user explicitly asks.

## Modes

Parse only these flags:

- `--auto`: Skip pre-release clarification and design/product confirmations, but do not skip design quality gates, blockers, destructive actions, credential decisions, external-state changes, or release gates. Run autonomous design review with subagents when available, iterate at least once, then continue.
- `--brand`: Run the full feature brand culture path: naming, narrative, logo direction, slogan, icon/page naming, README and docs language.

No other flags are part of GoalFlow. Route Chinese natural-language intents such as "继续推进", "重新设计", "评审", "修复", "下一步", and "准备发布" through [routing.md](references/routing.md).

Common Chinese invocations:

```text
$goalflow 做一个团队成员邀请功能
$goalflow --auto 做一个订单筛选功能
$goalflow --brand 做一个新产品首页
```

Follow-up intents can be natural Chinese, for example "继续推进", "重新设计", "评审", "修复", "下一步做什么", or "准备发布".

## Core Rules

1. Put frontend experience first. Use Impeccable to shape UX, UI, interaction, motion, visual system, and an interactive HTML prototype before backend/API contracts are finalized.
2. Make prototypes mandatory for meaningful features: new or changed user flows, visible UI, complex state, brand/landing work, or any interaction-heavy surface. Backend-only, docs-only, copy-only, or small config/admin changes with no new interaction may skip the prototype with the reason recorded. The prototype must include realistic content, interaction loops, motion, responsive behavior, and key states. Commit the prototype to git.
3. Use Impeccable as the highest authority for visual and frontend quality. Use GSD as the highest authority for engineering workflow, documentation, verification, git, PR, and release flow.
4. Preserve native artifact locations. Do not invent a GoalFlow artifact directory. See [artifacts.md](references/artifacts.md).
5. Use the user's language for user-reviewed artifacts and gates; use Chinese when the user is Chinese-speaking or asks for Chinese. Use English for agent-only plans, subagent prompts, and internal execution notes.
6. Parallelize independent research, review, and audit work with subagents whenever the harness supports it. Fall back inline only when tooling is unavailable or unsafe.
7. Local commits may be autonomous only after a real-person author check. Remote branch push, remote PR creation/update, PR merge, tags, release publication, external artifact publication, and production or shared-environment deployment require a user gate.

## Workflow

Follow [workflow.md](references/workflow.md) end to end:

1. Environment and dependency probe.
2. Project context initialization.
3. Goal clarification or autonomous assumption log.
4. Impeccable-led UX, brand, frontend direction, and interactive HTML prototype.
5. Autonomous design review and prototype iteration.
6. GSD-led requirements, phases, backend/API design, validation, and execution planning.
7. Implementation with continuous Impeccable/GSD quality gates.
8. Parallel final review and repair loop.
9. Documentation, git author check, PR preparation, and release gate.

## Routing References

- Read [routing.md](references/routing.md) when selecting Impeccable or GSD commands for a concrete step.
- Read [harnesses.md](references/harnesses.md) before using user-question tools, subagents, browser/live iteration, or fallback text mode.
- Read [release-gates.md](references/release-gates.md) before PR, merge, tag, release, or author-related work.

## Important Constraints

- If `.planning/` is missing, initialize through GSD before engineering planning.
- If `PRODUCT.md` is missing, run Impeccable initialization before design work.
- If code exists but `DESIGN.md` is missing, run Impeccable document before major frontend implementation.
- If `--auto` is active, autonomous review replaces user confirmation, not design review.
- If the task is backend-only and has no user-facing surface, GoalFlow may use GSD-heavy routing, but still check whether docs, CLI output, errors, or admin screens need Impeccable UX copy or interaction review.
