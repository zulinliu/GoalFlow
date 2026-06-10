# Roadmap

## v0.1.0

Status: released on 2026-06-09.

- Initial GoalFlow skill.
- Environment probe.
- Routing, workflow, artifact, harness, and release-gate references.
- Brand assets and bilingual README.
- Skill-only release asset rule.

## v0.2.0

Status: released on 2026-06-09.

- Add canonical `DESIGN.md`.
- Add minimal GSD `.planning/` seed.
- Harden environment probe runtime and project-root scoping.
- Strengthen brand copy, logo variants, bilingual README language, security reporting, governance, and release documentation.
- Address all reviewed P1 and P2 findings.

## v0.3.0

Status: released on 2026-06-09.

- Repository-level `AGENTS.md` memory for Codex and compatible coding agents.
- Thin `CLAUDE.md` importer so Claude Code loads the shared `AGENTS.md` rules.
- README installation guidance refreshed for GitHub Release skill-only packages.
- README roadmap entries updated for v0.2.0 and v0.3.0.
- Release gates and contribution guidance updated with README version-sync expectations.

## v0.4.0

Status: active.

- Fix Codex environment detection so `.agents` is treated as a fully compatible dependency root alongside `.codex`.
- Fix `--runtime auto` Codex session signal resolution.
- Tighten probe guidance so Codex no longer suggests redundant dependency copying.
- Refresh `.planning/` state files to match current milestone and branch.
