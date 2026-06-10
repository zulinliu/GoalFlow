# GoalFlow Project

GoalFlow is an AI coding-agent skill that turns one high-level feature goal into a delivery workflow spanning design, interactive prototype, implementation, verification, documentation, git hygiene, PR preparation, and release gates.

## Current Milestone

v0.4.0 Frontend design capability optimization: Taste-Skill integration as visual quality authority, high-fidelity prototype requirements, gsd-sketch removal.

## Product Goals

- Preserve Impeccable as the frontend flow authority — it decides when to shape, craft, review, and adapt.
- Preserve Taste-Skill as the visual quality authority — it decides design style standards and elevates prototype fidelity.
- Preserve GSD as the authority for requirements, planning, backend/API design, execution, validation, documentation, git, PR, and release workflow.
- Keep GoalFlow concise enough to load as a skill while storing detailed workflow guidance in `references/`.
- Support Codex and Claude first, with clear fallback behavior for other harnesses.
- Maintain real-person authorship and explicit user gates for remote mutation and publication.

## Source Repository Files

Files below belong to the source repository. They are NOT part of the skill-only release package (see `references/release-gates.md` for the canonical whitelist).

- `README.md`
- `README.zh-CN.md`
- `PRODUCT.md`
- `DESIGN.md`
- `goalflow-design.md`
- `goalflow-brand-culture.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`
- `.github/`
- `.planning/`

## Release Boundary

Canonical release assets are skill-only packages (`SKILL.md`, `agents/`, `assets/`, `references/`, `scripts/`, `LICENSE`). Repository governance, planning, design drafts, and GitHub templates remain source repository artifacts unless explicitly allowed by `references/release-gates.md`.
