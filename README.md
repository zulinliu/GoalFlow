<p align="center">
  <img src="assets/goalflow-logo.svg" alt="GoalFlow wordmark with a G-shaped flow gate, goal nodes, and release boundary" width="520">
</p>

<p align="center">
  <strong>One goal. Full delivery.</strong><br>
  Impeccable-led design and prototype, GSD-led engineering, verification, durable artifacts, and release gates.
</p>

<p align="center">
  English | <a href="README.zh-CN.md">简体中文</a>
</p>

# GoalFlow

GoalFlow is an end-to-end feature delivery orchestration skill for AI coding agents. It turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow with durable artifacts and explicit publication boundaries.

GoalFlow is not a shell CLI or application runtime. `$goalflow ...` examples are agent-chat skill invocations. Only commands shown in `bash` blocks are terminal commands.

## Why GoalFlow

AI coding agents can move quickly, but feature work often loses quality when design, planning, implementation, validation, documentation, and release safety are handled as separate conversations. GoalFlow keeps the full path in one opinionated workflow:

- Impeccable leads UX, UI, interaction, motion, brand direction, frontend craft, and interactive HTML prototypes.
- GSD leads requirements, planning, backend/API design, execution, verification, documentation, git hygiene, PR preparation, and release gates.
- GoalFlow routes each phase to the right specialist, records durable artifacts, and keeps release work behind explicit safety gates.

## Delivery Gates

```text
Probe | Clarify | Design | Prototype | Review | Plan | Build | Verify | Ship
```

Every gate leaves evidence:

- Probe: environment, runtime scope, project root, git repository, and real-person git author.
- Clarify: user-reviewed intent, or recorded assumptions in `--auto`.
- Design: Impeccable-led UX, visual system, interaction model, motion, and brand direction.
- Prototype: interactive HTML prototype for meaningful user-facing work.
- Review: user design confirmation, or autonomous subagent review plus at least one iteration in `--auto`.
- Plan: GSD requirements, backend/API boundaries, phase plans, validation, and UAT.
- Build: phased implementation with Impeccable and GSD quality gates.
- Verify: final review, repair P0/P1 findings, update docs, and record residual risk.
- Ship: prepare PR/release notes and stop at the explicit release gate.

## Install

Recommended install: use the canonical skill-only package attached to the latest GitHub Release. The release package excludes repository planning, governance, and design-draft files, so it is the cleanest installable skill artifact.

Set `VERSION` to the release you want to install. The current latest release is `v0.3.0`.

Codex:

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

Codex still recommends `~/.codex/skills/goalflow` as the primary install root. For environment checks, a Codex run also accepts dependencies found in `.agents`, so a shared install is not treated as an external failure source.

Claude Code:

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

Shared agent skills directory:

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

Restart the harness after installing or updating the skill, then run the environment probe.

Development install: clone the full repository when you want README files, planning docs, design drafts, issue templates, or contribution history.

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

If your harness uses a different skill directory, install or clone into that directory as `goalflow`, restart the harness, then run the probe.

## Environment Check

GoalFlow needs Node.js, npm/npx, Git, Impeccable, and GSD. Run the probe from the target project root before project changes.

Codex install:

```bash
cd <PROJECT_ROOT>
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Claude Code install:

```bash
cd <PROJECT_ROOT>
node ~/.claude/skills/goalflow/scripts/check_env.mjs
```

Shared agent install:

```bash
cd <PROJECT_ROOT>
node ~/.agents/skills/goalflow/scripts/check_env.mjs
```

Other installs:

```bash
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime codex
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime claude
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime shared
```

The probe detects Node/npm, git repository state, git author, Impeccable, GSD core, GSD skills, and common artifact presence. If anything is missing, follow [references/environment.md](references/environment.md). GoalFlow does not install dependencies automatically unless the user explicitly asks.

Runtime compatibility is intentional:

- Codex recommends `~/.codex/skills`, and its probe accepts dependencies from both `.codex` and `.agents`.
- Claude Code accepts dependencies only from `.claude`.
- `shared` remains an explicit `.agents` runtime and is not a Claude alias.

When `--runtime auto` is used, explicit `--runtime` still wins, Claude installs stay Claude-scoped, and a Codex session signal such as `CODEX_*` makes GoalFlow prefer `codex` even if GoalFlow itself is installed under `.agents/skills/goalflow`.

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
| `$goalflow --auto <goal>` | You want autonomous progress without routine confirmations. | GoalFlow records assumptions and skips routine clarification plus design/product user confirmations; it still runs autonomous design review, applies at least one iteration or records no material issue, and never skips blockers, destructive actions, credential decisions, external-state changes, or release gates. |
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
- `.planning/config.json`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/research/`
- `.planning/phases/`
- `.planning/sketches/`
- `.planning/debug/`
- `.planning/intel/`

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

Release packages use the skill-only whitelist in [references/release-gates.md](references/release-gates.md), so repository planning and governance files are not included in canonical release assets.

## Roadmap

- v0.1.0: Core GoalFlow skill, environment probe, routing references, release gates, bilingual README, brand system, and lightweight open-source governance.
- v0.2.0: Canonical `DESIGN.md`, `.planning/` seed, runtime-scoped environment probe, monochrome mark, stronger governance, bilingual release notes, and bilingual commit message rules.
- v0.3.0: Repository agent memory with `AGENTS.md`, a thin `CLAUDE.md` importer, and stronger context continuity for future Codex and Claude Code iterations.
- Next: More harness-specific install notes, richer usage examples, prototype examples, automated release-doc freshness checks, and compatibility checks for additional agent runtimes.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR. AI-assisted contributions are welcome, but every commit and PR must remain accountable to a specific human author and reviewer.

Also read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community expectations.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Security

Do not file public issues with exploitable security details. Read [SECURITY.md](SECURITY.md).

## License

Apache-2.0. See [LICENSE](LICENSE).
