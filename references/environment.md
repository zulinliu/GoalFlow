# Environment And Installation

Run the probe first:

```bash
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Claude Code install:

```bash
node ~/.claude/skills/goalflow/scripts/check_env.mjs
```

Other installs: run `node scripts/check_env.mjs` from the GoalFlow skill directory.

The probe detects Node/npm, git repository state, git author, Impeccable, GSD core, GSD skills, and common artifact presence.

## Base Tools

GoalFlow needs Node.js with npm/npx and Git available on `PATH`.

Check:

```bash
node --version
npm --version
git --version
```

If any command is missing, install it through your OS package manager or from the official project installer, restart the terminal or agent harness, then rerun the probe.

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

Run `$gsd-sync-skills ...` as an agent/GSD skill invocation, not as a shell command.

GoalFlow requires the GSD routes it calls, including `gsd-new-project`, `gsd-plan-phase`, `gsd-execute-phase`, `gsd-verify-work`, `gsd-docs-update`, `gsd-ship`, `gsd-pr-branch`, `gsd-sketch`, and related review/audit skills. If the probe reports a partial GSD install, reinstall or sync GSD skills and restart the harness.

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
- GitHub Actions, Dependabot, Renovate, and no-reply/service identities

Fix:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

Use `--global` only if that identity should apply to all repositories.

GoalFlow checks both author name and email. Run this before autonomous commits and before release preparation:

```bash
git config user.name
git config user.email
git var GIT_AUTHOR_IDENT
```

## Missing Product Or Design Context

If `PRODUCT.md` is missing, run Impeccable initialization before design. If source code exists but `DESIGN.md` is missing, run Impeccable document before major frontend implementation.

If `.planning/` is missing, initialize GSD before engineering planning.
