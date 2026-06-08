# GoalFlow Routing

Use this routing table to choose the controlling capability. When a selected skill has not been loaded in the current context, open its `SKILL.md` or invoke it explicitly before acting.

## Principle

Impeccable controls frontend experience and visual quality. GSD controls engineering workflow and delivery. If a step touches both, run Impeccable first when it affects UX, UI, interaction, motion, prototype, or brand.

## Impeccable Routes

Use Impeccable for:

- UX/UI shape and design brief: `$impeccable shape <feature>`
- End-to-end frontend craft and interactive prototype: `$impeccable craft <feature>`
- Live browser variant work: `$impeccable live`
- Design context setup: `$impeccable init`
- Design system extraction/documentation: `$impeccable document` and `$impeccable extract`
- UX critique: `$impeccable critique <target>`
- Technical UI audit: `$impeccable audit <target>`
- Final frontend polish: `$impeccable polish <target>`
- Production hardening for UI states, errors, i18n, edge cases: `$impeccable harden <target>`
- Motion: `$impeccable animate <target>`
- Typography: `$impeccable typeset <target>`
- Layout and spacing: `$impeccable layout <target>`
- Color and theming: `$impeccable colorize <target>`
- UX copy: `$impeccable clarify <target>`
- Responsive adaptation: `$impeccable adapt <target>`

## GSD Routes

Use GSD for:

- Project bootstrap/context capture when `.planning/` is missing: `$gsd-new-project`
- Clarifying phase deliverables: `$gsd-spec-phase`
- Discussion and decision capture: `$gsd-discuss-phase`
- Phase planning: `$gsd-plan-phase`
- Execution: `$gsd-execute-phase`
- Autonomous remaining work after GoalFlow design and GSD plan gates: `$gsd-autonomous`
- Quick low-risk follow-up work after design direction is settled: `$gsd-quick`
- Code review: `$gsd-code-review`
- Audit-to-fix loop: `$gsd-audit-fix`
- Verification: `$gsd-validate-phase`, `$gsd-verify-work`, `$gsd-audit-uat`
- Tests: `$gsd-add-tests`
- Docs: `$gsd-docs-update`
- UI contract/review support after Impeccable design direction is set: `$gsd-ui-phase`, `$gsd-ui-review`
- HTML variant archiving: `$gsd-sketch`
- Progress and next action: `$gsd-progress`
- Release and PR preparation: `$gsd-ship`, `$gsd-pr-branch`, `$gsd-complete-milestone`

Do not use `$gsd-new-project` for release work. Before the Impeccable prototype exists, use it only for bootstrap/context capture; do not let it finalize requirements, roadmap commitments, backend/API boundaries, or phase plans.

Do not use `$gsd-ui-phase` as the visual design authority. It translates the accepted Impeccable-led direction into engineering contracts and review criteria.

## Combined Routes

### New Feature

1. Impeccable shape/craft prototype.
2. Autonomous design review or user design gate.
3. GSD spec/discuss/plan.
4. GSD execute with Impeccable frontend gates.
5. Parallel final review.
6. GSD ship with release gate.

For a meaningful new feature, never route directly to `$gsd-quick` or `$gsd-autonomous` before the Impeccable prototype and design gate are complete. If `$gsd-quick` touches user-facing UI, use validation and an Impeccable review; otherwise prefer the full GoalFlow plan/execute path.

### Brand Feature

Use `--brand` or clear brand language. Route:

1. Impeccable brand/product register, naming, visual direction, prototype.
2. GSD docs/update planning for README and product docs.
3. Impeccable polish/clarify for page copy, names, icon usage, slogans.
4. GSD verification and release.

### Review Existing Feature

Run parallel review where possible:

- Impeccable critique/audit/polish for UI.
- GSD code-review/validate/audit-uat for engineering.
- Synthesize P0/P1/P2 findings in the user's language.
- Fix P0/P1 first, then re-review.

### "Next Step" Request

Inspect git state, `.planning/`, Impeccable artifacts, open findings, and current phase. Recommend or run the highest priority action. Prefer unresolved P0/P1 fixes, missing prototype, missing design docs, missing plan, failing tests, or release blockers before new scope.

If the next action would mutate a remote branch, PR, tag, release, or production environment, stop at [release-gates.md](release-gates.md) first.

## Backend-Only Exception

If the feature is truly backend-only, use GSD-heavy routing. Still check whether user-visible docs, CLI output, API errors, admin screens, or logs need Impeccable clarify/harden review.
