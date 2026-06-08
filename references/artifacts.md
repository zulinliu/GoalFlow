# Artifact Rules

GoalFlow does not create its own artifact directory. Preserve native Impeccable and GSD locations.

## Impeccable Artifacts

Use the project's existing Impeccable conventions:

- `PRODUCT.md`: product context and voice.
- `DESIGN.md`: design system and visual rules.
- `.impeccable/design.json`: sidecar for design metadata that does not fit `DESIGN.md`.
- `.impeccable/live/`: durable live-mode sessions.
- `.impeccable/critique/`: critique snapshots and backlog.
- Source files, framework routes, or standalone `index.html`: interactive prototypes and implementation.

Do not force every Impeccable output into `.impeccable/`. `PRODUCT.md` and `DESIGN.md` are root-level source documents by convention.

## GSD Artifacts

Use GSD's `.planning/` conventions:

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

Use GSD tools/workflows for `STATE.md` and `ROADMAP.md` mutations where available. Do not hand-edit GSD state files when the workflow requires a tool-mediated update.

## Prototype Artifacts

Interactive HTML prototypes are mandatory for meaningful features.

Preferred locations:

1. Existing project source route/component when the prototype is meant to become production code.
2. A standalone `index.html` when the project is empty or the user needs a pure prototype.
3. `.planning/sketches/NNN-name/index.html` when running GSD sketch for variant comparison and design decision archival.

Prototype requirements:

- Realistic content.
- Key user flows and state transitions.
- Responsive behavior.
- Hover, focus, active, loading, empty, error, and success states where applicable.
- Purposeful motion and reduced-motion fallback.
- Git commit.

## Language

- Chinese: user-reviewed design plans, review reports, release gates, brand narratives, and user-facing summaries.
- English: agent-only prompts, internal execution plans, subagent task prompts, and machine-oriented checklists.
