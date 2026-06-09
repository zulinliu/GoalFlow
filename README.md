<p align="center">
  <img src="assets/goalflow-logo.svg" alt="GoalFlow logo" width="520">
</p>

<p align="center">
  <strong>One goal. Full delivery.</strong>
</p>

<p align="center">
  English | <a href="README.zh-CN.md">简体中文</a>
</p>

# GoalFlow

GoalFlow is an end-to-end feature delivery orchestration skill for AI coding agents. It turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow.

GoalFlow is not a shell CLI or application runtime. `$goalflow ...` examples are agent-chat skill invocations. Only commands shown in `bash` blocks are terminal commands.

## Why GoalFlow

AI coding agents can move quickly, but feature work often loses quality when design, planning, implementation, validation, documentation, and release safety are handled as separate conversations. GoalFlow keeps the full path in one opinionated workflow:

- Impeccable leads UX, UI, interaction, motion, brand direction, frontend craft, and interactive HTML prototypes.
- GSD leads requirements, planning, backend/API design, execution, verification, documentation, git hygiene, PR preparation, and release gates.
- GoalFlow routes each phase to the right specialist, records durable artifacts, and keeps release work behind explicit safety gates.

## How It Works

```text
Probe -> Clarify -> Design -> Prototype -> Review -> Plan -> Build -> Verify -> Ship
```

1. Probe the environment, dependencies, git repository, and git author.
2. Clarify the feature goal, or record autonomous assumptions in `--auto`.
3. Use Impeccable to design the UX, visual system, interaction model, motion, and brand direction.
4. Produce an interactive HTML prototype for meaningful user-facing features.
5. Review the design with the user, or run autonomous subagent review in `--auto`.
6. Use GSD to derive requirements, backend/API boundaries, phase plans, validation, and UAT.
7. Execute in phases with Impeccable and GSD quality gates.
8. Run final review, repair P0/P1 findings, update docs, prepare PR/release notes, and stop at the release gate.

## Install

Clone GoalFlow into the skills directory used by your agent harness.

Codex:

```bash
git clone https://github.com/zulinliu/GoalFlow.git ~/.codex/skills/goalflow
```

Claude Code:

```bash
git clone https://github.com/zulinliu/GoalFlow.git ~/.claude/skills/goalflow
```

Shared agent skills directory:

```bash
git clone https://github.com/zulinliu/GoalFlow.git ~/.agents/skills/goalflow
```

If your harness uses a different skill directory, clone this repository there as `goalflow`, restart the harness, then run the probe.

## Environment Check

GoalFlow needs Node.js, npm/npx, Git, Impeccable, and GSD. Run the probe before project changes.

Codex install:

```bash
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Claude Code install:

```bash
node ~/.claude/skills/goalflow/scripts/check_env.mjs
```

Shared agent install:

```bash
node ~/.agents/skills/goalflow/scripts/check_env.mjs
```

Other installs:

```bash
node scripts/check_env.mjs
```

The probe detects Node/npm, git repository state, git author, Impeccable, GSD core, GSD skills, and common artifact presence. If anything is missing, follow [references/environment.md](references/environment.md). GoalFlow does not install dependencies automatically unless the user explicitly asks.

## Usage

Use these examples in the agent chat or skill invocation surface, not in a terminal:

```text
$goalflow build a team invitation feature
$goalflow --auto build an order filtering feature
$goalflow --brand build a new product homepage
```

Chinese examples and review gates are documented in [README.zh-CN.md](README.zh-CN.md).

## Modes

| Mode | Use it when | What changes |
| --- | --- | --- |
| `$goalflow <goal>` | You want normal design discussion before implementation. | GoalFlow asks concise clarification questions, produces design/prototype artifacts, waits for design confirmation, then executes. |
| `$goalflow --auto <goal>` | You want autonomous progress without routine confirmations. | GoalFlow records assumptions and skips pre-release confirmations, but never skips blockers, destructive actions, credential decisions, external-state changes, design review, or release gates. |
| `$goalflow --brand <goal>` | The feature needs public identity work. | GoalFlow runs naming, narrative, logo direction, slogan, page/icon naming, README language, and documentation consistency work. |

## Prototype Rule

Interactive HTML prototypes are mandatory for meaningful features: new or changed user flows, visible UI, complex states, brand or landing work, onboarding, settings, dashboards, forms, and interaction-heavy surfaces.

Prototype skips are allowed only for backend-only, docs-only, copy-only, migration, or small config/admin changes with no new interaction. The skip reason must be recorded.

## Artifacts

GoalFlow preserves native Impeccable and GSD artifact locations.

Impeccable artifacts:

- `PRODUCT.md`
- `DESIGN.md`
- `.impeccable/design.json`
- `.impeccable/live/`
- `.impeccable/critique/`
- source routes, components, or standalone HTML prototypes

GSD artifacts:

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/phases/`
- `.planning/sketches/`
- `.planning/research/`

See [references/artifacts.md](references/artifacts.md).

## Safety Gates

GoalFlow may prepare local commits only after verifying a real-person git author. The author must be a specific person, not an agent, bot, automation, service account, no-reply identity, or generic AI assistant.

GoalFlow must not perform these actions without explicit user confirmation:

- push branches or commits to a remote
- open, update, retarget, close, or merge a remote PR
- create or push tags
- create, edit, publish, or delete releases
- publish packages, images, app builds, or artifacts
- deploy to production or shared environments
- change shared external state that affects collaborators, users, automation, or notifications

Release assets must contain only installable skill artifacts, as defined in [references/release-gates.md](references/release-gates.md). Repository source archives may exist as GitHub tag snapshots, but the canonical release package must stay skill-only.

See [references/release-gates.md](references/release-gates.md).

## Repository Structure

```text
.
├── SKILL.md
├── README.md
├── README.zh-CN.md
├── PRODUCT.md
├── goalflow-design.md
├── goalflow-brand-culture.md
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
│   └── goalflow-mark.svg
└── .github/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md
```

## Roadmap

- v0.1.0: Core GoalFlow skill, environment probe, routing references, release gates, bilingual README, brand system, and lightweight open-source governance.
- Next: More harness-specific install notes, richer examples, more prototype examples, and compatibility checks for additional agent runtimes.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR. AI-assisted contributions are welcome, but every commit and PR must remain accountable to a specific human author and reviewer.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Security

Do not file public issues with exploitable security details. Read [SECURITY.md](SECURITY.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
