# GoalFlow

GoalFlow is an end-to-end feature delivery orchestration skill for AI coding agents. It turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready software delivery flow.

GoalFlow coordinates two specialist systems:

- Impeccable leads UX, UI, interaction, motion, brand direction, frontend craft, and interactive HTML prototypes.
- GSD leads requirements, planning, backend/API design, execution, verification, documentation, git hygiene, PR preparation, and release gates.

中文简介：GoalFlow 是面向 AI 编程代理的全流程功能交付编排 Skill。用户只需要提出“做一个 XXX 功能”，它会先用 Impeccable 打磨设计、交互、品牌和 HTML 原型，再用 GSD 推进需求、计划、实现、验证、文档和发布准备。

## Usage

```text
$goalflow 做一个 XXX 功能
$goalflow --auto 做一个 XXX 功能
$goalflow --brand 做一个 XXX 功能
```

- `--auto`: skips user confirmations, but still runs autonomous design review and records the gate result before implementation.
- `--brand`: runs the full brand culture path, including naming, narrative, logo direction, slogan, page/icon naming, README, and docs language.

Common Chinese intents such as `继续推进`, `重新设计`, `评审`, `修复`, `下一步`, and `准备发布` are routed through the GoalFlow workflow.

## Safety

GoalFlow can prepare local commits after a real-person git author check. Remote branch pushes, PR creation or updates, PR merge, tags, releases, and production deployment require an explicit user gate.

## Probe

Codex install:

```bash
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Claude install:

```bash
node ~/.claude/skills/goalflow/scripts/check_env.mjs
```

Other installs: run `node scripts/check_env.mjs` from the GoalFlow skill directory.
