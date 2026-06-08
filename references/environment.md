# Environment And Installation

Run the probe first:

```bash
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

The probe detects Node/npm, git repository state, git author, Impeccable, GSD core, GSD skills, and common artifact presence.

## Impeccable

Preferred install from project root:

```bash
npx impeccable skills install
```

Alternative universal skills installer:

```bash
npx skills add pbakaus/impeccable
```

Update:

```bash
npx impeccable skills update
```

Check:

```bash
npx impeccable skills check
```

Claude Code plugin alternative:

```text
/plugin marketplace add pbakaus/impeccable
```

Then install from Claude Code's plugin UI.

## GSD

Install with the official Open GSD installer from the project root or desired global context:

```bash
npx @opengsd/gsd-core@latest
```

If your environment requires the package wrapper form:

```bash
npx -y --package=@opengsd/gsd-core@latest -- gsd-core --global
```

Choose the target runtime when prompted, especially `codex` or `claude`. Restart the harness after installation so skills and commands register.

To sync GSD skills from Codex to another runtime when GSD is already installed:

```text
$gsd-sync-skills --from codex --to claude --apply
```

## Git Requirements

GoalFlow requires a git repository for production delivery. If the probe reports no git repository:

```bash
git init
git status
```

Or change directory to the actual project root.

Git author must be a specific person. These are invalid author names for GoalFlow commits:

- Codex
- Claude
- Hapi
- Agent
- AI Assistant
- Bot-only identities

Fix:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

Use `--global` only if that identity should apply to all repositories.

## Missing Product Or Design Context

If `PRODUCT.md` is missing, run Impeccable initialization before design. If source code exists but `DESIGN.md` is missing, run Impeccable document before major frontend implementation.

If `.planning/` is missing, initialize GSD before engineering planning.
