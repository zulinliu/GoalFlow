# AGENTS.md

This repository is the source repo for the `goalflow` Codex/Claude skill. Use this file as the project memory entrypoint for future AI agents.

## Project Identity

GoalFlow is not a shell CLI or application runtime. It is an AI coding-agent skill that turns one feature goal into a designed, prototyped, implemented, verified, documented, and release-ready delivery flow.

Core promise:

- Impeccable leads UX, UI, interaction, motion, brand direction, frontend craft, and interactive HTML prototypes.
- GSD leads requirements, planning, backend/API design, execution, verification, documentation, git hygiene, PR preparation, and release gates.
- GoalFlow routes each step to the right capability while preserving durable artifacts and explicit publication boundaries.

Primary users are AI-assisted builders, maintainers, product-minded engineers, and Chinese or bilingual teams that need one goal to become production-oriented software without losing design quality or release safety.

## Source Of Truth Map

Read the smallest relevant file before editing:

- `SKILL.md`: primary skill contract and progressive-disclosure entrypoint.
- `references/workflow.md`: end-to-end GoalFlow delivery process.
- `references/routing.md`: when to route to Impeccable vs GSD.
- `references/artifacts.md`: canonical Impeccable/GSD artifact locations.
- `references/environment.md`: install and runtime-specific environment probe guidance.
- `references/harnesses.md`: Codex, Claude, and fallback harness behavior.
- `references/release-gates.md`: git author, remote mutation, release, tag, and standing git/release rules.
- `scripts/check_env.mjs`: deterministic environment probe.
- `PRODUCT.md`: product context, users, purpose, voice, anti-references.
- `DESIGN.md`: canonical Impeccable design system.
- `goalflow-design.md`: original Chinese design proposal and decision log.
- `goalflow-brand-culture.md`: brand culture plan, logo rationale, README narrative.
- `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`: GSD seed and current planning memory.
- `README.md`: default English open-source README.
- `README.zh-CN.md`: full Simplified Chinese README mirror.
- `CHANGELOG.md`: user-visible changes.
- `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `.github/`: governance and OSS templates.

Do not duplicate long instructions across files. Put stable process detail in `references/`, public-facing narrative in README files, design context in `PRODUCT.md`/`DESIGN.md`, and current delivery state in `.planning/`.

## Branch And Version Memory

- Always verify the active branch with `git status --short --branch`; do not rely on remembered branch names.
- `v0.1.0`: initial skill, workflow references, environment probe, release gates, bilingual README, brand assets, governance.
- `v0.2.0`: `DESIGN.md`, `.planning/` seed, scoped env probe, mono mark, stronger governance, bilingual release notes and commits.
- `v0.3.0`: agent context memory files for Codex and Claude.
- Post-`v0.3.0` docs fix: README release-install guidance, roadmap freshness, and README version-sync gate.

Before starting work:

```bash
git status --short --branch
git fetch origin --prune --tags
```

Preserve user work. Do not reset, checkout, or revert unrelated changes unless the user explicitly asks.

## Git And Release Rules

The centralized rule source is `references/release-gates.md`.

Four standing output rules: release assets are skill-only packages, release notes are bilingual English + Simplified Chinese, commit messages are bilingual English + Simplified Chinese, and README files are reviewed and updated for every version iteration.

Commit subject format:

```text
<type>: <English summary> / <中文摘要>
```

Every commit and release action also requires the author gate:

```bash
git config user.name
git config user.email
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
env | rg '^(GIT_AUTHOR|GIT_COMMITTER)_' || true
```

The author must be a specific human, never an agent, bot, no-reply, service, or automation identity.

Remote mutation requires explicit user approval: push, PR creation/update/merge, tag, release, package publication, deployment, or shared external-state changes. If the user requested the exact remote action in the current turn, that is sufficient approval. Read `references/release-gates.md` before doing any of these.

## Skill-Only Release Package

Canonical release assets may include only `SKILL.md`, `agents/`, `assets/`, `references/`, `scripts/`, and `LICENSE`. Do not include repo-management, governance, planning, design-draft, review-scratch, generated-output, or dependency folders in canonical release packages.

Package check:

```bash
git archive --format=tar.gz --prefix=goalflow/ -o /tmp/goalflow-vX.Y.Z-skill.tar.gz HEAD SKILL.md agents assets references scripts LICENSE
tar -tzf /tmp/goalflow-vX.Y.Z-skill.tar.gz
sha256sum /tmp/goalflow-vX.Y.Z-skill.tar.gz
```

GitHub source archives are tag snapshots, not canonical GoalFlow skill packages. Full rules live in `references/release-gates.md`.

## Environment And Validation

GoalFlow's environment probe is runtime-scoped. Claude must not pass only because Codex has Impeccable/GSD installed, and the reverse is also true. Codex accepts both `.codex` and `.agents` roots as compatible dependency sources; explicit `shared` remains `.agents`-only.

Run from the target project root:

```bash
node scripts/check_env.mjs --runtime claude --project .
node scripts/check_env.mjs --runtime codex --project .
```

Known behavior in this workspace: Codex can pass when Impeccable/GSD is installed in either `.codex` or `.agents`. Claude still requires `.claude`, so `.agents` should appear as `found elsewhere` during a Claude run.

Common validation:

```bash
git diff --check
node --check scripts/check_env.mjs
node scripts/check_env.mjs --runtime claude --project . --json
```

For release-packaging changes, also run the skill-only archive check above.

## Editing Rules

- Use `apply_patch` for manual edits.
- Keep `SKILL.md` concise. Move detailed process into `references/`.
- Do not add dependencies unless the user explicitly approves.
- Do not create a new GoalFlow artifact directory. Preserve Impeccable and GSD native locations.
- If public behavior changes, update both `README.md` and `README.zh-CN.md`.
- For every version iteration, review both README files for install instructions, roadmap/version history, repository structure, usage examples, safety rules, and Chinese mirror parity. If no README change is needed, record why in PR or release preparation notes.
- If skill behavior changes, update `SKILL.md` and the relevant `references/` file.
- If release, git, or author rules change, update `references/release-gates.md` first.
- If brand/design changes, update `PRODUCT.md`, `DESIGN.md`, and/or `goalflow-brand-culture.md` as appropriate.
- If user-visible changes land, update `CHANGELOG.md`.
- If planning state changes, update `.planning/STATE.md` or GSD-managed planning files.
- Keep this file concise; if it grows beyond roughly 200 lines, move detail into `references/` and link it here.

## Language Policy

- User-reviewed artifacts, review summaries, release gates, and user-facing progress should use the user's language; use Chinese when the user is Chinese-speaking.
- Agent-only execution notes, subagent prompts, and machine-oriented checklists should be English.
- Public GitHub README defaults to English, with a full Simplified Chinese mirror in `README.zh-CN.md`.
- Release notes and commit messages are always bilingual English + Simplified Chinese.

## GoalFlow Workflow Memory

For meaningful feature work, do not jump straight to implementation. Probe environment and author, clarify or record `--auto` assumptions, use Impeccable first for UX/UI/motion/brand and an interactive HTML prototype, then use GSD for requirements, API/backend boundaries, phases, validation, docs, git, PR, and release flow. Run parallel review where possible, fix P0/P1 findings, and stop at remote release gates unless already approved.

Prototype rule: required for meaningful user-facing features. Skip only for backend-only, docs-only, copy-only, migration, or small config/admin changes with no new interaction; record the skip reason.

## Subagents And Review

Use subagents for independent research and review when the user asks for them and the current harness permits it. Prefer review-only subagents unless there is safe worktree isolation for editing.

Good review roles:

- Skill architecture and progressive-disclosure review.
- Codex/Claude memory file compatibility review.
- Release and git governance review.
- Bilingual Chinese/English documentation review.
- Environment probe and package whitelist review.

Do not pass subagents the expected answer when the goal is independent validation. Give them file paths, goals, and risk areas.

## Common Failure Modes To Avoid

- Treating `$goalflow ...`, `$impeccable ...`, or `$gsd-...` as terminal commands. They are agent skill invocations unless a skill explicitly provides shell commands.
- Letting `--auto` skip design review, blockers, credentials, destructive actions, external-state changes, or release gates.
- Confusing GitHub tag source archives with canonical skill release packages.
- Allowing another runtime's Impeccable/GSD install to satisfy the current runtime check.
- Adding README/governance files to release assets.
- Forgetting README updates when releases change installation, roadmap, version history, governance, repository structure, or agent context files.
- Forgetting Chinese mirror updates when public English docs change.
- Creating agent-authored commits.
- Using English-only commit messages or English-only release notes.

## Context File Conventions Used Here

This file follows current agent-memory conventions:

- Codex supports global and repository-level `AGENTS.md`; repository-level files keep project norms near the code and are loaded from root toward the working directory.
- Claude Code reads `CLAUDE.md`, not `AGENTS.md`; Claude's official guidance recommends a thin `CLAUDE.md` with `@AGENTS.md` when a repo already uses AGENTS.md.
- Claude expands imported files at launch, so keep `AGENTS.md` specific, concise, and actionable.
- The public `agents.md` examples emphasize setup commands, tests, style, security, PR guidance, and living updates.
- Update memory files when repeated mistakes, review findings, or project conventions would otherwise need to be re-explained.

Reference sources: https://developers.openai.com/codex/guides/agents-md, https://code.claude.com/docs/en/memory, and https://agents.md/.
