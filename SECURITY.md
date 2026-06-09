# Security Policy

GoalFlow is an AI coding-agent skill. Security-sensitive issues may involve local git state, release gates, external publication, agent permissions, dependency installation guidance, or instructions that could cause unintended remote mutation.

## Reporting

Do not open public issues with exploitable details.

Use GitHub private vulnerability reporting:

https://github.com/zulinliu/GoalFlow/security/advisories/new

If GitHub private vulnerability reporting is unavailable, email the maintainer at 277557317@qq.com with the subject `GoalFlow security report`. Share only a minimal public note if you must request a private contact path.

Include:

- affected GoalFlow version or commit
- agent harness, for example Codex or Claude Code
- operating system
- reproduction steps
- expected behavior
- actual behavior
- impact
- whether the issue can trigger remote mutation, release publication, credential exposure, or unsafe dependency installation

## Supported Versions

| Version | Supported |
| --- | --- |
| `v0.1.x` and later | Yes |
| older unreleased commits | Best effort |

## Response Expectations

- Initial acknowledgement: within 7 days when the report reaches a working private channel.
- Triage update: within 14 days for actionable reports.
- Fix or mitigation target: coordinated based on impact, exploitability, and maintainer availability.
- Public disclosure: after a fix, mitigation, or explicit maintainer decision that no vulnerability exists.

Please avoid publishing exploit details before maintainers have had a reasonable chance to respond.

## Safety Expectations

GoalFlow should not:

- install dependencies without explicit user approval
- bypass release gates in `--auto`
- use agent, bot, no-reply, or service identities as git authors
- push branches, create PRs, merge, tag, release, publish artifacts, deploy, or change shared external state without explicit user confirmation

## Public Issue Guidance

For non-sensitive bugs, use the bug report template. For security-sensitive issues, use the private advisory link above and avoid public logs, tokens, private repository names, exploit payloads, or exact instructions that allow abuse.
