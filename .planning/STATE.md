# State

Updated: 2026-06-10

## Branch

`feat/v0.4.0`

## Current Focus

Fix Codex environment probe compatibility: `.agents` as fully compatible root, `--runtime auto` Codex session signal resolution, and probe guidance cleanup. Refresh `.planning/` state files.

## Completed v0.2.0 Hardening

- Canonical Impeccable design artifact added as `DESIGN.md`.
- GSD planning seed added in `.planning/`.
- Environment probe runtime and project-root scoping hardened with `--runtime` and `--project`.
- Brand support copy, monochrome mark, Chinese auto wording, and security reporting tightened.
- README, environment, governance, safety, and contribution details updated.
- Release process: bilingual English and Simplified Chinese release notes required for every future release.
- Git process: commit messages must be bilingual in English and Simplified Chinese.

## Completed v0.3.0 Work

- Created `AGENTS.md` as the primary shared project-memory entrypoint.
- Created `CLAUDE.md` as a thin Claude Code import of `AGENTS.md`.
- Memory files summarize GoalFlow identity, file map, workflow, environment checks, git/release rules, validation commands, and common failure modes.
- Added `CHANGELOG.md` entry for the v0.3.0 memory-file work.
- Codex subagent review found no remaining P0/P1/P2 issues after state cleanup and memory-file de-duplication.

## Post-v0.3.0 README Sync Fix

- README files were missing GitHub Release skill-only package installation guidance.
- README roadmap entries did not reflect v0.2.0 and v0.3.0.
- Release gates now require `README.md` and `README.zh-CN.md` review/update for every version iteration.
- `AGENTS.md` now records README version-sync expectations for future agents.
- `CONTRIBUTING.md` and `.github/pull_request_template.md` now surface README sync expectations during contribution and review.

## Verification Notes

- `node scripts/check_env.mjs --runtime codex --project .` correctly reports Codex Impeccable as missing while noting Claude has a separate install.
- `node scripts/check_env.mjs --runtime claude --project . --json` passes in the current environment.
- `git diff --check` passes.

## Release Gate

Do not publish a new release until current-version P0/P1 findings are closed, checks pass, and the user approves remote release actions.
