# Environment And Installation

Run the probe first:

```bash
cd <PROJECT_ROOT>
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs
```

`<PROJECT_ROOT>` is the repository you want GoalFlow to work on. `<GOALFLOW_SKILL_DIR>` is the directory containing GoalFlow's `SKILL.md`.

Codex install:

```bash
cd <PROJECT_ROOT>
node ~/.codex/skills/goalflow/scripts/check_env.mjs
```

Claude Code install:

```bash
cd <PROJECT_ROOT>
node ~/.claude/skills/goalflow/scripts/check_env.mjs
```

Shared agent install:

```bash
cd <PROJECT_ROOT>
node ~/.agents/skills/goalflow/scripts/check_env.mjs
```

Other installs:

```bash
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime codex
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime claude
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime shared
```

The probe detects Node/npm, git repository state, git author, Impeccable, GSD core, GSD skills, and common artifact presence.

Runtime scope matters. A Claude run must not pass only because Impeccable or GSD is installed for Codex, and a Codex run must not pass only because a Claude directory contains the dependency. If the probe reports "found elsewhere," install or sync the dependency into the current runtime and restart the harness.

## Base Tools

GoalFlow needs Node.js with npm/npx and Git available on `PATH`.

Check:

```bash
node --version
npm --version
git --version
```

If any command is missing, install it through your OS package manager or from the official project installer, restart the terminal or agent harness, then rerun the probe.

## 中文快速修复

从目标项目根目录运行检测：

```bash
cd <PROJECT_ROOT>
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs
```

如果 GoalFlow 没装在标准目录，显式传入项目和运行时：

```bash
node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs --project <PROJECT_ROOT> --runtime codex
```

可选运行时是 `codex`、`claude`、`shared`。如果检测提示依赖安装在其他运行时目录，例如 Claude 检测时只发现 Codex 目录，请把 Impeccable/GSD 安装或同步到当前运行时，然后重启 agent harness。

缺 Node/npm/Git 时，先通过系统包管理器或官方安装器安装，再重新打开终端或 agent harness。

缺 Impeccable 时：

```bash
npx impeccable skills install
```

缺 GSD 时：

```bash
npx @opengsd/gsd-core@latest
```

安装 GSD 时选择当前目标运行时，尤其是 `codex` 或 `claude`。缺 git 作者时：

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

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
