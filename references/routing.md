# GoalFlow Routing

Use this routing table to choose the controlling capability. When a selected skill has not been loaded in the current context, open its `SKILL.md` or invoke it explicitly before acting.

Skill forms such as `$impeccable craft` and `$gsd-plan-phase` are agent skill invocations, not shell commands. Do not run them in a terminal unless the referenced skill explicitly provides a shell equivalent.

## Principle

Impeccable controls the frontend design flow — when to shape, craft, review, and adapt. Taste-Skill provides visual quality authority — design style direction, high-fidelity prototype enhancement, and aesthetic standards. GSD controls engineering workflow and delivery. If a step touches both frontend and engineering, run Impeccable/Taste-Skill first when it affects UX, UI, interaction, motion, prototype, or brand.

All frontend design, HTML prototype creation, and frontend quality control should use Impeccable and Taste-Skill professional capabilities.

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
- Progress and next action: `$gsd-progress`
- Release and PR preparation: `$gsd-ship`, `$gsd-pr-branch`, `$gsd-complete-milestone`, `$gsd-audit-milestone`

Do not use `$gsd-new-project` for release work. Before the Impeccable prototype exists, use it only for bootstrap/context capture; do not let it finalize requirements, roadmap commitments, backend/API boundaries, or phase plans.

Do not use `$gsd-ui-phase` as the visual design authority. It translates the accepted Impeccable/Taste-Skill-led direction into engineering contracts and review criteria. Frontend visual quality should be controlled through Impeccable and Taste-Skill capabilities.

## Taste-Skill Routes

Use Taste-Skill for visual quality, design style direction, and high-fidelity prototype enhancement:

- Comprehensive frontend design with triple-layer motion engine: `$taste-design-taste-frontend`
- Redesign and optimize existing frontend: `$taste-redesign-existing-projects`
- Agency-grade visual quality with spring physics and magnetic hover: `$taste-high-end-visual-design`
- Prevent code truncation in long outputs: `$taste-full-output-enforcement`
- Minimalist warm aesthetic: `$taste-minimalist-ui`
- Industrial brutalist aesthetic: `$taste-industrial-brutalist-ui`
- GSAP scroll animation specialization: `$taste-gpt-taste`
- Brand identity kit: `$taste-brandkit`

These skills complement Impeccable — Impeccable controls the design flow (shape, craft, review, adapt), while Taste-Skill elevates the visual output quality and applies specific design styles.

## Frontend Skill Selection Matrix

Choose the right skill combination based on the scenario. The matrix below is a guide, not a constraint — adapt based on project context and user intent.

| Scenario | Recommended Skill Sequence | Why |
|----------|---------------------------|-----|
| New feature high-fidelity prototype | Impeccable `craft` → Taste `design-taste-frontend` | craft builds structure and interaction; Taste v2 adds triple-layer motion (Framer Motion + GSAP + ThreeJS) |
| Agency-grade visual quality | Impeccable `craft` → Taste `high-end-visual-design` | craft provides the base; Taste adds spring physics, magnetic hover, atmospheric prototypes |
| Redesign or optimize existing frontend | Taste `redesign-existing-projects` → Impeccable `harden` | 9-category audit with prioritized fix path → production hardening |
| Minimalist style | Impeccable `craft` → Taste `minimalist-ui` | craft for structure; minimalist for typography-driven, ultra-flat warmth |
| Industrial brutalist style | Impeccable `craft` → Taste `industrial-brutalist-ui` | craft for structure; brutalist for CRT scan lines, mechanical noise, extreme type contrast |
| GSAP scroll animation focus | Impeccable `craft` → Taste `gpt-taste` | craft for base; gpt-taste for scroll pinning, image zoom reveals, text wipe |
| Advanced motion and animation | Impeccable `animate` → Taste `design-taste-frontend` | animate for functional motion; design-taste-frontend for choreographed triple-layer motion (Framer Motion + GSAP + ThreeJS) |
| Multi-device responsive adaptation | Impeccable `adapt` (default) | Built-in breakpoints, Container Queries, pointer/hover awareness, touch targets |
| Prevent code truncation | Taste `full-output-enforcement` (add alongside any prototype work) | Ensures complete HTML output without `// ...` truncation |
| Brand identity | Impeccable `shape` → Taste `brandkit` | shape for brand direction; brandkit for identity kit |

## Combined Routes

### New Feature

1. Impeccable shape/craft prototype with Taste-Skill visual quality enhancement.
2. Autonomous design review (Impeccable critique/audit + Taste-Skill visual standards) or user design gate.
3. GSD spec/discuss/plan.
4. GSD execute with Impeccable/Taste-Skill frontend gates.
5. Parallel final review.
6. GSD ship with release gate.

For a meaningful new feature, never route directly to `$gsd-quick` or `$gsd-autonomous` before the Impeccable prototype and design gate are complete. If `$gsd-quick` touches user-facing UI, use validation and an Impeccable/Taste-Skill review; otherwise prefer the full GoalFlow plan/execute path.

### Brand Feature

Use `--brand` or clear brand language. Route:

1. `$impeccable init` if product/design context is missing.
2. `$impeccable shape <feature>` for naming, brand narrative, logo direction, slogan, icon/page naming, visual direction, and prototype requirements.
3. `$impeccable craft <feature>` for the brand-bearing interactive prototype or production UI.
4. `$impeccable clarify <target>` and `$impeccable polish <target>` for page copy, names, icon usage, slogan fit, and final visual quality.
5. `$gsd-docs-update` for README, product docs, release notes, and cross-document consistency.
6. GSD verification and release gates.

### Review Existing Feature

Run parallel review where possible:

- Impeccable critique/audit/polish for UI structure and interaction.
- Taste `redesign-existing-projects` for visual quality audit when optimizing existing frontend.
- GSD code-review/validate/audit-uat for engineering.
- Synthesize P0/P1/P2 findings in the user's language.
- Fix P0/P1 first, then re-review.

### "Next Step" Request

Inspect git state, `.planning/`, Impeccable artifacts, open findings, and current phase. Recommend or run the highest priority action. Prefer unresolved P0/P1 fixes, missing prototype, missing design docs, missing plan, failing tests, or release blockers before new scope.

If the next action would mutate a remote branch, PR, tag, release, or production environment, stop at [release-gates.md](release-gates.md) first.

## Backend-Only Exception

If the feature is truly backend-only, use GSD-heavy routing. Still check whether user-visible docs, CLI output, API errors, admin screens, or logs need Impeccable clarify/harden review or Taste-Skill visual polish.
