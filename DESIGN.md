# GoalFlow Design System

GoalFlow's design system exists to make the skill feel like a precise delivery instrument: clear enough for open-source users, disciplined enough for release gates, and visually distinct from generic AI automation tools.

## Design Position

GoalFlow presents one user goal moving through designed, verified, documented, and release-ready delivery. The identity should make three ideas visible:

1. A single goal enters the workflow.
2. Design and engineering move through durable artifacts.
3. Autonomy advances through gates, not around them.

## Visual Principles

- Clear before decorative.
- Workflow evidence before marketing claims.
- Human accountability before agent autonomy.
- Bilingual clarity for public documentation.
- Small-size logo utility before complex illustration.

## Color

Primary cobalt: `#174EA6`

Use for the flow path, links, and core identity marks. It signals stability, engineering discipline, and verification.

Primary ink: `#102A43`

Use for main text and wordmark text.

Accent copper: `#B66A2C`

Use sparingly for goal nodes, release nodes, or important human/accountability highlights.

Surface: `#F8FAFC`

Use for light brand backdrops and README logo surfaces.

Muted text: `#52606D`

Use for support copy and secondary descriptions.

## Typography

Use system sans-serif or Inter-compatible stacks:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Keep letter spacing at `0`. Avoid viewport-scaled type. README and SVG text must remain readable at standard GitHub widths.

## Logo System

### Primary Logo

Use `assets/goalflow-logo.svg` for README and open-source presentation.

The primary logo contains:

- GoalFlow wordmark.
- The Flow Gate mark.
- The slogan: `One goal. Full delivery.`
- Support copy that names the design/prototype, engineering, verification, durable artifact, and release boundary.

### Color Mark

Use `assets/goalflow-mark.svg` for avatars, compact headers, and future favicon bases at 32px and above.

### Monochrome Mark

Use `assets/goalflow-mark-mono.svg` for 16px/24px contexts, single-color printing, masks, badges, and high-contrast surfaces.

At very small sizes, prefer the monochrome mark over the primary logo or color mark. Do not force the full wordmark into cramped UI.

## Motion And Prototype Direction

When GoalFlow creates prototypes, motion should communicate state movement and gates:

- goal entered
- design reviewed
- plan committed
- verification passed
- release gate waiting

Avoid decorative loops that imply unchecked automation. Always include reduced-motion handling in meaningful UI prototypes.

## Content Rules

- Use English as the default open-source README language.
- Provide a full Chinese mirror in `README.zh-CN.md`.
- Use the user's language for user-reviewed plans, design gates, review reports, and release gates.
- Use English for agent-only prompts, internal execution plans, and machine-oriented checklists.
- Do not describe `$goalflow ...` as a shell command.
- Do not imply `--auto` skips design review or release gates.

## Anti-Patterns

- Purple-blue gradient AI branding.
- Generic pipeline arrows without gates or artifacts.
- One checkmark as the whole identity.
- Claims of full autonomous release.
- Hidden release boundaries.
- Logo variants that fail at 16px or monochrome.

## Related Artifacts

- `PRODUCT.md`: product context and brand personality.
- `goalflow-brand-culture.md`: brand culture design plan and README narrative strategy.
- `goalflow-design.md`: original Chinese design proposal and decision log.
- `references/artifacts.md`: canonical Impeccable/GSD artifact locations.
