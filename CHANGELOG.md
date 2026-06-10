# Changelog

All notable changes to GoalFlow are documented here.

## Unreleased

<!-- Target: v0.4.1 -->

### Changed

- SKILL.md description and body restructured with Chinese-first content for primary Chinese-speaking users.
- SKILL.md parameter table added with bilingual descriptions, auto-displayed when skill is invoked.
- README install instructions updated from v0.3.0 to v0.4.0 (latest release).

## [v0.4.0] - 2026-06-10

### Added

- Taste-Skill as visual quality authority: design style direction, high-fidelity prototype enhancement, and aesthetic standards alongside Impeccable's frontend flow authority.
- Taste-Skill detection in the environment probe (non-blocking, `warn`/`info` status for missing skills).
- `--multi-prototype` mode for producing separate desktop and mobile HTML prototypes when interaction models differ significantly.
- Frontend Skill Selection Matrix in `routing.md` for scenario-aware Taste-Skill selection.
- High-fidelity prototype requirements: complete UI, interaction loops, purposeful motion, responsive adaptation for desktop keyboard/mouse and mobile touch, touch-friendly targets (minimum 44px).
- Taste-Skill dependency section in `environment.md` with install instructions and probe behavior.

### Changed

- Frontend flow authority split: Impeccable controls when to shape, craft, review, and adapt; Taste-Skill controls design style and visual quality. All frontend HTML prototype creation now uses Impeccable and Taste-Skill professional capabilities.
- Fixed Codex environment detection so `.agents` is treated as a fully compatible dependency root alongside `.codex`, avoiding false missing-Impeccable/GSD reports.
- Fixed `--runtime auto` so Codex session signals such as `CODEX_*` prefer `codex` even when GoalFlow itself is installed under `.agents/skills/goalflow`.
- Tightened probe guidance and docs so Codex no longer suggests copying or syncing dependencies into `.codex` when `.agents` already satisfies the runtime.
- Updated routing, workflow, artifacts, environment, AGENTS.md, README, and planning documents for Taste-Skill integration and gsd-sketch removal.

### Removed

- `gsd-sketch` from `REQUIRED_GSD_SKILLS` in the environment probe.
- `.planning/sketches/` references from artifacts, environment, and README documentation. `goalflow-design.md` preserved as historical reference with deprecation header.

## [v0.3.0] - 2026-06-09

### Added

- Repository-level `AGENTS.md` memory for Codex and compatible coding agents.
- Thin `CLAUDE.md` importer so Claude Code loads the shared `AGENTS.md` rules without duplicated guidance.

### Changed

- Updated planning state for the v0.3.0 memory-file workstream.
- Updated English and Chinese README installation guidance to prefer GitHub Release skill-only packages.
- Refreshed English and Chinese README roadmap entries for v0.2.0 and v0.3.0.
- Added README version-sync requirements to release gates, agent memory, contribution guidance, and the PR template.

## [v0.2.0] - 2026-06-09

### Added

- Canonical `DESIGN.md` for the Impeccable design system.
- Minimal `.planning/` seed for GSD project state.
- Monochrome logo mark for small-size and single-color use.
- GitHub issue template config with private security reporting contact.

### Changed

- Hardened environment probe runtime scoping and project-root handling.
- Clarified `--auto` behavior in English and Chinese docs.
- Strengthened README gate/artifact narrative, environment examples, artifact lists, security reporting, AI-assisted contribution disclosure, conduct scope, and skill-only release rules.
- Required bilingual English and Simplified Chinese release notes for future GoalFlow releases.
- Centralized git/release standing rules and required bilingual English and Simplified Chinese commit messages.

## [v0.1.0] - 2026-06-09

### Added

- Initial GoalFlow skill contract in `SKILL.md`.
- End-to-end workflow references for environment checks, routing, artifacts, harness compatibility, release gates, and delivery flow.
- Environment probe script for Node/npm, Git, git author, Impeccable, GSD, and artifact checks.
- Brand system, logo assets, English README, Chinese README, and lightweight open-source governance files.
- Safety policy for real-person git authors, remote mutation gates, release publication gates, external artifact publication, and shared-environment changes.
