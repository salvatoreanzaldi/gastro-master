---
name: subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
---

# Subagent-Driven Development

Execute plan by dispatching fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

**Why subagents:** You delegate tasks to specialized agents with isolated context. By precisely crafting their instructions and context, you ensure they stay focused and succeed at their task. They should never inherit your session's context or history — you construct exactly what they need. This also preserves your own context for coordination work.

**Core principle:** Fresh subagent per task + two-stage review (spec then quality) = high quality, fast iteration

## When to Use

**vs. Executing Plans (parallel session):**
- Same session (no context switch)
- Fresh subagent per task (no context pollution)
- Two-stage review after each task: spec compliance first, then code quality
- Faster iteration (no human-in-loop between tasks)

Use this when: you have an implementation plan, tasks are mostly independent, and you want to stay in the current session.

## The Process

For each task:

1. **Dispatch implementer subagent** with full task text + context
2. **Answer any questions** the implementer asks before work begins
3. **Implementer implements, tests, commits, self-reviews**
4. **Dispatch spec reviewer** — confirms code matches spec (not more, not less)
5. **If spec issues:** implementer fixes → spec reviewer re-reviews
6. **Dispatch code quality reviewer** — approves implementation quality
7. **If quality issues:** implementer fixes → quality reviewer re-reviews
8. **Mark task complete**, proceed to next task

After all tasks: dispatch final code reviewer for entire implementation, then use `finishing-a-development-branch`.

## Model Selection

Use the least powerful model that can handle each role:

- **Mechanical tasks** (isolated functions, clear specs, 1-2 files): fast/cheap model
- **Integration tasks** (multi-file, pattern matching, debugging): standard model
- **Architecture, design, review**: most capable model

## Handling Implementer Status

- **DONE:** Proceed to spec compliance review
- **DONE_WITH_CONCERNS:** Read concerns before proceeding; address correctness/scope issues, note observations
- **NEEDS_CONTEXT:** Provide missing context and re-dispatch
- **BLOCKED:** Assess blocker — provide more context, upgrade model, split task, or escalate to human

Never ignore an escalation or force the same model to retry without changes.

## Example Workflow

```
[Read plan file once, extract all 5 tasks, create TodoWrite]

Task 1: Hook installation script

[Dispatch implementation subagent with full task text + context]

Implementer: "Should the hook be installed at user or system level?"
You: "User level (~/.config/superpowers/hooks/)"

Implementer: Implemented, tests 5/5 passing, committed

[Dispatch spec compliance reviewer]
Spec reviewer: ✅ All requirements met, nothing extra

[Dispatch code quality reviewer]
Code reviewer: Strengths: Good test coverage, clean. No issues. Approved.

[Mark Task 1 complete]
...
```

## Red Flags

**Never:**
- Start implementation on main/master without explicit user consent
- Skip reviews (spec compliance OR code quality)
- Proceed with unfixed issues
- Dispatch multiple implementation subagents in parallel (conflicts)
- Make subagent read plan file (provide full text instead)
- Start code quality review before spec compliance is ✅ (wrong order)
- Move to next task while either review has open issues

## Integration

**Required workflow skills:**
- **superpowers:using-git-worktrees** — REQUIRED: Set up isolated workspace before starting
- **superpowers:writing-plans** — Creates the plan this skill executes
- **superpowers:finishing-a-development-branch** — Complete development after all tasks

**Subagents should use:**
- **superpowers:test-driven-development** — Subagents follow TDD for each task
