# Security Policy

GoalFlow is an AI coding-agent skill. Security-sensitive issues may involve local git state, release gates, external publication, agent permissions, dependency installation guidance, or instructions that could cause unintended remote mutation.

## Reporting

Do not open public issues with exploitable details.

Use GitHub private vulnerability reporting for this repository when available. If private reporting is unavailable, contact the maintainers through the repository owner profile and share only a minimal public note asking for a private security contact.

Include:

- affected GoalFlow version or commit
- agent harness, for example Codex or Claude Code
- operating system
- reproduction steps
- expected behavior
- actual behavior
- impact
- whether the issue can trigger remote mutation, release publication, credential exposure, or unsafe dependency installation

## Safety Expectations

GoalFlow should not:

- install dependencies without explicit user approval
- bypass release gates in `--auto`
- use agent, bot, no-reply, or service identities as git authors
- push branches, create PRs, merge, tag, release, publish artifacts, deploy, or change shared external state without explicit user confirmation

## Public Issue Guidance

For non-sensitive bugs, use the bug report template. For security-sensitive issues, avoid logs, tokens, private repository names, exploit payloads, or exact instructions that allow abuse.
