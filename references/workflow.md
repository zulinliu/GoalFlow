# GoalFlow Workflow

Use this file for end-to-end feature delivery. User-facing review artifacts and gates should be written in Chinese. Agent-only plans, subagent prompts, and internal execution notes should be written in English.

## 1. Probe And Prepare

Run:

```bash
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Stop for blockers. Do not install Impeccable or GSD automatically unless the user explicitly asks.

If `.planning/` is missing, initialize through GSD before engineering planning. If `PRODUCT.md` is missing, initialize Impeccable product context before design work. If source code exists but `DESIGN.md` is missing, run Impeccable document before major frontend implementation.

## 2. Clarify Goal

Default mode asks concise Chinese clarification questions before design. Clarify:

- Feature purpose and target users.
- Primary user action.
- Realistic content/data ranges.
- Required states and edge cases.
- Frontend surfaces involved.
- Whether full brand culture is required.

In `--auto`, do not ask the user. Instead, write an assumption log in the relevant GSD/Impeccable artifact and continue. The log must state what was assumed, why the assumption is reasonable, and which later review or test can invalidate it.

## 3. Design Frontend First

Frontend experience is the source of truth. Use Impeccable before backend/API design:

1. Shape UX/UI, interaction model, motion, states, responsive behavior, and brand direction.
2. Produce an interactive HTML prototype for meaningful features.
3. Inspect the prototype visually and interactively.
4. Only then let GSD derive API, data model, backend, and task plans from the prototype.

The prototype must include realistic content, hover/focus/active/loading/error/success states, key transitions, responsive behavior, and reduced-motion alternatives where applicable. Commit the prototype to git.

Prototype threshold:

- Required: new or changed user flow, visible UI, complex state, brand/landing work, onboarding, settings, dashboards, forms, or any interaction-heavy surface.
- Optional with recorded reason: backend-only changes, docs-only changes, copy-only changes, data migrations, or small config/admin edits with no new interaction.

Brand threshold:

- Normal mode checks product voice, UX naming, page labels, and visual consistency.
- `--brand` is for public identity work: feature naming systems, launch pages, logo direction, slogan, README narrative, icon/page naming, or brand-visible product changes.

## 4. Review Prototype

Before implementation, run a design review:

- Normal mode: present the design and prototype to the user in Chinese and wait for confirmation.
- `--auto`: skip user confirmation, but spawn autonomous review subagents when available, synthesize findings, apply at least one iteration, then continue.

Use Impeccable as the visual authority. GSD sketch can be used for variant archiving and `.planning/sketches/` management, but it does not replace Impeccable for aesthetics, interaction quality, or frontend craft.

Record the design gate:

- Normal mode: store the Chinese design summary, prototype path, user decision, and requested changes in the relevant Impeccable/GSD artifact.
- `--auto`: store the autonomous review prompt summary, reviewers used or fallback reason, findings, iteration applied, and remaining risks. If no material issue was found, explicitly record that result instead of silently continuing.

Durable artifact suggestions:

- `.planning/phases/<phase>/ASSUMPTIONS.md`
- `.planning/phases/<phase>/AUTONOMOUS_REVIEW.md`
- `.planning/phases/<phase>/HARNESS_DOWNGRADES.md`
- `.impeccable/critique/<feature>-review.md` when the review is primarily visual

## 5. Plan Engineering

Use GSD for requirements, phase planning, backend/API boundaries, validation, UAT, and execution plans. Backend/API design must trace back to the frontend prototype's user flows and states.

Do not use `$gsd-quick` or `$gsd-autonomous` to bypass GoalFlow design gates for meaningful features. `$gsd-quick` is only for small, low-risk follow-up tasks after design direction is already settled. `$gsd-autonomous` is only appropriate after the GoalFlow design gate and GSD plan are in place.

For large features, prefer:

1. GSD specification or discussion.
2. GSD roadmap/phase updates.
3. GSD plan creation with validation and UAT.
4. Parallel subagent review for plan gaps.

## 6. Execute

Execute in phases. Keep Impeccable and GSD both active:

- Impeccable gates frontend code, visual quality, UX copy, interaction, motion, accessibility, responsive behavior, and anti-pattern detection.
- GSD gates task order, implementation, tests, docs, git state, verification, UAT, and continuity.

Commit meaningful artifacts and implementation changes according to the host project's git conventions and GSD commit rules.

## 7. Iterate And Decide Next Work

When the user asks "下一步", "继续推进", or similar, inspect current artifacts and git state, then recommend or run the highest-value next action. Prefer fixing P0/P1 review findings before adding new scope.

## 8. Final Review

Run parallel reviews when possible:

- UI/UX and visual craft.
- Accessibility and responsive behavior.
- Frontend performance and motion.
- Backend/API correctness.
- Security and data integrity.
- Test coverage and UAT gaps.
- Documentation and README consistency.
- Release readiness and git hygiene.

Fix all P0/P1 findings and re-review. Do not declare production-ready while blocking findings remain.

## 9. Ship

Before shipping, read [release-gates.md](release-gates.md). Local commits may be autonomous only after the real-person author gate. Remote branch push, remote PR creation/update, PR merge, tag creation, release publication, external artifact publication, and production or shared-environment deployment require a user gate.
