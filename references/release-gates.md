# Release Gates

Read this before PR, merge, tag, release, or deployment work.

## Author Gate

Run:

```bash
git config user.name
git config user.email
git var GIT_AUTHOR_IDENT
git var GIT_COMMITTER_IDENT
```

The author must be a specific person. Block local commits and release work if the author name or email looks like an agent, automation, or service identity such as Codex, Claude, Hapi, Agent, AI Assistant, generic bot, GitHub Actions, Dependabot, Renovate, or no-reply/service accounts.

Also check `GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME`, and `GIT_COMMITTER_EMAIL` if they are set, because those environment variables override git config during commits.

## Local Work Allowed

GoalFlow may autonomously:

- Create local commits.
- Update planning docs.
- Update design docs.
- Prepare PR text.
- Prepare release notes.
- Run local build/test/verification commands.

Before every autonomous local commit, rerun the author gate and confirm `git status` contains only intended files.

## User Gate Required

Ask the user before:

- Pushing any branch or commit to a remote.
- Opening, updating, retargeting, or closing a remote PR.
- Merging a PR.
- Creating or pushing a tag.
- Creating, editing, publishing, or deleting a release draft.
- Publishing a GitHub/GitLab release.
- Publishing packages, images, app builds, or artifacts to npm, PyPI, crates.io, Docker/OCI registries, app stores, cloud artifact registries, or similar external systems.
- Deploying to production.
- Running commands that change shared external state, including staging environments that notify users, trigger automation, or affect collaborators.

The gate must be in Chinese when the user is Chinese-speaking.

Preparing PR text, release notes, rollback notes, and local branch state is allowed without this gate. Remote mutation is not.

## Release Artifact Scope

GoalFlow releases must publish only skill artifacts.

Canonical release assets must be installable skill packages and may include only:

- `SKILL.md`
- `agents/`
- `assets/`
- `references/`
- `scripts/`
- `LICENSE`

Do not attach repository-management, planning, review, prototype scratch, or governance-only files to a release asset. Excluded examples include `.git/`, `.github/`, `.planning/`, `.impeccable/`, `README*`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, root design/brand drafts, temporary review reports, local test output, screenshots not used by the skill, and generated dependency folders.

GitHub may display automatically generated source archives for every tag. Treat those as repository snapshots, not canonical GoalFlow skill packages. The release notes must point users to the attached skill-only package when one is provided.

## Chinese Gate Templates

Design gate:

```text
设计确认：我已完成「<功能>」的设计方案和原型。
原型位置：<path/url>
主要体验：<summary>
关键风险：<risks>
是否确认按该方案进入实现？
```

Release gate:

```text
发布确认：我准备执行远程发布动作。
动作：<push / PR / merge / tag / release / deploy>
变更：<user-visible changes>
验证：<tests/build/reviews>
剩余风险：<risks>
回滚方式：<rollback>
是否继续？
```

## Release Checklist

Before asking for the release gate:

1. No P0/P1 review findings remain.
2. Prototype and implementation match the approved or autonomously reviewed design direction.
3. Tests/build pass or failures are explicitly explained.
4. User-facing docs and README are updated when the feature changes public behavior.
5. `.planning/` and Impeccable artifacts are up to date.
6. Git status is understood.
7. Git author is valid.
8. Release assets are skill-only according to the Release Artifact Scope.
9. PR/release notes describe user-visible changes, verification, risks, rollback notes, and the canonical skill package when applicable.

## GSD Release Routes

Use GSD for release workflow:

- `$gsd-ship`: create PR, run review, prepare merge.
- `$gsd-pr-branch`: create clean PR branch when planning commits need separation.
- `$gsd-complete-milestone`: archive completed milestone and prepare next version.
- `$gsd-docs-update`: refresh docs before release.
- `$gsd-audit-milestone`: audit milestone completion before archive/release.

When a GSD route would push a branch, create or edit a PR, push a tag, publish a release, or deploy, stop at the Chinese user gate first.
