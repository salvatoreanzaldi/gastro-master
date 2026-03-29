---
name: using-superpowers
description: Use when starting any task to check which skills apply — invoke relevant skills BEFORE any response, code, or action
---

# Using Superpowers

## Core Rule

**Invoke relevant or requested skills BEFORE any response or action.**

If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.

## Instruction Hierarchy

1. **User's explicit instructions** (highest priority)
2. **Superpowers skills** (override default behavior)
3. **Default system prompt** (lowest priority)

Skills override default Claude behavior. If a skill says to do something differently than your default, follow the skill.

## Decision Flow

```
Task arrives
    ↓
Check: Is there a skill for this?
    ↓
Even 1% chance? → Invoke skill FIRST
    ↓
Then respond / act
```

## Skill Invocation Order

When multiple skills apply:
1. **Process skills first** (brainstorming, systematic-debugging) — determine approach
2. **Implementation skills second** (test-driven-development, subagent-driven-development) — guide execution

## Red Flags — You're Rationalizing

Stop if you catch yourself thinking:
- "This is just a simple question"
- "Let me gather information first"
- "I'll just do this one thing first"
- "The skill probably doesn't apply here"
- "I need more context before invoking"

**These are rationalizations. Invoke the skill.**

## Common Skill Triggers

| If you're about to... | Check skill |
|-----------------------|-------------|
| Build something new | brainstorming |
| Fix a bug | systematic-debugging |
| Write any code | test-driven-development |
| Execute a plan | executing-plans or subagent-driven-development |
| Finish a branch | finishing-a-development-branch |
| Receive PR feedback | receiving-code-review |
| Run multiple investigations | dispatching-parallel-agents |
| Claim work is done | verification-before-completion |

## Rigid vs. Flexible Skills

**Rigid skills** (like test-driven-development, verification-before-completion): follow exactly — the discipline IS the point.

**Flexible skills** (like brainstorming): adapt principles to context while preserving intent.

The user's explicit instructions always override skill requirements.
