# Release Gates

Read this before PR, merge, tag, release, or deployment work.

## Author Gate

Run:

```bash
git config user.name
git config user.email
```

The author must be a specific person. Block release if the author name looks like an agent identity such as Codex, Claude, Hapi, Agent, AI Assistant, or generic bot.

## Local Work Allowed

GoalFlow may autonomously:

- Create local commits.
- Update planning docs.
- Update design docs.
- Prepare PR text.
- Prepare release notes.
- Run local build/test/verification commands.

## User Gate Required

Ask the user before:

- Opening or updating a remote PR if credentials or project policy are uncertain.
- Merging a PR.
- Creating or pushing a tag.
- Publishing a GitHub/GitLab release.
- Deploying to production.
- Running commands that change external production state.

The gate must be in Chinese when the user is Chinese-speaking.

## Release Checklist

Before asking for the release gate:

1. No P0/P1 review findings remain.
2. Prototype and implementation match the approved or autonomously reviewed design direction.
3. Tests/build pass or failures are explicitly explained.
4. User-facing docs and README are updated when the feature changes public behavior.
5. `.planning/` and Impeccable artifacts are up to date.
6. Git status is understood.
7. Git author is valid.
8. PR/release notes describe user-visible changes, verification, risks, and rollback notes.

## GSD Release Routes

Use GSD for release workflow:

- `$gsd-ship`: create PR, run review, prepare merge.
- `$gsd-pr-branch`: create clean PR branch when planning commits need separation.
- `$gsd-complete-milestone`: archive completed milestone and prepare next version.
- `$gsd-docs-update`: refresh docs before release.
- `$gsd-audit-milestone`: audit milestone completion before archive/release.
