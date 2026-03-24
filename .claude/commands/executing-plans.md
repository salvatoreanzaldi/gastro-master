---
name: executing-plans
description: Use when implementing a written development plan step by step, following tasks sequentially with verifications and checkpoints
---

# Executing Plans

A structured approach to implementing pre-written plans across sessions.

**Announce at start:** "I'm using the executing-plans skill to implement this plan."

## Core Process

### Phase 1: Load and Review

- Read the plan file completely
- Review critically — identify any questions or concerns before starting
- If anything is unclear, ask for clarification now rather than guessing later

### Phase 2: Execute

Work through tasks sequentially:

1. Mark task as `in_progress`
2. Follow each step exactly as written — plans contain bite-sized components for a reason
3. Run all specified verifications after each step
4. Mark task as `completed` only after verification passes
5. Move to next task

**Don't skip verifications.** They exist to catch issues early.

### Phase 3: Complete

After all tasks are verified complete, transition to the `finishing-a-development-branch` skill.

## Critical Rules

**Stop immediately when you encounter:**
- A missing dependency
- A failing test that shouldn't fail
- Unclear instructions
- Repeated verification failures

Ask for clarification rather than guessing. Never force past blockers.

**Never:**
- Start implementation on main/master without explicit user consent
- Skip steps because they seem unnecessary
- Guess when instructions are ambiguous
- Proceed past failing verifications without asking

## Integration

**Required companion skills:**
- **superpowers:using-git-worktrees** — set up isolated workspace before starting
- **superpowers:writing-plans** — creates the plan this skill executes
- **superpowers:finishing-a-development-branch** — completes the work after all tasks done

## Why Subagents Help

On platforms that support subagents, dispatching a fresh subagent per task (via `superpowers:subagent-driven-development`) yields significantly better results than inline execution — isolated context, no confusion between tasks, automatic review checkpoints.
