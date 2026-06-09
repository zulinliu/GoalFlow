# Contributing

Thanks for improving GoalFlow. This repository contains an AI coding-agent skill, not a library runtime or shell CLI.

## Before You Start

1. Read [README.md](README.md) or [README.zh-CN.md](README.zh-CN.md).
2. Run the environment probe from your installed skill directory.
3. Check [references/release-gates.md](references/release-gates.md) before any git, PR, tag, release, package, artifact, or deployment work.

## Agent Skill Invocations

`$goalflow ...` examples are agent-chat skill invocations. They are not terminal commands.

Terminal commands are shown only in `bash` blocks, for example:

```bash
node scripts/check_env.mjs
```

## AI-Assisted Contributions

AI-assisted contributions are welcome, but every commit and PR must be accountable to a specific human author and reviewer.

Do not use these as git authors:

- Codex
- Claude
- Hapi
- Agent
- AI Assistant
- generic bot identities
- GitHub Actions, Dependabot, Renovate, or no-reply/service identities

Before committing, verify:

```bash
git config user.name
git config user.email
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

Also check `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME`, and `GIT_COMMITTER_EMAIL` if they are set.

## Development Guidelines

- Keep skill behavior aligned with `SKILL.md`.
- Keep workflow details in `references/` instead of overloading the README.
- Keep public docs clear about the difference between agent invocations and shell commands.
- Update both `README.md` and `README.zh-CN.md` when public behavior changes.
- Update `CHANGELOG.md` for user-visible changes.
- Preserve native Impeccable and GSD artifact locations.

## Safety Gates

GoalFlow may prepare local commits only after a real-person git author check.

These actions require explicit user confirmation:

- remote branch or commit push
- remote PR creation, update, retarget, close, or merge
- tag creation or push
- release draft changes or release publication
- package, image, app build, or artifact publication
- production or shared-environment deployment
- shared external state changes that affect collaborators, users, automation, or notifications

## Pull Requests

PRs should include:

- what changed
- why it changed
- how it was verified
- whether docs were updated
- whether AI assistance was used
- confirmation that git authorship belongs to a specific human

Small documentation fixes are welcome. Larger behavior changes should include an issue or design note first.
