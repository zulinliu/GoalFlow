---
name: goalflow
description: End-to-end feature delivery orchestration for AI coding agents. Use when the user asks to build, redesign, brand, review, iterate, or ship a feature from a high-level goal into production-ready software through Impeccable-led UX, frontend craft, brand, interactive HTML prototypes, and visual quality, plus GSD-led requirements, planning, backend/API design, execution, verification, documentation, git, PR, and release gates. Supports Chinese-first user review, Codex and Claude optimized workflows, optional --auto autonomous mode, and optional --brand full brand culture work.
---

# GoalFlow

GoalFlow turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow.

## First Action

Run the environment probe before any project changes:

```bash
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

If it reports missing Impeccable, missing GSD, no git repository, or an invalid git author, stop and follow [environment.md](references/environment.md). Do not install dependencies automatically unless the user explicitly asks.

## Modes

Parse only these flags:

- `--auto`: Skip user confirmations, but do not skip design quality gates. Run autonomous design review with subagents when available, iterate at least once, then continue.
- `--brand`: Run the full feature brand culture path: naming, narrative, logo direction, slogan, icon/page naming, README and docs language.

No other flags are part of GoalFlow. Route Chinese natural-language intents such as "继续推进", "重新设计", "评审", "修复", "下一步", and "准备发布" through [routing.md](references/routing.md).

## Core Rules

1. Put frontend experience first. Use Impeccable to shape UX, UI, interaction, motion, visual system, and an interactive HTML prototype before backend/API contracts are finalized.
2. Make prototypes mandatory for meaningful features. The prototype must include realistic content, interaction loops, motion, responsive behavior, and key states. Commit the prototype to git.
3. Use Impeccable as the highest authority for visual and frontend quality. Use GSD as the highest authority for engineering workflow, documentation, verification, git, PR, and release flow.
4. Preserve native artifact locations. Do not invent a GoalFlow artifact directory. See [artifacts.md](references/artifacts.md).
5. Use Chinese for user-reviewed artifacts and gates. Use English for agent-only plans, subagent prompts, and internal execution notes.
6. Parallelize independent research, review, and audit work with subagents whenever the harness supports it. Fall back inline only when tooling is unavailable or unsafe.
7. Local commits may be autonomous. PR merge, tags, and release publication require a user release gate.

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
