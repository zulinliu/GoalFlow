# Harness Compatibility

GoalFlow must work across harnesses, with Codex and Claude as first-class targets.

## Codex

- Use `request_user_input` when available for user gates.
- If `request_user_input` is unavailable, ask concise plain-text questions and stop.
- Use available multi-agent tools for parallel research/review when the user explicitly requested subagents or the current harness policy/instructions permit autonomous subagents for that workflow. If subagent tools are deferred, discover them first when the environment supports tool discovery.
- If no subagent tool is available, execute inline and record the downgrade reason.
- For Impeccable live mode, follow Impeccable's Codex-specific instructions. Do not run live polling in a background shell if the local Impeccable reference says Codex needs foreground polling.
- Use Playwright/browser/screenshots when available to verify prototypes and frontend implementation.

## Claude Code

- Map structured questions to `AskUserQuestion`.
- Map parallel work to `Task(...)`.
- Use background tasks where the referenced Impeccable/GSD workflow explicitly recommends them.
- Keep Task prompts self-contained and focused. Do not leak the expected answer to review agents.

## Other Harnesses

Use equivalent mechanisms:

- Cursor/Copilot/VS Code: use their structured question API when present; otherwise plain-text gates.
- Gemini/OpenCode/Windsurf/Kilo/etc.: use their native task/subagent or background-job tool if present; otherwise inline.

## Parallel Work Rule

Prefer subagents for independent work when permitted by the current harness policy/instructions:

- Codebase mapping.
- Domain or competitor research.
- UI critique.
- Accessibility/performance review.
- Backend/API review.
- Test gap analysis.
- Security review.
- Release readiness review.

Do not parallelize when agents would edit the same files without isolation. Use review-only subagents freely; use editing subagents only when the workflow has a safe merge/worktree strategy.

When falling back from subagents to inline work, record the intended parallel roles, why they could not run, and how the inline review covered those same roles.

## Auto Mode

In `--auto`, user confirmation gates become autonomous review gates:

1. Spawn independent design reviewers when available.
2. Synthesize findings.
3. Apply at least one meaningful iteration or explicitly record that reviewers found no material issue.
4. Record the gate result in the relevant Impeccable/GSD artifact.
5. Continue without asking the user.

This replaces user confirmation only. It never replaces design work, prototype work, testing, or release gates for remote publication.
