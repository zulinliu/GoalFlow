@AGENTS.md

## Claude Code Notes

Claude Code should use `AGENTS.md` as the shared project memory for this repository. Keep this file thin so Codex and Claude do not drift.

When working in Claude Code:

- Run `/memory` if you need to confirm this file and imported project memory are loaded.
- Use Claude-native planning and task/subagent features only when the current session policy permits them.
- Put durable project rules in `AGENTS.md` or the referenced project docs, not only in chat.
- Do not duplicate the full GoalFlow rules here; update `AGENTS.md` instead.
